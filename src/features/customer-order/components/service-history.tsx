import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  Clock,
  History,
  PlugZap,
  Star,
  Wifi,
  Wrench,
} from "lucide-react";
import React from "react";

export default function ServiceHistory() {
  return (
    <div>
      {/* Header & Filter */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-foreground">
          <History className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-bold">Riwayat Layanan</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-muted/20">
          <button className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-foreground shadow-sm dark:bg-muted">
            Semua
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            Selesai
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            Dibatalkan
          </button>
        </div>
      </div>

      {/* List Item Riwayat */}
      <div className="flex flex-col gap-4">
        {/* Item 1 (Diproses) */}
        <Card className="border-none bg-slate-50 shadow-none hover:bg-slate-100/50 dark:bg-muted/10 sm:rounded-2xl">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-muted">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-foreground">
                  Instalasi Pipa Saluran Air
                </h4>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground dark:bg-muted">
                  #TS-91202
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Layanan perbaikan kebocoran pipa utama dan penggantian kran
                wastafel.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 12 Nov 2024
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Rp 450.000
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="mb-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold tracking-wider text-slate-600 dark:bg-muted/50 dark:text-slate-300">
                DIPROSES
              </span>
              <span className="text-[10px] text-muted-foreground">
                Menunggu konfirmasi teknisi
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Item 2 (Selesai - Ada Rating) */}
        <Card className="border-none bg-slate-50 shadow-none hover:bg-slate-100/50 dark:bg-muted/10 sm:rounded-2xl">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-muted">
              <PlugZap className="h-6 w-6 text-secondary" />{" "}
              {/* Icon warna orange */}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-foreground">
                  Pemeriksaan Panel Listrik
                </h4>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground dark:bg-muted">
                  #TS-90554
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Maintenance rutin panel listrik 3-phase dan penyeimbangan beban
                (balancing).
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 05 Nov 2024
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Rp 850.000
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="mb-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-primary dark:bg-primary/20">
                SELESAI
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-3 w-3 fill-accent text-accent"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item 3 (Selesai - Tanpa Rating) */}
        <Card className="border-none bg-slate-50 shadow-none hover:bg-slate-100/50 dark:bg-muted/10 sm:rounded-2xl">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-muted">
              <Wrench className="h-6 w-6 text-slate-500" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-foreground">
                  Perbaikan Atap Bocor
                </h4>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground dark:bg-muted">
                  #TS-88432
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Inspeksi atap dak beton dan pelapisan ulang waterproofing
                bitumen.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 28 Okt 2024
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Rp 1.200.000
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="mb-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold tracking-wider text-slate-600 dark:bg-muted/50 dark:text-slate-300">
                SELESAI
              </span>
              <span className="text-[10px] text-muted-foreground">
                Layanan Berhasil
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Item 4 (Pending) */}
        <Card className="border-none bg-slate-50 shadow-none hover:bg-slate-100/50 dark:bg-muted/10 sm:rounded-2xl">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-muted">
              <Wifi className="h-6 w-6 text-accent" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-foreground">
                  Optimasi Jaringan WiFi
                </h4>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground dark:bg-muted">
                  #TS-93011
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Setting ulang router mesh dan penarikan kabel LAN CAT6 ke lantai
                2.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Baru Saja
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Rp 300.000
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="mb-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold tracking-wider text-slate-600 dark:bg-muted/50 dark:text-slate-300">
                PENDING
              </span>
              <span className="text-[10px] text-muted-foreground">
                Menunggu Pembayaran
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
