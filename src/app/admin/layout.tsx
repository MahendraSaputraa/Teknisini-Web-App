import { DashboardWrapper } from "@/providers/dashboard-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
