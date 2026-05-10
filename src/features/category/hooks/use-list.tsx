import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category";

export const useCategory = (params: any) => {
  return useQuery({
    queryKey: ["admin-category", params],
    queryFn: async () => {
      const res = await getCategories(params);
      return res;
    },
  });
};
