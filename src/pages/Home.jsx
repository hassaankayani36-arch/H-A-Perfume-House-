import { useEffect } from 'react';
import Hero from '../components/Hero.jsx';
import BrandStatement from '../components/BrandStatement.jsx';
import SignatureCollection from '../components/SignatureCollection.jsx';
import FeaturedFragrance from '../components/FeaturedFragrance.jsx';
import FragranceFinder from '../components/FragranceFinder.jsx';
import Lifestyle from '../components/Lifestyle.jsx';
import BestSellers from '../components/BestSellers.jsx';
import Packaging from '../components/Packaging.jsx';
import Reviews from '../components/Reviews.jsx';
import Journal from '../components/Journal.jsx';
import Newsletter from '../components/Newsletter.jsx';
import FinalCTA from '../components/FinalCTA.jsx';
export const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (<div className="w-full">
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

      {/* 8. Lifestyle ("WEAR THE MOMENT.") */}
      <Lifestyle />

      {/* 10. Most Wanted (Best Sellers with rating and Add to Bag) */}
      <BestSellers />

      {/* 11. Packaging ("THE ART OF GIVING.") */}
      <Packaging />

      {/* 12. Reviews (Empty state only as specified) */}
      <Reviews />

      {/* 13. The H&A Journal (3 article cards) */}
      <Journal />

      {/* <Instagram /> Temporarily hidden until the content is ready to update. */}

      {/* 15. Newsletter ("ENTER THE WORLD OF H&A.") */}
      <Newsletter />

      {/* 16. Final CTA ("WHAT WILL THEY REMEMBER YOU BY?") */}
      <FinalCTA />
    </div>);
};
export default Home;
