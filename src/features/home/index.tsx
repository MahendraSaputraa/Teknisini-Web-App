import CtaSection from "./components/cta-section";
import Hero from "./components/hero";
import StepSection from "./components/step-section";
import WhySection from "./components/why-section";

export default function HomePageData() {
  return (
    <>
      <Hero />
      <WhySection />
      <StepSection />
      <CtaSection />
    </>
  );
}
