import { Card, CardHeader, CardTitle } from "./components/ui/card";
import { Member } from "./lib/frontendTypes";
import { StyledLink } from "./components/ui/StyledLink";

export const Members = ({ members }: { members: Member[] }) => {
  return (
    <div>
      <h2 className="mb-4">Members:</h2>
      <div className="flex flex-rows gap-4">
        {members.map((member) => (
          <Card className="hover:bg-slate-900" key={member.id}>
            <CardHeader>
              <CardTitle>
                <StyledLink to={`/members/${member.id}`}>
                  {member.username[0].toUpperCase() + member.username.slice(1)}
                </StyledLink>
              </CardTitle>
              {"placeholder review count"}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
