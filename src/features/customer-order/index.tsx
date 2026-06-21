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
  const { data: userData } = useCurrentUser();
  const userId = userData?.uid;

  // Use the route order when present; otherwise select the newest active order.
  const { data: ordersData, isLoading: historyOrdersLoading } = useGetOrders(
    userId,
    !!userId,
  );
  const customerOrders = ordersData?.data || [];
  const activeOrderFromList = customerOrders.find(
    (order: any) =>
      order.status !== "completed" && order.status !== "cancelled",
  );
  const activeOrderId = orderId || activeOrderFromList?.id;

  const { data: activeOrderData, isLoading: activeOrderLoading } =
    useGetDetailOrder(activeOrderId);
  const activeOrder = activeOrderData?.data || activeOrderFromList;

  const historyOrders = customerOrders.filter((order: any) => {
    if (order.user_id !== userId) return false;
    if (order.id === activeOrderId) return false;
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
