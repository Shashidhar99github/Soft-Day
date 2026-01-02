
import React from 'react';

interface AppIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ className = '', size = 48, color = 'currentColor' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract Wave / Lotus stylized symbol */}
      <path 
        d="M50 85C50 85 85 65 85 40C85 25 75 15 65 15C55 15 50 25 50 25C50 25 45 15 35 15C25 15 15 25 15 40C15 65 50 85 50 85Z" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-20"
      />
      <path 
        d="M20 50C20 50 35 45 50 55C65 65 80 50 80 50" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-40"
      />
      <circle cx="50" cy="50" r="1.5" fill={color} />
      {/* Bottom minimalist line */}
      <path d="M35 80Q50 75 65 80" stroke={color} strokeWidth="1.5" strokeLinecap="round" className="opacity-30" />
    </svg>
  );
};

export default AppIcon;
