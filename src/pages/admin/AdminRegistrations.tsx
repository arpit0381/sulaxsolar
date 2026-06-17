import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { Button } from '@/components/ui/button';
import { Trash2, User, Phone, Calendar, Search, ShieldCheck, Box, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function AdminRegistrations() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        const { data, error } = await supabase.from('product_registrations').select('*').order('created_at', { ascending: false });
        if (error) {
            toast({ title: 'Error fetching registrations', description: error.message, variant: 'destructive' });
        } else {
            setRegistrations(data || []);
        }
        setLoading(false);
    };

    const deleteRegistration = async (id: string) => {
        if (!confirm('Are you sure you want to delete this registration?')) return;

        const { error } = await supabase.from('product_registrations').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting registration', description: error.message, variant: 'destructive' });
        } else {
            setRegistrations(registrations.filter(r => r.id !== id));
            toast({ title: 'Registration deleted successfully' });
        }
    };

    if (loading) return <div>Loading registrations...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        Product Registrations
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View and manage customer product warranty registrations.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {registrations.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg">No registrations found.</p>
                        <p className="text-sm mt-1">When customers register products on the home page, they will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {registrations.map((reg) => (
                            <div key={reg.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        
                                        {/* Header Info */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 font-medium text-gray-900">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {reg.customer_name}
                                            </div>
                                            <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" onClick={() => window.location.href = `tel:${reg.phone}`}>
                                                <Phone className="w-4 h-4" />
                                                {reg.phone}
                                            </div>
                                            <div className="flex items-center gap-1.5 ml-auto text-xs">
                                                <Calendar className="w-4 h-4" />
                                                Registered: {format(new Date(reg.created_at), 'MMM dd, yyyy')}
                                            </div>
                                        </div>

                                        {/* Product Details Card */}
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase font-semibold">Product Name</span>
                                                    <div className="font-medium text-gray-900 flex items-center gap-2 mt-1">
                                                        <Box className="w-4 h-4 text-primary" />
                                                        {reg.product_name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase font-semibold">Capacity/Unit</span>
                                                    <div className="font-medium text-gray-900 mt-1">{reg.capacity}</div>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase font-semibold">Installation Date</span>
                                                    <div className="font-medium text-gray-900 mt-1">{reg.installation_date}</div>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase font-semibold">Google Rating</span>
                                                    <div className="font-medium mt-1 flex items-center gap-1">
                                                        {reg.google_rated ? (
                                                            <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Verified</span>
                                                        ) : (
                                                            <span className="text-gray-400">Not Verified</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Images */}
                                            {reg.images && reg.images.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <span className="text-xs text-gray-500 uppercase font-semibold block mb-2">Installation Images</span>
                                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                                        {reg.images.map((img: string, idx: number) => (
                                                            <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block shrink-0">
                                                                <img src={img} alt={`Installation ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg border border-gray-300 hover:opacity-80 transition-opacity" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2 shrink-0 justify-end">
                                        <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteRegistration(reg.id)}>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
