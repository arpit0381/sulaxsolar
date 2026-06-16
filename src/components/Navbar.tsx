import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solidNav = scrolled || !isHome;

  return (
    <>
      {/* ── SOLID NAV BAR (Using GPU accelerated opacity instead of background repaints to stop flicker) ── */}
      <nav className="fixed top-0 inset-x-0 z-50">

        {/* GPU-Accelerated Background Layer */}
        <div
          className="absolute inset-0 bg-white shadow-md transition-opacity duration-300 ease-in-out"
          style={{ opacity: solidNav ? 1 : 0, pointerEvents: 'none' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src="/lff.png"
                alt="Sulax Solar"
                className="h-14 w-auto drop-shadow-md"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${isActive
                          ? 'bg-primary text-white'
                          : solidNav
                            ? 'text-gray-700 hover:text-primary hover:bg-gray-100'
                            : 'text-white hover:text-secondary hover:bg-white/10'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 pl-4 border-l border-gray-300">
                <a
                  href="tel:+918081727840"
                  className={`flex items-center gap-2 text-sm font-bold transition-colors ${solidNav ? 'text-gray-800' : 'text-white'
                    }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden xl:block">+91 80817 27840</span>
                </a>
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger Button (No box, just lines) */}
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden p-2 transition-colors duration-300 ${solidNav ? 'text-gray-900' : 'text-white'
                }`}
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8 drop-shadow-sm" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ══ BULLETPROOF MOBILE MENU DRAWER ══ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60"
          >
            <div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <Link to="/" onClick={() => setOpen(false)}>
                  <img src="/lff.png" alt="Logo" className="h-11" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2.5 bg-gray-100 rounded-full text-gray-800 active:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-5 py-6 flex flex-col gap-2.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-5 py-4 rounded-xl font-bold text-base transition-colors ${isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-gray-50 text-gray-800'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Drawer Footer CTA */}
                <div className="mt-8 pt-8 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+918081727840"
                    className="flex items-center justify-center gap-2 py-3.5 bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-800"
                  >
                    <Phone className="w-4 h-4" /> Call Us Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
