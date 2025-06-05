
import { motion } from 'framer-motion';

const WhySulax = () => {
  const benefits = [
    {
      icon: '🌱',
      title: 'Eco-Friendly Solutions',
      description: 'Reduce your carbon footprint with clean, renewable energy that helps protect our planet for future generations.'
    },
    {
      icon: '🏛️',
      title: 'PM Suryaghar Yojna',
      description: 'Take advantage of government subsidies and incentives through the PM Suryaghar scheme for maximum savings.'
    },
    {
      icon: '⚡',
      title: 'Premium Quality',
      description: 'We use only the highest quality solar panels and equipment with industry-leading warranties and performance guarantees.'
    },
    {
      icon: '🔧',
      title: 'Complete Maintenance',
      description: 'Comprehensive maintenance services including cleaning, monitoring, and repairs to ensure optimal performance.'
    },
    {
      icon: '💰',
      title: 'Cost Savings',
      description: 'Significant reduction in electricity bills with potential to eliminate them completely and even earn from excess power.'
    },
    {
      icon: '👥',
      title: 'Expert Team',
      description: 'Our certified professionals provide end-to-end service from consultation to installation and ongoing support.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-primary">Sulax Solar?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another solar company. We're your partners in creating a sustainable, 
            cost-effective energy solution that benefits you and the environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-2xl text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Make the Switch to Solar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who have already transformed their energy consumption
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              <a href="/Contact">Get Your Free Quote Today</a>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySulax;
