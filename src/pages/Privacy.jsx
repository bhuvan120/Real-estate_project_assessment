import React from 'react';
import { ShieldAlert, Eye, Key, Cookie, Scale } from 'lucide-react';

/**
 * Privacy Policy & Terms of Service corporate details page.
 */
export const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      desc: 'We collect information you provide directly to us (e.g. name, email address, phone number) when submitting agent contact requests. We also collect browser specifications, city locations, and usage statistics.',
      icon: Eye,
    },
    {
      title: '2. Use of Information',
      desc: 'We use the collected information to route agent inquiries, improve search filters, detect platform abuses, and personalize user interfaces (such as displaying matching recommendations). We do NOT sell or share data with unauthorized third parties.',
      icon: Key,
    },
    {
      title: '3. Local Storage & Cookies',
      desc: 'This site uses browser Local Storage to save properties added to your shortlists and log property visitation histories. This data is stored locally on your device and can be cleared at any time by clearing your browser cache.',
      icon: Cookie,
    },
    {
      title: '4. Legal Terms of Service',
      desc: 'By browsing listings on Realistae, you acknowledge that listed properties represent mock mock-ups for architectural demonstration. User-agent inquiries simulate workflows and do not bind relationship agreements or brokerage commissions.',
      icon: Scale,
    },
  ];

  return (
    <div className="min-h-screen bg-primary-50/30 pb-16">
      
      {/* Banner */}
      <div className="bg-primary-950 py-16 text-center text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-primary-950 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Privacy Policy & Terms</h1>
          <p className="text-sm md:text-base text-primary-350 max-w-xl mx-auto font-medium">
            Effective Date: August 21, 2026. We are committed to transparency in data collections and local storage usage.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Core Content */}
        <div className="bg-white border border-primary-100 rounded-2xl p-6 md:p-10 shadow-soft space-y-8">
          
          <div className="flex gap-3 items-start border-b border-primary-100 pb-6 mb-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-950">Security Assurance</h2>
              <p className="text-xs text-primary-500">How we store your preferences and handle mockup contact forms</p>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section, idx) => {
              const IconComponent = section.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-primary-900 font-bold text-base md:text-lg">
                    <IconComponent className="h-5 w-5 text-brand-500" />
                    <h3>{section.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-primary-650 leading-relaxed pl-7">
                    {section.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Legal Compliance */}
          <div className="border-t border-primary-100 pt-6 mt-8 text-xs text-primary-500 leading-relaxed text-center max-w-lg mx-auto">
            If you have questions about this policy or request deletion of data log history, contact our compliance manager at <strong>privacy@realistae.com</strong>.
          </div>

        </div>

      </div>

    </div>
  );
};

export default Privacy;
