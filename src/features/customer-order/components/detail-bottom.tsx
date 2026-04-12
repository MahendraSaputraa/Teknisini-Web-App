import { Button } from "@/components/ui/button";
import { AlertCircle, Headset } from "lucide-react";
import React from "react";

export default function BottomDetail() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-destructive/20 bg-red-50/50 p-1 dark:bg-destructive/5 dark:border-destructive/10">
      <div className="flex flex-col items-center justify-between gap-4 rounded-[1.3rem] bg-white p-5 px-6 shadow-sm dark:bg-card sm:flex-row sm:p-6 sm:px-8">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-muted/50 sm:flex">
            <Headset className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive sm:hidden" />
              Butuh Bantuan atau Batal Pesanan?
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Tim Support kami siap membantu kendala Anda via Admin.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-full border-slate-300 font-semibold hover:bg-slate-100 sm:w-auto dark:border-muted dark:hover:bg-muted/50"
        >
          Hubungi Admin
        </Button>
      </div>
    </div>
  );
}
