export default function MealPrep() {
  return (
    <>
      <main className="min-h-screen px-6 py-28 md:px-12 text-slate-100">
        <section className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 md:p-12 shadow-2xl">
          <p className="inline-block rounded-full border border-teal-400/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-teal-300 mb-5">Meal Prep</p>
          <h1 className="text-4xl md:text-5xl font-bold">Let&apos;s get to prepping</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">This section is ready for a modern planner experience with weekly menus, grocery summaries, and quick nutrition snapshots.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <h2 className="font-semibold text-teal-300">Week View</h2>
              <p className="mt-2 text-sm text-slate-300">Plan breakfast, lunch, and dinner with drag-and-drop blocks.</p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <h2 className="font-semibold text-teal-300">Smart List</h2>
              <p className="mt-2 text-sm text-slate-300">Auto-generate groceries from selected meals with quantity totals.</p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <h2 className="font-semibold text-teal-300">Prep Flow</h2>
              <p className="mt-2 text-sm text-slate-300">Batch prep tasks by cook time so kitchen time is more efficient.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="pointer-events-auto pt-10 pb-20 text-center border-none outline-none bg-slate-950 text-slate-400 text-sm">
        Copyright (c) Nick Waggoner 2023. All rights reserved.
        <br />
        Built with <a href="https://nextjs.org/" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Next.js</a>, <a href="https://tailwindcss.com/" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Tailwind CSS</a>, and deployed with <a href="https://vercel.com" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Vercel</a>.
      </footer>
    </>
  );
}
