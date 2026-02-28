import Skeleton from "@web/presentation/components/ui/Skeleton";

const AppShellSkeleton = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      {/* Header skeleton — mesma estrutura do AppHeader */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-[78rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-8">
          <Skeleton className="h-13 w-13 shrink-0 rounded-lg" />
          <div className="hidden items-center justify-center md:flex">
            <Skeleton className="h-10 w-full max-w-md rounded-xl" />
          </div>
          <div className="flex items-center justify-self-end gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[73px] md:h-[76px]" />

      {/* Container — mesmo max-w e padding do AppShell */}
      <div className="mx-auto flex w-full max-w-[78rem] gap-4 px-4 py-4 md:gap-5 md:px-6 md:py-5">
        {/* Sidebar skeleton — w-72, mesma ordem: ministério, nav, CTA */}
        <aside className="hidden w-72 shrink-0 flex-col rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-5 shadow-[var(--shadow)] backdrop-blur-xl lg:flex">
          <div className="mb-6">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <nav className="flex-1 space-y-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </nav>
          <div className="mt-6 pt-5">
            <Skeleton className="h-[7.5rem] w-full rounded-2xl" />
          </div>
        </aside>

        {/* Main content skeleton — título, subtítulo, card principal, "Próximos passos", 3 cards */}
        <main className="min-h-0 min-w-0 flex-1 space-y-6 pb-8">
          <div className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]">
            <Skeleton className="h-8 w-56 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-80 rounded-lg" />
          </div>
          <div className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]">
            <Skeleton className="h-6 w-full max-w-sm rounded-lg" />
            <Skeleton className="mt-4 h-24 w-full rounded-xl" />
          </div>
          <section>
            <Skeleton className="mb-4 h-3 w-36 rounded-full" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Skeleton className="h-24 rounded-[1.2rem]" />
              <Skeleton className="h-24 rounded-[1.2rem]" />
              <Skeleton className="h-24 rounded-[1.2rem]" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppShellSkeleton;
