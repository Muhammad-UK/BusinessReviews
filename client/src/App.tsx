import { ThemeProvider } from "@/components/theme-provider";
import { Homepage } from "./Homepage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { StyledLink } from "./StyledLink";

function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1>Business Reviews</h1>
        <nav className="navbar">
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/businesses">Businesses</StyledLink>
          <StyledLink to="/members">Members</StyledLink>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/businesses" element={<Homepage />} />
          <Route path="/members" element={<Homepage />} />
        </Routes>
      </ThemeProvider>
    </main>
  );
}

export default App;
