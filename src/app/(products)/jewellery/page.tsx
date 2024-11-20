import { Jewellery } from "@/shared-pages/jewellery/banner";
import { CardListingSection } from "@/shared-pages/jewellery/content";
import Image from "next/image";
import React from "react";

const Main = () => {
  return (
    <main>
      <Jewellery />
      <CardListingSection />
    </main>
  );
};

export default Main;
