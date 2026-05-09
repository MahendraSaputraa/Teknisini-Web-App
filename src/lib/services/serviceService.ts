import { db } from "@/lib/firebase"
import { AppError } from "@/lib/services/errors"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Service {
  id: string
  name: string
  category_id: string
  category_name: string
  description: string
  price: number
  duration_minutes: number
  is_active: boolean
  created_at: string | null
}

export interface CreateServiceInput {
  name: string
  category_id: string
  description?: string
  price: number
  duration_minutes?: number
  is_active?: boolean
}

export interface UpdateServiceInput {
  name?: string
  category_id?: string
  description?: string
  price?: number
  duration_minutes?: number
  is_active?: boolean
}

export interface ListServicesFilter {
  category_id?: string
  is_active?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SERVICE_COLLECTION = "services"
const CATEGORY_COLLECTION = "categories"

function mapServiceDoc(doc: FirebaseFirestore.DocumentSnapshot): Service {
  const data = doc.data()
  if (!data) {
    throw new AppError("Service not found", 404)
  }

  return {
    id: doc.id,
    name: data.name,
    category_id: data.category_id,
    category_name: data.category_name ?? "",
    description: data.description ?? "",
    price: data.price,
    duration_minutes: data.duration_minutes ?? 60,
    is_active: data.is_active ?? true,
    created_at: data.created_at?.toDate?.()?.toISOString?.() ?? null,
  }
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * GET /api/services
 * Bisa filter by category_id dan/atau is_active
 */
export async function listServices(filter?: ListServicesFilter): Promise<Service[]> {
  let query: FirebaseFirestore.Query = db
    .collection(SERVICE_COLLECTION)
    .orderBy("name", "asc")

  if (filter?.category_id) {
    query = query.where("category_id", "==", filter.category_id)
  }

  if (filter?.is_active !== undefined) {
    query = query.where("is_active", "==", filter.is_active)
  }

  const snapshot = await query.get()
  return snapshot.docs.map(mapServiceDoc)
}

/**
 * GET /api/services/:id
 */
export async function getServiceById(id: string): Promise<Service> {
  const ref = db.collection(SERVICE_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Service not found", 404)
  }

  return mapServiceDoc(snapshot)
}

/**
 * POST /api/services
 * Membuat layanan baru dan menyimpan category_name dari referensi kategori
 */
export async function createService(input: CreateServiceInput): Promise<Service> {
  const { name, category_id, price } = input

  if (!name || name.trim() === "") {
    throw new AppError("name is required", 400)
  }

  if (!category_id) {
    throw new AppError("category_id is required", 400)
  }

  if (typeof price !== "number" || price <= 0) {
    throw new AppError("price must be a number greater than 0", 400)
  }

  // Validasi: pastikan category_id ada di Firestore
  const categoryRef = db.collection(CATEGORY_COLLECTION).doc(category_id)
  const categorySnap = await categoryRef.get()

  if (!categorySnap.exists) {
    throw new AppError("category_id does not refer to an existing category", 404)
  }

  const categoryData = categorySnap.data()!

  const { Timestamp } = await import("firebase-admin/firestore")

  const payload = {
    name: name.trim(),
    category_id,
    // Simpan category_name agar order tidak perlu join lagi
    category_name: categoryData.name ?? "",
    description: input.description ?? "",
    price,
    duration_minutes: input.duration_minutes ?? 60,
    is_active: input.is_active ?? true,
    created_at: Timestamp.now(),
  }

  const docRef = await db.collection(SERVICE_COLLECTION).add(payload)
  const created = await docRef.get()
  return mapServiceDoc(created)
}

/**
 * PATCH /api/services/:id
 */
export async function updateService(
  id: string,
  input: UpdateServiceInput
): Promise<Service> {
  const ref = db.collection(SERVICE_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Service not found", 404)
  }

  // Jika category_id diubah, validasi dulu dan update category_name
  if (input.category_id) {
    const categoryRef = db.collection(CATEGORY_COLLECTION).doc(input.category_id)
    const categorySnap = await categoryRef.get()

    if (!categorySnap.exists) {
      throw new AppError("category_id does not refer to an existing category", 404)
    }

    // Update category_name sekalian
    const categoryData = categorySnap.data()!
    ;(input as Record<string, unknown>)["category_name"] = categoryData.name ?? ""
  }

  const allowed: (keyof UpdateServiceInput)[] = [
    "name",
    "category_id",
    "description",
    "price",
    "duration_minutes",
    "is_active",
  ]

  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (input[key] !== undefined) {
      updates[key] = input[key]
    }
  }

  // Sertakan category_name jika disisipkan di atas
  if ((input as Record<string, unknown>)["category_name"] !== undefined) {
    updates["category_name"] = (input as Record<string, unknown>)["category_name"]
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError("No valid fields to update", 400)
  }

  await ref.update(updates)
  const updated = await ref.get()
  return mapServiceDoc(updated)
}

/**
 * DELETE /api/services/:id
 */
export async function deleteService(id: string): Promise<void> {
  const ref = db.collection(SERVICE_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Service not found", 404)
  }

  await ref.delete()
}
