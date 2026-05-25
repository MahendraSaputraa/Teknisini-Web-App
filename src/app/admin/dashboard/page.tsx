import DashboardFeature from "@/features/dashboard";
import React from "react";

export default function componentName() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DashboardFeature />
      </div>
    </div>
  );
}
