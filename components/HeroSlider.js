import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/uploads/house.jpg',
    '/uploads/living.jpg',
    '/uploads/kitchen.jpg',
    '/uploads/puja.jpg'
];

export default function HeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt="House Slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {/* Lottie or Text can go here if needed, but keeping it clean for now */}
            </div>
        </div>
    );
}
