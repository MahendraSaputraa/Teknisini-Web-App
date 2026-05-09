import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/order";

export const useGetDetailOrder = (id: string) => {
  return useQuery({
    queryKey: ["order-detail", id],
    queryFn: async () => {
      console.log("[useGetDetailOrder] Fetching order with id:", id);
      const res = await getOrderById(id);
      console.log("[useGetDetailOrder] Response:", res);
      return res;
    },
    enabled: !!id,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
};
