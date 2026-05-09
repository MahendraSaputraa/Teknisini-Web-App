"use client";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const route = useRouter();
  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 pb-24 md:pt-20 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Bagian Teks (Kiri) */}
          <div className="flex flex-col items-start gap-6">
            {/* Badge Premium */}
            <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs font-bold tracking-wide text-primary uppercase">
              Premium Technical Service
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Butuh Teknisi? <br />
              <span className="text-primary">Kami Siap Membantu</span>
            </h1>

            {/* Deskripsi */}
            <p className="max-w-[550px] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Layanan teknisi terpercaya, cepat, dan praktis langsung ke lokasi
              Anda. Temukan solusi teknis terbaik dengan satu klik.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Tombol Orange (Menggunakan var Secondary) dengan efek shadow glow */}
              <Button
                onClick={() => route.push("/customer/booking")}
                className="rounded-full h-14 bg-secondary px-8 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/30 transition-all"
              >
                Pesan Teknisi <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Tombol Abu-abu */}
              <Button
                variant="secondary"
                className="rounded-full h-14 bg-muted px-8 text-base font-semibold text-foreground hover:bg-muted/80"
              >
                Pelajari Layanan
              </Button>
            </div>
          </div>

          {/* Bagian Gambar (Kanan) */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted">
              {/* Ganti src ini dengan gambar aslimu yang ada di folder public */}
              <img
                src="/images/Hero-Teknisini.jpg"
                alt="Teknisi Tersenyum"
                className="h-full w-full object-cover object-center"
              />

              {/* Floating Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur-sm dark:bg-zinc-900/95 md:bottom-8 md:left-8 md:right-8 md:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-foreground md:text-lg">
                    1,200+ Teknisi Ahli
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    Tersertifikasi & Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
