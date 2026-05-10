import { Dispatch, SetStateAction, useMemo } from "react";

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

export interface CreateEditModalProps {
  isOpen: boolean;
  mode: "edit" | "create" | string;
  onClose: (open: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
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

const paymentStatusOptions = [
  { label: "Menunggu", value: "pending" },
  { label: "Terverifikasi", value: "verified" },
  { label: "Ditolak", value: "rejected" },
];

export function CreateEditModal({
  isOpen,
  mode,
  onClose,
  onSubmit,
  isPending,
  setPayloadData,
  payloadData,
  errors,
}: CreateEditModalProps) {
  const { data: technicianData, isPending: isTechnicianLoading } = useTechnicianList();

  const technicianOptions = useMemo(() => {
    if (!technicianData?.data) return [];
    return technicianData.data.map((tech: any) => ({
      label: tech.name,
      value: tech.id,
    }));
  }, [technicianData?.data]);

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
      (tech: any) => tech.id === option.value
    );
    setPayloadData((prev) => ({
      ...prev,
      technician_id: option.value,
      technician_name: selectedTechnician?.name || option.label || "",
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen md:max-w-2xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Order" : "Tambah Order"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail Order ini."
              : "Isi detail Order baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-1 pb-4 px-4">
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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
                  disabled={mode === "edit"}
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

            {/* Status Information */}
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

                <FormSelect
                  label="Status Pembayaran"
                  name="payment_status"
                  placeholder="Pilih status pembayaran"
                  value={payloadData.payment_status}
                  onChange={(value: any) =>
                    setPayloadData((prev) => ({
                      ...prev,
                      payment_status: value,
                    }))
                  }
                  options={paymentStatusOptions}
                  error={errors?.payment_status?.[0]}
                />

                <FormComboBox
                  label="Pilih Teknisi"
                  placeholder="Cari teknisi..."
                  options={technicianOptions}
                  value={payloadData.technician_id}
                  onChange={handleTechnicianSelect}
                  disabled={isTechnicianLoading}
                  error={errors?.technician_id?.[0]}
                />

                <FormInput
                  label="Nama Teknisi"
                  name="technician_name"
                  type="text"
                  placeholder="Nama teknisi akan diisi otomatis"
                  disabled
                  value={payloadData.technician_name}
                  error={errors?.technician_name?.[0]}
                />
              </div>
            </div>
          </FieldGroup>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isPending}>
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            {mode === "edit" ? "Perbarui" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
