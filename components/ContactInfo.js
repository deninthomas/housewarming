import { MapPin, Phone, Calendar } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, children }) => (
    <div className="flex flex-col items-start p-8 bg-white rounded-2xl shadow-lg border border-gold-light/20 h-full min-h-[300px] w-full text-left transition-shadow hover:shadow-xl duration-300">
        <div className="w-14 h-14 bg-gold-light/20 rounded-full flex items-center justify-center text-gold-dark mb-6 shrink-0">
            <Icon size={28} />
        </div>
        <h3 className="font-bold text-xl mb-4 text-gray-900 shrink-0">{title}</h3>
        <div className="flex-1 flex flex-col w-full">
            {children}
        </div>
    </div>
);

export default function ContactInfo() {
    return (
        <section className="py-12 px-4 bg-white text-center">
            <h2 className="text-2xl font-bold text-gold-dark mb-8">Event Details</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {/* Date & Time */}
                <ContactCard icon={Calendar} title="Date & Time">
                    <p className="text-gray-600 font-medium text-lg">December 21, 2025</p>
                    <p className="text-gray-600 text-lg">05:00 PM Onwards</p>
                    <p className="text-gray-600 text-lg">Till 07:00 PM</p>
                </ContactCard>

                {/* Venue */}
                <ContactCard icon={MapPin} title="Venue">
                    <p className="text-gray-900 font-semibold text-lg mb-1">Olive Ourania, Flat 10 D</p>
                    <p className="text-gray-600">Old NH17, Amrita Nagar, Edappally</p>
                    <p className="text-gray-600 mb-4">Ernakulam, Kerala 682041</p>
                    <a
                        href="https://maps.app.goo.gl/FCveaXBEMDZZKymB6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-dark font-bold hover:underline inline-flex items-center gap-1 group mt-auto"
                    >
                        Get Directions
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </ContactCard>

                {/* Contact */}
                <ContactCard icon={Phone} title="Contact">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Vishal Sebastian</p>
                            <a href="tel:+919562436702" className="text-lg text-gray-800 hover:text-gold-dark transition-colors font-medium block">+91 9562436702</a>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Family</p>
                            <a href="tel:+918848152478" className="text-lg text-gray-800 hover:text-gold-dark transition-colors font-medium block">+91 8848152478</a>
                        </div>
                    </div>
                </ContactCard>
            </div>
        </section>
    );
}
