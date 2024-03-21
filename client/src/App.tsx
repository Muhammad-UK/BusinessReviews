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
import { Button } from "./components/ui/button";

function App() {
  // Initializing members and businesses state
  const [members, setMembers] = useState<Member[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  // Initializing auth and formError state
  const [auth, setAuth] = useState<Member | undefined>();
  const [formError, setFormError] = useState<Error | undefined>();

  // Login Helper function
  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json as Member);
      }
    }
  };
  // Login/Logout and Register functions
  const login = async (credentials?: Member) => {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
      setFormError(undefined);
    } else {
      setFormError(Error("Login Error"));
    }
  };
  const register = async (credentials?: Member) => {
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
      setFormError(undefined);
    } else {
      setFormError(Error("Registration Error"));
    }
  };
  const logout = async () => {
    window.localStorage.removeItem("token");
    setAuth(undefined);
  };

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
  }, [auth]);
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
              {auth ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <AuthForm
                  login={login}
                  register={register}
                  formError={formError}
                />
              )}
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
