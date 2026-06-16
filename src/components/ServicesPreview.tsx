
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../backend/supabase';

const ServicesPreview = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // Fetch up to 4 services for the preview on the homepage
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true }).limit(4);
      if (!error && data) {
        setServices(data);
      }
    };
    fetchServices();
  }, []);


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary">Solar Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From residential rooftops to large commercial installations, we provide comprehensive 
            solar solutions tailored to your energy needs and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features && Array.isArray(service.features) && service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/services"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors duration-300"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
