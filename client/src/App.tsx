import { ThemeProvider } from "@/components/ui/theme-provider";
import { Homepage } from "./Homepage";
import { Routes, Route } from "react-router-dom";
import { StyledLink } from "./components/ui/StyledLink";
import { AuthForm } from "./components/AuthForm";
import { Businesses } from "./Businesses";
import { Members } from "./Members";
import { Reviews } from "./Reviews";
import { FAQ } from "./FAQ";
import { useEffect, useState } from "react";
import { Business, Member } from "./lib/frontendTypes";
import { MemberDetail } from "./components/MemberDetail";
import { BusinessDetail } from "./components/BusinessDetail";

function App() {
  // Initializing members and businesses state
  const [members, setMembers] = useState<Member[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  // FETCH Functions to set frontend state
  const fetchMemberData = async () => {
    const response = await fetch("/api/members");
    const json = await response.json();
    setMembers(json as Member[]);
  };
  const fetchBusinessData = async () => {
    const response = await fetch("/api/businesses");
    const json = await response.json();
    setBusinesses(json as Business[]);
  };
  useEffect(() => {
    fetchMemberData();
    fetchBusinessData();
  }, []);
  return (
    <>
      <main>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <h1>Business Reviews</h1>
          <nav className="navbar flex-rows gap-4">
            <div role="tablist" className="flex-1 tabs tabs-boxed">
              {/* //TODO useLocation for active tab in classname with template strings */}
              <StyledLink role="tab" className="tab" to="/">
                Home
              </StyledLink>
              <StyledLink role="tab" className="tab" to="/businesses">
                Businesses ({businesses.length})
              </StyledLink>
              <StyledLink role="tab" className="tab" to="/members">
                Members ({members.length})
              </StyledLink>
              <StyledLink role="tab" className="tab" to="/reviews">
                Reviews
              </StyledLink>
              <StyledLink role="tab" className="tab" to="/faq">
                FAQ
              </StyledLink>
            </div>
            <div className="flex-0">
              <AuthForm />
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/businesses"
              element={<Businesses businesses={businesses} />}
            />
            <Route
              path="/businesses/:id"
              element={<BusinessDetail businesses={businesses} />}
            />
            <Route path="/members" element={<Members members={members} />} />
            <Route
              path="/members/:id"
              element={<MemberDetail members={members} />}
            />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </ThemeProvider>
      </main>
    </>
  );
}

export default App;
