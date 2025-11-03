import React from "react";
import Banner from "../../components/headers/Banner";
import { HomeNavbar } from "../../components/headers/HomeNavbar";
import Statistics from "./Statistics";
import NewProducts from "./NewProducts";
import BannerBlock from "./BannerBlock";
import PopularProducts from "./PopularProducts";
import HeroBanner from "./HeroBanner";
import Events from "./Events";

export default function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Banner />
      <Statistics/>
      <NewProducts /> 
      <BannerBlock />
      <PopularProducts/>
      <HeroBanner />
      <Events />
    </>
  );
}