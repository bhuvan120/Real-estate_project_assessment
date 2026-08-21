import React from 'react';
import { ShieldCheck, Award, Handshake, Users2, Map } from 'lucide-react';

/**
 * About Company information page.
 */
export const About = () => {
  const stats = [
    { label: 'Families Assisted', value: '5,000+' },
    { label: 'Active Listings', value: '1,200+' },
    { label: 'Partner Agencies', value: '120+' },
    { label: 'Major Cities Covered', value: '8+' },
  ];

  const values = [
    {
      title: 'Full Transparency',
      desc: 'We verify pricing trends, ownership titles, and RERA registration documents for every single listing to protect buyers.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Award-Winning Service',
      desc: 'Recognized as one of India\'s fastest-growing real estate discovery platforms for modern UI/UX and user satisfaction.',
      icon: Award,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Client-First Approach',
      desc: 'Zero spam relationship policies. We connect users directly with verified local experts without locking contact details behind paywalls.',
      icon: Handshake,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
  ];

  return (
    <div className="min-h-screen bg-primary-50/30 pb-16">
      
      {/* Banner */}
      <div className="bg-primary-950 py-16 text-center text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-primary-950 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4 animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">About Realistae</h1>
          <p className="text-sm md:text-base text-primary-350 max-w-xl mx-auto font-medium">
            Redefining premium property discovery in India with verified listings, direct client support, and sleek web directories.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        
        {/* Core Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-950">Our Mission</h2>
            <p className="text-sm text-primary-650 leading-relaxed">
              Realistae was founded in 2026 with a clear mission: to cut through the noise of crowded, outdated property portals. We believe finding a home should be a delightful, simple, and transparent experience. 
            </p>
            <p className="text-sm text-primary-650 leading-relaxed">
              By combining high-quality imagery, precise filters, local property factsheets, and immediate agent feedback mechanisms, we help young professionals and families make informed decisions when renting or purchasing homes.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-primary-100 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Realistae Corporate Office"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl border border-primary-100 p-8 shadow-soft text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-3xl font-black text-brand-600">{stat.value}</p>
              <p className="text-xs text-primary-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Corporate Values */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-950">Why Choose Realistae?</h2>
            <p className="text-sm text-primary-500 max-w-md mx-auto">
              Our core values guide every features we build and every property verified on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComponent = v.icon;
              return (
                <div key={i} className="flex flex-col bg-white border border-primary-100 rounded-2xl p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${v.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-primary-950 mb-2">{v.title}</h3>
                  <p className="text-xs md:text-sm text-primary-650 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mock Team Section */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary-950">Meet Our Leadership Team</h2>
            <p className="text-sm text-primary-500 max-w-md mx-auto">
              Real estate veterans and engineering leaders working together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Founder 1 */}
            <div className="flex flex-col items-center text-center bg-white border border-primary-100 rounded-2xl p-6 shadow-soft">
              <div className="h-20 w-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                AR
              </div>
              <h3 className="text-base font-bold text-primary-900">Arjun Reddy</h3>
              <p className="text-xs text-primary-450 font-semibold mb-3">Co-Founder & CEO</p>
              <p className="text-xs text-primary-600 leading-relaxed">
                Over 12 years of experience managing luxury commercial real estate assets in South India.
              </p>
            </div>

            {/* Founder 2 */}
            <div className="flex flex-col items-center text-center bg-white border border-primary-100 rounded-2xl p-6 shadow-soft">
              <div className="h-20 w-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                SK
              </div>
              <h3 className="text-base font-bold text-primary-900">Sruthi K.</h3>
              <p className="text-xs text-primary-450 font-semibold mb-3">Chief of Product Design</p>
              <p className="text-xs text-primary-600 leading-relaxed">
                Product architect dedicated to creating clean, user-friendly, and highly responsive web layouts.
              </p>
            </div>

            {/* Founder 3 */}
            <div className="flex flex-col items-center text-center bg-white border border-primary-100 rounded-2xl p-6 shadow-soft sm:col-span-2 lg:col-span-1 mx-auto sm:max-w-xs lg:max-w-none">
              <div className="h-20 w-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                VD
              </div>
              <h3 className="text-base font-bold text-primary-900">Varun Das</h3>
              <p className="text-xs text-primary-450 font-semibold mb-3">Head of Verification & Safety</p>
              <p className="text-xs text-primary-600 leading-relaxed">
                Oversees background checks, document collection, and RERA status validation for listed items.
              </p>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};

export default About;
