import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/order";

export const useGetDetailOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      console.log("[useGetDetailOrder] Fetching order with id:", id);
      const res = await getOrderById(id);
      console.log("[useGetDetailOrder] Response:", res);
      return res;
    },
    enabled: !!id,
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 5000, // Auto refetch every 5 seconds for real-time updates
    refetchOnWindowFocus: true,
  });
};
