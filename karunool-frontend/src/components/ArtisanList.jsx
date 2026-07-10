import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArtisans } from '../services/artisanService';

const ArtisanList = () => {
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const data = await getAllArtisans();
                setArtisans(data);
            } catch (error) {
                console.error("Failed to load artisans");
            } finally {
                setLoading(false);
            }
        };
        fetchArtisans();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[var(--color-charcoal-800)] font-serif text-xl bg-[var(--color-sand-50)]">Curating the gallery...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <h3 className="text-[#c25934] uppercase tracking-[0.3em] text-xs font-bold mb-6">The Living Heritage</h3>
                <h1 className="text-5xl md:text-6xl font-serif text-[#1f3317] mb-8 leading-tight">
                    Master Craftsmen of Tamil Nadu
                </h1>
                <p className="text-gray-600 font-sans leading-relaxed text-lg">
                    Discover the faces behind the endangered arts. Every artisan here represents generations of knowledge, waiting to be preserved.
                </p>
            </div>
            
            {artisans.length === 0 ? (
                <div className="bg-white border border-[#e8dfcd] p-12 text-center shadow-sm">
                    <p className="text-[#a34727] font-serif text-2xl mb-4">
                        The gallery is currently empty.
                    </p>
                    <p className="text-gray-500 font-sans">
                        Our volunteers are working hard to onboard masters. Please check back soon.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {artisans.map(artisan => {
                        const translation = artisan.translations?.find(t => t.languageCode === 'en') || artisan.translations?.[0] || {};
                        
                        return (
                            <div key={artisan.id} className="group bg-white border border-[#f5f0e6] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                                <div className="h-72 bg-[#e8dfcd] relative overflow-hidden">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610738048604-58ce3e9701db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                                    
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-[#2d4a22]">
                                        Verified
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3 group-hover:text-[#c25934] transition-colors duration-300">
                                        {translation.name || 'Unknown Artisan'}
                                    </h2>
                                    <p className="text-gray-500 mb-8 line-clamp-3 font-sans leading-relaxed flex-grow">
                                        {translation.bio || 'No story provided yet.'}
                                    </p>
                                    <div className="pt-6 border-t border-[#f5f0e6] mt-auto">
                                        <Link to={`/artisan/${artisan.id}`} className="inline-block w-full text-center px-6 py-3 border border-[#2c2c2c] text-[#2c2c2c] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#2c2c2c] hover:text-white transition-all duration-300">
                                            Read Their Story
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ArtisanList;