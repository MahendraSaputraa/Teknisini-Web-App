"use client";
import LeftForm from "./components/left-form";
import Cart from "./components/cart";

export default function CustomerBookingData() {
  return (
    <section className="w-full bg-slate-50 py-12 dark:bg-background md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Lengkapi Permintaan Layanan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Jelaskan kebutuhan teknis Anda secara mendalam untuk mendapatkan
            penanganan terbaik dari mitra kami.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <LeftForm />
          <Cart />
        </div>
      </div>
    </section>
  );
}
