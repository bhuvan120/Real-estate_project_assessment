import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

/**
 * Premium Signup Template Page.
 */
export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }
    setLoading(true);

    // Simulate signup API register
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect to Login page after 1.2s
      setTimeout(() => {
        navigate('/login');
      }, 1200);
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
          
          <h2 className="text-2xl font-black mb-1">Create Account</h2>
          <p className="text-xs text-brand-100">Join Realistae to bookmark listings and connect with premium brokers</p>
        </div>

        {/* Form area */}
        <div className="p-6 md:p-8">
          {success ? (
            <div className="text-center py-6 animate-scaleIn">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-primary-950 mb-1">Registration Complete!</h3>
              <p className="text-sm text-primary-500">Account created. Opening login dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-primary-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-primary-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

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

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-primary-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-primary-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Choose Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-primary-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    className="w-full rounded-xl border border-primary-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 py-1">
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-primary-300 text-brand-600 focus:ring-brand-500 cursor-pointer mt-0.5"
                />
                <label htmlFor="agree" className="text-xs text-primary-600 font-semibold cursor-pointer select-none leading-normal">
                  I agree to the{' '}
                  <Link to="/privacy" className="text-brand-600 hover:underline font-bold">
                    Terms of Service & Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-sm font-bold text-white transition-all shadow-md active:scale-98"
              >
                {loading ? 'Creating account profile...' : 'Create Account'}
              </button>

              {/* Redirect to Login */}
              <div className="text-center pt-4 text-xs font-semibold text-primary-500 border-t border-primary-50 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-600 hover:underline font-bold">
                  Sign In here
                </Link>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Signup;
