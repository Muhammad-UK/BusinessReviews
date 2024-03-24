import { useContext, useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { AuthContextType, Review } from "./lib/frontendTypes";
import { AuthContext } from "./App";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";

export const CreateReview = () => {
  const contextValues = useContext(AuthContext);
  if (!contextValues) return null;
  const { auth, reviews, businesses, createReviewFn, formError } =
    contextValues as AuthContextType;
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [business_id, setBusiness_id] = useState("");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (auth) {
      createReviewFn({ rating, comment, business_id } as Review);
    }
  };
  return (
    <>
      <h2>
        Create a Review:
        {formError && (
          <span className="bg-error text-error-content text-xl ml-2 rounded-btn p-2">
            Error: {formError.message}
          </span>
        )}
      </h2>
      <div>{!auth && <AuthForm />}</div>
      {auth && (
        <Card>
          <CardHeader>
            <p>
              Note: You cannot submit a review for a business you have already
              reviewed
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Select
              onValueChange={(value) => {
                setBusiness_id(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Business" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {businesses
                    .filter((business) => {
                      return !reviews.some(
                        (review) =>
                          review.member_id === auth.id &&
                          review.business_id === business.id
                      );
                    })
                    .map((business) => {
                      return (
                        <SelectItem key={business.id} value={business.id}>
                          {business.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <CardDescription>Rating: {rating}</CardDescription>
            <Slider
              className="w-1/4"
              min={1}
              max={5}
              step={1}
              defaultValue={[1]}
              onValueChange={(value) => setRating(value[0])}
            />
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
