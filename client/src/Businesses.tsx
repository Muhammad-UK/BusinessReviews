import { Card, CardHeader, CardTitle } from "./components/ui/card";
import { Business } from "./lib/frontendTypes";
import { StyledLink } from "./components/ui/StyledLink";

export const Businesses = ({ businesses }: { businesses: Business[] }) => {
  return (
    <div>
      <h2 className="mb-4">Businesses:</h2>
      <div className="flex flex-rows gap-4">
        {businesses.map((business) => (
          <Card className="hover:bg-slate-900" key={business.id}>
            <CardHeader>
              <CardTitle>
                <StyledLink to={`/businesses/${business.id}`}>
                  {business.name}
                </StyledLink>
              </CardTitle>
              {"placeholder rating"}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
