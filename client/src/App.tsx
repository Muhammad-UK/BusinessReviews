import { ThemeProvider } from "@/components/ui/theme-provider";
import { Homepage } from "./Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import { StyledLink } from "./components/ui/StyledLink";
import { AuthForm } from "./components/AuthForm";
import { Businesses } from "./Businesses";
import { Members } from "./Members";
import { CreateReview } from "./CreateReview";
import { FAQ } from "./FAQ";
import { createContext, useEffect, useState } from "react";
import { AuthContextType, Business, Member, Review } from "./lib/frontendTypes";
import { MemberDetail } from "./components/MemberDetail";
import { BusinessDetail } from "./components/BusinessDetail";
import { Button } from "./components/ui/button";

// Creating context in here instead of a separate context.tsx file because I only have one so far
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function App() {
  // Initializing members and businesses state
  const [members, setMembers] = useState<Member[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  // Initializing reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  // Initializing auth and formError state
  const [auth, setAuth] = useState<Member | undefined>();
  const [formError, setFormError] = useState<Error | undefined>();

  const { pathname } = useLocation();

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
    setFormError(undefined);
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
  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    const json = await response.json();
    setReviews(json as Review[]);
  };
  useEffect(() => {
    fetchMemberData();
    fetchBusinessData();
    fetchReviews();
  }, [auth]);

  const createReviewFn = async (review: Review) => {
    const token = window.localStorage.getItem("token");
    const createdReview = {
      review: {
        rating: review.rating,
        comment: review.comment || "",
      },
    };
    if (token) {
      const response = await fetch(`/api/reviews/${review.business_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(createdReview),
      });
      const json = await response.json();
      if (response.ok) {
        setReviews([...reviews, json.review]);
        setFormError(undefined);
        fetchBusinessData();
        fetchMemberData();
      } else {
        setFormError(Error("Review Creation Error"));
      }
    }
  };

  // Helper functions to set reviews to members and businesses and do any related logic
  // TODO I tried to make useEffects work but I couldn't get it to rerender properly whenever the pages were reloaded
  // Feedback on how I could've made this work would be appreciated
  const setMembersReviews = () => {
    members.forEach((member) => {
      member.reviews = reviews.filter(
        (review) => review.member_id === member.id
      );
      member.reviews.forEach((review) => {
        const tempBusiness = businesses.find(
          (business) => business.id === review.business_id
        );
        if (tempBusiness) {
          review.business_name = tempBusiness.name;
        }
      });
    });
  };
  const setBusinessesReviews = () => {
    businesses.forEach((business) => {
      business.reviews = reviews.filter(
        (review) => review.business_id === business.id
      );
      business.reviews.forEach((review) => {
        const tempMember = members.find(
          (member) => member.id === review.member_id
        );
        if (tempMember) {
          review.member_name = tempMember.username;
        }
      });
    });
  };

  const AuthContextValues: AuthContextType = {
    auth,
    reviews,
    businesses,
    createReviewFn,
    formError,
    login,
    register,
  };

  return (
    <>
      <main>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <h1>Business Reviews</h1>
          <nav className="navbar flex-rows gap-4">
            <div role="tablist" className="flex-1 tabs tabs-boxed">
              {/* //TODO change default active tab colors to some blue */}
              <StyledLink
                role="tab"
                className={`tab ${pathname === "/" ? "tab-active" : ""}`}
                to="/"
              >
                Home
              </StyledLink>
              <StyledLink
                role="tab"
                className={`tab ${
                  pathname === "/businesses" ? "tab-active" : ""
                }`}
                to="/businesses"
              >
                Businesses ({businesses.length})
              </StyledLink>
              <StyledLink
                role="tab"
                className={`tab ${pathname === "/members" ? "tab-active" : ""}`}
                to="/members"
              >
                Members ({members.length})
              </StyledLink>
              <StyledLink
                role="tab"
                className={`tab ${
                  pathname === "/createreviews" ? "tab-active" : ""
                }`}
                to="/createreviews"
              >
                Create A Review ({reviews.length})
              </StyledLink>
              <StyledLink
                role="tab"
                className={`tab ${pathname === "/faq" ? "tab-active" : ""}`}
                to="/faq"
              >
                FAQ
              </StyledLink>
            </div>
            <div className="flex-0">
              {auth && <Button onClick={logout}>Logout</Button>}
              {!auth && !pathname.startsWith("/createreviews") && (
                <AuthContext.Provider value={AuthContextValues}>
                  <AuthForm />
                </AuthContext.Provider>
              )}
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/businesses"
              element={
                <Businesses
                  businesses={businesses}
                  setBusinessesReviews={setBusinessesReviews}
                />
              }
            />
            <Route
              path="/businesses/:id"
              element={
                <BusinessDetail
                  businesses={businesses}
                  setBusinessesReviews={setBusinessesReviews}
                />
              }
            />
            <Route
              path="/members"
              element={
                <Members
                  members={members}
                  setMembersReviews={setMembersReviews}
                />
              }
            />
            <Route
              path="/members/:id"
              element={
                <MemberDetail
                  members={members}
                  setMembersReviews={setMembersReviews}
                />
              }
            />
            <Route
              path="/createreviews"
              element={
                <AuthContext.Provider value={AuthContextValues}>
                  <CreateReview />
                </AuthContext.Provider>
              }
            />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </ThemeProvider>
      </main>
    </>
  );
}

export default App;
