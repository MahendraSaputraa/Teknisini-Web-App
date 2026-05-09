/**
 * POST /api/upload
 *
 * Menerima file gambar via FormData, upload ke Cloudinary,
 * dan mengembalikan URL publik yang bisa disimpan ke Firestore.
 *
 * FormData fields:
 *   - file    (File, required)  — file gambar
 *   - folder  (string, required) — "payment_proofs" | "technician_photos"
 *   - name    (string, optional) — custom filename tanpa ekstensi
 *
 * Response:
 *   { data: { url, public_id, width, height, format, bytes } }
 */

import { NextResponse } from "next/server"
import { uploadToCloudinary, UploadFolder } from "@/lib/cloudinary"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_FOLDERS: UploadFolder[] = ["payment_proofs", "technician_photos"]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // ── Validasi field ──────────────────────────────────────────────────────

    const file = formData.get("file") as File | null
    const folder = formData.get("folder") as string | null
    const customName = formData.get("name") as string | null

    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 })
    }

    if (!folder || !ALLOWED_FOLDERS.includes(folder as UploadFolder)) {
      return NextResponse.json(
        { error: `folder must be one of: ${ALLOWED_FOLDERS.join(", ")}` },
        { status: 400 }
      )
    }

    // ── Validasi tipe & ukuran ──────────────────────────────────────────────

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WEBP images are allowed" },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size must not exceed 5MB" },
        { status: 400 }
      )
    }

    // ── Upload ke Cloudinary ────────────────────────────────────────────────

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await uploadToCloudinary(
      buffer,
      folder as UploadFolder,
      customName ?? undefined
    )

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error) {
    console.error("[POST /api/upload] Error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
