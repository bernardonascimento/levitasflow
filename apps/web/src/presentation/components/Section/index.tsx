import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const Section = ({ id, title, subtitle, children, className = "" }: SectionProps): JSX.Element => {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 py-14 md:px-8 ${className}`}>
      {(title || subtitle) && (
        <header className="mb-8 max-w-2xl space-y-2">
          {title ? (
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
};

export default Section;
