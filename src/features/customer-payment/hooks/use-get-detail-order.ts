import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/order";

export const useGetDetailOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await getOrderById(id);
      return res;
    },
    enabled: !!id,
  });
};
