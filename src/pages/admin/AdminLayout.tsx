import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../../backend/supabase';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Users,
    Wrench,
    Briefcase,
    MessageSquare,
    LogOut,
    Menu,
    X,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/hero', label: 'Hero Carousel', icon: ImageIcon },
    { path: '/admin/team', label: 'Team Members', icon: Users },
    { path: '/admin/services', label: 'Services', icon: Wrench },
    { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { path: '/admin/registrations', label: 'Registrations', icon: ShieldCheck },
];

export default function AdminLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/#/admin/login';
    };

    // Show nothing while checking auth initially
    if (isAuthenticated === null) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Sulax Admin
                </h2>
            </div>
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/50'
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 shrink-0 h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-gray-900 text-white rounded-lg shadow-xl"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="w-64 bg-gray-900 h-full flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <SidebarContent />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col min-h-screen">
                <div className="flex-1 p-6 md:p-8 lg:p-12 mb-20 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
