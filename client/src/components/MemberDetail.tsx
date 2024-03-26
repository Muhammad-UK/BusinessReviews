import { Member, Review } from "@/lib/frontendTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AuthContext } from "./contexts";
import { useContext } from "react";
import { AuthContextType } from "@/lib/frontendTypes";
import { StyledLink } from "./ui/StyledLink";
import { useParams } from "react-router-dom";
import { ArrowLeft, CircleUserRound, CircleX } from "lucide-react";

export const MemberDetail: React.FC<{
  members: Member[];
  setMembersReviews: () => void;
  deleteReview: (review: Review) => void;
}> = ({ members, setMembersReviews, deleteReview }) => {
  const contextValues = useContext(AuthContext);
  if (!contextValues) return null;

  const { auth } = contextValues as AuthContextType;
  const { id } = useParams();

  if (!id) return <div>No ID</div>;
  const specificMember = members.find((member) => member.id === id);
  if (!specificMember) return <div>No matches found</div>;
  setMembersReviews();

  return (
    <div>
      <Card
        className="mb-2 w-fit rounded-btn hover:bg-slate-900"
        key={specificMember.id}
      >
        <StyledLink to="/members">
          <ArrowLeft />
          Back to all members
        </StyledLink>
      </Card>
      <h2 className="flex gap-2">
        <CircleUserRound />
        {specificMember.id === auth?.id
          ? "Your"
          : specificMember.username[0].toUpperCase() +
            specificMember.username.slice(1) +
            "'s"}{" "}
        Reviews:
      </h2>
      <div className="flex flex-rows flex-wrap w-fit gap-4 mt-2">
        {specificMember.reviews.map((review) => {
          return (
            <Card className="hover:bg-slate-900" key={specificMember.id}>
              <CardHeader>
                <CardTitle className="text-center">
                  {review.business_name}
                </CardTitle>
                <CardTitle>Rating: {review.rating}/5</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{review.comment}</CardDescription>
              </CardContent>
              {review.member_id === auth?.id && (
                <CardFooter>
                  <CircleX
                    className="cursor-pointer hover:text-rose-500"
                    onClick={() => deleteReview(review)}
                  />
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
