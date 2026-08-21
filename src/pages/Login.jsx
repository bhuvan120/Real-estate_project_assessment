import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

/**
 * Premium Login Template Page.
 */
export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login API validation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Store mock user token in localStorage
      localStorage.setItem('realestate_user', JSON.stringify({ email: formData.email, name: 'Guest User' }));
      
      // Redirect back to Home after 1s
      setTimeout(() => {
        navigate('/');
        // Force header update
        window.location.reload();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary-50/20 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-primary-100 shadow-soft-lg overflow-hidden transition-all duration-300">
        
        {/* Header decoration */}
        <div className="bg-brand-600 px-6 py-8 text-center text-white relative">
          <div className="absolute top-4 left-4">
            <Link to="/" className="text-white/80 hover:text-white transition-colors" aria-label="Go home">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          
          <h2 className="text-2xl font-black mb-1">Welcome Back</h2>
          <p className="text-xs text-brand-100">Access your saved listings, shortlists, and agent inquiries</p>
        </div>

        {/* Form area */}
        <div className="p-6 md:p-8">
          {success ? (
            <div className="text-center py-6 animate-scaleIn">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-primary-950 mb-1">Login Successful!</h3>
              <p className="text-sm text-primary-500">Redirecting you to the homepage...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-primary-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full rounded-xl border border-primary-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary-500">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-brand-650 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-primary-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-primary-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-primary-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-primary-600 font-semibold cursor-pointer select-none">
                  Keep me signed in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-sm font-bold text-white transition-all shadow-md active:scale-98"
              >
                {loading ? 'Authenticating account...' : 'Sign In'}
              </button>

              {/* Redirect to Signup */}
              <div className="text-center pt-4 text-xs font-semibold text-primary-500 border-t border-primary-50 mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-600 hover:underline font-bold">
                  Create free account
                </Link>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
