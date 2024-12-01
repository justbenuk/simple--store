import FeaturedProducts from "@/components/home/featuren-products";
import Hero from "@/components/home/hero";
import LoadingContainer from "@/components/global/loading-container";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
