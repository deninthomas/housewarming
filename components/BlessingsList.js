import { motion } from 'framer-motion';

export default function BlessingsList({ blessings }) {
    if (!blessings || blessings.length === 0) return null;

    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-primary mb-8">Warm Wishes</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blessings.map((blessing, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-secondary/20 p-6 rounded-xl relative"
                        >
                            <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif">"</div>
                            <p className="text-gray-700 italic mb-4 relative z-10">{blessing.message}</p>
                            <p className="text-primary font-semibold text-right">- {blessing.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
