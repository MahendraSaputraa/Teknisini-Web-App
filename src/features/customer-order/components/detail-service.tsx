import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  MessageCircle,
  Star,
  XCircle,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";

// Status order: pending → confirmed → on_the_way → completed / cancelled
const STEPS = [
  { key: "pending", label: "Dikonfirmasi", icon: Check },
  { key: "confirmed", label: "Teknisi Didapat", icon: Check },
  { key: "on_the_way", label: "Menuju Lokasi", icon: Briefcase },
  { key: "completed", label: "Selesai", icon: CheckCircle2 },
];

const STATUS_ORDER = ["pending", "confirmed", "on_the_way", "completed"];

function getStepIndex(status: string) {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? 0 : idx;
}

interface ServiceDetailProps {
  order?: any;
}

export default function ServiceDetail({ order }: ServiceDetailProps) {
  const currentStepIndex = getStepIndex(order?.status || "pending");
  // Progress bar: 0 step = 0%, 1 = 33%, 2 = 66%, 3 = 100%
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;
  const isCancelled = order?.status === "cancelled";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      {/* KOLOM KIRI */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* 1. Service Progress Card */}
        <Card className="border-none shadow-sm sm:rounded-[2rem]">
          <CardContent className="p-6 sm:p-10">
            <h2 className="mb-10 text-xl font-bold text-foreground">
              Status Layanan
            </h2>

            {isCancelled ? (
              <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-destructive dark:bg-destructive/10">
                <XCircle className="h-5 w-5 shrink-0" />
                <span className="font-semibold">
                  Pesanan ini telah dibatalkan.
                </span>
              </div>
            ) : (
              <div className="relative">
                {/* Progress bar */}
                <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-slate-200 dark:bg-muted/50">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {STEPS.map((step, idx) => {
                    const isDone = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.key}
                        className="flex flex-col items-center gap-3"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md ring-4 ring-white dark:ring-background
                            ${
                              isDone || isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-slate-200 text-muted-foreground dark:bg-muted"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div
                          className={`flex flex-col items-center text-center ${!isDone && !isActive ? "opacity-50" : ""}`}
                        >
                          <span
                            className={`text-xs font-bold sm:text-sm ${isActive ? "text-primary" : "text-foreground"}`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2. Grid Deskripsi & Lokasi */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-500" />
                <h3 className="text-base font-bold text-foreground">
                  Detail Masalah
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                {order?.problem_note || "Tidak ada catatan."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
            <CardContent className="flex h-full flex-col p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Alamat Layanan
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                {order?.address_text || "Alamat tidak tersedia."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KOLOM KANAN */}
      <div className="flex w-full flex-col gap-6 lg:sticky lg:top-10 lg:col-span-1">
        {/* 3. Teknisi */}
        <Card className="border-none shadow-sm sm:rounded-3xl">
          <CardContent className="p-6 sm:p-8">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Info Teknisi
            </span>

            {order?.technician_name ? (
              <>
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 rounded-full bg-slate-200">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {order.technician_name.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-card" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-bold text-foreground">
                      {order.technician_name}
                    </h4>
                  </div>
                </div>
                <Button className="w-full rounded-full bg-[#0066A2] py-6 text-base font-semibold shadow-md hover:bg-[#005587]">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Teknisi
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-muted/20">
                <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Teknisi belum ditugaskan. Harap tunggu konfirmasi.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. Ringkasan Biaya */}
        <Card className="border-none bg-slate-50 shadow-none dark:bg-muted/10 sm:rounded-3xl">
          <CardContent className="p-6 sm:p-8">
            <h3 className="mb-6 text-base font-bold text-foreground">
              Ringkasan Biaya
            </h3>
            <div className="mb-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Biaya Servis</span>
                <span className="font-medium text-foreground">
                  {formatRupiah(order?.total_price || 0)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Transport</span>
                <span className="font-medium text-foreground">
                  {formatRupiah(25000)}
                </span>
              </div>
            </div>
            <hr className="my-4 border-muted" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total Tagihan</span>
              <span className="text-lg font-bold text-primary">
                {formatRupiah(order?.total_price + 25000 || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
