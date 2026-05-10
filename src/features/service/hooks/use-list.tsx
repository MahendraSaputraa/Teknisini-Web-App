import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/service";

export const useService = (params: any) => {
  return useQuery({
    queryKey: ["admin-service", params],
    queryFn: async () => {
      const res = await getServices(params);
      return res;
    },
  });
};
