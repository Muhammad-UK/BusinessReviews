import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { StyledLink } from "./components/ui/StyledLink";
import { Business, HighestRatedBusiness, Member } from "./lib/frontendTypes";

export const Homepage: React.FC<{
  businesses: Business[];
  members: Member[];
  setBusinessesReviews: () => void;
  setMembersReviews: () => void;
}> = ({ businesses, members, setBusinessesReviews, setMembersReviews }) => {
  if (!businesses || !members)
    return (
      <div>
        <h2>Something went wrong...</h2>
      </div>
    );
  setBusinessesReviews();
  setMembersReviews();

  const setHighestRating = (businesses: Business[]) => {
    if (businesses.length === 0) {
      return {
        id: "",
        name: "",
        description: "",
        city: "",
        overallRating: 0,
        reviews: [],
      };
    }

    let max: HighestRatedBusiness = businesses[0];
    let maxRating = 0;
    businesses.forEach((business) => {
      business.reviews.forEach((review, index) => {
        if (review.rating > max.reviews[index]?.rating) {
          max = business;
          maxRating = review.rating;
        }
      });
    });
    max.overallRating = maxRating;
    return max;
  };

  const setMostReviewed = (businesses: Business[]) => {
    if (businesses.length === 0) {
      return {
        id: "",
        name: "",
        description: "",
        city: "",
        overallRating: 0,
        reviews: [],
      };
    }

    let max = businesses[0];
    businesses.forEach((business) => {
      if (business.reviews.length > max.reviews.length) max = business;
    });
    return max;
  };

  const setMostActive = (members: Member[]) => {
    if (members.length === 0) {
      return {
        id: "",
        username: "",
        reviews: [],
      };
    }

    let max = members[0];
    members.forEach((member) => {
      if (member.reviews.length > max.reviews.length) max = member;
    });
    return max;
  };

  const maxRating = setHighestRating(businesses);
  const mostReviewed = setMostReviewed(businesses);
  const mostActive = setMostActive(members);
  return (
    <div>
      <h2 className="mb-4">Welcome to the Business Reviews!</h2>
      <div className="flex flex-rows gap-4">
        <Card className="hover:bg-slate-900">
          <CardHeader>
            <CardTitle>The highest rated business:</CardTitle>
          </CardHeader>
          <CardContent className="text-center font-bold text-xl">
            <StyledLink to={`/businesses/${maxRating.id}`}>
              {maxRating.name}
            </StyledLink>
          </CardContent>
          {maxRating.overallRating && (
            <CardFooter className="justify-center">
              Rating: {maxRating.overallRating.toFixed(1)}/5.0
            </CardFooter>
          )}
        </Card>
        <Card className="hover:bg-slate-900">
          <CardHeader>
            <CardTitle>The most reviewed business:</CardTitle>
          </CardHeader>
          <CardContent className="text-center font-bold text-xl">
            <StyledLink to={`/businesses/${mostReviewed.id}`}>
              {mostReviewed.name}
            </StyledLink>
          </CardContent>
          <CardFooter className="justify-center">
            {mostReviewed.reviews.length} reviews
          </CardFooter>
        </Card>
        <Card className="hover:bg-slate-900">
          <CardHeader>
            <CardTitle>The most active member:</CardTitle>
          </CardHeader>
          <CardContent className="text-center font-bold text-xl">
            <StyledLink to={`/members/${mostActive.id}`}>
              {mostActive.username[0]?.toUpperCase() +
                mostActive.username.slice(1)}
            </StyledLink>
          </CardContent>
          <CardFooter className="justify-center">
            {mostActive.reviews.length} reviews
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
