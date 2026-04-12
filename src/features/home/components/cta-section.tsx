import React from "react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* CTA Card Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center shadow-xl sm:px-12 md:py-20 lg:px-20">
          {/* Dekorasi Lingkaran Latar Belakang */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Lingkaran Kiri Atas */}
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full border border-primary-foreground/10"></div>
            <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-primary-foreground/5"></div>

            {/* Lingkaran Kanan Bawah */}
            <div className="absolute -bottom-40 -right-20 h-[40rem] w-[40rem] rounded-full border border-primary-foreground/10"></div>
          </div>

          {/* Konten Utama */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:leading-tight">
              Siap Untuk Solusi Teknis Tanpa Repot?
            </h2>

            <p className="mb-10 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Gabung dengan ribuan pengguna yang telah merasakan kemudahan
              layanan dari TekniSini.
            </p>

            {/* Tombol Aksi */}
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              {/* Tombol Putih (Mulai Sekarang) */}
              <Button className="w-full h-13 rounded-full bg-primary-foreground px-8 text-base font-semibold text-primary shadow-md transition-all hover:bg-primary-foreground/90 sm:w-auto">
                Mulai Sekarang
              </Button>

              {/* Tombol Outline (Hubungi Support) */}
              <Button
                variant="outline"
                className="w-full h-13 rounded-full border-primary-foreground/30 bg-transparent px-8 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                Hubungi Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
