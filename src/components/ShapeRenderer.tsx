import React from 'react';

interface ShapeRendererProps {
  type: 'square' | 'rectangle' | 'triangle' | 'circle' | 'cube' | 'pyramid' | 'cone' | 'sphere' | 'cuboid' | 'cylinder';
  size?: number;
  className?: string;
}

export const ShapeRenderer: React.FC<ShapeRendererProps> = ({ type, size = 64, className = '' }) => {
  switch (type) {
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <rect x="15" y="15" width="70" height="70" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="4" rx="6" />
        </svg>
      );

    case 'rectangle':
      return (
        <svg width={size * 1.3} height={size} viewBox="0 0 130 100" className={className}>
          <rect x="15" y="25" width="100" height="50" fill="#10b981" stroke="#065f46" strokeWidth="4" rx="6" />
        </svg>
      );

    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <polygon points="50,15 88,80 12,80" fill="#ef4444" stroke="#991b1b" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );

    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="38" fill="#f59e0b" stroke="#78350f" strokeWidth="4" />
        </svg>
      );

    case 'cube':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          {/* Top Face */}
          <polygon points="50,15 85,30 50,45 15,30" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="3" />
          {/* Left Face */}
          <polygon points="15,30 50,45 50,85 15,70" fill="#2563eb" stroke="#1e3a8a" strokeWidth="3" />
          {/* Right Face */}
          <polygon points="50,45 85,30 85,70 50,85" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="3" />
        </svg>
      );

    case 'pyramid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          {/* Front Face */}
          <polygon points="50,15 85,80 50,85" fill="#fbbf24" stroke="#78350f" strokeWidth="3" />
          {/* Left Face */}
          <polygon points="50,15 50,85 15,80" fill="#d97706" stroke="#78350f" strokeWidth="3" />
        </svg>
      );

    case 'cone':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <path d="M 50 15 L 85 75 A 35 12 0 0 1 15 75 Z" fill="#ec4899" stroke="#831843" strokeWidth="3" />
          <ellipse cx="50" cy="75" rx="35" ry="12" fill="#be185d" stroke="#831843" strokeWidth="3" />
        </svg>
      );

    case 'sphere':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill="url(#sphereGrad)" stroke="#312e81" strokeWidth="3" />
        </svg>
      );

    case 'cuboid':
      return (
        <svg width={size * 1.3} height={size} viewBox="0 0 130 100" className={className}>
          <polygon points="35,15 115,15 95,35 15,35" fill="#34d399" stroke="#065f46" strokeWidth="3" />
          <polygon points="15,35 95,35 95,80 15,80" fill="#059669" stroke="#065f46" strokeWidth="3" />
          <polygon points="95,35 115,15 115,60 95,80" fill="#047857" stroke="#065f46" strokeWidth="3" />
        </svg>
      );

    case 'cylinder':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <rect x="20" y="25" width="60" height="50" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
          <ellipse cx="50" cy="75" rx="30" ry="12" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
          <ellipse cx="50" cy="25" rx="30" ry="12" fill="#7dd3fc" stroke="#0369a1" strokeWidth="3" />
        </svg>
      );

    default:
      return null;
  }
};
