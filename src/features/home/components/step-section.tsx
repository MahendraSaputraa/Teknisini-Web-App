import React from "react";
// import Image from "next/image"; // Gunakan Next Image jika ada fotonya

const steps = [
  {
    id: 1,
    title: "Isi masalah",
    description:
      "Jelaskan kendala teknis Anda melalui formulir singkat di aplikasi kami.",
  },
  {
    id: 2,
    title: "Teknisi datang",
    description:
      "Teknisi terbaik kami akan segera menuju lokasi Anda sesuai waktu yang ditentukan.",
  },
  {
    id: 3,
    title: "Selesai",
    description:
      "Pekerjaan dilakukan dengan profesional. Bayar setelah masalah tuntas!",
  },
];

export default function StepSection() {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Kiri: Bagian Gambar */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none lg:pr-8">
            {/* Dekorasi Background Lembut di Belakang Gambar */}
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] bg-slate-50 dark:bg-muted/20 sm:-left-6 sm:-top-6"></div>

            {/* Ganti dengan <Image /> Next.js untuk performa terbaik */}
            <img
              src="/images/Step-Teknisini.jpg"
              alt="Teknisi profesional melayani pelanggan"
              className="relative z-10 aspect-square w-full object-cover object-center rounded-[2.5rem] shadow-md sm:aspect-[4/5] lg:aspect-square"
            />
          </div>

          {/* Kanan: Bagian Konten & Langkah */}
          <div className="flex flex-col">
            {/* Judul Section */}
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hanya 3 Langkah Mudah
            </h2>

            {/* List Langkah */}
            <div className="mb-12 flex flex-col gap-8">
              {steps.map((step) => (
                <div key={step.id} className="flex items-start gap-5">
                  {/* Nomor Step (Kotak sudut membulat biru) */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
                    {step.id}
                  </div>

                  {/* Teks Step */}
                  <div className="flex flex-col pt-1">
                    <h3 className="mb-1 text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Kartu Testimoni */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-muted p-6 pl-8 dark:bg-muted/10 md:p-8 md:pl-10">
              {/* Aksen Garis Biru di Kiri */}
              <div className="absolute left-0 top-0 h-full w-2 bg-primary"></div>

              <p className="mb-4 text-sm font-medium italic leading-relaxed text-muted-foreground md:text-base">
                "Layanan yang sangat profesional! Teknisi datang hanya dalam 35
                menit dan memperbaiki AC saya dengan sangat rapi."
              </p>
              <p className="text-sm font-bold text-foreground">
                — Budi Pratama, Denpasar Utara
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
