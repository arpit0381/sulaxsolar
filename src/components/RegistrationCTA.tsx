import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationCTA = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden border-y border-gray-100">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-primary-dark rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Inner decorative element */}
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <ShieldCheck className="w-64 h-64 text-white -rotate-12 translate-x-12 -translate-y-12" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Activate Your Warranty
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Register Your <span className="text-secondary">Solar Product</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-xl">
                Have you recently installed a Sulax Solar system? Register your product now to activate your comprehensive warranty and ensure priority customer support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 bg-secondary text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary-light transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:shadow-[0_0_30px_rgba(245,197,24,0.5)]"
              >
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCTA;
