import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthContextType, Member } from "@/lib/frontendTypes";
import React, { useContext, useState } from "react";

export const AuthForm = () => {
  const contextValues = useContext(AuthContext);
  if (!contextValues) return null;
  const { formError, login, register } = contextValues as AuthContextType;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    ev: React.FormEvent,
    type: "login" | "register"
  ) => {
    ev.preventDefault();
    if (username.length < 1 || password.length < 1)
      return Error("Invalid input");
    if (type === "login") {
      login({ username, password } as Member);
    } else if (type === "register") {
      register({ username, password } as Member);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login/Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
      </CardContent>
      <CardFooter className="flex justify-around gap-1">
        <Button
          disabled={!username || !password}
          onClick={(ev) => handleSubmit(ev, "login")}
        >
          Login
        </Button>
        <Button
          disabled={!username || !password}
          onClick={(ev) => handleSubmit(ev, "register")}
        >
          Register
        </Button>
        {formError && (
          <span className="bg-error text-error-content rounded-btn p-2">
            Error: {formError.message}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};
