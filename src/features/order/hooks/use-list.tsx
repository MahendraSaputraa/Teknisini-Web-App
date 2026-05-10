import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/order";

export const useOrderList = (params: any) => {
  return useQuery({
    queryKey: ["admin-order", params],
    queryFn: async () => {
      const res = await getOrders(params);
      return res;
    },
  });
};
