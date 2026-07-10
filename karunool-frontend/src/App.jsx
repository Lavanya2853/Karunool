import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArtisanList from './components/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail';
import OnboardArtisan from './pages/OnboardArtisan';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[var(--color-sand-50)]">
        {/* Minimalist Navigation */}
        <nav className="bg-white border-b border-[#f5f0e6] py-6 relative z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link to="/" className="text-3xl font-serif font-bold text-[var(--color-forest-800)] tracking-tighter hover:text-[var(--color-terracotta-500)] transition-colors">
              KaruNool
            </Link>
            <div className="flex items-center space-x-8">
              <div className="text-[10px] font-sans tracking-[0.3em] uppercase text-gray-400 hidden sm:block">
                Preserving Heritage
              </div>
              <Link to="/onboard" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-[var(--color-terracotta-500)] px-6 py-2.5 rounded-full hover:bg-[var(--color-forest-800)] transition-colors duration-300">
                + Add Artisan
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ArtisanList />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="/onboard" element={<OnboardArtisan />} />
          </Routes>
        </main>

        {/* Editorial Footer */}
        <footer className="bg-[var(--color-charcoal-900)] text-[var(--color-sand-200)] py-20 mt-auto">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif mb-6 text-white tracking-wide">KaruNool</h2>
            <p className="text-sm font-sans tracking-widest text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
              Bridging the gap between ancient craftsmanship and the modern world, protecting the artisans of Tamil Nadu.
            </p>
            <div className="w-12 h-px bg-[var(--color-terracotta-500)] mx-auto mb-10"></div>
            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              &copy; 2026 KaruNool. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
