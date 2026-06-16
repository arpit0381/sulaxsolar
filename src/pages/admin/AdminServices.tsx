import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { uploadImageToCloudinary } from '../../backend/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminServices() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (error) {
            toast({ title: 'Error fetching services', description: error.message, variant: 'destructive' });
        } else {
            setServices(data || []);
        }
        setLoading(false);
    };

    const addService = async () => {
        const newService = {
            title: 'New Service',
            description: 'Service description goes here.',
            image_url: 'https://via.placeholder.com/600x400',
            icon_name: 'Sun',
            features: ['Feature 1', 'Feature 2'],
        };

        const { data, error } = await supabase.from('services').insert([newService]).select();
        if (error) {
            toast({ title: 'Error adding service', description: error.message, variant: 'destructive' });
        } else if (data) {
            setServices([...services, data[0]]);
            toast({ title: 'Service added successfully' });
        }
    };

    const updateService = async (id: string, updates: any) => {
        const { error } = await supabase.from('services').update(updates).eq('id', id);
        if (error) {
            toast({ title: 'Error updating service', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Service updated successfully' });
            fetchServices();
        }
    };

    const deleteService = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting service', description: error.message, variant: 'destructive' });
        } else {
            setServices(services.filter(s => s.id !== id));
            toast({ title: 'Service deleted successfully' });
        }
    };

    const handleImageUpload = async (id: string, file: File) => {
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            await updateService(id, { image_url: imageUrl });
        } catch (error: any) {
            toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
        }
    };

    if (loading) return <div>Loading services...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
                    <p className="text-gray-500 mt-2">Add, edit, or remove services offered by Sulax Solar.</p>
                </div>
                <Button onClick={addService} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Service
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="relative h-48 bg-gray-100">
                            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Change Image
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleImageUpload(service.id, e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 flex-1">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <Input
                                    defaultValue={service.title}
                                    onBlur={(e) => updateService(service.id, { title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <Textarea
                                    defaultValue={service.description}
                                    rows={3}
                                    onBlur={(e) => updateService(service.id, { description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Features (comma separated)</label>
                                <Textarea
                                    defaultValue={service.features?.join(', ')}
                                    rows={2}
                                    onBlur={(e) => {
                                        const features = e.target.value.split(',').map(f => f.trim()).filter(Boolean);
                                        updateService(service.id, { features });
                                    }}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Lucide Icon Name</label>
                                <Input
                                    defaultValue={service.icon_name}
                                    onBlur={(e) => updateService(service.id, { icon_name: e.target.value })}
                                    placeholder="e.g. Sun, Battery, Factory"
                                />
                            </div>
                        </div>

                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
                            <Button variant="destructive" size="sm" onClick={() => deleteService(service.id)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
