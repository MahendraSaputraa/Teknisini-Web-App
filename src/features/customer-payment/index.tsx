"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import LeftForm from "./components/left-form";
import PaymentSummary from "./components/payment-summary";
import { useGetDetailOrder } from "./hooks/use-get-detail-order";

export default function CustomerPaymentData() {
  const param = useParams();
  const orderId = param?.id as string;

  const [fileReceipt, setFileReceipt] = useState<File | null>(null);

  const { data: detailOrderData } = useGetDetailOrder(orderId);
  console.log("data", detailOrderData);

  return (
    <section className="w-full bg-slate-50 py-12 dark:bg-background md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Tahap Pembayaran
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Konfirmasi Layanan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Lakukan pembayaran via transfer bank untuk mengonfirmasi pemesanan
            teknisi ahli Anda.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <LeftForm fileReceipt={fileReceipt} onFileSelect={setFileReceipt} />
          <PaymentSummary
            detailOrderData={detailOrderData?.data}
            orderId={orderId}
            fileReceipt={fileReceipt}
            onUploadSuccess={() => setFileReceipt(null)}
          />
        </div>
      </div>
    </section>
  );
}
