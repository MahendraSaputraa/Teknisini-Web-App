import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderDetailProps {
  orderId?: string;
  serviceName?: string;
  paymentStatus?: string;
}

export default function HeaderDetail({
  orderId,
  serviceName,
  paymentStatus,
}: HeaderDetailProps) {
  const paymentLabel =
    paymentStatus === "paid"
      ? "Telah Dibayar"
      : paymentStatus === "pending"
        ? "Belum Dibayar"
        : "Menunggu Pembayaran";

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <Link href="/customer/order">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
          </Button>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Status Pesanan
        </span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Order #{orderId?.slice(0, 8).toUpperCase() || "—"}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm">
          {paymentLabel}
        </span>
        {serviceName && (
          <span className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-muted dark:text-muted-foreground">
            Layanan: {serviceName}
          </span>
        )}
      </div>
    </div>
  );
}
