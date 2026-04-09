import { NextResponse } from "next/server"
import {
  createTechnician,
  listTechnicians,
  TechnicianStatus,
} from "@/lib/services/technicianService"
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
    const status = searchParams.get("status") as TechnicianStatus | null
    const technicians = await listTechnicians(status ?? undefined)

    return NextResponse.json({ data: technicians }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const technician = await createTechnician(body)

    return NextResponse.json({ data: technician }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
