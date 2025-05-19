import DDLInput from "./components/ddl_input";
import Navbar from "./components/navbar";
import HeroSection from "@/components/landing/herosection";
import HowItWorksSection from "@/components/landing/howitworks";
import Footer from "@/components/footer";
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <DDLInput />
      <Footer />
    </>
  );
}

export default App;
