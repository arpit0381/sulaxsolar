
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Zap, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Residential Complex Solar Installation',
      location: 'Green Valley Society, Kanpur',
      date: 'December 2023',
      capacity: '250 kW',
      homes: '120 Units',
      description: 'Complete solar electrification of a residential complex with individual metering and net metering setup. Achieved 40% reduction in electricity bills for residents.',
      images: [
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      features: [
        'Net metering for all units',
        'Real-time monitoring system',
        'Battery backup integration',
        '25-year warranty'
      ]
    },
    {
      id: 2,
      title: 'Industrial Manufacturing Plant',
      location: 'SIDCUL Industrial Area, Haridwar',
      date: 'October 2023',
      capacity: '500 kW',
      homes: 'Industrial',
      description: 'Large-scale solar installation for a manufacturing unit, reducing dependency on grid power by 70% and achieving significant cost savings.',
      images: [
        'https://cdn.pixabay.com/photo/2020/03/30/20/11/solar-panels-4985353_1280.jpg',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      features: [
        'Ground-mounted system',
        'Remote monitoring',
        'Preventive maintenance',
        'Load balancing system'
      ]
    },
    {
      id: 3,
      title: 'Educational Institution Project',
      location: 'PSIT Kanpur Campus',
      date: 'August 2023',
      capacity: '750 kW',
      homes: 'Campus',
      description: 'Comprehensive solar solution for the university campus including hostels, academic buildings, and research facilities.',
      images: [
        'https://www.psit.ac.in/assets/webp/home/aboutpsit.webp',
        'https://www.gkseries.com/blog/wp-content/uploads/2020/04/PSIT-Pranveer-Singh-Institute-of-Technology-Kanpur.jpg'
      ],
      features: [
        'Multiple building integration',
        'Student research opportunities',
        'Energy monitoring dashboard',
        'Grid-tie capability'
      ]
    },
    {
      id: 4,
      title: 'Commercial Shopping Complex',
      location: 'S-Mart Mall, Kanpur',
      date: 'June 2023',
      capacity: '300 kW',
      homes: 'Commercial',
      description: 'Rooftop solar installation for a major shopping complex, powering common areas and reducing operational costs significantly.',
      images: [
        'https://cdn.pixabay.com/photo/2015/01/13/17/34/facade-598426_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/09/12/13/23/photovoltaic-system-2742308_1280.jpg'
      ],
      features: [
        'Optimal space utilization',
        'Peak load management',
        'Cost optimization',
        'Environmental certification'
      ]
    },
    // {
    //   id: 5,
    //   title: 'Government Office Complex',
    //   location: 'Collectorate Building, Lucknow',
    //   date: 'April 2023',
    //   capacity: '200 kW',
    //   homes: 'Government',
    //   description: 'Solar power solution for government offices as part of the state renewable energy initiative.',
    //   images: [
    //     'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    //     'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    //   ],
    //   features: [
    //     'Government compliance',
    //     'Public demonstration project',
    //     'Energy efficiency metrics',
    //     'Community awareness'
    //   ]
    // },
    {
      id: 6,
      title: 'Agro-Solar Farm Project',
      location: 'Mahoba District, UP',
      date: 'February 2023',
      capacity: '1 MW',
      homes: 'Agricultural',
      description: 'Ground-mounted solar farm integrated with agricultural activities, providing clean energy while maintaining crop production.',
      images: [
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      features: [
        'Agro-solar integration',
        'Community benefit sharing',
        'Irrigation pump integration',
        'Rural development impact'
      ]
    }
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Projects - Sulax Solar Success Stories</title>
        <meta name="description" content="Explore our successful solar projects across North India. Residential, commercial, and industrial solar installations with proven results." />
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
                Our <span className="text-primary">Projects</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our portfolio of successful solar installations across various sectors, 
                showcasing our expertise and commitment to sustainable energy solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Images */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative overflow-hidden rounded-2xl shadow-lg">
                          <img
                            src={image}
                            alt={`${project.title} ${imgIndex + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
                        <p className="text-gray-600 leading-relaxed">{project.description}</p>
                      </div>

                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 text-sm">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{project.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Zap className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{project.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{project.homes}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300">
                        View Project Details
                      </button>
                    </div>
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
                Ready to Start Your Solar Project?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join our growing list of satisfied customers and make the switch to clean, renewable energy.
              </p>
              <button className="bg-secondary text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-300">
                Get Started Today
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Projects;
