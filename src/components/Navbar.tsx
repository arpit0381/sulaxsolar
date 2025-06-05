
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo container - ready for PNG logo */}
            <div className="flex items-center justify-center">
              {/* Placeholder for PNG logo - replace src with your logo path */}
              <img 
                src="/logo.png" 
                alt="Sulax Solar Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const imgElement = e.currentTarget;
                  const fallbackElement = imgElement.nextElementSibling as HTMLElement;
                  imgElement.style.display = 'none';
                  if (fallbackElement) {
                    fallbackElement.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback logo */}
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg items-center justify-center hidden">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              {/* Sulax Solar */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 px-1 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary' 
                      : 'text-white hover:text-secondary'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/Contact"
              className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                } ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}
              />
              <span
                className={`absolute w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                } top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                } ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-4 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-2 rounded-full text-center"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
