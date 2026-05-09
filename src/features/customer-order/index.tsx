"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import ActiveService from "./components/active-service";
import ServiceHistory from "./components/service-history";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useGetOrders } from "./hooks/use-get-orders";
import { useGetDetailOrder } from "./hooks/use-get-detail-order";

export default function CustomerOrderStatusData() {
  const params = useParams();
  const orderId = params?.id as string;

  const [historyFilter, setHistoryFilter] = useState<
    "all" | "completed" | "cancelled"
  >("all");

  // Get current user
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const userId = userData?.uid;

  // Fetch active order by ID (dari URL)
  const { data: activeOrderData, isLoading: activeOrderLoading } =
    useGetDetailOrder(orderId);

  const activeOrder = activeOrderData?.data;

  // Fetch history orders based on filter
  const { data: ordersData, isLoading: historyOrdersLoading } =
    useGetOrders(!!userId);

  const historyOrders = (ordersData?.data || []).filter((order: any) => {
    if (order.user_id !== userId) return false;
    if (orderId && order.id === orderId) return false; // ← exclude active order
    if (historyFilter === "all") return true;
    return order.status === historyFilter;
  });

  return (
    <div className="min-h-screen w-full bg-background pb-20 pt-10">
      <div className="container mx-auto px-4 md:max-w-5xl">
        {/* Header Page */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Pesanan Saya
          </h1>
          <p className="mt-2 text-muted-foreground">
            Kelola dan pantau status layanan teknisi Anda secara real-time.
          </p>
        </div>

        <ActiveService data={activeOrder} isLoading={activeOrderLoading} />
        <ServiceHistory
          data={historyOrders}
          isLoading={historyOrdersLoading}
          filter={historyFilter}
          onFilterChange={setHistoryFilter}
        />
      </div>
    </div>
  );
}
