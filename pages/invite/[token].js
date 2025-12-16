import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import LottieHero from '../../components/LottieHero';
import Countdown from '../../components/Countdown';
import PhotoGallery from '../../components/PhotoGallery';
import BlessingsForm from '../../components/BlessingsForm';
import ContactInfo from '../../components/ContactInfo';
import HeroSlider from '../../components/HeroSlider';
import SplashScreen from '../../components/SplashScreen';

export default function InvitePage() {
    const router = useRouter();
    const { token } = router.query;
    const [loading, setLoading] = useState(true);
    const [inviteData, setInviteData] = useState(null);
    const [showSplash, setShowSplash] = useState(true);

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

    const refreshBlessings = async () => {
        try {
            const res = await fetch(`/api/invite/${token}`);
            if (res.ok) {
                const data = await res.json();
                setInviteData(prev => ({ ...prev, blessings: data.blessings }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

            <div className="min-h-screen bg-gray-50 font-sans">
                <Head>
                    <title>House Warming Ceremony</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: showSplash ? 3.5 : 0 }}
                    className="max-w-md mx-auto bg-white shadow-xl overflow-hidden md:max-w-2xl md:rounded-2xl md:my-8"
                >
                    {/* Hero Section */}
                    <HeroSlider />

                    <div className="px-6 py-8 text-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-primary mb-2"
                        >
                            House Warming Ceremony
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-gray-600 mb-4"
                        >
                            Greetings, {inviteData.name}!
                        </motion.p>

                        {inviteData.customGreeting && (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-blue-50 p-4 rounded-lg mb-8 italic text-blue-800"
                            >
                                "{inviteData.customGreeting}"
                            </motion.div>
                        )}

                        <Countdown targetDate="2025-12-21T10:00:00" />
                    </div>

                    <PhotoGallery />

                    <ContactInfo />

                    <BlessingsForm token={token} />

                    <footer className="bg-primary text-white py-6 text-center text-sm">
                        <p>&copy; 2025 Vishal & Family</p>
                        <p className="mt-1 opacity-75">We await your presence</p>
                    </footer>
                </motion.div>
            </div>
        </>
    );
}
