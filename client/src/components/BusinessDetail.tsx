import { Business } from "@/lib/frontendTypes";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { StyledLink } from "./ui/StyledLink";
import { ArrowLeft, Building } from "lucide-react";

export const BusinessDetail: React.FC<{
  businesses: Business[];
  setBusinessesReviews: () => void;
}> = ({ businesses, setBusinessesReviews }) => {
  const { id } = useParams();
  if (!id) return <div>No ID</div>;
  const specificBusiness = businesses.find((business) => business.id === id);
  if (!specificBusiness) return <div>No matches found</div>;
  setBusinessesReviews();
  return (
    <div>
      <Card className="mb-2 w-fit rounded-btn hover:bg-slate-900">
        <StyledLink to="/businesses">
          <ArrowLeft />
          Back to all businesses
        </StyledLink>
      </Card>
      <hr />
      <Card
        className="mt-2 mb-2 w-fit rounded-btn hover:bg-slate-900"
        key={specificBusiness.id}
      >
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Building />
            {specificBusiness.name} <br /> Overall Rating:{" "}
            {(
              specificBusiness.reviews.reduce((a, b) => a + b.rating, 0) /
              specificBusiness.reviews.length
            ).toFixed(1)}
            /5
          </CardTitle>
        </CardHeader>
        <CardContent>
          {specificBusiness.description} <br />
          They are based in {specificBusiness.city}
        </CardContent>
      </Card>
      <h2>Reviews:</h2>
      <div className="flex flex-rows gap-4 mt-2">
        {specificBusiness.reviews.map((review) => {
          if (!review.member_name) return null;
          return (
            <Card className="hover:bg-slate-900" key={specificBusiness.id}>
              <CardHeader>
                <CardTitle>
                  {review.member_name[0].toUpperCase() +
                    review.member_name.slice(1)}
                </CardTitle>
                <CardTitle>Rating: {review.rating}/5</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{review.comment}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
