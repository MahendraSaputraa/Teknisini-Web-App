"use client";
import HomePageData from "@/features/home";
import CustomerWrapper from "@/providers/customer-provider";

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
