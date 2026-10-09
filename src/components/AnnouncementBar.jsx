import { Link } from 'react-router-dom';
export const AnnouncementBar = () => {
    return (<div className="bg-[#121212] border-b border-[#262626] text-[#F5F2EC]/80 text-[11px] uppercase tracking-[0.22em] py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-[#C6A15B]/90 font-light text-[10px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse"/>
          <span>COMPLIMENTARY GIFT WRAPPING ON ALL FLACONS</span>
        </div>

        <div className="flex-1 text-center font-normal tracking-[0.25em] text-[#F5F2EC] flex items-center justify-center gap-2">
          <span>FREE DELIVERY ON ORDERS ABOVE PKR 2,500</span>
          <span className="text-[#C6A15B] text-xs">·</span>
          <Link to="/shop" className="text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/50 transition-colors">
            DISCOVER
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px] text-[#F5F2EC]/60">
          <span className="hover:text-[#F5F2EC] transition-colors cursor-default">PKR (RS)</span>
          <span className="text-[#262626]">|</span>
          <Link to="/about" className="hover:text-[#C6A15B] transition-colors">
            HAUTE PARFUMERIE
          </Link>
        </div>
      </div>
    </div>);
};
export default AnnouncementBar;
