import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <div className="container mx-auto p-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Catalogue</h1>
        {loading ? (
        <div className="text-center text-xl">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition">
              <Link to={`/product/${product._id}`}>
                <div className="h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h2 className="text-lg font-semibold hover:text-blue-600 transition truncate">{product.name}</h2>
                </Link>
                <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="col-span-full text-center text-gray-500">No products available.</p>}
        </div>
      )}
      </div>
    </>
  );
};

export default HomePage;
