import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, AlertCircle, Building2, Zap, Waves, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../backend/supabase';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  // Assuming 'service' might be added later based on reset, but not in current form fields
  service?: string;
};

type SubmissionStatus = 'idle' | 'sending' | 'success'; // Changed 'submitting' to 'sending' and removed 'error'

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<SubmissionStatus>('idle'); // Renamed submissionStatus to formStatus

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Send data to Supabase
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }
    ]);

    if (error) {
      console.error("Failed to send message", error);
      setFormStatus('idle');
      // In a real app we'd show a toast error here.
      alert("Failed to send message. Please try again later.");
      return;
    }

    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' }); // Removed 'service' as it's not in the form fields

    setTimeout(() => {
      setFormStatus('idle');
    }, 3000);
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
      details: ['+91 8081727840'],
      action: 'tel:+918081727840'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sulaxsolar.com', 'industriessulax@gmail.com'],
      action: 'mailto:industriessulax@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Sulax Solar pvt ltd', 'Kanpur, Uttar Pradesh 208021'],
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
                      disabled={formStatus === 'sending'}
                      className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>

                    {formStatus === 'success' && (
                      <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <p>Thank you for your message! We'll get back to you shortly.</p>
                      </div>
                    )}
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
                    href="https://wa.me/918081727840"
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
                src="https://maps.google.com/maps?q=1225+Sector+7+Green+Street+Naubasta+Kanpur&z=18&output=embed"
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

        {/* Our Group of Companies Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Building2 className="w-7 h-7 text-secondary" />
                <span className="text-secondary font-semibold tracking-widest uppercase text-sm">
                  Stronger Together
                </span>
                <Building2 className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                Our Group of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">Companies</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Part of a dynamic group delivering end-to-end energy solutions across India, 
                backed by innovation and years of expertise.
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="h-px w-24 bg-primary" />
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
              </div>
            </motion.div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* OM POWER SOLUTIONS */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-500 h-full">
                  {/* Icon Badge */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-500">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                    OM POWER SOLUTIONS
                  </h3>
                  
                  {/* Divider */}
                  <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500" />
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Delivering reliable power solutions and electrical infrastructure across commercial 
                    and industrial sectors. Specialized in power distribution, transformers, and 
                    energy management systems.
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Power Systems', 'Electrical', 'Infrastructure'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* BLUE OCEAN ENERGY */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-primary-light/50 transition-all duration-500 h-full">
                  {/* Icon Badge */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-shadow duration-500">
                    <Waves className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">
                    BLUE OCEAN ENERGY
                  </h3>
                  
                  {/* Divider */}
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500" />
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Pioneering clean and sustainable energy solutions for a greener tomorrow. 
                    Focused on renewable energy projects, energy consulting, and green 
                    technology implementation.
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Renewable Energy', 'Consulting', 'Green Tech'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-14"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-300 text-sm font-medium">
                  Together powering India's sustainable energy future
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Contact;
