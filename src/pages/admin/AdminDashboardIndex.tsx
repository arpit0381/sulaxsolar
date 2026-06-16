import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import {
    ImageIcon,
    Users,
    Briefcase,
    MessageSquare,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const QUICK_LINKS = [
    { path: '/admin/hero', label: 'Edit Hero Section', description: 'Update carousel images and text' },
    { path: '/admin/services', label: 'Manage Services', description: 'Add or modify solar services' },
    { path: '/admin/projects', label: 'Add New Project', description: 'Showcase your latest work' },
];

export default function AdminDashboardIndex() {
    const [stats, setStats] = useState([
        { label: 'Total Projects', value: '...', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Team Members', value: '...', icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Gallery Images', value: '...', icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Unread Messages', value: '...', icon: MessageSquare, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            const [
                { count: projectsCount },
                { count: teamCount },
                { count: galleryCount },
                { count: unreadCount }
            ] = await Promise.all([
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('team_members').select('*', { count: 'exact', head: true }),
                supabase.from('gallery').select('*', { count: 'exact', head: true }),
                supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
            ]);

            setStats([
                { label: 'Total Projects', value: (projectsCount || 0).toString(), icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Team Members', value: (teamCount || 0).toString(), icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
                { label: 'Gallery Images', value: (galleryCount || 0).toString(), icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'Unread Messages', value: (unreadCount || 0).toString(), icon: MessageSquare, color: 'text-rose-500', bg: 'bg-rose-500/10' },
            ]);
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {QUICK_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="p-6 hover:bg-gray-50 transition-colors group flex items-start justify-between"
                        >
                            <div>
                                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                    {link.label}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
