import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Trash2, 
    User, 
    Phone, 
    Calendar, 
    Search, 
    ShieldCheck, 
    Box, 
    CheckCircle, 
    Clock, 
    TrendingUp, 
    Copy, 
    Check, 
    FileSpreadsheet, 
    ArrowUpDown, 
    X, 
    ExternalLink 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function AdminRegistrations() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'unverified'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name-asc' | 'name-desc'>('newest');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    
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

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast({ title: 'Copied to clipboard', description: text });
        setTimeout(() => setCopiedId(null), 2000);
    };

    const exportToCSV = () => {
        if (registrations.length === 0) return;

        const headers = ['ID', 'Customer Name', 'Phone', 'Product Name', 'Capacity', 'Installation Date', 'Google Rated', 'Created At', 'Images'];
        
        const rows = registrations.map(reg => [
            reg.id,
            `"${(reg.customer_name || '').replace(/"/g, '""')}"`,
            `"${(reg.phone || '').replace(/"/g, '""')}"`,
            `"${(reg.product_name || '').replace(/"/g, '""')}"`,
            `"${(reg.capacity || '').replace(/"/g, '""')}"`,
            `"${(reg.installation_date || '').replace(/"/g, '""')}"`,
            reg.google_rated ? 'TRUE' : 'FALSE',
            reg.created_at,
            `"${(reg.images || []).join(', ')}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(e => e.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `product_registrations_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: 'Exported successfully', description: 'Registrations downloaded as CSV.' });
    };

    // Filter and Sort registrations
    const filteredAndSortedRegistrations = registrations
        .filter((reg) => {
            // Status filter
            if (filterStatus === 'verified' && !reg.google_rated) return false;
            if (filterStatus === 'unverified' && reg.google_rated) return false;

            // Search text filter
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                (reg.customer_name || '').toLowerCase().includes(q) ||
                (reg.phone || '').toLowerCase().includes(q) ||
                (reg.product_name || '').toLowerCase().includes(q) ||
                (reg.capacity || '').toLowerCase().includes(q) ||
                (reg.installation_date || '').toLowerCase().includes(q)
            );
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
            }
            if (sortBy === 'oldest') {
                return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
            }
            if (sortBy === 'name-asc') {
                return (a.customer_name || '').localeCompare(b.customer_name || '');
            }
            if (sortBy === 'name-desc') {
                return (b.customer_name || '').localeCompare(a.customer_name || '');
            }
            return 0;
        });

    // Stats calculations
    const totalCount = registrations.length;
    const verifiedCount = registrations.filter(r => r.google_rated).length;
    const unverifiedCount = totalCount - verifiedCount;
    const recentCount = registrations.filter((r) => {
        if (!r.created_at) return false;
        const diffTime = Math.abs(new Date().getTime() - new Date(r.created_at).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }).length;

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="flex justify-between items-end">
                    <div className="space-y-3">
                        <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
                        <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
                
                {/* Stats skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-xl border border-gray-200"></div>
                    ))}
                </div>

                {/* List skeleton */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-6 space-y-4">
                            <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
                            <div className="h-20 bg-gray-50 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        Product Registrations
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View, search, and manage customer product warranty registrations.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Box className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500 block">Total Registered</span>
                        <span className="text-2xl font-bold text-gray-900">{totalCount}</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500 block">Google Verified</span>
                        <span className="text-2xl font-bold text-gray-900">{verifiedCount}</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500 block">Not Verified</span>
                        <span className="text-2xl font-bold text-gray-900">{unverifiedCount}</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500 block">Recent (7 Days)</span>
                        <span className="text-2xl font-bold text-gray-900">{recentCount}</span>
                    </div>
                </div>
            </div>

            {/* Search and Filters Panel */}
            <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by customer, phone, product, capacity, date..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-10 py-2 w-full bg-gray-50/50 border-gray-200 rounded-lg focus:bg-white text-sm h-10"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Status Tabs */}
                    <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                filterStatus === 'all'
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus('verified')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                filterStatus === 'verified'
                                    ? 'bg-white text-green-600 shadow-sm border border-gray-100'
                                    : 'text-gray-500 hover:text-green-600'
                            }`}
                        >
                            Google Verified
                        </button>
                        <button
                            onClick={() => setFilterStatus('unverified')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                filterStatus === 'unverified'
                                    ? 'bg-white text-amber-600 shadow-sm border border-gray-100'
                                    : 'text-gray-500 hover:text-amber-600'
                            }`}
                        >
                            Not Verified
                        </button>
                    </div>

                    {/* Sorting Select */}
                    <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 text-xs text-gray-600 h-10">
                        <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-transparent focus:outline-none font-medium text-gray-700 cursor-pointer text-xs"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>
                    </div>

                    {/* CSV Exporter */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToCSV}
                        disabled={registrations.length === 0}
                        className="text-xs h-10 border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center gap-1.5 font-medium px-3 text-gray-700"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Found entries indicator */}
            <div className="flex justify-between items-center text-xs text-gray-500 px-1">
                <span>
                    Showing {filteredAndSortedRegistrations.length} of {totalCount} registrations
                </span>
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="text-primary hover:underline font-medium"
                    >
                        Clear search filter
                    </button>
                )}
            </div>

            {/* Registrations List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredAndSortedRegistrations.length === 0 ? (
                    <div className="p-16 text-center text-gray-500 flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-700">No registrations match your search</p>
                        <p className="text-sm mt-1 max-w-md">Try checking your spelling, clear active filters, or verify registrations exist in the system.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredAndSortedRegistrations.map((reg) => (
                            <div 
                                key={reg.id} 
                                className={`p-6 hover:bg-gray-50/50 transition-all duration-200 border-l-4 ${
                                    reg.google_rated ? 'border-l-green-500' : 'border-l-amber-500'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        
                                        {/* Header Info */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 font-semibold text-gray-900 bg-gray-100/80 px-2.5 py-1 rounded-md text-xs">
                                                <User className="w-3.5 h-3.5 text-gray-500" />
                                                <span>{reg.customer_name}</span>
                                                <button
                                                    onClick={() => copyToClipboard(reg.customer_name, `name-${reg.id}`)}
                                                    className="ml-1 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
                                                    title="Copy Name"
                                                >
                                                    {copiedId === `name-${reg.id}` ? (
                                                        <Check className="w-3 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-3" />
                                                    )}
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 font-medium text-gray-600 bg-gray-100/80 px-2.5 py-1 rounded-md text-xs">
                                                <Phone className="w-3.5 h-3.5 text-gray-500" />
                                                <a href={`tel:${reg.phone}`} className="hover:text-primary transition-colors">
                                                    {reg.phone}
                                                </a>
                                                <button
                                                    onClick={() => copyToClipboard(reg.phone, `phone-${reg.id}`)}
                                                    className="ml-1 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
                                                    title="Copy Phone"
                                                >
                                                    {copiedId === `phone-${reg.id}` ? (
                                                        <Check className="w-3 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-3" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-1.5 ml-auto text-xs font-medium text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Registered: {reg.created_at ? format(new Date(reg.created_at), 'MMM dd, yyyy') : 'N/A'}
                                            </div>
                                        </div>

                                        {/* Product Details Grid */}
                                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 shadow-inner">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Product Name</span>
                                                    <div className="font-semibold text-gray-900 flex items-center gap-1.5 mt-1 text-sm">
                                                        <Box className="w-4 h-4 text-primary" />
                                                        {reg.product_name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Capacity/Unit</span>
                                                    <div className="font-medium text-gray-800 mt-1 text-sm">{reg.capacity || 'N/A'}</div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Installation Date</span>
                                                    <div className="font-medium text-gray-800 mt-1 text-sm">{reg.installation_date || 'N/A'}</div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Google Review</span>
                                                    <div className="mt-1">
                                                        {reg.google_rated ? (
                                                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                                                                <CheckCircle className="w-3.5 h-3.5"/> Verified Click
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                                                                <Clock className="w-3.5 h-3.5"/> Unverified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Image Previews */}
                                            {reg.images && reg.images.length > 0 ? (
                                                <div className="mt-4 pt-4 border-t border-gray-200/60">
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-2">Installation Images</span>
                                                    <div className="flex flex-wrap gap-3">
                                                        {reg.images.map((img: string, idx: number) => (
                                                            <div 
                                                                key={idx} 
                                                                className="relative group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:border-primary/50 transition-colors cursor-zoom-in shrink-0"
                                                                onClick={() => setSelectedImage(img)}
                                                            >
                                                                <img 
                                                                    src={img} 
                                                                    alt={`Installation ${idx + 1}`} 
                                                                    className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-200" 
                                                                />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                    <Search className="w-4 h-4 text-white" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs text-gray-400">
                                                    No installation images uploaded.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Panel */}
                                    <div className="flex md:flex-col gap-2 shrink-0 justify-end md:self-stretch md:justify-start">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="text-red-500 border-red-200 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors" 
                                            onClick={() => deleteRegistration(reg.id)}
                                        >
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

            {/* Custom Image Viewer Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-4 right-4 z-10">
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="p-2 bg-black/50 hover:bg-black/75 text-white rounded-full transition-all focus:outline-none hover:scale-105"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-2 flex items-center justify-center bg-gray-950 min-h-[300px]">
                            <img 
                                src={selectedImage} 
                                alt="Installation Detail View" 
                                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-inner" 
                            />
                        </div>
                        <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100">
                            <span className="text-xs text-gray-500 font-medium">Installation Warranty Image Reference</span>
                            <a 
                                href={selectedImage} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                            >
                                Open Original Image <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
