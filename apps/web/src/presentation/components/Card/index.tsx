import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps): JSX.Element => {
  return (
    <div
      className={`rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
