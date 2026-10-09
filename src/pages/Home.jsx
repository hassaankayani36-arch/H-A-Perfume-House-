import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import BrandStatement from "../components/BrandStatement.jsx";
import SignatureCollection from "../components/SignatureCollection.jsx";
import FeaturedFragrance from "../components/FeaturedFragrance.jsx";
import FragranceFinder from "../components/FragranceFinder.jsx";
import Founders from "../components/Founders.jsx";
import Lifestyle from "../components/Lifestyle.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Packaging from "../components/Packaging.jsx";
import Reviews from "../components/Reviews.jsx";
import Journal from "../components/Journal.jsx";
import Instagram from "../components/Instagram.jsx";
import Newsletter from "../components/Newsletter.jsx";
import FinalCTA from "../components/FinalCTA.jsx";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(BrandStatement, {}),
    /* @__PURE__ */ jsx(SignatureCollection, {}),
    /* @__PURE__ */ jsx(FeaturedFragrance, {}),
    /* @__PURE__ */ jsx(FragranceFinder, {}),
    /* @__PURE__ */ jsx(Founders, {}),
    /* @__PURE__ */ jsx(Lifestyle, {}),
    /* @__PURE__ */ jsx(BestSellers, {}),
    /* @__PURE__ */ jsx(Packaging, {}),
    /* @__PURE__ */ jsx(Reviews, {}),
    /* @__PURE__ */ jsx(Journal, {}),
    /* @__PURE__ */ jsx(Instagram, {}),
    /* @__PURE__ */ jsx(Newsletter, {}),
    /* @__PURE__ */ jsx(FinalCTA, {})
  ] });
};
var Home_default = Home;
export {
  Home,
  Home_default as default
};
