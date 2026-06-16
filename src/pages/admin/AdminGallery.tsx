import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { uploadImageToCloudinary } from '../../backend/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminGallery() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (error) {
            toast({ title: 'Error fetching gallery', description: error.message, variant: 'destructive' });
        } else {
            setImages(data || []);
        }
        setLoading(false);
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const imageUrl = await uploadImageToCloudinary(file);

            const newImage = {
                image_url: imageUrl,
                category: 'residential', // default
                title: 'New Gallery Image',
                location: 'Kanpur, UP'
            };

            const { data, error } = await supabase.from('gallery').insert([newImage]).select();
            if (error) throw error;

            if (data) {
                setImages([data[0], ...images]);
                toast({ title: 'Image uploaded successfully' });
            }
        } catch (error: any) {
            toast({ title: 'Upload Failed', description: error.message, variant: 'destructive' });
        } finally {
            setUploading(false);
        }
    };

    const updateImageDetails = async (id: string, updates: any) => {
        const { error } = await supabase.from('gallery').update(updates).eq('id', id);
        if (error) {
            toast({ title: 'Error updating details', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Details updated successfully' });
            // update local state silently
            setImages(images.map(img => img.id === id ? { ...img, ...updates } : img));
        }
    };

    const deleteImage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting image', description: error.message, variant: 'destructive' });
        } else {
            setImages(images.filter(img => img.id !== id));
            toast({ title: 'Image deleted successfully' });
        }
    };

    if (loading) return <div>Loading gallery...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
                    <p className="text-gray-500 mt-2">Upload images, set categories (residential, commercial, installation) and locations.</p>
                </div>

                <label className={`
          flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-primary/90 transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
                    <ImageIcon className="w-5 h-5" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                        }}
                    />
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100">
                            <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4 space-y-3 flex-1">
                            <div>
                                <label className="text-xs font-medium text-gray-500">Title</label>
                                <Input
                                    defaultValue={img.title}
                                    className="h-8 text-sm"
                                    onBlur={(e) => updateImageDetails(img.id, { title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500">Location</label>
                                <Input
                                    defaultValue={img.location}
                                    className="h-8 text-sm"
                                    onBlur={(e) => updateImageDetails(img.id, { location: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500">Category Filter</label>
                                <select
                                    className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={img.category}
                                    onChange={(e) => updateImageDetails(img.id, { category: e.target.value })}
                                >
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="installation">Installation</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-3 border-t bg-gray-50 flex justify-end">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteImage(img.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
