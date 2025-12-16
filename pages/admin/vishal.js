import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Share2, LogOut, MessageSquare, Smartphone, Check } from 'lucide-react';

export default function AdminVishal() {
    const [guestName, setGuestName] = useState('');
    const [customGreeting, setCustomGreeting] = useState('');
    const [allowMultipleDevices, setAllowMultipleDevices] = useState(false);
    const [invites, setInvites] = useState([]);
    const router = useRouter();

    const fetchInvites = async () => {
        try {
            const res = await fetch('/api/admin/invites');
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            const data = await res.json();
            setInvites(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const generateLink = async () => {
        if (!guestName) return;

        try {
            const res = await fetch('/api/invite/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guestName, customGreeting, allowMultipleDevices })
            });

            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }

            const data = await res.json();

            if (data.token) {
                setGuestName('');
                setCustomGreeting('');
                setAllowMultipleDevices(false);
                fetchInvites(); // Refresh list
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleMultiDevice = async (token, currentValue) => {
        try {
            const res = await fetch(`/api/admin/invite/${token}/toggle-multidevice`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ allow: !currentValue })
            });
            if (res.ok) {
                fetchInvites();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const shareOnWhatsApp = (name, token) => {
        const link = `${window.location.origin}/invite/${token}`;
        const message = `Greetings ${name},%0A%0APlease join us for our House Warming Ceremony!%0A%0AOpen your personal invite here:%0A${link}%0A%0APlease note: This link is unique to you and can only be opened once.`;
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    const copyLink = (token) => {
        const link = `${window.location.origin}/invite/${token}`;
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <Head>
                <title>Admin - Vishal</title>
            </Head>

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Invite Manager</h1>
                    <Button variant="outline" onClick={handleLogout} className="flex gap-2">
                        <LogOut size={16} /> Logout
                    </Button>
                </div>

                <Card className="mb-12">
                    <CardHeader>
                        <CardTitle>Create New Invite</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                placeholder="Guest Name"
                            />
                            <Input
                                value={customGreeting}
                                onChange={(e) => setCustomGreeting(e.target.value)}
                                placeholder="Custom Greeting (Optional)"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant={allowMultipleDevices ? "default" : "outline"}
                                onClick={() => setAllowMultipleDevices(!allowMultipleDevices)}
                                className={`flex items-center gap-2 ${allowMultipleDevices ? 'bg-blue-600' : ''}`}
                            >
                                <Smartphone size={16} />
                                {allowMultipleDevices ? 'Multi-Device Enabled' : 'Allow Multi-Device'}
                            </Button>
                        </div>
                        <Button onClick={generateLink} className="w-full">
                            Generate Invite
                        </Button>
                    </CardContent>
                </Card>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Invites ({invites.length})</h2>

                <div className="grid gap-6">
                    {invites.map((invite) => (
                        <Card key={invite._id} className="overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
                                <div>
                                    <h3 className="font-bold text-lg text-primary">{invite.guestName}</h3>
                                    <p className="text-sm text-gray-500">Token: {invite.token}</p>
                                    <p className={`text-sm font-medium ${invite.isUsed ? 'text-green-600' : 'text-orange-500'}`}>
                                        Status: {invite.isUsed ? 'Visited' : 'Pending'}
                                    </p>
                                    <div className="mt-2">
                                        <Button
                                            size="sm"
                                            variant={invite.allowMultipleDevices ? "default" : "outline"}
                                            onClick={() => toggleMultiDevice(invite.token, invite.allowMultipleDevices)}
                                            className={`gap-2 h-8 text-xs ${invite.allowMultipleDevices ? 'bg-blue-600' : 'text-gray-600'}`}
                                        >
                                            <Smartphone size={14} />
                                            {invite.allowMultipleDevices ? 'Multi-Device ON' : 'Single Device Only'}
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => copyLink(invite.token)}
                                        className="flex gap-2"
                                    >
                                        <Copy size={16} /> Copy
                                    </Button>
                                    <Button
                                        onClick={() => shareOnWhatsApp(invite.guestName, invite.token)}
                                        className="flex gap-2 bg-green-600 hover:bg-green-700"
                                    >
                                        <Share2 size={16} /> Share
                                    </Button>
                                </div>
                            </div>

                            {/* Blessings Section */}
                            {invite.blessings && invite.blessings.length > 0 && (
                                <div className="bg-gray-50 p-4 border-t">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <MessageSquare size={16} /> Blessings Received ({invite.blessings.length})
                                    </h4>
                                    <div className="space-y-3">
                                        {invite.blessings.map((blessing, idx) => (
                                            <div key={idx} className="bg-white p-3 rounded border text-sm">
                                                <p className="text-gray-800 italic">"{blessing.message}"</p>
                                                <p className="text-gray-500 text-xs mt-1">- {blessing.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
