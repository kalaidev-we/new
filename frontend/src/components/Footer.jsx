const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} EcomStore. All Rights Reserved.</p>
        <p className="text-sm mt-2 text-gray-500">Demo Production Quality E-Commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
