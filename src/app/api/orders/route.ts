import { NextResponse } from "next/server"
import { createOrder, listOrders, ListOrdersFilter, OrderStatus, PaymentStatus } from "@/lib/services/orderService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const filter: ListOrdersFilter = {}

    const userId = searchParams.get("user_id")
    if (userId) filter.user_id = userId

    const status = searchParams.get("status") as OrderStatus | null
    if (status) filter.status = status

    const paymentStatus = searchParams.get("payment_status") as PaymentStatus | null
    if (paymentStatus) filter.payment_status = paymentStatus

    const orders = await listOrders(Object.keys(filter).length > 0 ? filter : undefined)
    return NextResponse.json({ data: orders }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const order = await createOrder(body)
    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}