import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';

/**
 * Premium Contact Agent Modal with validation and success message.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.property - The active property object
 */
export const ContactAgentModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-populate message when property changes
  useEffect(() => {
    if (property) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I am interested in "${property.name}" located at ${property.location}, ${property.city}. Please share more details and layout plans.`,
      }));
    }
  }, [property]);

  // Prevent background scroll when modal is open
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

  if (!isOpen || !property) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-950/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-soft-lg border border-primary-100 transition-all duration-300 transform scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary-100 px-6 py-4 bg-primary-50">
          <div>
            <h3 className="text-lg font-bold text-primary-900">Contact Property Expert</h3>
            <p className="text-xs text-primary-500">Inquiry for {property.name}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-primary-400 hover:bg-primary-100 hover:text-primary-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-scaleIn">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-4 border border-emerald-100">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2">Request Sent Successfully!</h4>
              <p className="text-sm text-primary-600 max-w-sm mb-6 leading-relaxed">
                Thank you for your interest in <strong>{property.name}</strong>. One of our local area specialists will get in touch with you within the next 2 hours.
              </p>
              <button
                onClick={() => {
                  onClose();
                  // Reset states after closing
                  setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }, 300);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors duration-200 shadow-sm"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Agent card preview */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl border border-brand-100 bg-brand-50/50 mb-2">
                <div className="h-11 w-11 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white shadow-inner">
                  VS
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-900">Vikram Sharma</h4>
                  <p className="text-xs text-primary-500">Senior Relationship Manager, Delhi-NCR</p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-primary-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-primary-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                  />
                </div>
              </div>

              {/* Email and Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-primary-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full rounded-xl border border-primary-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-primary-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full rounded-xl border border-primary-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-primary-500 mb-1.5">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary-400" />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="w-full rounded-xl border border-primary-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 placeholder:text-primary-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 px-4 py-3 text-sm font-bold text-white transition-all duration-200 shadow-md active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Agent Inquiry
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactAgentModal;
