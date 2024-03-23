import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Member } from "./lib/frontendTypes";
import { StyledLink } from "./components/ui/StyledLink";

export const Members: React.FC<{
  members: Member[];
  setMembersReviews: () => void;
}> = ({ members, setMembersReviews }) => {
  setMembersReviews();
  return (
    <div>
      <h2 className="mb-4">Members:</h2>
      <div className="flex flex-rows flex-wrap gap-4">
        {members.map((member) => {
          return (
            <Card className="hover:bg-slate-900 w-1/6" key={member.id}>
              <CardHeader>
                <CardTitle>
                  <StyledLink to={`/members/${member.id}`}>
                    {member.username[0].toUpperCase() +
                      member.username.slice(1)}
                  </StyledLink>
                </CardTitle>
                {member.reviews && member.reviews.length > 0 ? (
                  <CardDescription>
                    Reviews: {member.reviews.length}
                  </CardDescription>
                ) : null}
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
