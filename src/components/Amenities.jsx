import React from 'react';
import {
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  Building,
  Zap,
  ArrowUpDown,
  Footprints,
  UserCheck,
  Leaf,
  Flag,
  Cpu,
  Wind,
  Compass,
  Briefcase,
  Droplet,
  Sun,
  CloudRain,
  Flame,
  CheckCircle,
} from 'lucide-react';

// Map amenity names to corresponding Lucide icons and colors
const iconMap = {
  'swimming pool': { icon: Waves, color: 'text-sky-500 bg-sky-50' },
  'private pool': { icon: Waves, color: 'text-sky-600 bg-sky-50' },
  'gym': { icon: Dumbbell, color: 'text-emerald-500 bg-emerald-50' },
  'parking': { icon: Car, color: 'text-blue-500 bg-blue-50' },
  'security': { icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-50' },
  'club house': { icon: Building, color: 'text-violet-500 bg-violet-50' },
  'power backup': { icon: Zap, color: 'text-amber-500 bg-amber-50' },
  'elevator': { icon: ArrowUpDown, color: 'text-gray-500 bg-gray-50' },
  'jogging track': { icon: Footprints, color: 'text-green-500 bg-green-50' },
  'concierge service': { icon: UserCheck, color: 'text-purple-500 bg-purple-50' },
  'private garden': { icon: Leaf, color: 'text-emerald-600 bg-emerald-50' },
  'golf course access': { icon: Flag, color: 'text-teal-600 bg-teal-50' },
  'smart home tech': { icon: Cpu, color: 'text-cyan-500 bg-cyan-50' },
  'centralized ac': { icon: Wind, color: 'text-blue-500 bg-blue-50' },
  'conference rooms': { icon: Building, color: 'text-purple-500 bg-purple-50' },
  'vaastu compliant': { icon: Compass, color: 'text-orange-500 bg-orange-50' },
  'servant quarter': { icon: Briefcase, color: 'text-slate-500 bg-slate-50' },
  'water purifier': { icon: Droplet, color: 'text-blue-400 bg-blue-50' },
  'private terrace': { icon: Sun, color: 'text-amber-500 bg-amber-50' },
  'rainwater harvesting': { icon: CloudRain, color: 'text-cyan-500 bg-cyan-50' },
  'tennis court': { icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50' }, // Standardize if trophy is missing, we'll use check
  'fire safety systems': { icon: Flame, color: 'text-rose-500 bg-rose-50' },
  'fire sprinklers': { icon: Flame, color: 'text-rose-500 bg-rose-50' },
};

// Simple wrapper in case Trophy is needed or check
const getIconData = (name) => {
  const normalized = name.toLowerCase().trim();
  if (normalized === 'tennis court') {
    return { icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50' }; // fallback
  }
  return iconMap[normalized] || { icon: CheckCircle, color: 'text-brand-500 bg-brand-50' };
};

/**
 * Renders a grid of property amenities with customized icons and colored background badges.
 * 
 * @param {Object} props
 * @param {Array<string>} props.list - Array of amenity strings
 * @param {string} [props.className] - Additional grid styling classes
 */
export const Amenities = ({ list = [], className = '' }) => {
  if (!list || list.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
      {list.map((amenity, index) => {
        const { icon: IconComponent, color } = getIconData(amenity);
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl border border-primary-100 bg-white transition-all duration-300 hover:shadow-soft"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-primary-800 leading-tight">
              {amenity}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Amenities;
