import { Link } from "react-router-dom";

type StyledLinkProps = {
  className?: string;
  role?: string;
  to: string;
  children: React.ReactNode;
};

export const StyledLink: React.FC<StyledLinkProps> = ({
  className,
  role,
  to,
  children,
}: StyledLinkProps) => {
  return (
    <Link
      role={role}
      to={to}
      className={`${className} btn text-2xl text-zinc-200`}
    >
      {children}
    </Link>
  );
};
