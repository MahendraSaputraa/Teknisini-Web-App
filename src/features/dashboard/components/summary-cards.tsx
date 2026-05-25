"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUpIcon, Wrench, Receipt, CheckCircle, Clock } from "lucide-react";

interface SummaryCardsProps {
  stats: any;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const items = [
    {
      title: "Total Pendapatan",
      value: `Rp ${stats.totalRevenue?.toLocaleString("id-ID")}`,
      description: "Pendapatan dari order terbayar",
      icon: <Receipt className="size-4 text-green-600" />,
      footer: "Berdasarkan transaksi sukses",
      color: "from-green-500/10 to-green-500/5",
    },
    {
      title: "Total Order",
      value: stats.totalOrders,
      description: "Total semua pesanan masuk",
      icon: <Clock className="size-4 text-blue-600" />,
      footer: `${stats.pendingOrders} menunggu verifikasi`,
      color: "from-blue-500/10 to-blue-500/5",
    },
    {
      title: "Teknisi Aktif",
      value: stats.activeTechnicians,
      description: "Teknisi siap bertugas",
      icon: <Wrench className="size-4 text-orange-600" />,
      footer: `${stats.busyTechnicians} sedang bekerja`,
      color: "from-orange-500/10 to-orange-500/5",
    },
    {
      title: "Order Selesai",
      value: stats.completedOrders,
      description: "Pekerjaan berhasil diselesaikan",
      icon: <CheckCircle className="size-4 text-purple-600" />,
      footer: "Target kepuasan tercapai",
      color: "from-purple-500/10 to-purple-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Card key={i} className={`@container/card bg-gradient-to-t ${item.color} border-none shadow-sm`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-1">
              <CardDescription className="font-medium">{item.title}</CardDescription>
              {item.icon}
            </div>
            <CardTitle className="text-2xl font-bold tabular-nums">
              {item.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-xs">
             <div className="text-muted-foreground">
              {item.description}
            </div>
            <div className="font-medium flex items-center gap-1">
               {item.footer}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
