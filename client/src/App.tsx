import { ThemeProvider } from "@/components/theme-provider";
import DDLInput from "./components/ddl_input";
import Navbar from "./components/navbar";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <DDLInput />
    </ThemeProvider>
  );
}

export default App;
