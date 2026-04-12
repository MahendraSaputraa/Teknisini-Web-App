"use client";

import { Spinner } from "@/components/ui/spinner";
import { UserContext } from "@/contexts/user-contect";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading, isFetched } = useCurrentUser();

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