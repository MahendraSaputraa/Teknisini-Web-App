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
import { PayloadData } from "../schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] md:max-w-2xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Kategori" : "Tambah Kategori"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail Kategori ini."
              : "Isi detail Kategori baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-1 pb-4 px-4">
            <FormInput
              label="Nama Kategori"
              name="name"
              type="text"
              placeholder="Masukan nama kategori"
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

            <FormTextarea
              label="Deskripsi"
              name="description"
              placeholder="Masukan deskripsi kategori"
              value={payloadData.description}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              error={errors?.description?.[0]}
            />

            <FormInput
              label="Icon"
              name="icon"
              type="text"
              placeholder="Nama icon atau URL"
              value={payloadData.icon}
              onChange={(e: any) =>
                setPayloadData((prev) => ({
                  ...prev,
                  icon: e.target.value,
                }))
              }
              error={errors?.icon?.[0]}
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
