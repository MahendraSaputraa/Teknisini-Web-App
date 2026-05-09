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
import { formatRupiah } from "@/lib/utils";

interface ServiceHistoryProps {
  data?: any[];
  isLoading?: boolean;
  filter?: "all" | "completed" | "cancelled";
  onFilterChange?: (filter: "all" | "completed" | "cancelled") => void;
}

const formatDate = (dateString: string | Date | undefined) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-blue-100 text-primary dark:bg-primary/20";
    case "cancelled":
      return "bg-red-100 text-red-600 dark:bg-red-900/20";
    case "diproses":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20";
    default:
      return "bg-slate-200 text-slate-600 dark:bg-muted";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "SELESAI";
    case "cancelled":
      return "DIBATALKAN";
    case "diproses":
      return "DIPROSES";
    default:
      return status?.toUpperCase();
  }
};

const getServiceIcon = (serviceName: string) => {
  if (
    serviceName?.toLowerCase().includes("ac") ||
    serviceName?.toLowerCase().includes("pendingin")
  ) {
    return <PlugZap className="h-6 w-6 text-secondary" />;
  } else if (serviceName?.toLowerCase().includes("listrik")) {
    return <PlugZap className="h-6 w-6 text-secondary" />;
  } else if (
    serviceName?.toLowerCase().includes("pipa") ||
    serviceName?.toLowerCase().includes("air")
  ) {
    return <Activity className="h-6 w-6 text-primary" />;
  }
  return <Wrench className="h-6 w-6 text-slate-500" />;
};

export default function ServiceHistory({
  data = [],
  isLoading = false,
  filter = "all",
  onFilterChange,
}: ServiceHistoryProps) {
  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-foreground">
            <History className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-bold">Riwayat Layanan</h2>
          </div>
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
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-muted/30"
            />
          ))}
        </div>
      </div>
    );
  }

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
          <button
            onClick={() => onFilterChange?.("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              filter === "all"
                ? "bg-white text-foreground shadow-sm dark:bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => onFilterChange?.("completed")}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              filter === "completed"
                ? "bg-white text-foreground shadow-sm dark:bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Selesai
          </button>
          <button
            onClick={() => onFilterChange?.("cancelled")}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              filter === "cancelled"
                ? "bg-white text-foreground shadow-sm dark:bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dibatalkan
          </button>
        </div>
      </div>

      {/* List Item Riwayat */}
      <div className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((order) => (
            <Card
              key={order.id}
              className="border-none bg-slate-50 shadow-none hover:bg-slate-100/50 dark:bg-muted/10 sm:rounded-2xl"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-muted">
                  {getServiceIcon(order.service_name)}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground">
                      {order.service_name || "Layanan Teknisi"}
                    </h4>
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground dark:bg-muted">
                      #{order.id}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {order.problem_note || "Layanan teknisi profesional"}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />{" "}
                      {formatDate(order.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />{" "}
                      {formatRupiah(order?.total_price + 25000)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <span
                    className={`mb-1 rounded-full px-3 py-1 text-xs font-bold tracking-wider ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                  {order.status === "completed" && order.rating && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= order.rating
                              ? "fill-accent text-accent"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {order.status === "completed" && !order.rating && (
                    <span className="text-[10px] text-muted-foreground">
                      Belum dinilai
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-4 text-center text-muted-foreground">
              Tidak ada riwayat layanan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
