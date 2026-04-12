import { DashboardWrapper } from "@/providers/dashboard-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
