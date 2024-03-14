import { ThemeProvider } from "@/components/ui/theme-provider";
import { Homepage } from "./Homepage";
import { Routes, Route } from "react-router-dom";
import { StyledLink } from "./components/ui/StyledLink";
import { AuthForm } from "./components/AuthForm";

function App() {
  return (
    <>
      <main>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <h1>Business Reviews</h1>
          <nav className="navbar flex flex-rows gap-4">
            <div className="flex-1">
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/businesses">Businesses</StyledLink>
              <StyledLink to="/members">Members</StyledLink>
            </div>
            <div className="flex-0">
              <AuthForm />
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/businesses" element={<Homepage />} />
            <Route path="/members" element={<Homepage />} />
          </Routes>
        </ThemeProvider>
      </main>
    </>
  );
}

export default App;
