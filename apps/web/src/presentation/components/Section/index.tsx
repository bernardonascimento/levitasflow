import { forwardRef } from "react";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, title, subtitle, children, className = "" }, ref): JSX.Element => {
    return (
      <section
        ref={ref}
        id={id}
        className={`mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20 ${className}`}
      >
        {(title || subtitle) && (
          <header className="mb-8 max-w-2xl space-y-2">
            {title ? (
              <h2 className="text-2xl font-bold tracking-tight text-[color:var(--text)] md:text-3xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="text-sm text-[color:var(--muted)] md:text-base">{subtitle}</p>
            ) : null}
          </header>
        )}
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
