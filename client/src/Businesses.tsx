import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Business } from "./lib/frontendTypes";
import { StyledLink } from "./components/ui/StyledLink";

export const Businesses: React.FC<{
  businesses: Business[];
  setBusinessesReviews: () => void;
}> = ({ businesses, setBusinessesReviews }) => {
  setBusinessesReviews();
  return (
    <div>
      <h2 className="mb-4">Businesses:</h2>
      <div className="flex flex-rows flex-wrap gap-4">
        {businesses.map((business) => {
          return (
            <Card className="hover:bg-slate-900 w-1/6" key={business.id}>
              <CardHeader>
                <CardTitle>
                  <StyledLink to={`/businesses/${business.id}`}>
                    {business.name}
                  </StyledLink>
                </CardTitle>
                {business.reviews && business.reviews.length > 0 ? (
                  <CardDescription>
                    Rating:{" "}
                    {(
                      business.reviews.reduce((a, b) => a + b.rating, 0) /
                      business.reviews.length
                    ).toFixed(1)}
                    /5.0
                  </CardDescription>
                ) : (
                  <CardDescription>No reviews yet</CardDescription>
                )}
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
