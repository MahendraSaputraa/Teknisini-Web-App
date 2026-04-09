import { NextResponse } from "next/server"
import { createOrder, listOrders } from "@/lib/services/orderService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function GET() {
  try {
    const orders = await listOrders()
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
