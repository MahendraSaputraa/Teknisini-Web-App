"use client";

import { useParams, useSearchParams } from "next/navigation";
import HeaderDetail from "./components/detail-header";
import ServiceDetail from "./components/detail-service";
import BottomDetail from "./components/detail-bottom";
import { useGetDetailOrder } from "./hooks/use-get-detail-order";

export default function CustomerOrderTrackingDetailData() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") as string;

  console.log("hai", orderId);

  const { data: orderData, isLoading } = useGetDetailOrder(orderId);
  const order = orderData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background py-10">
        <div className="container mx-auto px-4 md:max-w-6xl">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200 dark:bg-muted/30 mb-4" />
          <div className="h-64 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-muted/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background py-10">
      <div className="container mx-auto px-4 md:max-w-6xl">
        <HeaderDetail
          orderId={order?.id}
          serviceName={order?.service_name}
          paymentStatus={order?.payment_status}
        />
        <ServiceDetail order={order} />
        <BottomDetail />
      </div>
    </div>
  );
}
