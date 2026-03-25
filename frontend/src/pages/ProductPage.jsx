import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center text-xl py-12">Loading...</div>;

  return (
    <div className="container mx-auto p-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
        <FaArrowLeft className="mr-2" /> Back to Catalogue
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden h-96">
          <img
            src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
            alt={product.name}
            className="object-contain h-full w-full"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <hr className="mb-4 text-gray-200" />
          <p className="text-3xl text-blue-600 font-semibold mb-6">${product.price?.toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {product.stock > 0 && (
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition shadow-md">
                 Add to Cart (Demo)
               </button>
            )}
          </div>
          
          <div className="text-sm text-gray-500 mt-auto">
            Category: {product.category?.name || 'Uncategorized'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
