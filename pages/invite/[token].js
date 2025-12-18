import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, Phone, Home, ArrowRight, Calendar, Heart, Star, ChevronDown } from 'react-feather';
import BlessingsForm from '../../components/BlessingsForm';

// Scroll animation variants
const scrollVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }
};

// Stagger container for children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Section wrapper with scroll animations
const ScrollSection = ({ children, className, variant = "fadeUp", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: scrollVariants[variant].hidden,
        visible: {
          ...scrollVariants[variant].visible,
          transition: { ...scrollVariants[variant].visible.transition, delay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax wrapper component
const ParallaxSection = ({ children, className, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Event details
const eventDetails = {
  date: 'December 21, 2025',
  time: '5:00 PM Onwards',
  venue: 'Olive Ourania, Flat 10 D',
  address: 'Old NH17, Amrita Nagar, Edappally',
  city: 'Ernakulam, Kerala 682041',
  phone1: '+91 9562436702',
  phone1Name: 'Vishal Sebastian',
  phone2: '+91 8848152478',
  phone2Name: 'Family',
  mapLink: 'https://maps.app.goo.gl/FCveaXBEMDZZKymB6'
};

// Carousel images
const carouselImages = [
  { src: '/uploads/building.jpg', alt: 'Olive Ourania Building' },
  { src: '/uploads/living.jpg', alt: 'Living Room' },
  { src: '/uploads/pool.jpg', alt: 'Swimming Pool' },
];

// Splash Screen Component - Simple & Elegant
const SplashScreen = ({ onComplete, guestName }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gold-light via-sand-light to-gold overflow-hidden"
        >
          {/* Soft background blurs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-dark/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          
          {/* Floating golden stars */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: 12 + Math.random() * 10,
                color: '#d4af37',
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.div>
          ))}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center p-8 relative z-10"
          >
            {/* Welcome message with guest name */}
            <div className="mb-6">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-5xl md:text-7xl font-script text-gold-dark drop-shadow-sm block py-2"
              >
                Welcome, {guestName}!
              </motion.span>
            </div>

            {/* Animated divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="w-20 h-0.5 bg-gold-dark/50 mx-auto mb-6"
            />

            {/* Event card - Fade in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-white/60 backdrop-blur-sm py-4 px-8 rounded-xl border border-white/50 shadow-lg inline-block"
            >
              <h1 className="text-2xl md:text-4xl font-serif text-gray-800 tracking-wide uppercase">
                House Warming Ceremony
              </h1>
              <div className="w-16 h-0.5 bg-gold-dark mx-auto mt-3" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-6 text-xl text-gray-700 font-serif italic"
            >
              You are cordially invited
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Golden stars floating component - for whole page
const GoldenStars = ({ count = 15 }) => {
  const stars = [...Array(count)].map((_, i) => ({
    id: i,
    size: 12 + Math.random() * 8,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 6,
    delay: Math.random() * 6,
    swayAmount: 15 + Math.random() * 20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: -20,
            fontSize: s.size,
            color: '#d4af37',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
          }}
          animate={{
            y: ['0%', '800%'],
            x: [0, s.swayAmount, -s.swayAmount, 0],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "linear",
            delay: s.delay,
            times: [0, 0.1, 0.9, 1],
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

// Festive sparkles for Christmas section
const FestiveSparkles = ({ count = 15 }) => {
  const sparkles = [...Array(count)].map((_, i) => ({
    id: i,
    size: 14 + Math.random() * 10,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: s.size,
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.7))',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

// Christmas lights
const ChristmasLights = () => {
  const colors = ['#d4af37', '#e8c547', '#c9a227', '#deb841'];
  
  return (
    <>
      {/* Top string of lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className="flex flex-col items-center"
          >
            <div className="w-px h-3 bg-gold-dark/40" />
            <motion.div
              className="w-3 h-4 rounded-full"
              style={{
                backgroundColor: colors[i % colors.length],
                boxShadow: `0 0 8px ${colors[i % colors.length]}, 0 0 15px ${colors[i % colors.length]}50`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
      {/* Bottom string of lights */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className="flex flex-col items-center"
          >
            <motion.div
              className="w-3 h-4 rounded-full"
              style={{
                backgroundColor: colors[(i + 2) % colors.length],
                boxShadow: `0 0 8px ${colors[(i + 2) % colors.length]}, 0 0 15px ${colors[(i + 2) % colors.length]}50`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15 + 0.5,
                ease: "easeInOut",
              }}
            />
            <div className="w-px h-3 bg-gold-dark/40" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

// Countdown component
const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative group cursor-default">
        {/* Hover glow */}
        <div className="absolute -inset-2 bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Main card */}
        <div className="relative w-16 h-20 sm:w-24 sm:h-28 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gold-light/40 flex items-center justify-center overflow-hidden group-hover:border-gold/60 transition-colors duration-300">
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gold-light/10 to-transparent" />

          {/* Number */}
          <span className="relative text-3xl sm:text-5xl font-bold text-gold-dark tabular-nums">
            {String(value).padStart(2, '0')}
          </span>

          {/* Bottom shadow line */}
          <div className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </div>

      {/* Label */}
      <span className="mt-2 sm:mt-3 text-[10px] sm:text-sm font-semibold text-gold-dark uppercase tracking-[0.1em] sm:tracking-[0.15em]">
        {label}
      </span>
    </div>
  );

  const Colon = () => (
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mx-1 sm:mx-4 mt-6 sm:mt-10">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-dark/60" />
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-dark/60" />
    </div>
  );

  return (
    <motion.div
      className="relative py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center items-start">
        <TimeBlock value={timeLeft.days} label="Days" />
        <Colon />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <Colon />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <Colon />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

// Animated text reveal component
const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');

  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * 0.1,
              ease: [0.33, 1, 0.68, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Image Carousel with Coming Soon overlay
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  return (
    <motion.div
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Border glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-dark to-gold rounded-2xl opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500" />

      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold-light">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentIndex].src})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Coming Soon Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative bg-white/90 backdrop-blur-md px-8 py-4 rounded-xl border border-gold shadow-xl">
              <motion.p
                className="text-gold-dark text-sm uppercase tracking-[0.2em] mb-1 font-medium"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Stay Tuned ✨
              </motion.p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">Coming Soon</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-gold w-6'
                : 'bg-white/60 w-2 hover:bg-white'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Hero Section Component
const HeroSection = ({ guestName, customGreeting }) => {
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/uploads/building.jpg')` }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? 'linear-gradient(to bottom, rgba(245, 206, 106, 0.75), rgba(244, 235, 208, 0.85), rgba(253, 252, 245, 1))'
              : 'linear-gradient(to bottom, rgba(245, 206, 106, 0.8), rgba(244, 235, 208, 0.9), rgba(253, 252, 245, 1))'
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <GoldenStars count={10} />

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          className="mb-5"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          <motion.div
            className="relative inline-block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute -inset-3 bg-gold/30 rounded-full blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-br from-gold to-gold-dark p-3 sm:p-4 rounded-xl shadow-lg">
              <Home className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={1.5} />
            </div>
          </motion.div>
        </motion.div>

        {/* Personalized greeting */}
        <motion.p
          className="text-2xl sm:text-3xl text-gold-dark font-script mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Dear {guestName}
        </motion.p>

        {/* Host name */}
        <motion.p
          className="text-2xl sm:text-3xl font-script text-gold-dark mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Vishal Sebastian & Family
        </motion.p>

        {/* Welcome text */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-gray-600 text-lg sm:text-xl font-script block mb-3"
        >
          welcomes you to our
        </motion.span>

        {/* Main title */}
        <motion.div
          className="mb-4 relative"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.65, type: "spring", stiffness: 100 }}
        >
          {/* Subtle glow behind title */}
          <motion.div
            className="absolute inset-0 bg-gold/20 blur-3xl rounded-full"
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.h1
            className="relative text-4xl sm:text-6xl md:text-7xl font-script leading-none"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(212, 175, 55, 0)",
                "0 0 40px rgba(212, 175, 55, 0.3)",
                "0 0 20px rgba(212, 175, 55, 0)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-clip-text text-transparent drop-shadow-sm">
              House Warming
            </span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3"
          >
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold-dark" />
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold-dark" />
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold-dark" />
          </motion.div>
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-700 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            Ceremony
          </motion.span>
        </motion.div>

        {/* Venue name */}
        <motion.p
          className="text-xl sm:text-2xl font-script text-gray-600 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Olive Ourania, <span className="text-gold-dark font-bold">10D</span>
        </motion.p>

        {customGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/70 backdrop-blur-sm border border-gold-light p-4 rounded-xl mb-6 max-w-lg mx-auto shadow-lg"
          >
            <p className="text-gold-dark font-serif italic text-lg">"{customGreeting}"</p>
          </motion.div>
        )}

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          We're thrilled to share our joy with you as we step into our new home
        </motion.p>

        {/* Date badge */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-gold to-gold-dark px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
              <span className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">{eventDetails.date}</span>
              <span className="text-white/60">•</span>
              <span className="text-sm sm:text-base text-white/90 whitespace-nowrap">{eventDetails.time}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Get Directions */}
        <motion.a
          href={eventDetails.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold-dark hover:text-white font-semibold text-sm sm:text-base transition-all px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white hover:bg-gold-dark border-2 border-gold/50 hover:border-gold-dark shadow-md hover:shadow-lg mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Get Directions</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div 
            className="flex flex-col items-center cursor-pointer text-gold-dark/50 hover:text-gold-dark transition-colors"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Info Card Component
const InfoCard = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-gold to-gold-dark rounded-xl sm:rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gold-light shadow-lg h-full">
      <motion.div
        className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold-light flex items-center justify-center mb-3 sm:mb-5"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold-dark" />
      </motion.div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{title}</h3>
      {children}
    </div>
  </motion.div>
);

export default function InvitePage() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!token) return;

    const validateInvite = async () => {
      try {
        const res = await fetch(`/api/invite/${token}`);
        if (!res.ok) {
          router.replace('/403');
          return;
        }
        const data = await res.json();
        setInviteData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.replace('/403');
      }
    };

    validateInvite();
  }, [token, router]);

  const countdownDate = new Date('2025-12-21T17:00:00');

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-dark" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-light via-sand-light to-gold-light">
      <Head>
        <title>House Warming Ceremony | You're Invited!</title>
        <meta name="description" content="Join us as we celebrate our new home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} guestName={inviteData?.name || 'Guest'} />
        ) : (
          <motion.div 
            key="main"
            className="min-h-screen bg-sand-light text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <main>
              {/* Hero Section with personalized greeting */}
              <HeroSection guestName={inviteData?.name} customGreeting={inviteData?.customGreeting} />

          {/* Spacer with subtle decoration */}
          <div className="relative py-8 bg-gradient-to-b from-sand-light to-gold-light/30">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
              <Star className="w-4 h-4 text-gold/50" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          {/* Elegant Christmas Banner */}
          <section className="relative py-16 bg-gradient-to-br from-gold-light via-sand-light to-gold-light overflow-hidden">
            {/* Festive sparkles */}
            <FestiveSparkles count={12} />
            
            {/* Christmas lights */}
            <ChristmasLights />
            
            {/* Subtle gold accent lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 text-gold-dark/40 text-2xl">✦</div>
            <div className="absolute top-4 right-4 text-gold-dark/40 text-2xl">✦</div>
            <div className="absolute bottom-4 left-4 text-gold-dark/40 text-2xl">✦</div>
            <div className="absolute bottom-4 right-4 text-gold-dark/40 text-2xl">✦</div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                {/* Elegant star */}
                <motion.div 
                  className="mb-6"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))' }}>⭐</span>
                </motion.div>

                {/* Main greeting */}
                <motion.h3
                  className="text-4xl sm:text-5xl font-script mb-2"
                  style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Advance Christmas
                </motion.h3>
                
                <motion.span
                  className="text-2xl sm:text-3xl font-script text-gold-dark/80 block mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Wishes ✨
                </motion.span>

                {/* Decorative line */}
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-dark" />
                  <span className="text-gold-dark">🎄</span>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-dark" />
                </motion.div>

                {/* Message */}
                <motion.p
                  className="text-gray-700 text-lg sm:text-xl font-serif italic max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Wishing you a joyful Christmas filled with love, 
                  laughter, and the warmth of family & friends
                </motion.p>

                {/* Year badge */}
                <motion.div
                  className="mt-6 px-6 py-2 rounded-full border border-gold-dark/50 bg-white/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-gold-dark text-sm tracking-[0.2em] uppercase font-medium">
                    🎁 Christmas 2025 🎁
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="relative py-20 bg-white overflow-hidden">

            <div className="relative z-10 max-w-5xl mx-auto px-4">
              <ScrollSection variant="fadeDown" className="text-center mb-12">
                <motion.span
                  className="text-gold-dark text-sm uppercase tracking-[0.2em] mb-4 block font-medium"
                  initial={{ opacity: 0, letterSpacing: '0' }}
                  whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  Mark Your Calendar
                </motion.span>
                <motion.h2
                  className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Counting Down to the Big Day
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </ScrollSection>

              <ScrollSection variant="scaleUp" delay={0.3}>
                <Countdown targetDate={countdownDate} />
              </ScrollSection>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section className="relative py-20 bg-sand-light overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
              <ScrollSection variant="fadeUp" className="text-center mb-12">
                <motion.span
                  className="text-gold-dark text-sm uppercase tracking-[0.2em] mb-4 block font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Sneak Peek
                </motion.span>
                <motion.h2
                  className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Our New Home
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </ScrollSection>

              <ScrollSection variant="rotateIn" delay={0.2}>
                <ParallaxSection speed={0.2}>
                  <ImageCarousel images={carouselImages} />
                </ParallaxSection>
              </ScrollSection>

              <ScrollSection variant="fadeUp" delay={0.4}>
                <p className="text-center text-gray-500 mt-6 text-lg font-serif italic">
                  More surprises await when you visit! 🎉
                </p>
              </ScrollSection>
            </div>
          </section>

          {/* Venue & Contact Section */}
          <section className="relative py-20 bg-white overflow-hidden">
            <GoldenStars count={10} />

            <div className="relative z-10 max-w-5xl mx-auto px-4">
              <ScrollSection variant="fadeUp" className="text-center mb-12">
                <motion.span
                  className="text-gold-dark text-sm uppercase tracking-[0.2em] mb-4 block font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Event Details
                </motion.span>
                <motion.h2
                  className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Venue & Contact
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </ScrollSection>

              <motion.div
                className="grid md:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                {/* Date & Time Card */}
                <motion.div variants={scrollVariants.fadeLeft} className="h-full">
                  <InfoCard icon={Calendar} title="Date & Time" delay={0}>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">{eventDetails.date}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{eventDetails.time}</p>
                    <p className="text-gray-500 text-sm">Till 07:00 PM</p>
                  </InfoCard>
                </motion.div>

                {/* Venue Card */}
                <motion.div variants={scrollVariants.fadeUp} className="h-full">
                  <InfoCard icon={MapPin} title="Venue" delay={0}>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">{eventDetails.venue}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{eventDetails.address}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{eventDetails.city}</p>
                    <motion.a
                      href={eventDetails.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gold-dark hover:text-gold transition-colors font-medium mt-2 sm:mt-3 text-xs sm:text-sm"
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      Get Directions
                      <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.a>
                  </InfoCard>
                </motion.div>

                {/* Contact Card */}
                <motion.div variants={scrollVariants.fadeRight} className="h-full">
                  <InfoCard icon={Phone} title="Contact" delay={0}>
                    <div className="space-y-2 sm:space-y-3">
                      <motion.a
                        href={`tel:${eventDetails.phone1.replace(/\s/g, '')}`}
                        className="block text-gray-600 hover:text-gold-dark transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium block text-xs sm:text-sm text-gray-500">{eventDetails.phone1Name}</span>
                        <span className="text-sm sm:text-base">{eventDetails.phone1}</span>
                      </motion.a>
                      <motion.a
                        href={`tel:${eventDetails.phone2.replace(/\s/g, '')}`}
                        className="block text-gray-600 hover:text-gold-dark transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium block text-xs sm:text-sm text-gray-500">{eventDetails.phone2Name}</span>
                        <span className="text-sm sm:text-base">{eventDetails.phone2}</span>
                      </motion.a>
                    </div>
                  </InfoCard>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Blessings Form Section */}
          <section className="relative py-20 bg-sand-light overflow-hidden">
            <GoldenStars count={10} />

            <div className="relative z-10 max-w-2xl mx-auto px-4">
              <ScrollSection variant="fadeUp" className="text-center mb-12">
                <motion.span
                  className="text-gold-dark text-sm uppercase tracking-[0.2em] mb-4 block font-medium"
                >
                  Share Your Wishes
                </motion.span>
                <motion.h2
                  className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4"
                >
                  Send Your Blessings
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </ScrollSection>

              <ScrollSection variant="scaleUp" delay={0.2}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gold-light/50 p-6 sm:p-8">
                  <BlessingsForm token={token} />
                </div>
              </ScrollSection>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative py-24 bg-gradient-to-br from-gold-light via-sand-light to-gold-light overflow-hidden">
            <GoldenStars count={10} />

            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
              <ScrollSection variant="scaleUp">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6"
                >
                  <Heart className="h-14 w-14 text-gold-dark mx-auto drop-shadow-lg" fill="currentColor" />
                </motion.div>
              </ScrollSection>

              <ScrollSection variant="fadeUp" delay={0.2}>
                <motion.h2
                  className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4"
                >
                  We Can't Wait to See You, {inviteData?.name}!
                </motion.h2>
              </ScrollSection>

              <ScrollSection variant="fadeUp" delay={0.4}>
                <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 font-serif">
                  Your presence would make our celebration complete.
                  Let's create beautiful memories together!
                </p>
              </ScrollSection>

              <ScrollSection variant="scaleUp" delay={0.6}>
                <motion.div
                  className="inline-flex items-center space-x-3 text-gold-dark bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(184, 144, 40, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-5 w-5" fill="currentColor" />
                  </motion.div>
                  <span className="text-lg font-medium font-serif">See you soon!</span>
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-5 w-5" fill="currentColor" />
                  </motion.div>
                </motion.div>
              </ScrollSection>
            </div>
          </section>
        </main>

        {/* Footer */}
        <motion.footer
          className="bg-gold text-white py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="flex justify-center space-x-4 mb-4"
                variants={scrollVariants.fadeUp}
              >
                <motion.a
                  href={`tel:${eventDetails.phone1.replace(/\s/g, '')}`}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.15, rotate: 10, backgroundColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={eventDetails.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.15, rotate: -10, backgroundColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="h-5 w-5" />
                </motion.a>
              </motion.div>

              <motion.p
                className="text-white/90 text-sm"
                variants={scrollVariants.fadeUp}
              >
                © 2025 Vishal Sebastian & Family
              </motion.p>
              <motion.p
                className="mt-1 text-white/70 text-sm"
                variants={scrollVariants.fadeUp}
              >
                We await your presence
              </motion.p>
            </motion.div>
          </div>
        </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
