import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../backend/supabase';

// ─── Slide data removed (now dynamic) ───────────────────────────────────────────────────────────────

const SLIDE_DURATION = 6000; // ms per slide

// ─── Text animation variants ──────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: 'easeIn' } },
};



// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startTimers = useCallback(() => {
    stopTimers();
    setProgress(0);

    // Fine-grained progress bar (updates every ~50ms)
    const tick = SLIDE_DURATION / 100;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, tick);

    // Only set interval if slides are loaded
    if (slides.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setProgress(0);
      }, SLIDE_DURATION);
    }
  }, [stopTimers, slides.length]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase.from('hero_slides').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) {
        setSlides(data);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      startTimers();
    }
    return stopTimers;
  }, [startTimers, stopTimers, slides]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      startTimers();
    },
    [startTimers]
  );

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    startTimers();
  }, [startTimers]);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
    startTimers();
  }, [startTimers]);

  const slide = slides.length > 0 ? slides[current] : null;

  if (slides.length === 0) {
    return <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-900"></section>;
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background images: smooth crossfade + Ken Burns zoom ── */}
      <AnimatePresence>
        {slides.map((s, i) =>
          i === current ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              {/* Ken Burns: slow zoom-in over the slide duration */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                style={{ backgroundImage: `url('${s.image_url}')` }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: 'linear' }}
              />
              {/* Neutral dark overlay — NO green, just depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/30"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              left: `${(i * 23 + 5) % 95}%`,
              top: `${(i * 17 + 8) % 85}%`,
            }}
            animate={{ y: [0, -60 - i * 3, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Arrow buttons ── */}
      {(['left', 'right'] as const).map((side) => (
        <button
          key={side}
          onClick={side === 'left' ? prev : next}
          aria-label={side === 'left' ? 'Previous slide' : 'Next slide'}
          className={`absolute ${side === 'left' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} top-1/2 -translate-y-1/2 z-20
            w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center
            rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white
            hover:bg-secondary hover:border-secondary hover:text-gray-900
            transition-all duration-300 hover:scale-110 shadow-lg`}
        >
          {side === 'left' ? (
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      ))}

      {/* ── Main text content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center w-full mt-16">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="flex flex-col items-center space-y-4 sm:space-y-6">


            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              {slide?.title}{' '}
              <span className="text-secondary drop-shadow-[0_2px_12px_rgba(245,197,24,0.5)]">
                {slide?.title_accent}
              </span>
              <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-gray-100/90">
                {slide?.subtitle}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {slide?.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              custom={0.45}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
            >
              <Link
                to={slide?.cta1_to || '/contact'}
                className="relative overflow-hidden group bg-secondary text-gray-900 font-bold
                  px-8 py-4 rounded-full text-base sm:text-lg
                  hover:shadow-[0_0_30px_rgba(245,197,24,0.5)] transition-all duration-300 hover:scale-105"
              >
                {/* shine sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  transition-transform duration-500 ease-in-out" />
                <span className="relative">{slide?.cta1_label}</span>
              </Link>
              <Link
                to={slide?.cta2_to || '/services'}
                className="border-2 border-white/50 text-white px-8 py-4 rounded-full
                  text-base sm:text-lg font-semibold backdrop-blur-sm
                  hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
              >
                {slide?.cta2_label}
              </Link>
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20"
        >
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '1000+', label: 'Residential Projects' },
            { number: '100+', label: 'Commercial Sites' },
            { number: '2000+', label: 'Happy Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-secondary mb-0.5 drop-shadow-[0_2px_8px_rgba(245,197,24,0.4)]">
                {stat.number}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom controls: dots + progress bar ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Dot indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative flex items-center justify-center"
            >
              {i === current ? (
                <motion.div
                  layoutId="active-dot"
                  className="w-8 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(245,197,24,0.7)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white/35 hover:bg-white/65 transition-colors duration-200" />
              )}
            </button>
          ))}
        </div>

        {/* Auto-play progress bar */}
        <div className="w-40 h-0.5 rounded-full bg-white/20 overflow-hidden">
          <motion.div
            className="h-full bg-secondary rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
