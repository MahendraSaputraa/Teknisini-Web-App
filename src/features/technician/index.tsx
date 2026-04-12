"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { CreateEditModal } from "./components/create-edit-modal";
import { useModal } from "@/hooks/use-modal";
import { payloadSchema, defaultValues, PayloadData } from "./schema";
import { useCreateTechnician } from "./hooks/use-create";
import { useUpdateUser } from "./hooks/use-update";
import { DeleteModal } from "@/components/modal/delete-modal";
import { useDeleteTechnician } from "./hooks/use-delete";
import { toast } from "sonner";

export default function TechnicianTableData() {
  // hooks
  const { create } = useCreateTechnician({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { update } = useUpdateUser({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { deleted } = useDeleteTechnician({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  // payload data
  const [errors, setErrors] = useState({});
  const [payloadData, setPayloadData] = useState<PayloadData>(defaultValues);

  // modal handler
  const { isOpen, openModal, closeModal } = useModal();
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
      phone: data.phone,
      category: data.category,
      status: data.status,
      rating_avg: 0,
      total_reviews: 0,
    });
    openModal();
  };

  const handleOpenDeleteModal = (data: any) => {
    setModalMode("delete");
    setPayloadData({
      id: data.id,
      name: data.name,
      phone: data.phone,
      category: data.category,
      status: data.status,
      rating_avg: 0,
      total_reviews: 0,
    });
    openModal();
  };

  const handleSubmitModal = async () => {
    console.log("error", errors);

    const result = payloadSchema.safeParse(payloadData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    if (modalMode === "add") {
      const { id, ...payload } = payloadData;
      create.mutate(payload);
    }
    if (modalMode === "edit") {
      const { id, ...rest } = payloadData;

      update.mutate({ id, rest });
    }
  };
  const handleDeleteModal = () => {
    if (!payloadData?.id) return toast.error("Tidak ada data yang dipilih.");

    deleted.mutate({ id: payloadData.id });
  };

  // table data
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

  return (
    <>
      {/* toolbar */}
      <TableToolbar
        table={table}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        onAdd={handleOpenAddModal}
        addLabel="Tambah Teknisi"
      />
      {/* table */}
      <TableData
        table={table}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isPending={isPending}
      />
      {/* modal */}
      {(modalMode === "add" || modalMode === "edit") && (
        <CreateEditModal
          isOpen={isOpen}
          mode={modalMode}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleSubmitModal}
          isPending={create.isPending || update.isPending}
          errors={errors}
          payloadData={payloadData}
          setPayloadData={setPayloadData}
        />
      )}
      {modalMode === "delete" && (
        <DeleteModal
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleDeleteModal}
          selectedData={payloadData}
          isPending={deleted.isPending}
          title="Hapus Teknisi"
        />
      )}
    </>
  );
}
