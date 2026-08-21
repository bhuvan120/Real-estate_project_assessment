import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Favorites from './pages/Favorites';
import RecentlyViewed from './pages/RecentlyViewed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname === '/' && new URLSearchParams(search).has('type')) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
};

/**
 * Main Application Router.
 * Configures navbar, footer and switches between page states wrapped in AppProvider.
 */
function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen font-sans antialiased text-primary-800 bg-primary-50/20 selection:bg-brand-500 selection:text-white">
        <ScrollToTop />
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Main Content Router */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recently-viewed" element={<RecentlyViewed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <AIChat />
        
        {/* Footer Area */}
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
