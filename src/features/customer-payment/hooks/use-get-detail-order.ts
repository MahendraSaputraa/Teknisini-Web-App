import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/order";

export const useGetDetailOrder = (id: any) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getOrderById(id);
      return res;
    },
  });
};
