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
import { FormTextarea } from "@/components/form-components/form-textarea";
import { FormSelect } from "@/components/form-components/form-select";
import { PayloadData } from "../schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  const { data: categoriesData } = useCategories();

  const categoryOptions =
    categoriesData?.data?.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    })) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen md:max-w-2xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Layanan" : "Tambah Layanan"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail Layanan ini."
              : "Isi detail Layanan baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-1 pb-4 px-4">
            <FormInput
              label="Nama Layanan"
              name="name"
              type="text"
              placeholder="Masukan nama layanan"
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

            <FormSelect
              label="Kategori"
              name="category_id"
              placeholder="Pilih kategori"
              required
              options={categoryOptions}
              value={payloadData.category_id}
              onChange={(value) =>
                setPayloadData((prev) => ({
                  ...prev,
                  category_id: value,
                }))
              }
              error={errors?.category_id?.[0]}
            />

            <FormInput
              label="Harga (Rp)"
              name="price"
              type="number"
              placeholder="Masukan harga layanan"
              required
              value={payloadData.price}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
              error={errors?.price?.[0]}
            />

            <FormInput
              label="Durasi (menit)"
              name="duration_minutes"
              type="number"
              placeholder="60"
              value={payloadData.duration_minutes}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  duration_minutes: parseInt(e.target.value) || 60,
                }))
              }
              error={errors?.duration_minutes?.[0]}
            />

            <FormTextarea
              label="Deskripsi"
              name="description"
              placeholder="Masukan deskripsi layanan"
              value={payloadData.description}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              error={errors?.description?.[0]}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={payloadData.is_active || false}
                onCheckedChange={(checked) =>
                  setPayloadData((prev) => ({
                    ...prev,
                    is_active: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="is_active" className="font-medium cursor-pointer">
                Aktif
              </Label>
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
