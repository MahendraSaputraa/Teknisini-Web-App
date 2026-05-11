"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { CreateEditModal } from "./components/create-edit-modal";
import { useModal } from "@/hooks/use-modal";
import { payloadSchema, defaultValues, PayloadData } from "./schema";
import { useUpdateOrder } from "./hooks/use-update";
import { useVerifyPayment } from "./hooks/use-verify-payment";
import { DeleteModal } from "@/components/modal/delete-modal";
import { toast } from "sonner";

export default function OrderTableData() {
  // hooks
  const { update } = useUpdateOrder({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  const { verify } = useVerifyPayment({
    onSuccessCallback: () => {
      // Data will be refreshed by query invalidation in hook
      // Modal is closed in handleVerifyPayment
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

  const handleOpenEditModal = (data: any) => {
    setModalMode("edit");
    setPayloadData({
      id: data.id,
      status: data.status,
      payment_status: data.payment_status,
      user_name: data.user_name,
      user_phone: data.user_phone,
      user_email: data.user_email,
      service_name: data.service_name,
      price_service: data.price_service,
      problem_note: data.problem_note,
      address_text: data.address_text,
      payment_proof: data.payment_proof,
      technician_id: data.technician_id,
      technician_name: data.technician_name,
    });
    openModal();
  };

  const handleOpenDeleteModal = (data: any) => {
    setPayloadData({
      id: data.id,
      status: data.status,
      payment_status: data.payment_status,
      user_name: data.user_name,
      user_phone: data.user_phone,
      user_email: data.user_email,
      service_name: data.service_name,
      price_service: data.price_service,
      problem_note: data.problem_note,
      address_text: data.address_text,
      payment_proof: data.payment_proof,
      technician_id: data.technician_id,
      technician_name: data.technician_name,
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

  // handle verify payment
  const handleVerifyPayment = async (orderId: string, approve: boolean) => {
    try {
      await verify.mutateAsync({ id: orderId, approve });
      // Close modal after successful verification
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

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

      if (modalMode === "edit") {
        await update.mutateAsync({
          id: payloadData.id,
          payload: {
            status: payloadData.status,
            payment_status: payloadData.payment_status,
            technician_id: payloadData.technician_id,
          },
        });
      }
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
        addLabel="Tambah Order"
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
        onVerifyPayment={handleVerifyPayment}
        isPending={update.isPending}
        isVerifying={verify.isPending}
        payloadData={payloadData}
        setPayloadData={setPayloadData}
        errors={errors as any}
      />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={closeDeleteModal}
        onSubmit={() => {
          // Delete logic akan ditambahkan jika dibutuhkan
          toast.info("Delete functionality akan ditambahkan");
        }}
        isPending={false}
        title="Hapus Order"
        selectedData={payloadData}
      />
    </div>
  );
}
