import React from 'react';
import { BadgeCheck } from 'lucide-react';

export const VerifiedBadge: React.FC<{ size?: number, showText?: boolean }> = ({ size = 16, showText = true }) => {
  return (
    <div className="inline-flex items-center gap-1" title="Verified Seller">
      <BadgeCheck size={size} fill="#FE7F42" className="text-[#2A1617]" />
      {showText && <span className="text-xs font-semibold tracking-wide uppercase text-[#FE7F42]">Verified</span>}
    </div>
  );
};