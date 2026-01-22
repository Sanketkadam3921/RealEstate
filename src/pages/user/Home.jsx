import GradientBox from "../../components/common/GradientBox";
import FeaturedProperties from "../../features/home/FeaturedProperties";
import HeroSection from "../../features/home/HeroSection";
import PropertyCategories from "../../features/home/PropertyCategories";
import Testimonials from "../../features/home/Testimonials";
import WhyChooseZonix from "../../features/home/WhyChooseUs";
function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <PropertyCategories></PropertyCategories>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseZonix></WhyChooseZonix>
      <Testimonials></Testimonials>
    </>
  );
}
export default Home;
