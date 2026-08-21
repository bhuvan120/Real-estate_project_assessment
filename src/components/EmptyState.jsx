import React from 'react';
import { Home, RefreshCw } from 'lucide-react';

/**
 * Premium Empty State fallback.
 * 
 * @param {Object} props
 * @param {string} [props.title='No Properties Found'] - Main title text
 * @param {string} [props.description='We couldn\'t find any listings matching your search criteria. Try clearing some filters or searching for something else.'] - Details text
 * @param {Function} [props.onClear] - Clear filters callback
 * @param {string} [props.clearLabel='Clear All Filters'] - Label for the clear button
 */
export const EmptyState = ({
  title = 'No Properties Found',
  description = "We couldn't find any listings matching your search criteria. Try clearing some filters or searching for something else.",
  onClear,
  clearLabel = 'Clear All Filters',
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-primary-200 bg-primary-50/30 max-w-2xl mx-auto">
      {/* Icon Wrapper */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-5 border border-brand-100/50 shadow-inner">
        <Home className="h-8 w-8" />
      </div>

      {/* Text block */}
      <h3 className="text-xl font-bold text-primary-900 mb-2">{title}</h3>
      <p className="text-sm text-primary-600 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {onClear && (
        <button
          onClick={onClear}
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-98"
        >
          <RefreshCw className="h-4 w-4" />
          {clearLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
