const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} NexaCart. All rights reserved.</p>
        <p className="mt-2 text-sm">Powered by AI</p>
      </div>
    </footer>
  );
};

export default Footer;
