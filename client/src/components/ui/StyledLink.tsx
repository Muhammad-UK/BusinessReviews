import { Link } from "react-router-dom";

type StyledLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const StyledLink: React.FC<StyledLinkProps> = ({
  to,
  children,
}: StyledLinkProps) => {
  return (
    <Link to={to} className="btn btn-ghost text-2xl text-zinc-200">
      {children}
    </Link>
  );
};
