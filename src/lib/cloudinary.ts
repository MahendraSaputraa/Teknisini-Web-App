/**
 * src/lib/cloudinary.ts
 * Konfigurasi Cloudinary — hanya dipakai di server (API routes)
 * Jangan import file ini di client component
 */
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// ─── Types ────────────────────────────────────────────────────────────────────

export type UploadFolder = "payment_proofs" | "technician_photos"

export interface UploadResult {
  url: string           // URL aman HTTPS untuk disimpan ke Firestore
  public_id: string     // ID di Cloudinary (untuk keperluan hapus nanti)
  width: number
  height: number
  format: string
  bytes: number
}

// ─── Upload Helper ────────────────────────────────────────────────────────────

/**
 * Upload buffer gambar ke Cloudinary
 * @param buffer  - File buffer dari FormData
 * @param folder  - Folder tujuan di Cloudinary
 * @param filename - Nama file opsional (tanpa ekstensi)
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: UploadFolder,
  filename?: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: "image",
      // Otomatis compress & resize agar tidak terlalu besar
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    }

    if (filename) {
      uploadOptions.public_id = filename
      uploadOptions.overwrite = true
    }

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error || !result) {
          return reject(error ?? new Error("Upload failed"))
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        })
      }
    )

    stream.end(buffer)
  })
}

/**
 * Hapus gambar dari Cloudinary berdasarkan public_id
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
