import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { uploadImageToCloudinary } from '../../backend/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) {
            toast({ title: 'Error fetching projects', description: error.message, variant: 'destructive' });
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const addProject = async () => {
        const newProject = {
            title: 'New Solar Project',
            location: 'Kanpur, UP',
            project_date: 'March 2024',
            capacity: '5 kW',
            homes: 'Residential',
            description: 'Project description goes here.',
            images: ['https://via.placeholder.com/800x600'],
            features: ['Net Metering', 'Remote Monitoring'],
        };

        const { data, error } = await supabase.from('projects').insert([newProject]).select();
        if (error) {
            toast({ title: 'Error adding project', description: error.message, variant: 'destructive' });
        } else if (data) {
            setProjects([data[0], ...projects]);
            toast({ title: 'Project added successfully' });
        }
    };

    const updateProject = async (id: string, updates: any) => {
        const { error } = await supabase.from('projects').update(updates).eq('id', id);
        if (error) {
            toast({ title: 'Error updating project', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Project updated successfully' });
            fetchProjects();
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting project', description: error.message, variant: 'destructive' });
        } else {
            setProjects(projects.filter(p => p.id !== id));
            toast({ title: 'Project deleted successfully' });
        }
    };

    const addImageToProject = async (id: string, file: File, currentImages: string[]) => {
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            await updateProject(id, { images: [...currentImages, imageUrl] });
        } catch (error: any) {
            toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
        }
    };

    const removeImageFromProject = async (id: string, indexToRemove: number, currentImages: string[]) => {
        const newImages = currentImages.filter((_, i) => i !== indexToRemove);
        await updateProject(id, { images: newImages });
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
                    <p className="text-gray-500 mt-2">Add, edit, or remove solar case studies and projects.</p>
                </div>
                <Button onClick={addProject} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Project
                </Button>
            </div>

            <div className="space-y-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Project Images Gallery */}
                        <div className="p-4 bg-gray-50 border-b flex gap-4 overflow-x-auto">
                            {project.images?.map((img: string, i: number) => (
                                <div key={i} className="relative w-32 h-24 shrink-0 rounded-lg overflow-hidden group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImageFromProject(project.id, i, project.images)}
                                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}

                            <label className="w-32 h-24 shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                                <ImageIcon className="w-6 h-6 mb-1" />
                                <span className="text-xs">Add Image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) addImageToProject(project.id, e.target.files[0], project.images || []);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                                    <Input
                                        defaultValue={project.title}
                                        onBlur={(e) => updateProject(project.id, { title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Location</label>
                                        <Input
                                            defaultValue={project.location}
                                            onBlur={(e) => updateProject(project.id, { location: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Date/Month</label>
                                        <Input
                                            defaultValue={project.project_date}
                                            onBlur={(e) => updateProject(project.id, { project_date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Capacity</label>
                                        <Input
                                            defaultValue={project.capacity}
                                            onBlur={(e) => updateProject(project.id, { capacity: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Type (Homes/Units)</label>
                                        <Input
                                            defaultValue={project.homes}
                                            onBlur={(e) => updateProject(project.id, { homes: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <Textarea
                                        defaultValue={project.description}
                                        rows={4}
                                        onBlur={(e) => updateProject(project.id, { description: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Features (comma separated)</label>
                                    <Textarea
                                        defaultValue={project.features?.join(', ')}
                                        rows={2}
                                        onBlur={(e) => {
                                            const features = e.target.value.split(',').map(f => f.trim()).filter(Boolean);
                                            updateProject(project.id, { features });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t bg-gray-50 flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Project
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
