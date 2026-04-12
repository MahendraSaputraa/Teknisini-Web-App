import CustomerWrapper from "@/providers/customer-provider";
export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CustomerWrapper>{children}</CustomerWrapper>;
}
