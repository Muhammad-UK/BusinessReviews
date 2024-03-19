import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const AuthForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login/Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="username" />
        <Input placeholder="password" />
      </CardContent>
      <CardFooter>
        <Button>Login</Button>
        <Button>Register</Button>
      </CardFooter>
    </Card>
  );
};
