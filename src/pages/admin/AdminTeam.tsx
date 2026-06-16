import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { uploadImageToCloudinary } from '../../backend/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminTeam() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
        if (error) {
            toast({ title: 'Error fetching team', description: error.message, variant: 'destructive' });
        } else {
            setMembers(data || []);
        }
        setLoading(false);
    };

    const addMember = async () => {
        const newMember = {
            name: 'New Team Member',
            position: 'Position',
            image_url: 'https://via.placeholder.com/400x400',
            description: 'Short bio goes here.',
        };

        const { data, error } = await supabase.from('team_members').insert([newMember]).select();
        if (error) {
            toast({ title: 'Error adding member', description: error.message, variant: 'destructive' });
        } else if (data) {
            setMembers([...members, data[0]]);
            toast({ title: 'Member added successfully' });
        }
    };

    const updateMember = async (id: string, updates: any) => {
        const { error } = await supabase.from('team_members').update(updates).eq('id', id);
        if (error) {
            toast({ title: 'Error updating member', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Member updated successfully' });
            fetchMembers();
        }
    };

    const deleteMember = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting member', description: error.message, variant: 'destructive' });
        } else {
            setMembers(members.filter(m => m.id !== id));
            toast({ title: 'Member deleted successfully' });
        }
    };

    const handleImageUpload = async (id: string, file: File) => {
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            await updateMember(id, { image_url: imageUrl });
        } catch (error: any) {
            toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
        }
    };

    if (loading) return <div>Loading team members...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Team</h1>
                    <p className="text-gray-500 mt-2">Add, edit, or remove expert team members shown on the About page.</p>
                </div>
                <Button onClick={addMember} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Member
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="relative h-64 bg-gray-100 group">
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform">
                                    <ImageIcon className="w-4 h-4" /> Change Photo
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleImageUpload(member.id, e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="p-5 space-y-4 flex-1">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
                                <Input
                                    defaultValue={member.name}
                                    className="mt-1 font-semibold"
                                    onBlur={(e) => updateMember(member.id, { name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Position</label>
                                <Input
                                    defaultValue={member.position}
                                    className="mt-1 text-primary"
                                    onBlur={(e) => updateMember(member.id, { position: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Short Bio</label>
                                <Textarea
                                    defaultValue={member.description}
                                    rows={4}
                                    className="mt-1 text-sm resize-none"
                                    onBlur={(e) => updateMember(member.id, { description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="p-3 border-t bg-gray-50 flex justify-end">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 font-medium" onClick={() => deleteMember(member.id)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
