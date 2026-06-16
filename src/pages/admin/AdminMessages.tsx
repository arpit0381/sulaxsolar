import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import { Button } from '@/components/ui/button';
import { Trash2, User, Mail, Phone, Calendar, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: true });
        if (error) {
            toast({ title: 'Error fetching messages', description: error.message, variant: 'destructive' });
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const markAsRead = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        const { error } = await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id);
        if (error) {
            toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
        } else {
            setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        const { error } = await supabase.from('contact_messages').delete().eq('id', id);
        if (error) {
            toast({ title: 'Error deleting message', description: error.message, variant: 'destructive' });
        } else {
            setMessages(messages.filter(m => m.id !== id));
            toast({ title: 'Message deleted successfully' });
        }
    };

    if (loading) return <div>Loading messages...</div>;

    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Inquiries Inbox</h1>
                    <p className="text-gray-500 mt-2">
                        You have <span className="font-bold text-gray-900">{unreadCount}</span> unread messages from the contact form.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg">No messages found.</p>
                        <p className="text-sm mt-1">When customers contact you, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-6 transition-colors ${msg.status === 'unread' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 font-medium text-gray-900">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {msg.name}
                                            </div>
                                            <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" onClick={() => window.location.href = `mailto:${msg.email}`}>
                                                <Mail className="w-4 h-4" />
                                                {msg.email}
                                            </div>
                                            {msg.phone && (
                                                <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" onClick={() => window.location.href = `tel:${msg.phone}`}>
                                                    <Phone className="w-4 h-4" />
                                                    {msg.phone}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5 ml-auto text-xs">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(msg.created_at), 'MMM dd, yyyy h:mm a')}
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap shadow-sm">
                                            {msg.message}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2 shrink-0 md:w-32 justify-end">
                                        <Button
                                            variant={msg.status === 'unread' ? "default" : "outline"}
                                            className="w-full text-xs"
                                            onClick={() => markAsRead(msg.id, msg.status)}
                                        >
                                            {msg.status === 'unread' ? 'Mark as Read' : 'Make Unread'}
                                        </Button>
                                        <Button variant="ghost" className="w-full text-xs text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteMessage(msg.id)}>
                                            <Trash2 className="w-4 h-4 md:mr-2" />
                                            <span className="hidden md:inline">Delete</span>
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
