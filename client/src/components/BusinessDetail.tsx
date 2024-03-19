import { Business } from "@/lib/frontendTypes";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { StyledLink } from "./ui/StyledLink";

export const BusinessDetail = ({ businesses }: { businesses: Business[] }) => {
  const { id } = useParams();
  if (!id) return <div>No ID</div>;
  const specificBusiness = businesses.find((business) => business.id === id);
  if (!specificBusiness) return <div>No matches found</div>;
  return (
    <div>
      <h2 className="mb-2">
        {specificBusiness.name[0].toUpperCase() +
          specificBusiness.name.slice(1)}
        's Reviews:
      </h2>
      <Card
        className="mb-2 w-fit rounded-btn hover:bg-slate-900"
        key={specificBusiness!.id}
      >
        <StyledLink to="/businesses">Back to all businesses</StyledLink>
      </Card>
      <div className="flex flex-rows gap-4">
        <Card className="hover:bg-slate-900" key={specificBusiness!.id}>
          <CardHeader>
            <CardTitle>Placeholder review</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
