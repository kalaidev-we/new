import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox, FaTags, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  
  // Categories State
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
    } else {
      fetchProducts();
      fetchCategories();
    }
  }, [navigate]);

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

  const fetchCategories = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        setCategories(data);
    } catch (error) {
        console.error(error);
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const openModal = (product = null) => {
    if (product) {
      setEditMode(true);
      setSelectedProductId(product._id);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category?._id || '');
      setStock(product.stock);
      setImage(null);
    } else {
      setEditMode(false);
      setSelectedProductId(null);
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setStock('');
      setImage(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitProductHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    if (image) formData.append('image', image);

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${selectedProductId}`, formData, config);
        toast.success('Product Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/products', formData, config);
        toast.success('Product Created Successfully');
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving product');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Product Deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-wider text-blue-400">ADMIN PANEL</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <Link to="/admin" className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
             <FaBox /> <span>Products</span>
           </Link>
           {/* Extendable for Categories */}
        </nav>
        <div className="p-4 border-t border-gray-800">
           <button onClick={logoutHandler} className="flex items-center space-x-3 p-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-lg transition">
             <FaSignOutAlt /> <span>Logout</span>
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-8">
           <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
             <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition shadow-md">
               <FaPlus className="mr-2" /> Add Product
             </button>
           </div>

           {/* Stats Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-semibold uppercase">Total Products</p>
                   <p className="text-3xl font-bold text-gray-800 mt-1">{products.length}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-2xl">
                   <FaBox />
                </div>
              </div>
           </div>

           {/* Products Table */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {products.map(product => (
                   <tr key={product._id} className="hover:bg-gray-50 transition">
                     <td className="px-6 py-4 whitespace-nowrap">
                       <img src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">${product.price.toFixed(2)}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.stock}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                       <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-900"><FaEdit className="inline" /></button>
                       <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:text-red-900"><FaTrash className="inline" /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {products.length === 0 && <p className="text-center py-6 text-gray-500">No products found.</p>}
           </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={submitProductHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input type="number" required value={stock} onChange={e => setStock(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="mt-1 block w-full" {...(!editMode && {required: true})} />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm flex items-center">
                  <FaCheckCircle className="mr-2" /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
