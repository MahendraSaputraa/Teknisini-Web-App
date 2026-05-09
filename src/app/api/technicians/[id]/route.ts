import { NextResponse } from "next/server"
import {
  getTechnicianById,
  updateTechnicianStatus,
  updateTechnician,
  deleteTechnician,
  TechnicianStatus,
} from "@/lib/services/technicianService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

// GET /api/technicians/:id
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const technician = await getTechnicianById(id)
    return NextResponse.json({ data: technician }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/technicians/:id
// Body: { name?, phone?, category?, status? }
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Jika hanya update status saja
    if (body.status && Object.keys(body).length === 1) {
      const updated = await updateTechnicianStatus(id, body.status as TechnicianStatus)
      return NextResponse.json({ data: updated }, { status: 200 })
    }

    // Update field lainnya (name, phone, category, status)
    const updated = await updateTechnician(id, body)
    return NextResponse.json({ data: updated }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/technicians/:id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteTechnician(id)
    return NextResponse.json(
      { message: "Technician deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}