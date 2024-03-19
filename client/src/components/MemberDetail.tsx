import { Member } from "@/lib/frontendTypes";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { StyledLink } from "./ui/StyledLink";
import { useParams } from "react-router-dom";

export const MemberDetail = ({ members }: { members: Member[] }) => {
  const { id } = useParams();
  if (!id) return <div>No ID</div>;
  const specificMember = members.find((member) => member.id === id);
  if (!specificMember) return <div>No matches found</div>;
  return (
    <div>
      <h2 className="mb-2">
        {specificMember.username[0].toUpperCase() +
          specificMember.username.slice(1)}
        's Reviews:
      </h2>
      <Card
        className="mb-2 w-fit rounded-btn hover:bg-slate-900"
        key={specificMember!.id}
      >
        <StyledLink to="/members">Back to all members</StyledLink>
      </Card>
      <div className="flex flex-rows gap-4">
        <Card className="hover:bg-slate-900" key={specificMember!.id}>
          <CardHeader>
            <CardTitle>Placeholder review</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
