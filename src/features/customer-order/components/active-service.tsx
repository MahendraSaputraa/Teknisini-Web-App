"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, MapPin, Star, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActiveService() {
  const route = useRouter();
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-2 text-primary">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Star className="h-3.5 w-3.5 fill-primary" />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-wider">
          Layanan Aktif
        </h2>
      </div>

      <Card className="overflow-hidden border-none bg-slate-50/50 shadow-sm ring-1 ring-slate-100 dark:bg-muted/10 dark:ring-muted/30 sm:rounded-3xl">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:items-center">
            <div className="flex flex-col lg:col-span-3">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  <Truck className="h-3.5 w-3.5" /> MENUJU LOKASI
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Order ID: #TS-92834
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                Reparasi AC Inverter - Split System
              </h3>
              <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
                Teknisi sedang dalam perjalanan menuju lokasi Anda. Estimasi
                waktu kedatangan 12 menit.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-muted/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Teknisi Ahli
                    </span>
                    <span className="font-bold text-foreground">
                      Budi Darmawan
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Jadwal Kedatangan
                    </span>
                    <span className="font-bold text-foreground">
                      Hari ini, 14:30 WIB
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  onClick={() => route.push("/customer/order/detail")}
                  className="rounded-full h-14 bg-primary px-6 font-semibold shadow-md hover:bg-primary/90"
                >
                  Lihat Detail & Lacak <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Map/Gambar Kanan (Ambil 2 kolom) */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-200 lg:col-span-2 lg:h-full">
              <img
                src="/images/TeknisiDatang-Teknisini.png"
                alt="Tracking Map"
                className="h-full w-full object-cover"
              />

              {/* Floating Jarak Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-background/95 p-3 shadow-lg backdrop-blur-sm sm:left-auto sm:right-6 sm:w-auto">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Jarak
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    1.2 km lagi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
