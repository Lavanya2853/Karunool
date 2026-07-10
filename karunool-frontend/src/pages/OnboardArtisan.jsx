import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArtisan } from '../services/artisanService';

const OnboardArtisan = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // We hardcode District and Category to 1 for this prototype
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        districtId: 1, 
        categoryId: 1, 
        onboardedById: 1, 
        bio: '',
        craftStory: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createArtisan(formData);
            // On success, redirect back to the home gallery
            navigate('/'); 
        } catch (error) {
            console.error("Failed to onboard artisan", error);
            alert("Error onboarding artisan. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--color-sand-50)] min-h-screen py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white p-12 shadow-xl border border-[#f5f0e6]">
                <div className="text-center mb-16">
                    <h3 className="text-[var(--color-terracotta-500)] uppercase tracking-[0.3em] text-xs font-bold mb-4">Volunteer Portal</h3>
                    <h1 className="text-4xl font-serif text-[var(--color-charcoal-900)]">Onboard a Master Artisan</h1>
                    <p className="text-gray-500 font-sans mt-4 leading-relaxed">Document their legacy, capture their story, and connect them to the modern world.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Artisan Name</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-terracotta-500)] bg-transparent transition-colors text-lg text-[var(--color-charcoal-800)]" placeholder="e.g. Senthil Velan" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Contact Number</label>
                            <input type="text" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-terracotta-500)] bg-transparent transition-colors text-lg text-[var(--color-charcoal-800)]" placeholder="10-digit number" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Short Biography</label>
                        <textarea name="bio" required value={formData.bio} onChange={handleChange} rows="2" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-terracotta-500)] bg-transparent transition-colors resize-none text-lg text-[var(--color-charcoal-800)] leading-relaxed" placeholder="A brief introduction to the artisan..."></textarea>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">The Craft Story</label>
                        <textarea name="craftStory" required value={formData.craftStory} onChange={handleChange} rows="4" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-terracotta-500)] bg-transparent transition-colors resize-none text-lg text-[var(--color-charcoal-800)] leading-relaxed" placeholder="The rich history and technique behind their craft..."></textarea>
                    </div>

                    <div className="pt-8">
                        <button type="submit" disabled={loading} className="w-full bg-[var(--color-charcoal-900)] text-white py-5 rounded hover:bg-[var(--color-terracotta-500)] transition-colors duration-300 font-serif text-xl disabled:opacity-50 tracking-wide shadow-md hover:shadow-lg">
                            {loading ? 'Preserving Legacy...' : 'Submit & Onboard Artisan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OnboardArtisan;
