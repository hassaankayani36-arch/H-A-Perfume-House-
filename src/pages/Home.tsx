import React, { useEffect } from 'react';
import Hero from '../components/Hero.tsx';
import BrandStatement from '../components/BrandStatement.tsx';
import SignatureCollection from '../components/SignatureCollection.tsx';
import FeaturedFragrance from '../components/FeaturedFragrance.tsx';
import FragranceFinder from '../components/FragranceFinder.tsx';
import Founders from '../components/Founders.tsx';
import Lifestyle from '../components/Lifestyle.tsx';
import BestSellers from '../components/BestSellers.tsx';
import Packaging from '../components/Packaging.tsx';
import Reviews from '../components/Reviews.tsx';
import Journal from '../components/Journal.tsx';
import Instagram from '../components/Instagram.tsx';
import Newsletter from '../components/Newsletter.tsx';
import FinalCTA from '../components/FinalCTA.tsx';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* 3. Hero */}
      <Hero />

      {/* 4. Brand Statement */}
      <BrandStatement />

      {/* 5. The Signature Collection (4 large cards) */}
      <SignatureCollection />

      {/* 6. Featured Fragrance (H&A Noir) */}
      <FeaturedFragrance />

      {/* 7. Find Your Signature (Fresh, Woody, Oriental, Intense) */}
      <FragranceFinder />

      {/* 8. Founders Section ("THE STORY OF H&A", Hassaan & Arslan) */}
      <Founders />

      {/* 9. Lifestyle ("WEAR THE MOMENT.") */}
      <Lifestyle />

      {/* 10. Most Wanted (Best Sellers with rating and Add to Bag) */}
      <BestSellers />

      {/* 11. Packaging ("THE ART OF GIVING.") */}
      <Packaging />

      {/* 12. Reviews (Empty state only as specified) */}
      <Reviews />

      {/* 13. The H&A Journal (3 article cards) */}
      <Journal />

      {/* 14. Instagram grid "@H&A Luxury" */}
      <Instagram />

      {/* 15. Newsletter ("ENTER THE WORLD OF H&A.") */}
      <Newsletter />

      {/* 16. Final CTA ("WHAT WILL THEY REMEMBER YOU BY?") */}
      <FinalCTA />
    </div>
  );
};

export default Home;
