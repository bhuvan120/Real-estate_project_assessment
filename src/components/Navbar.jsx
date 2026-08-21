import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, History, Home as HomeIcon, LogIn, LogOut, User } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

/**
 * Sticky Responsive Navbar with Mock User Authentication state support.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { favorites } = useFavorites();

  // Load mock user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('realestate_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('realestate_user');
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Favorites', path: '/favorites', icon: Heart, badge: favorites.length },
    { label: 'Recently Viewed', path: '/recently-viewed', icon: History },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-primary-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-extrabold tracking-tight text-primary-950 flex items-center gap-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white font-black text-base shadow-sm group-hover:bg-brand-700 transition-colors">R</span>
              Realistae<span className="text-brand-600">.</span>
            </span>
          </Link>

          {/* Desktop Links (screen >= md) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 hover:text-brand-600 ${
                    active ? 'text-brand-600 font-extrabold' : 'text-primary-600'
                  }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="flex h-5 items-center justify-center rounded-full bg-accent-rose px-2 text-[10px] font-black text-white leading-none shadow-sm animate-scaleIn">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            <div className="border-l border-primary-200 pl-4 flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm font-bold text-primary-750">
                    <User className="h-4 w-4 text-brand-600" />
                    <span>Hi, Guest</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs font-bold text-red-650 hover:text-red-750 transition-colors border border-red-200 bg-red-50/50 hover:bg-red-50 rounded-lg px-2.5 py-1.5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button (screen < md) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="rounded-xl p-2 text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (screen < md) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-primary-950/60 backdrop-blur-sm md:hidden animate-fadeIn"
        >
          {/* Drawer Menu Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full flex-col bg-white border-b border-primary-100 shadow-lg px-4 py-6 space-y-4 animate-slideDown"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="flex h-6 items-center justify-center rounded-full bg-accent-rose px-2.5 text-xs font-extrabold text-white leading-none shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Mobile Auth Button */}
            <div className="border-t border-primary-100 pt-4 mt-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-4 text-sm font-bold text-primary-750">
                    <User className="h-5 w-5 text-brand-650" />
                    <span>Signed in as Guest</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-600 py-3 text-sm font-bold"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out Account
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white py-3 text-sm font-bold shadow-sm"
                >
                  <LogIn className="h-4.5 w-4.5" />
                  Sign In Account
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
