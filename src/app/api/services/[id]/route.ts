import { NextResponse } from "next/server"
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/services/serviceService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

/**
 * GET /api/services/:id
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await getServiceById(id)
    return NextResponse.json({ data: service }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * PATCH /api/services/:id
 * Body (semua optional):
 *   - name, category_id, description, price, duration_minutes, is_active
 * Jika category_id diubah, category_name otomatis diperbarui.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateService(id, body)
    return NextResponse.json({ data: updated }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/services/:id
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteService(id)
    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
