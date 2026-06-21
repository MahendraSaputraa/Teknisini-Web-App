import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/order";

export const useGetOrders = (userId?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["orders", { userId }],
    queryFn: async () => {
      const res = await getOrders(userId ? { user_id: userId } : undefined);
      return res;
    },
    enabled,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
};
