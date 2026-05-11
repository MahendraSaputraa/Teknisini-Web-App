import { Dispatch, SetStateAction } from "react";

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
import { FormComboBox } from "@/components/form-components/form-combobox";
import { PayloadData } from "../schema";
import { FormSelect } from "@/components/form-components/form-select";
import { useCategories } from "../hooks/use-categories";

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
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const categoryOptions =
    categoriesData?.data?.map((cat: any) => ({
      label: cat.name,
      value: cat.name,
    })) || [];

  const statusOptions = [
    { label: "Tersedia", value: "available" },
    { label: "Sibuk", value: "busy" },
    { label: "Dipecat", value: "suspended" },
  ];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] md:max-w-2xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Teknisi" : "Tambah Teknisi"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail Teknisi ini."
              : "Isi detail Teknisi baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-2 pb-4 px-4">
            <FormInput
              label="Nama"
              name="name"
              type="text"
              placeholder="Masukan nama Teknisi"
              required
              value={payloadData.name}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              error={errors?.name?.[0]}
            />
            <FormInput
              label="Telpon"
              name="phone"
              type="text"
              placeholder="089121312"
              required
              value={payloadData.phone}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              error={errors?.phone?.[0]}
            />
            <FormComboBox
              label="Kategori Teknisi"
              name="category"
              placeholder="Pilih kategori teknisi..."
              required
              value={payloadData.category}
              onChange={(option) =>
                setPayloadData((prev: any) => ({
                  ...prev,

                  category: option?.value || "",
                }))
              }
              options={categoryOptions}
              isLoading={isCategoriesLoading}
              error={errors?.category?.[0]}
            />

            <FormSelect
              label="Status Teknisi"
              name="status"
              placeholder="Pilih kategori teknisi..."
              options={statusOptions}
              required={true}
              value={payloadData.status}
              onChange={(val) =>
                setPayloadData((prev: any) => ({
                  ...prev,
                  status: val,
                }))
              }
              error={errors?.status?.[0]}
            />
          </FieldGroup>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="h-11" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="h-11" onClick={onSubmit} disabled={isPending}>
            {isPending && <Spinner />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
