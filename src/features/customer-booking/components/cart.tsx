"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Clock, Info, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const route = useRouter();
  return (
    <div className="flex w-full flex-col gap-6 lg:sticky lg:top-24 lg:w-1/3">
      <Card className="border-none shadow-md sm:rounded-3xl">
        <CardContent className="flex flex-col p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold text-foreground">
            Ringkasan Biaya
          </h3>

          {/* Rincian Harga */}
          <div className="mb-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya Layanan</span>
              <span className="font-semibold text-foreground">Rp 150.000</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                Tranport <Info className="h-3 w-3" />
              </span>
              <span className="font-semibold text-foreground">Rp 25.000</span>
            </div>
          </div>

          <hr className="my-4 border-muted" />

          {/* Total Pembayaran */}
          <div className="mb-6 flex items-end justify-between">
            <span className="text-base font-bold text-foreground">
              Total Pembayaran
            </span>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Total Est.
              </span>
              <span className="text-2xl font-bold text-primary">
                Rp 175.000
              </span>
            </div>
          </div>

          {/* Info Aman */}
          <div className="mb-6 flex gap-3 rounded-xl bg-primary/10 p-4 text-sm text-primary dark:bg-primary/20">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <p className="leading-relaxed">
              Transaksi aman. Pembayaran hanya akan diteruskan ke teknisi
              setelah pengerjaan selesai Anda konfirmasi atau setelah 24 jam dari pekerjaan selesai. 
            </p>
          </div>

          {/* Tombol Kirim */}
          <Button
            onClick={() => route.push("/customer/payment")}
            className="h-14 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
          >
            Kirim Permintaan <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Dengan menekan tombol di atas, Anda menyetujui{" "}
            <a href="#" className="underline hover:text-primary">
              Syarat & Ketentuan
            </a>{" "}
            TekniSini.
          </p>
        </CardContent>
      </Card>

      {/* Badge Trust (Garansi & Respon) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-100 p-4 text-center dark:bg-muted/20">
          <Clock className="mb-2 h-6 w-6 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Respon Cepat
          </span>
          <span className="text-sm font-bold text-foreground">
            Mulai 30 Menit
          </span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-100 p-4 text-center dark:bg-muted/20">
          <Award className="mb-2 h-6 w-6 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Garansi
          </span>
          <span className="text-sm font-bold text-foreground">
            Hingga 30 Hari
          </span>
        </div>
      </div>
    </div>
  );
}
