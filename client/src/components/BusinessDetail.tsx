import { Business } from "@/lib/frontendTypes";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StyledLink } from "./ui/StyledLink";
import { ArrowLeft, Building } from "lucide-react";

export const BusinessDetail = ({ businesses }: { businesses: Business[] }) => {
  const { id } = useParams();
  if (!id) return <div>No ID</div>;
  const specificBusiness = businesses.find((business) => business.id === id);
  if (!specificBusiness) return <div>No matches found</div>;
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
        key={specificBusiness!.id}
      >
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Building />
            {specificBusiness.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {specificBusiness.description} <br />
          They are based in {specificBusiness.city}
        </CardContent>
      </Card>
      <h2>Reviews:</h2>
      <div className="flex flex-rows gap-4 mt-2">
        <Card className="hover:bg-slate-900" key={specificBusiness!.id}>
          <CardHeader>
            <CardTitle>Placeholder review</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
