"use client";
import ActiveService from "./components/active-service";
import ServiceHistory from "./components/service-history";

export default function CustomerOrderStatusData() {
  return (
    <div className="min-h-screen w-full bg-background pb-20 pt-10">
      <div className="container mx-auto px-4 md:max-w-5xl">
        {/* Header Page */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Pesanan Saya
          </h1>
          <p className="mt-2 text-muted-foreground">
            Kelola dan pantau status layanan teknisi Anda secara real-time.
          </p>
        </div>

        <ActiveService />
        <ServiceHistory />
      </div>
    </div>
  );
}
