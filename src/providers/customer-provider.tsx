import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import React from "react";
import { useUser } from "@/contexts/user-contect";

export default function CustomerWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data } = useCurrentUser();
  const { user } = useUser();

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}
