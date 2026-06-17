import { useState, useRef, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Star, CheckCircle, ShieldCheck, X, Loader2 } from 'lucide-react';
import { uploadImageToCloudinary } from '../backend/cloudinary';
import { supabase } from '../backend/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type RegistrationStatus = 'idle' | 'uploading' | 'submitting' | 'success' | 'error';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    product_name: '',
    installation_date: '',
    capacity: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [googleRated, setGoogleRated] = useState(false);
  const [status, setStatus] = useState<RegistrationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User's provided Google Business review link
  const GOOGLE_REVIEW_LINK = "https://g.page/r/CQWz8SM0sJiVEAI/review";

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 2) {
        alert("You can only upload a maximum of 2 images.");
        return;
      }
      setImages([...images, ...selectedFiles].slice(0, 2));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleGoogleRateClick = () => {
    window.open(GOOGLE_REVIEW_LINK, '_blank');
    setGoogleRated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleRated) {
      alert("Please rate us on Google first to proceed with registration.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least 1 image of the installed product.");
      return;
    }

    setStatus('uploading');
    setErrorMessage('');

    try {
      const imageUrls: string[] = [];
      for (const img of images) {
        const url = await uploadImageToCloudinary(img);
        imageUrls.push(url);
      }

      setStatus('submitting');

      const { error } = await supabase.from('product_registrations').insert([
        {
          customer_name: formData.customer_name,
          phone: formData.phone,
          product_name: formData.product_name,
          installation_date: formData.installation_date,
          capacity: formData.capacity,
          images: imageUrls,
          google_rated: googleRated
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ customer_name: '', phone: '', product_name: '', installation_date: '', capacity: '' });
        setImages([]);
        setGoogleRated(false);
      }, 5000);

    } catch (err: any) {
      console.error("Registration error:", err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to register product. Please try again.');
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Product Registration - Sulax Solar</title>
        <meta name="description" content="Register your Sulax Solar product to activate your warranty and ensure priority support." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute top-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Product <span className="text-secondary">Registration</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Activate your warranty and join the Sulax Solar family by registering your installation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="py-16 flex-1 relative -mt-10 z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-8 sm:p-12">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Registration Complete!</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md">
                      Thank you for registering your product and supporting us. Your comprehensive warranty is now fully active.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-gray-800">Installation Details</h3>
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
                        <input
                          type="text"
                          name="customer_name"
                          required
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-gray-100/50 focus:bg-white"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-gray-100/50 focus:bg-white"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Model / Name *</label>
                        <input
                          type="text"
                          name="product_name"
                          required
                          value={formData.product_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-gray-100/50 focus:bg-white"
                          placeholder="e.g. Sulax Premium Mono PERC 540W"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Installation Date *</label>
                        <input
                          type="date"
                          name="installation_date"
                          required
                          value={formData.installation_date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-gray-100/50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">System Capacity / Unit *</label>
                        <input
                          type="text"
                          name="capacity"
                          required
                          value={formData.capacity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-gray-100/50 focus:bg-white"
                          placeholder="e.g. 5kW"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="pt-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Installation Images (Max 2) *
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-gray-600 font-medium w-full sm:w-auto min-w-[200px]"
                        >
                          <Upload className="w-5 h-5" />
                          Choose Images
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                        
                        <div className="flex gap-4 overflow-x-auto w-full pb-2 sm:pb-0">
                          <AnimatePresence>
                            {images.map((img, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group shrink-0"
                              >
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt="Upload preview"
                                  className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Google Rating Verification */}
                    <div className="pt-8 mt-8 border-t border-gray-100">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-6 sm:p-8 border border-amber-100/60 shadow-sm">
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                              Verify Your Purchase
                            </h4>
                            <p className="text-gray-600">
                              To complete your registration and officially activate your warranty, please take a moment to rate your experience with us on Google. Your feedback helps us grow!
                            </p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={handleGoogleRateClick}
                            className={`shrink-0 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-md w-full sm:w-auto ${
                              googleRated 
                              ? 'bg-green-100 text-green-700 border border-green-200 cursor-default shadow-none' 
                              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 hover:scale-105'
                            }`}
                          >
                            {googleRated ? (
                              <>
                                <CheckCircle className="w-5 h-5" />
                                Verification Initiated
                              </>
                            ) : (
                              <>
                                <img src="https://www.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="w-5 h-5" />
                                Rate Us on Google
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={!googleRated || status === 'uploading' || status === 'submitting'}
                        className="w-full flex items-center justify-center gap-3 bg-secondary text-gray-900 py-4.5 px-8 rounded-xl font-bold text-lg hover:bg-secondary-light transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:shadow-[0_0_30px_rgba(245,197,24,0.5)] disabled:shadow-none"
                      >
                        {status === 'uploading' ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Uploading Images...
                          </>
                        ) : status === 'submitting' ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Registering Product...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <ShieldCheck className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      
                      {!googleRated && (
                         <p className="text-center text-sm text-gray-500 mt-4">
                           * You must click the "Rate Us on Google" button to enable submission.
                         </p>
                      )}
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default RegistrationPage;
