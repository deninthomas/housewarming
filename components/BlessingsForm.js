import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BlessingsForm({ token, onBlessingSubmitted }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message) return;

        try {
            const res = await fetch('/api/blessing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, name, message })
            });
            if (res.ok) {
                setSubmitted(true);
                if (onBlessingSubmitted) onBlessingSubmitted();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="py-12 px-4 bg-sand-light/50 border-t border-gold-light">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center text-gold-dark mb-6">Send Your Blessings</h2>

                {submitted ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-100 text-green-800 p-6 rounded-xl text-center"
                    >
                        <p className="font-semibold">Thank you for your warm wishes!</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gold-light">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gold focus:outline-none border-gray-300"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gold focus:outline-none h-32 border-gray-300"
                                placeholder="Write your blessings..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gold text-white rounded-md font-semibold hover:bg-gold-dark transition"
                        >
                            Send Blessings
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
