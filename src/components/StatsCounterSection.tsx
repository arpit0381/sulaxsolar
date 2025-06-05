
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsCounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      number: 10,
      suffix: '+',
      label: 'Years in Solar',
      description: 'Proven expertise in solar energy solutions'
    },
    {
      number: 150,
      suffix: '+',
      label: 'Residential Projects',
      description: 'Homes powered by clean energy'
    },
    {
      number: 75,
      suffix: '+',
      label: 'Commercial Sites',
      description: 'Businesses running on solar power'
    },
    {
      number: 1.2,
      suffix: '+ MW',
      label: 'Installed Capacity',
      description: 'Total solar power generation'
    },
    {
      number: 200,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied customers nationwide'
    },
    {
      number: 95,
      suffix: '%',
      label: 'Customer Satisfaction',
      description: 'Excellence in service delivery'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className="text-secondary">Impact</span> in Numbers
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            See how we're making a difference in the solar energy landscape with our 
            commitment to quality, sustainability, and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                  {isVisible && (
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      delay={index * 0.2}
                      decimals={stat.number < 10 ? 1 : 0}
                    />
                  )}
                  {stat.suffix}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm opacity-80">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-secondary">
              Environmental Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {isVisible && <CountUp end={850} duration={2.5} />}+ tons
                </div>
                <div className="text-sm opacity-80">CO₂ Emissions Reduced</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {isVisible && <CountUp end={1500} duration={2.5} />}+ MWh
                </div>
                <div className="text-sm opacity-80">Clean Energy Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {isVisible && <CountUp end={50} duration={2.5} />}+
                </div>
                <div className="text-sm opacity-80">Trees Equivalent Saved</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounterSection;
