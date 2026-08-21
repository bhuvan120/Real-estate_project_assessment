import React from 'react';
import { AlertOctagon, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Platform Disclaimer page.
 */
export const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-primary-50/30 pb-16">
      
      {/* Banner */}
      <div className="bg-primary-950 py-16 text-center text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-primary-950 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Platform Disclaimer</h1>
          <p className="text-sm md:text-base text-primary-350 max-w-xl mx-auto font-medium">
            Important regulatory disclosures regarding listing metrics, media copyrights, and mock workflows.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Card */}
        <div className="bg-white border border-primary-100 rounded-2xl p-6 md:p-8 shadow-soft space-y-6">
          
          <div className="flex gap-3 items-start border-b border-primary-50 pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-950">Mock Platform Disclaimer</h2>
              <p className="text-xs text-primary-500">For architectural evaluation and assessment reviews only</p>
            </div>
          </div>

          {/* Clauses */}
          <div className="space-y-4 text-xs md:text-sm text-primary-650 leading-relaxed">
            <p>
              <strong>1. Mock Data Disclosures</strong>:
              All property names, location labels, prices, layout areas, listed dates, and amenities displayed on the <strong>Realistae</strong> directory represent mock data generated for code validation. No listed properties are currently for sale or lease.
            </p>
            <p>
              <strong>2. Contact Form Simulations</strong>:
              The "Contact Agent" form, success popups, and related flows simulate API request-response patterns. Submitting names or email addresses will not trigger actual outbound SMS messages, brokerage registrations, or billing events.
            </p>
            <p>
              <strong>3. Image Assets Attribution</strong>:
              Images featured in the property galleries are loaded via remote URLs from <strong>Unsplash</strong>. Copyrights belong to their respective creators under the Unsplash open license. These photos are used strictly for visual presentation and layout simulation.
            </p>
            <p>
              <strong>4. System Integration</strong>:
              The architecture is structured to mock HTTP API fetch latency. The platform is ready for direct connection with database APIs (e.g. Postgres, MongoDB) and REST services (e.g. Node.js Express, FastAPI) without modifying UI components.
            </p>
          </div>

          {/* Links back */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-primary-50">
            <Link
              to="/"
              className="flex-1 py-3 text-center text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-sm"
            >
              Browse Properties
            </Link>
            <Link
              to="/about"
              className="flex-1 py-3 text-center text-sm font-bold text-primary-700 hover:bg-primary-50 rounded-xl border border-primary-200 transition-colors"
            >
              Read Company Profile
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Disclaimer;
