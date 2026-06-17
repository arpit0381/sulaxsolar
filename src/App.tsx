
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Admin Routes
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardIndex from "./pages/admin/AdminDashboardIndex";
import AdminHero from "./pages/admin/AdminHero";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminServices from "./pages/admin/AdminServices";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRegistrations from "./pages/admin/AdminRegistrations";


import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" />
          ) : (
            <HashRouter key="app">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<RegistrationPage />} />

                {/* Admin Dashboard Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardIndex />} />
                  <Route path="hero" element={<AdminHero />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="registrations" element={<AdminRegistrations />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
