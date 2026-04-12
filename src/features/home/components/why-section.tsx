import React from "react";
import { Shield, Zap, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    id: 1,
    title: "Terpercaya",
    description:
      "Seluruh teknisi kami melalui proses verifikasi ketat dan memiliki sertifikasi profesional di bidangnya.",
    icon: Shield,
    // Menggunakan warna primary (Biru)
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: 2,
    title: "Cepat",
    description:
      "Sistem cerdas kami mencarikan teknisi terdekat dari lokasi Anda untuk penanganan segera tanpa menunggu lama.",
    icon: Zap,
    // Menggunakan warna secondary (Orange)
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  {
    id: 3,
    title: "Praktis",
    description:
      "Pesan, pantau status, hingga pembayaran aman dilakukan dalam satu aplikasi yang mudah digunakan.",
    icon: QrCode,
    // Menggunakan warna accent (Gold/Orange) atau tetap secondary
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
];

export default function WhySection() {
  return (
    // Background section sedikit abu-abu agar card putih lebih menonjol
    <section className="w-full bg-slate-50 py-20 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Kenapa Memilih TekniSini?
          </h2>
          {/* Garis bawah biru (Underline) */}
          <div className="mt-4 h-1 w-16 rounded-full bg-primary"></div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="border-none shadow-sm transition-all hover:shadow-md sm:rounded-3xl"
              >
                {/* Padding yang luas agar persis seperti di desain */}
                <CardContent className="flex flex-col items-start p-8 sm:p-10">
                  
                  {/* Icon Wrapper */}
                  <div 
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg} ${feature.iconColor}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}