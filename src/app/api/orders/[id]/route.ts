import { NextResponse } from "next/server"
import {
  getOrderById,
  OrderStatus,
  assignTechnician,
  updateOrderStatus,
  uploadPaymentProof,
  verifyPayment,
} from "@/lib/services/orderService"
import { AppError } from "@/lib/services/errors"

type OrderAction =
  | "upload_payment_proof"
  | "verify_payment"
  | "assign_technician"
  | "update_status"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await getOrderById(id)
    return NextResponse.json({ data: order }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const action = body.action as OrderAction

    if (!action) {
      throw new AppError("action is required", 400)
    }

    if (action === "upload_payment_proof") {
      const paymentProof = body.payment_proof as string
      const updated = await uploadPaymentProof(id, paymentProof)
      return NextResponse.json({ data: updated }, { status: 200 })
    }

    if (action === "verify_payment") {
      if (typeof body.approve !== "boolean") {
        throw new AppError("approve must be boolean", 400)
      }

      const updated = await verifyPayment(id, body.approve as boolean)
      return NextResponse.json({ data: updated }, { status: 200 })
    }

    if (action === "assign_technician") {
      const technicianId = body.technician_id as string
      const updated = await assignTechnician(id, technicianId)
      return NextResponse.json({ data: updated }, { status: 200 })
    }

    if (action === "update_status") {
      const nextStatus = body.status as OrderStatus
      const updated = await updateOrderStatus(id, nextStatus)
      return NextResponse.json({ data: updated }, { status: 200 })
    }

    throw new AppError("Unsupported action", 400)
  } catch (error) {
    return handleApiError(error)
  }
}
