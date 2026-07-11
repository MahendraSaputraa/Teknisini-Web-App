import { Wrench, Clock3 } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Wrench className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Website Sedang Maintenance
        </h1>

        <p className="mt-4 text-muted-foreground">
          Kami sedang melakukan peningkatan sistem agar layanan menjadi lebih
          baik. Mohon maaf atas ketidaknyamanannya.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />
          Silakan kembali beberapa saat lagi.
        </div>

        <div className="mt-10 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          Terima kasih atas kesabaran dan pengertiannya.
        </div>
      </div>
    </main>
  );
}
