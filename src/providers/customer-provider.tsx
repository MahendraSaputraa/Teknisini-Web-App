import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function CustomerWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = useCurrentUser();
  console.log("provider customer", data);

  return (
    <>
      <Navbar user={data} />
      {children}
      <Footer />
    </>
  );
}
