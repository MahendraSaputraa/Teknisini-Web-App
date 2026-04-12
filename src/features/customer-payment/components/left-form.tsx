"use client";
import { Dropzone } from "@/components/form-components/form-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Clock, CloudUpload, Copy, Info } from "lucide-react";
import { useState } from "react";

export default function LeftForm() {
  const [fileReceipt, setFileReceipt] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFileReceipt(file);
    if (file) {
      console.log("File yang dipilih:", file.name);
    } else {
      console.log("File dihapus");
    }
  };
  return (
    <div className="flex w-full flex-col gap-6 lg:w-3/5">
      {/* 1. Bank Transfer Instructions */}
      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          {/* Header Card */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Bank Transfer Instructions
            </h3>
          </div>

          {/* Box Detail Rekening (Dengan border kiri biru) */}
          <div className="mb-6 rounded-xl border-l-4 border-primary bg-slate-100 p-5 dark:bg-muted/30 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Destination Bank
                </span>
                <span className="font-bold text-primary">
                  Bank Central Asia (BCA)
                </span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Account Name
                </span>
                <span className="font-bold text-foreground">
                  PT TEKNISINI DIGITAL INDONESIA
                </span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Account Number
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-widest text-foreground">
                    8830 124 559
                  </span>
                  <button className="text-muted-foreground transition-colors hover:text-primary">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Boxes Bawah */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-muted p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Transfer the exact amount including the unique code if provided.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-muted p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Payment must be completed within 2 hours of booking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Payment Proof Upload */}
      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold text-foreground">
            Payment Proof
          </h3>

          <Dropzone
            title="Payment Proof"
            onFileSelect={handleFileSelect}
            accept={{ "image/*": [] }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
