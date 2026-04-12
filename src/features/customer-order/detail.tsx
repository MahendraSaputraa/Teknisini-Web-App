import HeaderDetail from "./components/detail-header";
import ServiceDetail from "./components/detail-service";
import BottomDetail from "./components/detail-bottom";

export default function CustomerOrderTrackingDetailData() {
  return (
    <div className="min-h-screen w-full bg-background py-10">
      <div className="container mx-auto px-4 md:max-w-6xl">
        <HeaderDetail />
        <ServiceDetail />
        <BottomDetail />
      </div>
    </div>
  );
}
