import { ThemeProvider } from "@/components/theme-provider";
import DDLInput from "./components/ddl_input";
import Navbar from "./components/navbar";
import HeroSection from "@/components/landing/herosection";
import HowItWorksSection from "@/components/landing/howitworks";
import Footer from "@/components/footer";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <HeroSection/>
      <HowItWorksSection />
      <DDLInput />
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
