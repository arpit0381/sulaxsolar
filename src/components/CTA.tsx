
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            Let's Go <span className="text-secondary">Solar</span> Together
          </h2>
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Join the solar revolution and start saving on your electricity bills today.
            Get a free consultation and discover how much you can save with our premium solar solutions.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link
              to="/contact"
              className="bg-secondary hover:bg-secondary-dark text-primary px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Free Consultation
            </Link>
            <a
              href="tel:+918081727840"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Call Now: +91 8081727840
            </a>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {[
              { icon: '🌞', title: 'Free Site Survey', desc: 'Professional assessment of your property' },
              { icon: '💰', title: 'Best Pricing', desc: 'Competitive rates with financing options' },
              { icon: '⚡', title: 'Quick Installation', desc: 'Fast and efficient installation process' },
              { icon: '🛡️', title: '25-Year Warranty', desc: 'Long-term protection and peace of mind' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Multiple Ways to Connect</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="mailto:info@sulaxsolar.com"
                className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-2xl">✉️</span>
                <div className="text-left">
                  <div className="font-semibold">Email Us</div>
                  <div className="text-sm opacity-80">info@sulaxsolar.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/+918081727840"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-2xl">💬</span>
                <div className="text-left">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm opacity-80">Chat with us now</div>
                </div>
              </a>

              <Link
                to="/contact"
                className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-2xl">📍</span>
                <div className="text-left">
                  <div className="font-semibold">Visit Office</div>
                  <div className="text-sm opacity-80">Kanpur, UP</div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default CTA;
