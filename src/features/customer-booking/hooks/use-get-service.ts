import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/service";

export const useServices = (enabled: any) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getServices();
      return res;
    },
    enabled: enabled,
  });
};
