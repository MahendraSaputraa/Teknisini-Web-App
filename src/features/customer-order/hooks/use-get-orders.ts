import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/order";

export const useGetOrders = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res;
    },
    enabled,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
};
