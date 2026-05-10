import { useQuery } from "@tanstack/react-query";
import { getTechnicians } from "@/services/technician";

export const useTechnicianList = () => {
  return useQuery({
    queryKey: ["admin-technician-list"],
    queryFn: async () => {
      const res = await getTechnicians({ status: "available" });
      return res;
    },
  });
};
