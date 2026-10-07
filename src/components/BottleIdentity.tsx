import React from 'react';
import { Product } from '../data/products.ts';

const familyFinishes = {
  Fresh: { foil: 'text-emerald-200', border: 'border-emerald-200/70', rule: 'bg-emerald-200/70' },
  Woody: { foil: 'text-amber-200', border: 'border-amber-200/70', rule: 'bg-amber-200/70' },
  Oriental: { foil: 'text-rose-200', border: 'border-rose-200/70', rule: 'bg-rose-200/70' },
  Intense: { foil: 'text-[#DFC27D]', border: 'border-[#C6A15B]/80', rule: 'bg-[#C6A15B]/80' },
} as const;

const BottleIdentity: React.FC<{ product: Product }> = ({ product }) => {
  const finish = familyFinishes[product.family];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-[56%] z-[1] flex min-h-[58px] w-[34%] max-w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border bg-[#0B0B0B]/88 px-1.5 py-1.5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.55)] outline outline-1 outline-offset-[-4px] outline-white/10 backdrop-blur-[2px] ${finish.border}`}
    >
      <span className={`font-serif text-[9px] tracking-[0.2em] ${finish.foil}`}>H&amp;A</span>
      <span className={`my-0.5 h-px w-5 ${finish.rule}`} />
      <span className="max-w-full text-[7px] font-medium uppercase leading-tight tracking-[0.08em] text-[#F5F2EC]">
        {product.name}
      </span>
      <span className={`mt-0.5 text-[5px] uppercase tracking-[0.12em] ${finish.foil}`}>
        {product.concentration.split(' — ')[0]}
      </span>
      <span className="mt-0.5 text-[5px] uppercase tracking-[0.2em] text-[#F5F2EC]/55">
        {product.volume}
      </span>
    </div>
  );
};

export default BottleIdentity;
