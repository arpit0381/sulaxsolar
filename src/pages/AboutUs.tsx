
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>About Sulax Solar - Your Trusted Solar Energy Partner</title>
        <meta name="description" content="Learn about Sulax Solar's journey, mission, and vision in providing sustainable solar energy solutions across North India. 10+ years of expertise in solar installations." />
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
                About <span className="text-primary">Sulax Solar</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pioneering sustainable energy solutions since 2014, we're committed to making 
                solar power accessible and affordable for everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Our Journey Towards a <span className="text-primary">Sustainable Future</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2010 with a vision to make clean energy accessible to every household and business, 
                  Sulax Solar has emerged as one of North India's most trusted solar energy providers. Our journey 
                  began with a simple belief: everyone deserves access to affordable, clean energy.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Over the years, we've installed over 1.2 MW of solar capacity, helping hundreds of families 
                  and businesses reduce their carbon footprint while saving on electricity costs. Our commitment 
                  to quality, innovation, and customer satisfaction has made us the preferred choice for solar 
                  installations across Uttar Pradesh.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-2">225+</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Solar installation team"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & <span className="text-primary">Vision</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize solar energy by providing high-quality, affordable solar solutions 
                  that empower individuals and businesses to achieve energy independence while 
                  contributing to a sustainable planet.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-6">🔮</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading solar energy provider in India, recognized for innovation, 
                  quality, and customer satisfaction, while playing a crucial role in India's 
                  transition to renewable energy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-primary">Sulax Solar?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🏆',
                  title: 'Industry Leadership',
                  description: 'Over a decade of experience with proven track record in solar installations'
                },
                {
                  icon: '⚡',
                  title: 'Premium Quality',
                  description: 'We use only Tier-1 solar panels and components with international certifications'
                },
                {
                  icon: '👨‍🔧',
                  title: 'Expert Team',
                  description: 'Certified engineers and technicians ensuring professional installation and service'
                },
                {
                  icon: '🛡️',
                  title: 'Comprehensive Warranty',
                  description: '25-year performance warranty with complete after-sales support'
                },
                {
                  icon: '💰',
                  title: 'Financial Benefits',
                  description: 'Maximize savings with government subsidies and financing options'
                },
                {
                  icon: '🌱',
                  title: 'Environmental Impact',
                  description: 'Contribute to reducing carbon emissions and building a sustainable future'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Meet Our <span className="text-primary">Expert Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our dedicated professionals bring years of experience and passion for renewable energy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Deepanshu Bajpai',
                  position: 'Founder & CEO',
                  image: '/owner.png',
                  description: '20+ years in renewable energy sector'
                },
                {
                  name: 'name',
                  position: 'Technical Head',
                  image: '',
                  description: 'M.Tech in Electrical Engineering'
                },
                {
                  name: 'name',
                  position: 'Operations Manager',
                  image: '',
                  description: '200+ successful installations'
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default AboutUs;
