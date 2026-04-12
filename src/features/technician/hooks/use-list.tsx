import { useQuery } from "@tanstack/react-query";
import { getTechnicians } from "@/services/technician";

export const useTechnician = (params: any) => {
  return useQuery({
    queryKey: ["admin-technician", params],
    queryFn: async () => {
      const res = await getTechnicians(params);
      return res;
    },
  });
};
