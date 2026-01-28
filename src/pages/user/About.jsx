import AboutHero from "../../features/about/HeroSection";
import ExclusivePropertySection from "../../features/about/ExclusiveSection";
import MissionVision from "../../features/about/MissionVision";
import WhatWeDo from "../../features/about/WhatWeDo";
import CTASection from "../../features/about/CTA";
function About() {
  return (
    <>
      <AboutHero></AboutHero>
      <ExclusivePropertySection></ExclusivePropertySection>
      <MissionVision />
      <WhatWeDo />
      <CTASection />
    </>
  );
}
export default About;
