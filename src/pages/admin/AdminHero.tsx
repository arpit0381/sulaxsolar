import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { uploadImageToCloudinary } from '../../backend/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminHero() {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        const { data, error } = await supabase.from('hero_slides').select('*').order('order_index', { ascending: true });
        if (error) {
            toast({ title: 'Error fetching slides', description: error.message, variant: 'destructive' });
        } else {
            setSlides(data || []);
        }
        setLoading(false);
    };

    const addSlide = async () => {
        const newSlide = {
            image_url: 'https://via.placeholder.com/1920x1080',
            title: 'New Headline',
            title_accent: 'Accent Text',
            subtitle: 'Supporting Subtitle',
            description: 'Main body copy for the slide goes here. Make it compelling.',
            cta1_label: 'Primary Action',
            cta1_to: '/contact',
            cta2_label: 'Secondary Action',
            cta2_to: '/services',
            order_index: slides.length,
        };

        const { data, error } = await supabase.from('hero_slides').insert([newSlide]).select();
        if (error) {
            toast({ title: 'Error adding slide', description: error.message, variant: 'destructive' });
        } else if (data) {
            setSlides([...slides, data[0]]);
            toast({ title: 'Slide added successfully' });
        }
    };

    const updateSlide = async (id: string, updates: any) => {
        const { error } = await supabase.from('hero_slides').update(updates).eq('id', id);
        if (error) {
            toast({ title: 'Error updating slide', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Slide updated successfully' });
            // Update local state to avoid refetching everything
            setSlides(slides.map(s => s.id === id ? { ...s, ...updates } : s));
        }
    };

    const deleteSlide = async (id: string) => {
        if (!confirm('Are you sure you want to delete this slide?')) return;

        const { error } = await supabase.from('hero_slides').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting slide', description: error.message, variant: 'destructive' });
        } else {
            setSlides(slides.filter(s => s.id !== id));
            toast({ title: 'Slide deleted successfully' });
            // We should ideally re-order index here but omitting for brevity unless needed.
        }
    };

    const handleImageUpload = async (id: string, file: File) => {
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            await updateSlide(id, { image_url: imageUrl });
        } catch (error: any) {
            toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
        }
    };

    const moveSlide = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === slides.length - 1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const currentSlide = slides[index];
        const targetSlide = slides[newIndex];

        // Swap order_indexes
        const updates = [
            { id: currentSlide.id, order_index: targetSlide.order_index, ...currentSlide },
            { id: targetSlide.id, order_index: currentSlide.order_index, ...targetSlide }
        ]

        // Fast local update
        const newSlides = [...slides];
        newSlides[index] = updates[1];
        newSlides[newIndex] = updates[0];
        setSlides(newSlides);

        // Persist
        await supabase.from('hero_slides').upsert(updates);
    };

    if (loading) return <div>Loading slides...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hero Carousel Manager</h1>
                    <p className="text-gray-500 mt-2">Add, edit, and reorder slides on the homepage hero section.</p>
                </div>
                <Button onClick={addSlide} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Slide
                </Button>
            </div>

            <div className="space-y-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row relative">

                        {/* Reorder Controls */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r flex flex-col items-center justify-center gap-2 z-10">
                            <button
                                onClick={() => moveSlide(index, 'up')}
                                disabled={index === 0}
                                className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
                                title="Move Up"
                            >
                                <ArrowUp className="w-5 h-5 text-gray-600" />
                            </button>
                            <span className="font-bold text-sm text-gray-400">{index + 1}</span>
                            <button
                                onClick={() => moveSlide(index, 'down')}
                                disabled={index === slides.length - 1}
                                className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
                                title="Move Down"
                            >
                                <ArrowDown className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Slide Image Area */}
                        <div className="relative h-64 lg:h-auto lg:w-1/3 bg-gray-900 ml-12">
                            <img src={slide.image_url} alt="Slide Background" className="w-full h-full object-cover opacity-70" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Change Background
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleImageUpload(slide.id, e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Slide Details Area */}
                        <div className="p-6 lg:w-2/3 ml-12 lg:ml-0 flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Headline (White)</label>
                                    <Input
                                        defaultValue={slide.title}
                                        onBlur={(e) => updateSlide(slide.id, { title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Headline Accent (Yellow)</label>
                                    <Input
                                        defaultValue={slide.title_accent}
                                        onBlur={(e) => updateSlide(slide.id, { title_accent: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700">Subtitle</label>
                                <Input
                                    defaultValue={slide.subtitle}
                                    onBlur={(e) => updateSlide(slide.id, { subtitle: e.target.value })}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700">Body Description</label>
                                <Textarea
                                    defaultValue={slide.description}
                                    rows={3}
                                    onBlur={(e) => updateSlide(slide.id, { description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Primary Button</label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Label" defaultValue={slide.cta1_label} onBlur={(e) => updateSlide(slide.id, { cta1_label: e.target.value })} />
                                        <Input placeholder="Link (/contact)" defaultValue={slide.cta1_to} onBlur={(e) => updateSlide(slide.id, { cta1_to: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Secondary Button</label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Label" defaultValue={slide.cta2_label} onBlur={(e) => updateSlide(slide.id, { cta2_label: e.target.value })} />
                                        <Input placeholder="Link (/services)" defaultValue={slide.cta2_to} onBlur={(e) => updateSlide(slide.id, { cta2_to: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => deleteSlide(slide.id)}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Slide
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {slides.length === 0 && (
                    <div className="p-12 text-center border-2 border-dashed rounded-xl text-gray-500">
                        No slides configured. Add a slide to begin.
                    </div>
                )}
            </div>
        </div>
    );
}
