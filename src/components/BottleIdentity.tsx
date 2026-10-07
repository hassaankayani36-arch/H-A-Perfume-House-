import React from 'react';
import { Product } from '../data/products.ts';

const BottleIdentity: React.FC<{ product: Product }> = ({ product }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-[49%] z-[1] flex min-h-[72px] w-[38%] max-w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border border-[#C6A15B]/75 bg-[#0B0B0B]/75 px-1.5 py-2 text-center shadow-[0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-[1px]"
  >
    <span className="font-serif text-[10px] tracking-[0.18em] text-[#DFC27D]">H&amp;A</span>
    <span className="my-1 h-px w-5 bg-[#C6A15B]/80" />
    <span className="max-w-full text-[7px] font-medium uppercase leading-tight tracking-[0.1em] text-[#F5F2EC]">
      {product.name}
    </span>
    <span className="mt-1 text-[6px] uppercase tracking-[0.18em] text-[#DFC27D]/90">
      PARFUM
    </span>
  </div>
);

export default BottleIdentity;
