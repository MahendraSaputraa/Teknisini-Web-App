"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { CreateEditModal } from "./components/create-edit-modal";
import { useModal } from "@/hooks/use-modal";
import { payloadSchema, defaultValues, PayloadData } from "./schema";
import { useCreateCategory } from "./hooks/use-create";
import { useUpdateCategory } from "./hooks/use-update";
import { DeleteModal } from "@/components/modal/delete-modal";
import { useDeleteCategory } from "./hooks/use-delete";

export default function CategoryTableData() {
  // hooks
  const { create } = useCreateCategory({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { update } = useUpdateCategory({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { deleted } = useDeleteCategory({
    onSuccessCallback: () => {
      closeDeleteModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  // payload data
  const [errors, setErrors] = useState({});
  const [payloadData, setPayloadData] = useState<PayloadData>(defaultValues);

  // modal handler
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const [modalMode, setModalMode] = useState("add");

  const handleOpenAddModal = () => {
    setModalMode("add");
    setPayloadData(defaultValues);
    openModal();
  };

  const handleOpenEditModal = (data: any) => {
    setModalMode("edit");
    setPayloadData({
      id: data.id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      is_active: data.is_active,
    });
    openModal();
  };

  const handleOpenDeleteModal = (data: any) => {
    setPayloadData({
      id: data.id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      is_active: data.is_active,
    });
    openDeleteModal();
  };

  const {
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    data,
    isPending,
  } = useTableData({
    onEdit: handleOpenEditModal,
    onDelete: handleOpenDeleteModal,
  });

  // handle submit
  const handleSubmit = async () => {
    try {
      const validation = payloadSchema.safeParse(payloadData);

      if (!validation.success) {
        const formattedErrors = validation.error.flatten().fieldErrors;
        setErrors(formattedErrors);
        return;
      }

      setErrors({});

      if (modalMode === "add") {
        await create.mutateAsync({
          name: payloadData.name,

          description: payloadData.description,
          icon: payloadData.icon,
          is_active: payloadData.is_active,
        });
      } else {
        await update.mutateAsync({
          id: payloadData.id,
          payload: {
            name: payloadData.name,

            description: payloadData.description,
            icon: payloadData.icon,
            is_active: payloadData.is_active,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleted.mutateAsync(payloadData.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <TableToolbar
        table={table}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        onAdd={handleOpenAddModal}
        addLabel="Tambah Kategori"
      />

      <TableData
        table={table}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isPending={isPending}
      />

      <CreateEditModal
        isOpen={isOpen}
        mode={modalMode}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isPending={create.isPending || update.isPending}
        payloadData={payloadData}
        setPayloadData={setPayloadData}
        errors={errors as any}
      />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={closeDeleteModal}
        onSubmit={handleDelete}
        isPending={deleted.isPending}
        title="Hapus Kategori"
        selectedData={payloadData}
      />
    </div>
  );
}
