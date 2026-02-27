"use client";

import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FinalCtaSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section>
      <div className="final-cta-shell group relative isolate overflow-hidden rounded-3xl border border-[color:var(--border)] px-6 py-14 text-center shadow-[var(--shadow)] transition-all duration-500 ease-out before:absolute before:inset-0 before:pointer-events-none before:bg-[linear-gradient(112deg,transparent_18%,rgba(255,255,255,0.22)_50%,transparent_82%)] before:opacity-0 before:[transform:translateX(-120%)] hover:scale-[1.012] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/10 group-hover:before:animate-sheen group-hover:before:opacity-100 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-[var(--shadow)] motion-reduce:before:hidden md:px-10 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[84%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.3)_0%,rgba(255,122,24,0.14)_38%,transparent_74%)] opacity-35 blur-2xl animate-ctaGlow motion-reduce:hidden"
        />
        <h2 className="mx-auto max-w-[20ch] text-balance text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] text-[color:var(--text)] md:text-6xl md:leading-[0.97]">
          {translate("landing.finalCta.title")}
        </h2>
        <div className="mt-7 md:mt-8">
          <div className="relative inline-flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[-4px] rounded-[0.95rem] border border-orange-500/20 opacity-70 animate-ringPulse motion-reduce:hidden"
            />
            <Button className="group/cta-button relative isolate overflow-hidden bg-[linear-gradient(135deg,var(--accent)_0%,color-mix(in_srgb,var(--accent)_74%,var(--accent2))_100%)] shadow-[0_14px_34px_color-mix(in_srgb,var(--accent)_36%,transparent)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-100 hover:shadow-xl hover:shadow-orange-500/25 hover:brightness-110 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:hover:brightness-105 motion-reduce:active:scale-100 after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(120deg,transparent_12%,rgba(255,255,255,0.36)_48%,transparent_84%)] after:opacity-0 after:[transform:translateX(-125%)] after:transition-all after:duration-700 after:ease-out hover:after:opacity-100 hover:after:[transform:translateX(125%)] motion-reduce:after:hidden">
              {translate("common.actions.createFreeAccount")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FinalCtaSection;
