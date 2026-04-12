export default function HeaderDetail() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Order Tracking
        </span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Order #TK-88291
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm">
          Payment Paid
        </span>
        <span className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-muted dark:text-muted-foreground">
          Service: AC Repair
        </span>
      </div>
    </div>
  );
}
