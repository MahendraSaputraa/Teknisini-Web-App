"use client";

import { SummaryCards } from "./components/summary-cards";
import { RevenueChart } from "./components/revenue-chart";
import { RecentOrders } from "./components/recent-orders";
import { useDashboardData } from "./hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardFeature() {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <SummaryCards stats={data?.stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data?.revenueChartData || []} />
        </div>
        <div className="lg:col-span-1">
          <RecentOrders orders={data?.recentOrders || []} />
        </div>
      </div>
    </div>
  );
}
