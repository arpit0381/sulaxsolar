import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040d0f]"
    >
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Outer glowing effect behind the logo */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-primary/20 scale-150"></div>
        
        {/* Actual Logo */}
        <img
          src="/lff.png"
          alt="Sulax Solar Logo"
          className="h-24 w-auto drop-shadow-2xl relative z-10"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
