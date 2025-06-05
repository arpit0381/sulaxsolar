
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const galleryImages = [
    {
      id: 1,
      src: 'g1.png',
      category: 'residential',
      title: 'Residential Rooftop Installation',
      location: 'Kanpur, UP'
    },
    {
      id: 2,
      src: 'g2.png',
      category: 'commercial',
      title: 'Commercial Solar Farm',
      location: 'Lucknow, UP'
    },
    {
      id: 3,
      src: 'g3.png',
      category: 'installation',
      title: 'Panel Installation Process',
      location: 'Agra, UP'
    },
    {
      id: 4,
      src: 'g4.png',
      category: 'commercial',
      title: 'Ground Mounted System',
      location: 'Varanasi, UP'
    },
    {
      id: 5,
      src: 'g5.png',
      category: 'installation',
      title: 'EV Charging Station',
      location: 'Ghaziabad, UP'
    },
    {
      id: 6,
      src: 'g6.png',
      category: 'residential',
      title: 'Home Solar System',
      location: 'Meerut, UP'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'commercial',
      title: 'Industrial Installation',
      location: 'Noida, UP'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/8853503/pexels-photo-8853503.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'installation',
      title: 'Maintenance Work',
      location: 'Allahabad, UP'
    },
    {
      id: 9,
      src: 'g7.png',
      category: 'residential',
      title: 'Villa Solar Project',
      location: 'Bareilly, UP'
    }
  ];

  const filterCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'installation', label: 'Installations' }
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Gallery - Sulax Solar Project Showcase</title>
        <meta name="description" content="View our portfolio of successful solar installations across North India. Residential, commercial, and industrial solar projects by Sulax Solar." />
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
                Project <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our portfolio of successful solar installations across North India, 
                showcasing our expertise in residential, commercial, and industrial projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    filter === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold mb-1">{image.title}</h3>
                        <p className="text-sm opacity-90">{image.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Gallery;
