// providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { UserContext } from "@/contexts/user-contect";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/lib/firebaseClient";
import { onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading, isFetched } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const freshToken = await firebaseUser.getIdToken();
        Cookies.set("access_token", freshToken, { path: "/", expires: 7 });
      } else {
        Cookies.remove("access_token");
        Cookies.remove("role");
      }
    });

    return () => unsubscribe(); // cleanup saat unmount
  }, []);

  if (!isFetched) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
