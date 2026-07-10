import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById } from '../services/artisanService';

const ArtisanDetail = () => {
    const { id } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getArtisanById(id);
                setArtisan(data);
            } catch (error) {
                console.error("Failed to fetch artisan details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif text-xl bg-[#fdfbf7]">Unveiling the heritage...</div>;
    
    if (!artisan) return <div className="text-center py-20 text-[#a34727] font-serif text-xl bg-[#fdfbf7] min-h-screen">Artisan not found.</div>;

    const translation = artisan.translations?.find(t => t.languageCode === 'en') || artisan.translations?.[0] || {};

    return (
        <div className="bg-[#fdfbf7] min-h-screen">
            {/* Minimalist Navigation Back */}
            <div className="absolute top-0 w-full z-10 p-6 flex justify-between items-center">
                <Link to="/" className="text-white hover:text-[#e8dfcd] transition-colors duration-300 font-sans text-xs tracking-[0.2em] uppercase bg-black/40 px-6 py-3 rounded-full backdrop-blur-md">
                    &larr; Back to Gallery
                </Link>
            </div>

            {/* Huge Hero Banner */}
            <div className="relative h-[70vh] w-full bg-black">
                {/* Unsplash Image for the "Luxury Minimalist" look */}
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610738048604-58ce3e9701db?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 px-4 text-center">
                    <span className="text-[#e8dfcd] uppercase tracking-[0.3em] font-semibold text-xs mb-6 bg-white/10 px-5 py-2 backdrop-blur-md rounded-full border border-white/20">
                        Master Artisan
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl">
                        {translation.name || 'Unknown Artisan'}
                    </h1>
                    <div className="flex items-center space-x-8 text-[#f5f0e6] font-sans tracking-wider text-sm">
                        <span className="flex items-center bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-400 mr-3 animate-pulse"></span>
                            {artisan.verificationStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Editorial Story Section */}
            <div className="max-w-5xl mx-auto px-6 py-24 bg-white -mt-16 relative z-10 rounded-t-[40px] shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Left Column: Quick Facts & Action */}
                    <div className="md:col-span-4 border-r border-[#f5f0e6] pr-10">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#a34727] mb-8 font-bold">The Details</h3>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">Craft Category</p>
                                <p className="text-[#2c2c2c] font-serif text-lg">Category {artisan.categoryId}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">District</p>
                                <p className="text-[#2c2c2c] font-serif text-lg">District {artisan.districtId}</p>
                            </div>
                            <div className="pt-10 mt-10 border-t border-[#f5f0e6]">
                                <button className="w-full bg-[#1a1a1a] text-white py-4 px-6 rounded hover:bg-[#c25934] transition-all duration-300 font-serif text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Inquire Now
                                </button>
                                <p className="text-[9px] text-gray-400 text-center mt-4 uppercase tracking-[0.2em]">Secure & Protected Contact</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Story */}
                    <div className="md:col-span-8 pl-4">
                        <h2 className="text-4xl font-serif text-[#1f3317] mb-10 leading-[1.3]">
                            "A craft passed down through generations, living in the hands of the master."
                        </h2>
                        <div className="prose prose-lg prose-p:text-[#2c2c2c] prose-p:font-sans prose-p:leading-loose max-w-none">
                            <p className="mb-8 text-lg font-light">{translation.bio || 'Biography not available.'}</p>
                            
                            <div className="my-12 pl-8 border-l-2 border-[#c25934] bg-[#fdfbf7] p-8 rounded-r-2xl">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#a34727] mb-4">The Craft Story</h4>
                                <p className="italic text-gray-600 font-serif text-xl leading-relaxed">
                                    "{translation.craftStory || 'Craft story not available.'}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanDetail;
