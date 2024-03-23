import { Member } from "@/lib/frontendTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { StyledLink } from "./ui/StyledLink";
import { useParams } from "react-router-dom";
import { ArrowLeft, CircleUserRound } from "lucide-react";
import React from "react";

export const MemberDetail: React.FC<{
  members: Member[];
  setMembersReviews: () => void;
}> = ({ members, setMembersReviews }) => {
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
        {specificMember.username[0].toUpperCase() +
          specificMember.username.slice(1)}
        's Reviews:
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
            </Card>
          );
        })}
      </div>
    </div>
  );
};
