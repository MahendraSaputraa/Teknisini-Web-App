import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Check,
  CheckCircle2,
  FileText,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import React from "react";

export default function ServiceDetail() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      {/* KOLOM KIRI (Lebar - Ambil 2 Kolom) */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* 1. Service Progress Card */}
        <Card className="border-none shadow-sm sm:rounded-[2rem]">
          <CardContent className="p-6 sm:p-10">
            <h2 className="mb-10 text-xl font-bold text-foreground">
              Status Layanan
            </h2>

            {/* Horizontal Stepper */}
            <div className="relative">
              {/* Garis Background (Abu-abu & Biru) */}
              <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-slate-200 dark:bg-muted/50">
                {/* Garis progres aktif (66% karena di step 3) */}
                <div className="absolute left-0 top-0 h-full w-[66%] rounded-full bg-primary transition-all duration-500"></div>
              </div>

              {/* Steps Container */}
              <div className="relative flex justify-between">
                {/* Step 1: Confirmed (Selesai) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-white dark:ring-background">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-foreground sm:text-sm">
                      Dikonfirmasi
                    </span>
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      10:30 WITA
                    </span>
                  </div>
                </div>

                {/* Step 2: Tech Assigned (Selesai) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-white dark:ring-background">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-foreground sm:text-sm">
                      Teknisi Didapat
                    </span>
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      11:15 WITA
                    </span>
                  </div>
                </div>

                {/* Step 3: On The Way (Aktif) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-white dark:ring-background">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-primary sm:text-sm">
                      Menuju Lokasi
                    </span>
                    <span className="text-[10px] italic text-muted-foreground sm:text-xs">
                      Estimasi 12:45 WITA
                    </span>
                  </div>
                </div>

                {/* Step 4: Job Completed (Pending) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-muted-foreground ring-4 ring-white dark:bg-muted dark:ring-background">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-center text-center opacity-50">
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      Selesai
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Grid Deskripsi & Lokasi */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Problem Description */}
          <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <FileText className="h-5 w-5 text-slate-500" />
                <h3 className="text-base font-bold text-foreground">
                  Detail Masalah
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                Unit indoor berisik dan tidak dingin maksimal. Kadang bocor di sudut kanan bawah. Merek: Sharp J-Tech Inverter 1.5PK.
              </p>
            </CardContent>
          </Card>

          {/* Service Location */}
          <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
            <CardContent className="flex h-full flex-col p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Alamat Layanan
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                Apartemen Green Park, Tower A, Unit 12B. Kebayoran Lama, Jakarta Selatan.
              </p>
              {/* Map Placeholder */}
              <div className="mt-auto h-24 w-full overflow-hidden rounded-xl bg-slate-200 opacity-80 mix-blend-multiply dark:bg-muted/50 dark:mix-blend-normal">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                  alt="Map"
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KOLOM KANAN (Sempit - Sticky) */}
      <div className="flex w-full flex-col gap-6 lg:sticky lg:top-10 lg:col-span-1">
        {/* 3. Assigned Technician */}
        <Card className="border-none shadow-sm sm:rounded-3xl">
          <CardContent className="p-6 sm:p-8">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Info Teknisi
            </span>

            <div className="mb-6 flex items-center gap-4">
              {/* Avatar Avatar Wrapper */}
              <div className="relative h-14 w-14 shrink-0 rounded-full bg-slate-200">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                  alt="Rahmat Hidayat"
                  className="h-full w-full rounded-full object-cover"
                />
                {/* Online Dot */}
                <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-card"></div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-foreground">
                  Rahmat Hidayat
                </h4>
                <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-bold text-foreground">4.9</span>
                  <span>(124 ulasan)</span>
                </div>
              </div>
            </div>

            <Button className="w-full rounded-full bg-[#0066A2] py-6 text-base font-semibold shadow-md hover:bg-[#005587]">
              <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Teknisi
            </Button>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
              Tarif standar berlaku. Komunikasi langsung untuk waktu kedatangan.
            </p>
          </CardContent>
        </Card>

        {/* 4. Cost Summary */}
        <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
          <CardContent className="p-6 sm:p-8">
            <h3 className="mb-6 text-base font-bold text-foreground">
              Ringkasan Biaya
            </h3>

            <div className="mb-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Biaya Servis</span>
                <span className="font-medium text-foreground">Rp 150.000</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Transport</span>
                <span className="font-medium text-foreground">Rp 25.000</span>
              </div>
            </div>

            <hr className="my-4 border-muted" />

            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total Tagihan</span>
              <span className="text-lg font-bold text-primary">Rp 175.000</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
