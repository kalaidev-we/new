import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserLock } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          ECOM<span className="text-blue-400">STORE</span>
        </Link>
        <nav className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition">Catalogue</Link>
          <Link to="/admin/login" className="flex items-center hover:text-blue-400 transition" title="Admin Login">
            <FaUserLock className="mr-1" /> Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
