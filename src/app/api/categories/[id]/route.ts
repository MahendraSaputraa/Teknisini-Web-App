import { NextResponse } from "next/server"
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/lib/services/categoryService"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

/**
 * GET /api/categories/:id
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await getCategoryById(id)
    return NextResponse.json({ data: category }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * PATCH /api/categories/:id
 * Body (semua optional):
 *   - name, slug, description, icon, is_active
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateCategory(id, body)
    return NextResponse.json({ data: updated }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/categories/:id
 * Gagal jika masih ada services yang menggunakan kategori ini
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteCategory(id)
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
