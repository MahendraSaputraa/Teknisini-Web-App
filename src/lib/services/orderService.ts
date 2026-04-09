import { Timestamp } from "firebase-admin/firestore"
import { db } from "@/lib/firebase"
import { AppError } from "@/lib/services/errors"

export type OrderStatus =
  | "pending"
  | "diproses"
  | "menuju_lokasi"
  | "completed"
  | "cancelled"

export type PaymentStatus =
  | "pending"
  | "waiting_verification"
  | "paid"
  | "rejected"

export interface OrderLocation {
  lat: number
  lng: number
}

export interface Order {
  id: string
  user_id: string
  user_name: string
  user_phone: string
  user_email: string
  service_id: string
  service_name: string
  price_service: number
  platform_fee: number
  total_price: number
  problem_note: string
  location: OrderLocation
  address_text: string
  status: OrderStatus
  payment_status: PaymentStatus
  technician_id: string | null
  technician_name: string | null
  payment_proof: string | null
  created_at: string | null
  completed_at: string | null
}

export interface CreateOrderInput {
  user_id?: string
  user_name?: string
  user_phone?: string
  user_email?: string
  service_id?: string
  service_name?: string
  price_service?: number
  problem_note?: string
  location?: OrderLocation
  address_text?: string
}

const ORDER_COLLECTION = "orders"
const TECHNICIAN_COLLECTION = "technicians"
const PLATFORM_FEE_RATE = 0.25

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["diproses", "cancelled"],
  diproses: ["menuju_lokasi", "cancelled"],
  menuju_lokasi: ["completed"],
  completed: [],
  cancelled: [],
}

function toIso(value: unknown): string | null {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString()
  }

  return null
}

function mapOrderDoc(doc: FirebaseFirestore.DocumentSnapshot): Order {
  const data = doc.data()
  if (!data) {
    throw new AppError("Order not found", 404)
  }

  return {
    id: doc.id,
    user_id: data.user_id,
    user_name: data.user_name,
    user_phone: data.user_phone,
    user_email: data.user_email,
    service_id: data.service_id,
    service_name: data.service_name,
    price_service: data.price_service,
    platform_fee: data.platform_fee,
    total_price: data.total_price,
    problem_note: data.problem_note,
    location: data.location,
    address_text: data.address_text,
    status: data.status,
    payment_status: data.payment_status,
    technician_id: data.technician_id,
    technician_name: data.technician_name,
    payment_proof: data.payment_proof,
    created_at: toIso(data.created_at),
    completed_at: toIso(data.completed_at),
  }
}

function ensureRequiredCreateFields(input: CreateOrderInput) {
  if (!input.user_id || !input.service_id) {
    throw new AppError("user_id and service_id are required", 400)
  }

  if (typeof input.price_service !== "number" || input.price_service <= 0) {
    throw new AppError("price_service must be a number greater than 0", 400)
  }

  if (
    !input.location ||
    typeof input.location.lat !== "number" ||
    typeof input.location.lng !== "number"
  ) {
    throw new AppError("location with numeric lat and lng is required", 400)
  }
}

function assertTransitionAllowed(currentStatus: OrderStatus, nextStatus: OrderStatus) {
  const validTargets = allowedTransitions[currentStatus]

  if (!validTargets.includes(nextStatus)) {
    throw new AppError(
      `Invalid status transition: ${currentStatus} -> ${nextStatus}`,
      400
    )
  }
}

export async function createOrder(input: CreateOrderInput) {
  ensureRequiredCreateFields(input)

  const priceService = input.price_service as number
  const platformFee = Number((priceService * PLATFORM_FEE_RATE).toFixed(2))
  const totalPrice = Number((priceService + platformFee).toFixed(2))

  const payload = {
    user_id: input.user_id,
    user_name: input.user_name ?? "",
    user_phone: input.user_phone ?? "",
    user_email: input.user_email ?? "",
    service_id: input.service_id,
    service_name: input.service_name ?? "",
    price_service: priceService,
    platform_fee: platformFee,
    total_price: totalPrice,
    problem_note: input.problem_note ?? "",
    location: input.location,
    address_text: input.address_text ?? "",
    status: "pending" as const,
    payment_status: "pending" as const,
    technician_id: null,
    technician_name: null,
    payment_proof: null,
    created_at: Timestamp.now(),
    completed_at: null,
  }

  const orderRef = await db.collection(ORDER_COLLECTION).add(payload)
  const createdOrder = await orderRef.get()
  return mapOrderDoc(createdOrder)
}

