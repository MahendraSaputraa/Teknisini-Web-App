import api from "@/lib/axios";

export interface GetOrdersParams {
  user_id?: string;
  status?: string;
  payment_status?: string;
}

// ─── Baca ─────────────────────────────────────────────────────────────────────

export const getOrders = async (params?: GetOrdersParams) => {
  const res = await api.get("/orders", { params });
  return res.data;
};

export const getOrderById = async (id: string) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

// ─── Buat Pesanan ─────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  user_id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  service_id: string;
  service_name: string;
  price_service: number;
  problem_note?: string;
  location: { lat: number; lng: number };
  address_text?: string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

// ─── Upload Bukti Bayar ───────────────────────────────────────────────────────

export const uploadPaymentProof = async (
  orderId: string,
  paymentProofUrl: string,
) => {
  const res = await api.patch(`/orders/${orderId}`, {
    action: "upload_payment_proof",
    payment_proof: paymentProofUrl,
  });
  return res.data;
};

// ─── Verifikasi Pembayaran (Admin) ────────────────────────────────────────────

export const verifyPayment = async (orderId: string, approve: boolean) => {
  const res = await api.patch(`/orders/${orderId}`, {
    action: "verify_payment",
    approve,
  });
  return res.data;
};

// ─── Assign Teknisi (Admin) ───────────────────────────────────────────────────

export const assignTechnician = async (
  orderId: string,
  technicianId: string,
) => {
  const res = await api.patch(`/orders/${orderId}`, {
    action: "assign_technician",
    technician_id: technicianId,
  });
  return res.data;
};

// ─── Update Status (Admin / Teknisi) ─────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "diproses"
  | "menuju_lokasi"
  | "completed"
  | "cancelled";

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  const res = await api.patch(`/orders/${orderId}`, {
    action: "update_status",
    status,
  });
  return res.data;
};

// ─── Batalkan Pesanan (shortcut untuk customer) ────────────────────────────────

export const cancelOrder = async (orderId: string) =>
  updateOrderStatus(orderId, "cancelled");
