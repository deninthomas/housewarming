import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-primary text-white"
                    onClick={() => setIsVisible(false)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-center p-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
                            You are Invited!
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90">
                            To Our House Warming Ceremony
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
