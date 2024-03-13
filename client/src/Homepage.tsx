import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export const Homepage = () => {
  return (
    <div>
      <h2 className="mb-4">Welcome to the Business Reviews!</h2>
      <div className="flex flex-rows gap-4">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>The highest rated business</CardTitle>
          </CardHeader>
          <CardContent>{"placeholder business"}</CardContent>
          <CardFooter>{"placeholder rating"}</CardFooter>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>The most reviewed business</CardTitle>
          </CardHeader>
          <CardContent>{"placeholder business"}</CardContent>
          <CardFooter>{"placeholder reviews"}</CardFooter>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>The most active member</CardTitle>
          </CardHeader>
          <CardContent>{"placeholder member"}</CardContent>
          <CardFooter>{"placeholder reviews/ratings"}</CardFooter>
        </Card>
      </div>
    </div>
  );
};
