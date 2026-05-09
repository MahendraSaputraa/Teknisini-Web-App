/**
 * src/services/upload.ts
 * Helper frontend untuk upload gambar ke Cloudinary via /api/upload
 */

export type UploadFolder = "payment_proofs" | "technician_photos"

export interface UploadResult {
  url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

/**
 * Upload satu file gambar ke Cloudinary
 * @param file    - File object dari input/dropzone
 * @param folder  - Folder tujuan di Cloudinary
 * @param name    - Custom filename opsional
 */
export async function uploadImage(
  file: File,
  folder: UploadFolder,
  name?: string
): Promise<UploadResult> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)
  if (name) formData.append("name", name)

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    // Jangan set Content-Type — browser otomatis set multipart/form-data + boundary
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.error ?? "Upload failed")
  }

  return json.data as UploadResult
}

/**
 * Upload bukti pembayaran
 * Mengembalikan URL Cloudinary yang bisa langsung disimpan ke order.payment_proof
 */
export async function uploadPaymentProof(file: File): Promise<string> {
  const result = await uploadImage(file, "payment_proofs")
  return result.url
}

/**
 * Upload foto teknisi
 * Mengembalikan URL Cloudinary
 */
export async function uploadTechnicianPhoto(
  file: File,
  technicianId?: string
): Promise<string> {
  const result = await uploadImage(
    file,
    "technician_photos",
    technicianId ? `technician_${technicianId}` : undefined
  )
  return result.url
}
