import { Dispatch, SetStateAction, useMemo } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { FormInput } from "@/components/form-components/form-input";
import { FormTextarea } from "@/components/form-components/form-textarea";
import { FormSelect } from "@/components/form-components/form-select";
import { FormComboBox } from "@/components/form-components/form-combobox";
import { PayloadData } from "../schema";
import { useTechnicianList } from "../hooks/use-technician-list";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface CreateEditModalProps {
  isOpen: boolean;
  mode: "edit" | "create" | string;
  onClose: (open: boolean) => void;
  onSubmit: () => void;
  onVerifyPayment?: (orderId: string, approve: boolean) => void;
  isPending: boolean;
  isVerifying?: boolean;
  payloadData: PayloadData;
  setPayloadData: Dispatch<SetStateAction<PayloadData>>;
  errors?: Record<string, string[] | undefined>;
}

const statusOptions = [
  { label: "Menunggu", value: "pending" },
  { label: "Diproses", value: "diproses" },
  { label: "Menuju Lokasi", value: "menuju_lokasi" },
  { label: "Selesai", value: "completed" },
  { label: "Dibatalkan", value: "cancelled" },
];

export function CreateEditModal({
  isOpen,
  mode,
  onClose,
  onSubmit,
  onVerifyPayment,
  isPending,
  isVerifying,
  setPayloadData,
  payloadData,
  errors,
}: CreateEditModalProps) {
  const { data: technicianData, isPending: isTechnicianLoading } =
    useTechnicianList();

  const technicianOptions = useMemo(() => {
    if (!technicianData?.data) return [];
    return technicianData.data
      .filter((tech: any) => tech.status === "available")
      .map((tech: any) => ({
        label: tech.name,
        value: tech.id,
      }));
  }, [technicianData]);

  const handleTechnicianSelect = (option: any) => {
    if (!option) {
      setPayloadData((prev) => ({
        ...prev,
        technician_id: "",
        technician_name: "",
      }));
      return;
    }

    const selectedTechnician = technicianData?.data?.find(
      (tech: any) => tech.id === option.value,
    );
    setPayloadData((prev) => ({
      ...prev,
      technician_id: option.value,
      technician_name: selectedTechnician?.name || option.label || "",
    }));
  };

  // Only show verification UI if payment is waiting verification (not pending from default)
  const isPaymentWaitingVerification =
    payloadData.payment_status === "waiting_verification";
  const isPaymentApproved = payloadData.payment_status === "paid";
  const isPaymentRejected = payloadData.payment_status === "rejected";
  const isPaymentPending =
    payloadData.payment_status === "pending" ||
    payloadData.payment_status === "waiting_verification";

  const getPaymentStatusBadgeColor = () => {
    if (isPaymentPending) return "outline";
    if (isPaymentApproved) return "default";
    if (isPaymentRejected) return "destructive";
    return "secondary";
  };

  const getPaymentStatusLabel = () => {
    if (isPaymentPending) return "Menunggu Verifikasi";
    if (isPaymentApproved) return "Pembayaran Terverifikasi";
    if (isPaymentRejected) return "Pembayaran Ditolak";
    return payloadData.payment_status;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen md:max-w-3xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Verifikasi & Kelola Order" : "Tambah Order"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Verifikasi pembayaran dan assign teknisi"
              : "Isi detail Order baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-1 pb-4 px-4">
            {/* Status Badge */}
            {mode === "edit" && (
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Status Pembayaran
                  </p>
                  <Badge variant={getPaymentStatusBadgeColor() as any}>
                    {getPaymentStatusLabel()}
                  </Badge>
                </div>
              </div>
            )}

            {/* User Information */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Informasi Pengguna</h3>
              <div className="space-y-4">
                <FormInput
                  label="Nama Pengguna"
                  name="user_name"
                  type="text"
                  placeholder="Masukan nama pengguna"
                  required
                  disabled
                  value={payloadData.user_name}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      user_name: e.target.value,
                    }))
                  }
                  error={errors?.user_name?.[0]}
                />

                <FormInput
                  label="No. Telepon"
                  name="user_phone"
                  type="text"
                  placeholder="Masukan nomor telepon"
                  required
                  disabled
                  value={payloadData.user_phone}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      user_phone: e.target.value,
                    }))
                  }
                  error={errors?.user_phone?.[0]}
                />

                <FormInput
                  label="Email"
                  name="user_email"
                  type="email"
                  placeholder="Masukan email"
                  required
                  disabled
                  value={payloadData.user_email}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      user_email: e.target.value,
                    }))
                  }
                  error={errors?.user_email?.[0]}
                />
              </div>
            </div>

            {/* Service Information */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Informasi Layanan</h3>
              <div className="space-y-4">
                <FormInput
                  label="Nama Layanan"
                  name="service_name"
                  type="text"
                  placeholder="Masukan nama layanan"
                  required
                  disabled
                  value={payloadData.service_name}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      service_name: e.target.value,
                    }))
                  }
                  error={errors?.service_name?.[0]}
                />

                <FormInput
                  label="Harga Layanan"
                  name="price_service"
                  type="number"
                  placeholder="Masukan harga layanan"
                  required
                  disabled
                  value={payloadData.price_service}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      price_service: parseFloat(e.target.value) || 0,
                    }))
                  }
                  error={errors?.price_service?.[0]}
                />

                <FormTextarea
                  label="Catatan Masalah"
                  name="problem_note"
                  placeholder="Masukan catatan masalah"
                  disabled
                  value={payloadData.problem_note}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      problem_note: e.target.value,
                    }))
                  }
                  error={errors?.problem_note?.[0]}
                />

                <FormTextarea
                  label="Alamat"
                  name="address_text"
                  placeholder="Masukan alamat lokasi"
                  disabled
                  value={payloadData.address_text}
                  onChange={(e: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      address_text: e.target.value,
                    }))
                  }
                  error={errors?.address_text?.[0]}
                />
              </div>
            </div>

            {/* STAGE 1: Payment Verification */}
            {mode === "edit" && isPaymentWaitingVerification && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  Verifikasi Pembayaran
                </h3>
                <div className="space-y-4">
                  {payloadData.payment_proof ? (
                    <div className="border rounded-lg p-3 bg-muted">
                      <p className="text-xs text-muted-foreground mb-2">
                        Bukti Pembayaran
                      </p>
                      <Image
                        src={payloadData.payment_proof}
                        alt="Bukti Pembayaran"
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-96 object-contain rounded"
                      />
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Belum ada bukti pembayaran
                      </p>
                    </div>
                  )}

                  {payloadData.payment_proof && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        variant="default"
                        onClick={() =>
                          onVerifyPayment?.(payloadData.id || "", true)
                        }
                        disabled={isVerifying}
                      >
                        {isVerifying && <Spinner className="mr-2 h-4 w-4" />}
                        Setujui Pembayaran
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        onClick={() =>
                          onVerifyPayment?.(payloadData.id || "", false)
                        }
                        disabled={isVerifying}
                      >
                        {isVerifying && <Spinner className="mr-2 h-4 w-4" />}
                        Tolak Pembayaran
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 2: Technician Assignment (only after payment approved) */}
            {mode === "edit" && isPaymentApproved && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Assign Teknisi
                </h3>
                <div className="space-y-4">
                  <FormComboBox
                    label="Pilih Teknisi"
                    placeholder="Cari teknisi yang tersedia..."
                    options={technicianOptions}
                    value={payloadData.technician_id}
                    onChange={handleTechnicianSelect}
                    disabled={isTechnicianLoading}
                    error={errors?.technician_id?.[0]}
                  />

                  {payloadData.technician_id && (
                    <FormInput
                      label="Nama Teknisi"
                      name="technician_name"
                      type="text"
                      placeholder="Nama teknisi akan diisi otomatis"
                      disabled
                      value={payloadData.technician_name}
                      error={errors?.technician_name?.[0]}
                    />
                  )}
                </div>
              </div>
            )}

            {/* STAGE 3: Order Status (only after technician assigned) */}
            {mode === "edit" && payloadData.technician_id && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Status Order</h3>
                <div className="space-y-4">
                  <FormSelect
                    label="Status Order"
                    name="status"
                    placeholder="Pilih status"
                    value={payloadData.status}
                    onChange={(value: any) =>
                      setPayloadData((prev) => ({
                        ...prev,
                        status: value,
                      }))
                    }
                    options={statusOptions}
                    error={errors?.status?.[0]}
                  />
                </div>
              </div>
            )}

            {/* Payment Rejected State */}
            {mode === "edit" && isPaymentRejected && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ Pembayaran ditolak. Customer perlu mengirimkan bukti
                  pembayaran kembali.
                </p>
              </div>
            )}
          </FieldGroup>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Tutup
            </Button>
          </DialogClose>
          {mode === "edit" && payloadData.technician_id && (
            <Button onClick={onSubmit} disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Perbarui Order
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
