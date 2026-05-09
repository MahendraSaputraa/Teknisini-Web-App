import { NextResponse } from "next/server"
import {
  listCategories,
  createCategory,
} from "@/lib/services/categoryService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

/**
 * GET /api/categories
 * Query params:
 *   - active=true  → hanya tampilkan kategori yang aktif
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get("active") === "true"

    const categories = await listCategories(onlyActive)
    return NextResponse.json({ data: categories }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/categories
 * Body:
 *   - name        (string, required)
 *   - slug        (string, optional — auto-generated dari name jika tidak diisi)
 *   - description (string, optional)
 *   - icon        (string, optional — nama icon atau URL)
 *   - is_active   (boolean, optional, default: true)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const category = await createCategory(body)
    return NextResponse.json({ data: category }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
