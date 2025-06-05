
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Residential Solar',
    'Commercial Solar',
    'Off-Grid Systems',
    'Grid-Tied Systems',
    'EV Charging Stations',
    'Solar Maintenance'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
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
              </div>
          </Link>
            {/* <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold">Sulax Solar</span>
            </div> */}
            <p className="text-gray-300 leading-relaxed">
              Leading solar energy solutions provider in North India. We help homes and 
              businesses harness the power of the sun for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <span><img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="" /></span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <span><img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="" /></span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <span><img src="https://cdn-icons-png.flaticon.com/128/12105/12105336.png" alt="" /></span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <span><img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="" /></span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-center">
                  <span className="mr-2 text-secondary">✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-secondary mt-1">📍</span>
                <div>
                  <p className="text-gray-300">
                    Sulax Solar Pvt. Ltd.,<br />
                    Kanpur, Uttar Pradesh 208001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-secondary">📞</span>
                <a href="tel:+919876543210" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  +91 7390027342
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-secondary">✉️</span>
                <a href="mailto:info@sulaxsolar.com" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  info@sulaxsolar.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-secondary">🕒</span>
                <p className="text-gray-300">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Solar News</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest solar technology updates, government policies, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-secondary"
              />
              <button className="bg-secondary hover:bg-secondary-dark text-primary px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Sulax Solar. All rights reserved. | Empowering people Empowring world.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors duration-300">
              Sitemap
            </a>
            <a href="https://connect-me-pearl-seven.vercel.app/" className="text-gray-400 hover:text-secondary transition-colors duration-300">
              Designed by <span className="text-secondary">Arpit Bajpai</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        ↑
      </motion.button>
    </footer>
  );
};

export default Footer;
