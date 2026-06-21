// providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { UserContext } from "@/contexts/user-contect";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/lib/firebaseClient";
import { onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading, isFetched } = useCurrentUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const freshToken = await firebaseUser.getIdToken();
        Cookies.set("access_token", freshToken, {
          path: "/",
          expires: 7,
          sameSite: "lax",
          secure: window.location.protocol === "https:",
        });
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      } else {
        Cookies.remove("access_token");
        Cookies.remove("role");
        queryClient.setQueryData(["current-user"], null);
      }
    });

    return () => unsubscribe(); // cleanup saat unmount
  }, [queryClient]);

  useEffect(() => {
    if (user?.role) {
      Cookies.set("role", user.role, {
        path: "/",
        expires: 7,
        sameSite: "lax",
        secure: window.location.protocol === "https:",
      });
    }
  }, [user?.role]);

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
