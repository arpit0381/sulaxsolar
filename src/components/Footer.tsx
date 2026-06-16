import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock,
  ArrowUpRight, Facebook, Instagram, Youtube,
  Sun
} from 'lucide-react';

/* Twitter/X icon */
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  const services = [
    'Residential Solar',
    'Commercial Solar Plants',
    'Off-Grid Systems',
    'Grid-Tied Solutions',
    'Solar Water Heaters',
    'Maintenance & AMC',
  ];

  const socials = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: XIcon, href: '#', label: 'X' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-[#040d0f] text-gray-400 overflow-hidden">

      {/* ── Ambient background blobs ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-24 right-1/3 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[140px]" />
      </div>

      {/* ── Top gradient rule ── */}
      <div className="relative h-[2px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-secondary" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Big headline band ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-white/[0.07] py-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          {/* Left: headline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Sun className="w-4 h-4" />
              Kanpur, Uttar Pradesh · India
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
              Let the Sun<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-secondary-dark">
                Power Your World.
              </span>
            </h2>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full
                bg-secondary text-gray-900 font-bold text-sm
                hover:shadow-[0_0_36px_rgba(245,197,24,0.45)] transition-all duration-300"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500" />
              <span className="relative">Get Free Consultation</span>
              <ArrowUpRight className="w-4 h-4 relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <a
              href="tel:+918081727840"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                border border-white/12 text-white font-semibold text-sm
                hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-secondary" />
              +91 80817 27840
            </a>
          </div>
        </motion.div>

        {/* ── Four column grid ── */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="space-y-6 col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <Link to="/">
              <img
                src="/lff.png"
                alt="Sulax Solar"
                className="h-14 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              North India's most trusted solar partner — delivering premium solar solutions for homes, businesses and industries.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/4 border border-white/[0.08]
                    flex items-center justify-center text-gray-500
                    hover:bg-secondary hover:text-gray-900 hover:border-secondary
                    hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* PM Subsidy badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light text-xs px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
              PM Surya Ghar Yojana Available
            </div>
          </motion.div>

          {/* Company nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-xs tracking-[0.18em] uppercase mb-8 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-secondary rounded-full" /> Company
            </h4>
            <ul className="space-y-4">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 hover:text-white group flex items-center gap-2 transition-colors duration-300"
                  >
                    <span className="block w-0 h-[1px] bg-secondary rounded-full group-hover:w-4 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-xs tracking-[0.18em] uppercase mb-8 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-primary rounded-full" /> Services
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 cursor-default"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-xs tracking-[0.18em] uppercase mb-8 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-white/30 rounded-full" /> Reach Us
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="text-gray-500 leading-relaxed">1225 Sector 7, Green Street,<br />Naubasta, Kanpur UP 208021</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                </div>
                <a href="tel:+918081727840" className="text-gray-500 hover:text-white transition-colors">+91 80817 27840</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-secondary" />
                </div>
                <a href="mailto:info@sulaxsolar.com" className="text-gray-500 hover:text-white transition-colors">info@sulaxsolar.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="text-gray-500">Mon – Sat, 9 AM – 6 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div className="border-t border-white/[0.06] py-7 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-600 text-xs text-center md:text-left order-3 md:order-1">
            © {currentYear} Sulax Solar Pvt. Ltd. · All rights reserved
          </p>

          {/* ── Developer Credit ── */}
          <a
            href="https://connect-me-pearl-seven.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group order-1 md:order-2 inline-flex items-center gap-3 px-5 py-2.5 rounded-full
              border border-white/10 bg-white/[0.03]
              hover:border-secondary/40 hover:bg-secondary/[0.07]
              transition-all duration-300 shrink-0"
          >
            {/* Dev avatar */}
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
              flex items-center justify-center text-gray-900 font-black text-xs shadow-lg
              group-hover:shadow-[0_0_12px_rgba(245,197,24,0.5)] transition-shadow">
              AB
            </span>

            <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
              Designed &amp; Built by{' '}
              <span className="text-secondary font-bold ml-0.5">Arpit Bajpai</span>
            </span>

            <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-secondary
              group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
          </a>

          <div className="flex gap-5 text-xs text-gray-600 order-2 md:order-3">
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1 group">
              Admin <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
