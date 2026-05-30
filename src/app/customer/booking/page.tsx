import type { Metadata } from "next";
import CustomerBookingData from "@/features/customer-booking";

export const metadata: Metadata = {
  title: "Pesan Teknisi Panggilan",
  description:
    "Pesan teknisi ahli dengan mudah. Pilih kategori layanan, tentukan lokasi, dan teknisi kami akan segera datang membantu Anda di Bali.",
  keywords: [
    "pesan teknisi",
    "booking teknisi bali",
    "service ac panggilan",
    "service kulkas bali",
    "teknisi listrik panggilan",
  ],
};

export default function BookingPage() {
  return <CustomerBookingData />;
}
