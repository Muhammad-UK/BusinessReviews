import { createContext } from "react";
import { AuthContextType, FormContextType } from "../lib/frontendTypes";

// Form Context, including AuthForm and CreateReview
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);
// AuthGlobal Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
