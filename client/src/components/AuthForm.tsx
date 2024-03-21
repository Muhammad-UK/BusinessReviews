import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthFormProps, Member } from "@/lib/frontendTypes";
import React, { useState } from "react";

export const AuthForm = ({ login, register, formError }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    login({ username, password } as Member);
  };
  const registerSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    register({ username, password } as Member);
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
        <Button onClick={loginSubmit}>Login</Button>
        <Button onClick={registerSubmit}>Register</Button>
        {formError && (
          <span className="bg-error text-error-content rounded-btn p-2">
            Error: {formError.message}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};