export async function listOrders() {
  const snapshot = await db
    .collection(ORDER_COLLECTION)
    .orderBy("created_at", "desc")
    .get()

  return snapshot.docs.map(mapOrderDoc)
}

export async function getOrderById(orderId: string) {
  const orderRef = db.collection(ORDER_COLLECTION).doc(orderId)
  const snapshot = await orderRef.get()

  if (!snapshot.exists) {
    throw new AppError("Order not found", 404)
  }

  return mapOrderDoc(snapshot)
}

export async function uploadPaymentProof(orderId: string, paymentProof: string) {
  if (!paymentProof) {
    throw new AppError("payment_proof is required", 400)
  }

  const orderRef = db.collection(ORDER_COLLECTION).doc(orderId)
  const snapshot = await orderRef.get()

  if (!snapshot.exists) {
    throw new AppError("Order not found", 404)
  }

  await orderRef.update({
    payment_proof: paymentProof,
    payment_status: "waiting_verification",
  })

  const updated = await orderRef.get()
  return mapOrderDoc(updated)
}

export async function verifyPayment(orderId: string, approve: boolean) {
  const orderRef = db.collection(ORDER_COLLECTION).doc(orderId)
  const snapshot = await orderRef.get()

  if (!snapshot.exists) {
    throw new AppError("Order not found", 404)
  }

  const order = mapOrderDoc(snapshot)

  if (!order.payment_proof) {
    throw new AppError("Cannot verify payment without payment_proof", 400)
  }

  if (approve) {
    assertTransitionAllowed(order.status, "diproses")

    await orderRef.update({
      status: "diproses",
      payment_status: "paid",
    })
  } else {
    await orderRef.update({ payment_status: "rejected" })
  }

  const updated = await orderRef.get()
  return mapOrderDoc(updated)
}

export async function assignTechnician(orderId: string, technicianId: string) {
  if (!technicianId) {
    throw new AppError("technician_id is required", 400)
  }

  const orderRef = db.collection(ORDER_COLLECTION).doc(orderId)
  const technicianRef = db.collection(TECHNICIAN_COLLECTION).doc(technicianId)

  await db.runTransaction(async (tx) => {
    const [orderSnap, technicianSnap] = await Promise.all([
      tx.get(orderRef),
      tx.get(technicianRef),
    ])

    if (!orderSnap.exists) {
      throw new AppError("Order not found", 404)
    }

    if (!technicianSnap.exists) {
      throw new AppError("Technician not found", 404)
    }

    const orderData = orderSnap.data() as Record<string, unknown>
    const technicianData = technicianSnap.data() as Record<string, unknown>
    const orderStatus = orderData.status as OrderStatus
    const technicianStatus = technicianData.status as string

    if (technicianStatus !== "available") {
      throw new AppError("Technician is not available", 409)
    }

    assertTransitionAllowed(orderStatus, "diproses")

    tx.update(orderRef, {
      technician_id: technicianSnap.id,
      technician_name: technicianData.name,
      status: "diproses",
    })

    tx.update(technicianRef, { status: "busy" })
  })

  const updated = await orderRef.get()
  return mapOrderDoc(updated)
}

export async function updateOrderStatus(orderId: string, nextStatus: OrderStatus) {
  const orderRef = db.collection(ORDER_COLLECTION).doc(orderId)

  await db.runTransaction(async (tx) => {
    const orderSnap = await tx.get(orderRef)

    if (!orderSnap.exists) {
      throw new AppError("Order not found", 404)
    }

    const orderData = orderSnap.data() as Record<string, unknown>
    const currentStatus = orderData.status as OrderStatus

    assertTransitionAllowed(currentStatus, nextStatus)

    const updates: Record<string, unknown> = { status: nextStatus }

    if (nextStatus === "completed") {
      updates.completed_at = Timestamp.now()
    }

    tx.update(orderRef, updates)

    if (nextStatus === "completed" && orderData.technician_id) {
      const technicianRef = db
        .collection(TECHNICIAN_COLLECTION)
        .doc(orderData.technician_id as string)

      tx.update(technicianRef, { status: "available" })
    }
  })

  const updated = await orderRef.get()
  return mapOrderDoc(updated)
}
