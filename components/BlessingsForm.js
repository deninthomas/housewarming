import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle, Send, Heart, Star } from 'react-feather';

export default function BlessingsForm({ token, onBlessingSubmitted }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message || isSubmitting) return;

        setIsSubmitting(true);
        try {
            // Use different API endpoint based on whether token exists
            const endpoint = token ? '/api/blessing' : '/api/general-blessing';
            const body = token 
                ? { token, name, message }
                : { name, message };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                setSubmitted(true);
                if (onBlessingSubmitted) onBlessingSubmitted();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative text-center py-10 px-6"
                    >
                        {/* Floating hearts */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-gold"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: '50%',
                                }}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ 
                                    y: [-20, -60],
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                            >
                                <Heart className="h-4 w-4" fill="currentColor" />
                            </motion.div>
                        ))}

                        {/* Success icon */}
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-light to-gold mb-6"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Star className="h-10 w-10 text-white" fill="currentColor" />
                        </motion.div>

                        <motion.h3
                            className="text-2xl font-serif font-bold text-gray-800 mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Thank You!
                        </motion.h3>
                        <motion.p
                            className="text-gray-600 font-serif"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Your warm wishes mean the world to us ✨
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        onSubmit={handleSubmit} 
                        className="space-y-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Name input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gold" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gold-light rounded-xl focus:ring-2 focus:ring-gold focus:border-gold focus:outline-none transition-all bg-white/80"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Message input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                                    <MessageCircle className="h-4 w-4 text-gold" />
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gold-light rounded-xl focus:ring-2 focus:ring-gold focus:border-gold focus:outline-none transition-all h-32 resize-none bg-white/80"
                                    placeholder="Share your blessings and warm wishes..."
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Submit button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span>Send</span>
                                    </>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Subtle hint */}
                        <motion.p
                            className="text-center text-xs text-gray-400 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Your message will be shared with the family 💝
                        </motion.p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
