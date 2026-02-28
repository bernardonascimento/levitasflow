import type { ReactNode } from "react";
import PublicTopbar from "@web/presentation/components/public/PublicTopbar";

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen">
      <PublicTopbar />
      {children}
    </div>
  );
};

export default PublicLayout;
