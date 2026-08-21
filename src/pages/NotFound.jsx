import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

/**
 * Premium 404 Not Found Page.
 */
export const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-primary-50/20 px-6 py-16 text-center">
      
      {/* 404 Card container */}
      <div className="w-full max-w-md rounded-2xl border border-primary-150 bg-white p-8 md:p-10 shadow-soft-lg">
        
        {/* Error icon circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-6 mx-auto border border-rose-100 shadow-sm animate-bounce">
          <AlertCircle className="h-10 w-10" />
        </div>

        {/* Text descriptions */}
        <h1 className="text-6xl font-black tracking-tight text-primary-950 mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-primary-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm text-primary-600 leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back home!
        </p>

        {/* CTA Button */}
        <Link
          to="/"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white py-3 text-sm font-bold transition-all shadow-md active:scale-98"
        >
          <Home className="h-4.5 w-4.5" />
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
