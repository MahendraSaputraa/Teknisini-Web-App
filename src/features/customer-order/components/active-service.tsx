"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, MapPin, Star, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/lib/utils";

interface ActiveServiceProps {
  data?: any;
  isLoading?: boolean;
}

export default function ActiveService({
  data = [],
  isLoading = false,
}: ActiveServiceProps) {
  const route = useRouter();

  // Show loading state
  if (isLoading) {
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
          <CardContent className="p-6 sm:p-8">
            <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-muted/30" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show empty state if no active orders
  if (!data || !data.id) {
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
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-muted/30">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                Tidak ada layanan aktif saat ini
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const order = data;
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
                  <Truck className="h-3.5 w-3.5" />{" "}
                  {order.status?.toUpperCase() || "DIPROSES"}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Order ID: #{order.id}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                {order.service_name || "Layanan Teknisi"}
              </h3>
              <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
                {order.problem_note ||
                  "Teknisi sedang dalam perjalanan menuju lokasi Anda."}
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
                      {order.technician_name || "Dalam Penugasan"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Total Harga
                    </span>
                    <span className="font-bold text-foreground">
                      {formatRupiah(order?.total_price + 25000)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  onClick={() =>
                    route.push(`/customer/order/detail?id=${order.id}`)
                  }
                  className="rounded-full h-14 bg-primary px-6 font-semibold shadow-md hover:bg-primary/90"
                >
                  Lihat Detail & Lacak <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-200 lg:col-span-2 lg:h-full">
              <img
                src="/images/TeknisiDatang-Teknisini.png"
                alt="Tracking Map"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
