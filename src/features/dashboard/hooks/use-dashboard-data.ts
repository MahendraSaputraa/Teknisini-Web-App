import { getOrders } from "@/services/order";
import { getTechnicians } from "@/services/technician";
import { getServices } from "@/services/service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [ordersRes, techniciansRes, servicesRes] = await Promise.all([
        getOrders(),
        getTechnicians(),
        getServices(),
      ]);

      const orders = ordersRes?.data || [];
      const technicians = techniciansRes?.data || [];
      const services = servicesRes?.data || [];

      // Calculate Stats
      const totalOrders = orders.length;
      const totalRevenue = orders
        .filter((o: any) => o.payment_status === "paid")
        .reduce((acc: number, curr: any) => acc + (curr.total_price || 0), 0);
      
      const activeTechnicians = technicians.filter((t: any) => t.status === "available").length;
      const busyTechnicians = technicians.filter((t: any) => t.status === "busy").length;
      
      const completedOrders = orders.filter((o: any) => o.status === "completed").length;
      const pendingOrders = orders.filter((o: any) => o.status === "pending").length;

      // Group revenue by date for chart (last 7 days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      }).reverse();

      const revenueChartData = last7Days.map(date => {
        const dayRevenue = orders
          .filter((o: any) => o.payment_status === "paid" && o.created_at?.startsWith(date))
          .reduce((acc: number, curr: any) => acc + (curr.total_price || 0), 0);
        
        const dayOrders = orders.filter((o: any) => o.created_at?.startsWith(date)).length;

        return {
          date,
          revenue: dayRevenue,
          orders: dayOrders
        };
      });

      return {
        stats: {
          totalOrders,
          totalRevenue,
          activeTechnicians,
          busyTechnicians,
          completedOrders,
          pendingOrders,
          totalTechnicians: technicians.length,
          totalServices: services.length,
        },
        revenueChartData,
        recentOrders: orders.slice(0, 5),
      };
    },
  });
};
