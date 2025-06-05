
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Sun, Zap, Battery, Factory, Car, Wrench } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      icon: Sun,
      title: 'Residential Solar (PM Suryaghar)',
      description: 'Transform your home with clean, renewable energy and benefit from government subsidies.',
      features: [
        'Free site assessment and consultation',
        'Government subsidy assistance',
        'High-efficiency solar panels',
        '25-year performance warranty',
        'Net metering setup',
        'Complete installation and commissioning'
      ],
      image: '/res.png' // Placeholder for PNG logo, replace with actual image URL
    },
    {
      icon: Factory,
      title: 'Industrial & Commercial Solutions',
      description: 'Large-scale solar installations for businesses, factories, and commercial establishments.',
      features: [
        'Custom system design',
        'High-capacity installations',
        'Energy audit and optimization',
        'Financial modeling and ROI analysis',
        'Maintenance contracts',
        'Remote monitoring systems'
      ],
      image: 'com.png' // Placeholder for PNG logo, replace with actual image URL
    },
    {
      icon: Zap,
      title: 'Off/On-Grid Systems',
      description: 'Flexible solar solutions for both grid-connected and standalone power requirements.',
      features: [
        'Grid-tied systems with net metering',
        'Off-grid systems with battery backup',
        'Hybrid solutions',
        'Load analysis and sizing',
        'Backup power solutions',
        'Energy storage optimization'
      ],
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Battery,
      title: 'Ground Mounting',
      description: 'Large-scale ground-mounted solar installations for maximum efficiency and output.',
      features: [
        'Site preparation and analysis',
        'Foundation design and installation',
        'Tracking systems available',
        'Utility-scale installations',
        'Environmental compliance',
        'Project management'
      ],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Car,
      title: 'EV Charging Setup',
      description: 'Solar-powered electric vehicle charging stations for homes and businesses.',
      features: [
        'Solar-integrated EV chargers',
        'Fast and slow charging options',
        'Smart charging systems',
        'Grid integration',
        'Mobile app monitoring',
        'Future-ready installations'
      ],
      image: 'https://mgmotor.scene7.com/is/image/mgmotor/evpedia-bn-0060?$mg-rgb-4k-image-responsive$'
    },
    {
      icon: Wrench,
      title: 'Maintenance & Cleaning',
      description: 'Comprehensive maintenance services to ensure optimal performance of your solar system.',
      features: [
        'Regular performance monitoring',
        'Panel cleaning services',
        'Preventive maintenance',
        '24/7 technical support',
        'Inverter servicing',
        'System optimization'
      ],
      image: 'm&i.png'
    }
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Solar Services - Sulax Solar Energy Solutions</title>
        <meta name="description" content="Comprehensive solar energy services including residential, commercial, off-grid systems, EV charging, and maintenance. Expert installation with 25-year warranty." />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Solar Services</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solar energy solutions tailored to meet your specific needs, 
                from residential rooftops to large-scale commercial installations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <service.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                   <a href="/contact"> <button className="mt-6 w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300">
                    Get Quote
                    </button></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Go Solar?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get a free consultation and customized quote for your solar energy needs.
              </p>
             <a href="/Contact"> <button className="bg-secondary text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-300">
                Schedule Free Consultation
              </button></a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Services;
