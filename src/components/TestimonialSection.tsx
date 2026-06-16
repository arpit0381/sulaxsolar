
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Manoj",
      location: "Kanpur, UP",
      stars: 5,
      quote: "Sulax Solar transformed my home into a self-powered unit. The team was super professional and the installation was seamless. My electricity bills have reduced by 90%!",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      project: "5kW Residential Solar"
    },
    {
      name: "Sameer",
      location: "Lucknow, UP",
      stars: 5,
      quote: "Affordable and eco-friendly. Their team guided me through the PM Suryaghar process effortlessly. The government subsidy made it even more attractive. Highly recommended!",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      project: "3kW Rooftop Solar"
    },
    {
      name: "Ayush Gupta",
      location: "Kanpur, UP",
      stars: 5,
      quote: "Outstanding Rooftop Solar solution! Our Home now runs on clean energy, reducing operational costs by 60%. Professional installation and excellent after-sales service.",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      project: "4kw,Rooftop Solar"
    },
    {
      name: "Barkha",
      location: "Kanpur, UP",
      stars: 4,
      quote: "Great experience with Sulax Solar. The team was knowledgeable and patient in explaining everything. Installation was quick and the system has been working flawlessly for 2 years.",
      image: "https://cdn-icons-png.flaticon.com/128/6997/6997662.png",
      project: "4kW Residential Solar"
    },
    {
      name: "Ajeet Pandey",
      location: "Kanpur, UP",
      stars: 5,
      quote: "As a real estate developer, we chose Sulax Solar for our premium housing project. They delivered high-quality solar solutions that added great value to our properties.",
      image: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      project: "25kW Residential Complex"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

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
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers who have 
            experienced the benefits of switching to solar energy with Sulax Solar.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
            >
              <div className="flex flex-col items-center text-center">
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-secondary fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Avatar and Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentIndex].location}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
