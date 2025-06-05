
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9876543210', '+91 8765432109'],
      action: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sulaxsolar.com', 'support@sulaxsolar.com'],
      action: 'mailto:info@sulaxsolar.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Solar Street, Green Valley', 'Kanpur, Uttar Pradesh 208001'],
      action: null
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM'],
      action: null
    }
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact Us - Sulax Solar Energy Solutions</title>
        <meta name="description" content="Get in touch with Sulax Solar for free consultation, quotes, and solar energy solutions. Located in Kanpur, serving all of North India." />
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
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to make the switch to solar energy? Contact us for a free consultation 
                and discover how we can help you achieve energy independence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your solar energy requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help you with all your solar energy needs. Reach out to us 
                    through any of the following channels:
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">
                            {info.action ? (
                              <a href={info.action} className="hover:text-primary transition-colors">
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold mb-1">Quick Response on WhatsApp</h3>
                      <p className="text-sm opacity-90">Get instant replies to your queries</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-white text-green-600 py-3 px-4 rounded-lg font-semibold mt-4 hover:bg-gray-100 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
              <p className="text-gray-600">
                Visit our office for in-person consultation and project planning
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.4926393738!2d80.34479241473767!3d26.46523268334159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38647c4a9e1d%3A0x2db71cc8dc41b25e!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1634561234567!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sulax Solar Location"
              />
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Contact;
