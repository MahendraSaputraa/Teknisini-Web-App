"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentSummary() {
  const route = useRouter();
  return (
    <div className="flex w-full flex-col lg:sticky lg:top-24 lg:w-2/5">
      <Card className="overflow-hidden pt-0 border-none shadow-md sm:rounded-3xl">
        {/* Gambar Header dengan efek fade/gradient ke bawah */}
        <div className="relative h-40 w-full bg-slate-200 sm:h-48">
          {/* Ganti dengan gambar layanan aslimu */}
          <img
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
            alt="Service Maintenance"
            className="h-full w-full object-cover"
          />
          {/* Gradien dari transparan (atas) ke warna background card (bawah) */}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
        </div>

        <CardContent className="flex flex-col p-6 sm:p-8">
          <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Payment Summary
          </h3>

          {/* Rincian Harga */}
          <div className="mb-6 flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Server Maintenance Bundle
              </span>
              <span className="font-bold text-foreground">Rp 1.250.000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Admin Fee
              </span>
              <span className="font-bold text-foreground">Rp 2.500</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Unique Code
              </span>
              {/* Menggunakan warna accent (orange) untuk unique code */}
              <span className="font-bold text-accent">Rp 124</span>
            </div>
          </div>

          <hr className="my-2 border-muted" />

          {/* Total Pembayaran */}
          <div className="my-6 flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Total Amount
            </span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Rp 1.252.624
              </span>
              <span className="mb-1 text-[10px] font-medium text-muted-foreground">
                Tax Included
              </span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => route.push("/customer/order/status")}
              className="w-full h-14 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              Kirim Bukti Pembayaran <Send className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              className="w-full h-14 rounded-full bg-slate-200 text-base font-semibold text-foreground hover:bg-slate-300 dark:bg-muted dark:hover:bg-muted/80"
            >
              Cancel Transaction
            </Button>
          </div>

          {/* Secure Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span className="text-xs font-medium">
              Secure encrypted payment gateway
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
