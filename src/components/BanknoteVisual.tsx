import React from 'react';

interface BanknoteVisualProps {
  amount: number;
  className?: string;
}

export const BanknoteVisual: React.FC<BanknoteVisualProps> = ({ amount, className = '' }) => {
  // Check if we have an actual scanned image for this amount
  const imageMap: Record<number, string> = {
    1: '/currency/1_le.jpg',
    5: '/currency/5_le.jpg',
    10: '/currency/10_le.jpg',
    20: '/currency/20_le.jpg',
    50: '/currency/50_le.jpg',
    100: '/currency/100_le.jpg',
    200: '/currency/200_le.jpg',
  };

  const imageSrc = imageMap[amount];

  if (imageSrc) {
    const isCoin = amount === 1;
    return (
      <div
        className={`relative w-44 h-24 rounded-lg border-2 border-slate-300/80 overflow-hidden shadow-sm select-none transition-all duration-200 hover:shadow-md bg-white flex items-center justify-center ${className}`}
      >
        <img
          src={imageSrc}
          alt={`Egyptian ${amount} ${isCoin ? 'Pound Coin' : 'Pounds Banknote'}`}
          className={isCoin ? "h-20 w-20 object-contain rounded-full shadow-inner" : "w-full h-full object-cover"}
          referrerPolicy="no-referrer"
        />
        {/* Subtle authentic paper texture/shimmer overlay for extra polish */}
        {!isCoin && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/5 pointer-events-none mix-blend-overlay" />}
      </div>
    );
  }

  // Determine banknote color scheme, mosque name, and design based on the Egyptian pound value
  let primaryColor = 'from-amber-600 to-amber-750';
  let bgColor = 'bg-amber-50';
  let borderColor = 'border-amber-200';
  let valueTextAr = '١';
  let valueTextEn = '1 LE';
  let mosqueName = 'Qaitbay Mosque';
  let patternColor = 'rgba(217, 119, 6, 0.1)';
  let securityStripColor = 'bg-yellow-400/80';
  let polymerWindow = false;

  switch (amount) {
    case 1:
      primaryColor = 'from-stone-500 to-stone-700';
      bgColor = 'bg-stone-50';
      borderColor = 'border-stone-200';
      valueTextAr = '١';
      valueTextEn = '1 LE';
      mosqueName = 'Mosque of Qaitbay';
      patternColor = 'rgba(120, 113, 108, 0.1)';
      securityStripColor = 'bg-stone-400/80';
      break;
    case 5:
      primaryColor = 'from-teal-600 to-teal-800';
      bgColor = 'bg-teal-50';
      borderColor = 'border-teal-200';
      valueTextAr = '٥';
      valueTextEn = '5 LE';
      mosqueName = 'Ibn Tulun Mosque';
      patternColor = 'rgba(13, 148, 136, 0.1)';
      securityStripColor = 'bg-teal-400/80';
      break;
    case 10:
      // New Polymer 10 LE
      primaryColor = 'from-orange-500 to-amber-700';
      bgColor = 'bg-orange-50/50';
      borderColor = 'border-orange-200';
      valueTextAr = '١٠';
      valueTextEn = '10 LE';
      mosqueName = "Al-Rifa'i Mosque";
      patternColor = 'rgba(249, 115, 22, 0.12)';
      securityStripColor = 'bg-[#f59e0b]/70';
      polymerWindow = true;
      break;
    case 20:
      // New Polymer 20 LE
      primaryColor = 'from-emerald-600 to-teal-800';
      bgColor = 'bg-emerald-50/50';
      borderColor = 'border-emerald-200';
      valueTextAr = '٢٠';
      valueTextEn = '20 LE';
      mosqueName = 'Muhammad Ali Mosque';
      patternColor = 'rgba(16, 185, 129, 0.12)';
      securityStripColor = 'bg-emerald-400/70';
      polymerWindow = true;
      break;
    case 50:
      primaryColor = 'from-rose-600 to-rose-800';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-200';
      valueTextAr = '٥٠';
      valueTextEn = '50 LE';
      mosqueName = 'Abu Hereba Mosque';
      patternColor = 'rgba(225, 29, 72, 0.1)';
      securityStripColor = 'bg-rose-400/80';
      break;
    case 100:
      primaryColor = 'from-violet-600 to-indigo-800';
      bgColor = 'bg-indigo-50/50';
      borderColor = 'border-indigo-200';
      valueTextAr = '١٠٠';
      valueTextEn = '100 LE';
      mosqueName = 'Sultan Hassan Mosque';
      patternColor = 'rgba(79, 70, 229, 0.12)';
      securityStripColor = 'bg-amber-400/80';
      break;
    case 200:
      primaryColor = 'from-olive-600 to-lime-900';
      bgColor = 'bg-yellow-50/30';
      borderColor = 'border-yellow-200';
      valueTextAr = '٢٠٠';
      valueTextEn = '200 LE';
      mosqueName = 'Qani-Bay Mosque';
      patternColor = 'rgba(132, 204, 22, 0.1)';
      securityStripColor = 'bg-yellow-600/80';
      break;
  }

  return (
    <div
      className={`relative w-44 h-24 rounded-lg border-2 ${borderColor} ${bgColor} overflow-hidden shadow-sm flex flex-col justify-between p-2 font-serif select-none transition-all duration-200 hover:shadow-md ${className}`}
    >
      {/* Dynamic Background Islamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ color: patternColor }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`pattern-${amount}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 20 10 L 10 20 L 0 10 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
              <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${amount})`} />
        </svg>
      </div>

      {/* Holographic Polymer Window (For 10 and 20 LE) */}
      {polymerWindow && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100/30 border border-slate-300/50 backdrop-blur-[1px] flex items-center justify-center overflow-hidden shadow-inner pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400/40 via-pink-400/40 to-yellow-400/40 animate-pulse flex items-center justify-center">
            <span className="text-[7px] font-black font-sans text-slate-800/60">{valueTextAr}</span>
          </div>
        </div>
      )}

      {/* Holographic Vertical Security Strip (Non-polymer) */}
      {!polymerWindow && (
        <div className={`absolute right-10 top-0 bottom-0 w-2.5 ${securityStripColor} opacity-75 shadow-inner flex flex-col justify-around py-1 items-center pointer-events-none`}>
          <div className="w-1.5 h-1 bg-white/40 rounded-full"></div>
          <div className="w-1.5 h-1 bg-white/40 rounded-full"></div>
          <div className="w-1.5 h-1 bg-white/40 rounded-full"></div>
        </div>
      )}

      {/* Banknote Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
          <span className="text-[7px] leading-tight font-sans tracking-wide text-slate-600 font-bold uppercase">
            Central Bank of Egypt
          </span>
          <span className="text-[6px] leading-tight font-sans text-slate-500 font-medium">
            البنك المركزي المصري
          </span>
        </div>
        <div className="text-right flex flex-col">
          <span className="text-xs font-black bg-gradient-to-r text-slate-800">
            {valueTextAr}
          </span>
          <span className="text-[5px] text-slate-400 font-bold uppercase tracking-wider">
            Pounds
          </span>
        </div>
      </div>

      {/* Center Motif (Mosque Silhouette & Sphinx/Pharaonic Details) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none">
        <svg viewBox="0 0 100 50" className="w-20 h-10 text-slate-800">
          {/* Detailed Mosque/Pharaonic vector outline based on amount */}
          {amount === 100 ? (
            <g fill="currentColor">
              {/* Sultan Hassan Mosque */}
              <rect x="25" y="25" width="50" height="20" rx="1" />
              <rect x="35" y="15" width="6" height="10" />
              <polygon points="35,15 38,5 41,15" />
              <rect x="60" y="10" width="4" height="15" />
              <polygon points="60,10 62,0 64,10" />
              <circle cx="50" cy="25" r="4" />
            </g>
          ) : amount === 20 ? (
            <g fill="currentColor">
              {/* Mosque of Muhammad Ali */}
              <rect x="30" y="25" width="40" height="20" rx="1" />
              <path d="M40,25 Q50,15 60,25 Z" />
              <rect x="35" y="10" width="3" height="15" />
              <polygon points="35,10 36.5,2 38,10" />
              <rect x="62" y="10" width="3" height="15" />
              <polygon points="62,10 63.5,2 65,10" />
            </g>
          ) : amount === 10 ? (
            <g fill="currentColor">
              {/* Al-Rifa'i Mosque */}
              <rect x="30" y="22" width="40" height="23" rx="1" />
              <rect x="35" y="8" width="4" height="14" />
              <polygon points="35,8 37,0 39,8" />
              <rect x="61" y="8" width="4" height="14" />
              <polygon points="61,8 63,0 65,8" />
              <path d="M45,22 Q50,16 55,22 Z" />
            </g>
          ) : (
            <g fill="currentColor">
              {/* Generic Mosque silhouette */}
              <rect x="30" y="25" width="40" height="20" rx="1" />
              <path d="M40,25 Q50,12 60,25 Z" />
              <rect x="48" y="5" width="4" height="20" />
              <polygon points="48,5 50,0 52,5" />
            </g>
          )}
        </svg>
      </div>

      {/* Banknote Footer */}
      <div className="flex justify-between items-end z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold tracking-tight text-slate-850">
            {valueTextEn}
          </span>
          <span className="text-[5px] text-slate-400 font-bold uppercase tracking-wider">
            {mosqueName}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[6px] font-sans font-bold text-slate-500 block leading-none">
            جمهورية مصر العربية
          </span>
          <span className="text-[7px] font-sans font-extrabold text-slate-700 block leading-tight mt-0.5">
            البنك المركزي
          </span>
        </div>
      </div>
    </div>
  );
};
