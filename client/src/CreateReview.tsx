import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Review } from "./lib/frontendTypes";

export const CreateReview = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <div>
        {reviews.map((review) => (
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{review.comment}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
