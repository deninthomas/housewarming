import { motion } from 'framer-motion';

const photos = [
    '/uploads/house.jpg',
    '/uploads/living.jpg',
    '/uploads/kitchen.jpg',
    '/uploads/puja.jpg'
];

export default function PhotoGallery() {
    return (
        <section className="py-12 px-4 bg-white">
            <h2 className="text-2xl font-bold text-center text-gold-dark mb-8">Our New Home</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {photos.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-xl shadow-md"
                    >
                        <img
                            src={src}
                            alt={`House Photo ${index + 1}`}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
