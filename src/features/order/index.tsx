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
import { useAssignTechnician } from "./hooks/use-assign-technician";
import { useDeleteOrder } from "./hooks/use-delete";

export default function OrderTableData() {
  // hooks
  const { deleted } = useDeleteOrder({
    onSuccessCallback: () => {
      closeDeleteModal();
      setPayloadData(defaultValues);
    },
  });

  const { update } = useUpdateOrder({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  const { verify } = useVerifyPayment({
    onSuccessCallback: (response: any) => {
      // API returns { data: order }
      const updatedOrder = response?.data;
      if (updatedOrder) {
        setPayloadData({
          id: updatedOrder.id,
          status: updatedOrder.status,
          payment_status: updatedOrder.payment_status,
          user_name: updatedOrder.user_name,
          user_phone: updatedOrder.user_phone,
          user_email: updatedOrder.user_email,
          service_name: updatedOrder.service_name,
          service_id: updatedOrder.service_id,
          category_id: updatedOrder.category_id,
          price_service: updatedOrder.price_service,
          problem_note: updatedOrder.problem_note,
          address_text: updatedOrder.address_text,
          payment_proof: updatedOrder.payment_proof,
          technician_id: updatedOrder.technician_id,
          technician_name: updatedOrder.technician_name,
        });
      }
      setErrors({});
    },
  });

  const { assign } = useAssignTechnician({
    onSuccessCallback: (response: any) => {
      // API returns { data: order }
      const updatedOrder = response?.data;
      if (updatedOrder) {
        setPayloadData({
          id: updatedOrder.id,
          status: updatedOrder.status,
          payment_status: updatedOrder.payment_status,
          user_name: updatedOrder.user_name,
          user_phone: updatedOrder.user_phone,
          user_email: updatedOrder.user_email,
          service_name: updatedOrder.service_name,
          service_id: updatedOrder.service_id,
          category_id: updatedOrder.category_id,
          price_service: updatedOrder.price_service,
          problem_note: updatedOrder.problem_note,
          address_text: updatedOrder.address_text,
          payment_proof: updatedOrder.payment_proof,
          technician_id: updatedOrder.technician_id,
          technician_name: updatedOrder.technician_name,
        });
      }
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
      service_id: data.service_id,
      category_id: data.category_id,
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
      service_id: data.service_id,
      category_id: data.category_id,
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
      const result = await verify.mutateAsync({ id: orderId, approve });
      // Sync full payload from result to trigger immediate UI transition
      if (result?.data) {
        const updatedOrder = result.data;
        setPayloadData({
          id: updatedOrder.id,
          status: updatedOrder.status,
          payment_status: updatedOrder.payment_status,
          user_name: updatedOrder.user_name,
          user_phone: updatedOrder.user_phone,
          user_email: updatedOrder.user_email,
          service_name: updatedOrder.service_name,
          service_id: updatedOrder.service_id,
          category_id: updatedOrder.category_id,
          price_service: updatedOrder.price_service,
          problem_note: updatedOrder.problem_note,
          address_text: updatedOrder.address_text,
          payment_proof: updatedOrder.payment_proof,
          technician_id: updatedOrder.technician_id,
          technician_name: updatedOrder.technician_name,
        });
      }
      setErrors({});
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  const handleAssignTechnician = async (
    orderId: string,
    technicianId: string,
  ) => {
    try {
      const result = await assign.mutateAsync({ id: orderId, technicianId });
      // Sync full payload from result to trigger immediate UI transition to Stage 3
      if (result?.data) {
        const updatedOrder = result.data;
        setPayloadData({
          id: updatedOrder.id,
          status: updatedOrder.status,
          payment_status: updatedOrder.payment_status,
          user_name: updatedOrder.user_name,
          user_phone: updatedOrder.user_phone,
          user_email: updatedOrder.user_email,
          service_name: updatedOrder.service_name,
          service_id: updatedOrder.service_id,
          category_id: updatedOrder.category_id,
          price_service: updatedOrder.price_service,
          problem_note: updatedOrder.problem_note,
          address_text: updatedOrder.address_text,
          payment_proof: updatedOrder.payment_proof,
          technician_id: updatedOrder.technician_id,
          technician_name: updatedOrder.technician_name,
        });
      }
    } catch (error) {
      console.error("Error assigning technician:", error);
    }
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      const validation = payloadSchema.safeParse(payloadData);
      if (!validation.success) {
        setErrors(validation.error.flatten().fieldErrors);
        return;
      }
      setErrors({});

      if (modalMode === "edit") {
        await update.mutateAsync({
          id: payloadData.id,
          payload: {
            action: "update_status", // pastikan action dikirim
            status: payloadData.status,
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
        onAssignTechnician={handleAssignTechnician}
        isAssigning={assign.isPending}
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
          if (payloadData.id) {
            deleted.mutate(payloadData.id);
          }
        }}
        isPending={deleted.isPending}
        title="Hapus Order"
        selectedData={payloadData}
      />
    </div>
  );
}
