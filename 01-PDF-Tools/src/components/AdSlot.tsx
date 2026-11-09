import React, { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG } from '../config/adsenseConfig';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isLoadedRef = useRef(false);

  if (!ADSENSE_CONFIG.enabled || !ADSENSE_CONFIG.publisherId || !slotId) {
    return null;
  }

  useEffect(() => {
    if (isLoadedRef.current) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch (e) {
      console.warn('AdSense script error:', e);
    }
  }, []);

  return (
    <aside
      className={`relative my-6 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-center transition-all ${className}`}
      aria-label={label}
    >
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="w-full flex justify-center items-center min-h-[90px] overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADSENSE_CONFIG.publisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};

