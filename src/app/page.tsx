import type { Metadata } from "next";
import HomePageData from "@/features/home";
import CustomerWrapper from "@/providers/customer-provider";

export const metadata: Metadata = {
  title: "TekniSini | Jasa Teknisi Panggilan Cepat & Terpercaya di Bali",
  description:
    "Layanan jasa teknisi panggilan terbaik di Bali. Hubungi teknisi ahli untuk service AC, kulkas, listrik, pipa, dan elektronik lainnya. Cepat, transparan, dan bergaransi.",
  alternates: {
    canonical: "/",
  },
};

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomerWrapper>
      <HomePageData />
      {children}
    </CustomerWrapper>
  );
}
