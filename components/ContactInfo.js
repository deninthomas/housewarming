import { MapPin, Phone, Calendar } from 'lucide-react';

export default function ContactInfo() {
    return (
        <section className="py-12 px-4 bg-white text-center">
            <h2 className="text-2xl font-bold text-primary mb-8">Event Details</h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-4">
                        <Calendar size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Date & Time</h3>
                    <p className="text-gray-600">December 21, 2025</p>
                    <p className="text-gray-600">06:00 PM Onwards</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-4">
                        <MapPin size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Venue</h3>
                    <p className="text-gray-600">Olive Ourania, Flat 10 D</p>
                    <p className="text-gray-600">Old NH17, Amrita Nagar, Edappally</p>
                    <p className="text-gray-600">Ernakulam, Kerala 682041</p>
                    <a
                        href="https://maps.app.goo.gl/FCveaXBEMDZZKymB6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm mt-2 hover:underline"
                    >
                        Get Directions
                    </a>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-4">
                        <Phone size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Contact</h3>
                    <p className="text-gray-600">Vishal: +91 9562436702</p>
                    <p className="text-gray-600">Family: +91 8848152478</p>
                </div>
            </div>
        </section>
    );
}
