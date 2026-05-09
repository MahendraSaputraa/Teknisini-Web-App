import { NextResponse } from "next/server"
import {
  listServices,
  createService,
  ListServicesFilter,
} from "@/lib/services/serviceService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

/**
 * GET /api/services
 * Query params:
 *   - category_id=xxx  → filter layanan berdasarkan kategori
 *   - active=true      → hanya tampilkan layanan yang aktif
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const filter: ListServicesFilter = {}

    const categoryId = searchParams.get("category_id")
    if (categoryId) filter.category_id = categoryId

    const active = searchParams.get("active")
    if (active === "true") filter.is_active = true
    if (active === "false") filter.is_active = false

    const services = await listServices(
      Object.keys(filter).length > 0 ? filter : undefined
    )

    return NextResponse.json({ data: services }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/services
 * Body:
 *   - name             (string, required)
 *   - category_id      (string, required — harus ada di collection categories)
 *   - price            (number, required — lebih dari 0)
 *   - description      (string, optional)
 *   - duration_minutes (number, optional, default: 60)
 *   - is_active        (boolean, optional, default: true)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const service = await createService(body)
    return NextResponse.json({ data: service }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
