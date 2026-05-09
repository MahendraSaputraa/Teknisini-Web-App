import { db } from "@/lib/firebase"
import { AppError } from "@/lib/services/errors"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  is_active: boolean
  created_at: string | null
}

export interface CreateCategoryInput {
  name: string
  slug?: string
  description?: string
  icon?: string
  is_active?: boolean
}

export interface UpdateCategoryInput {
  name?: string
  slug?: string
  description?: string
  icon?: string
  is_active?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_COLLECTION = "categories"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

function mapCategoryDoc(doc: FirebaseFirestore.DocumentSnapshot): Category {
  const data = doc.data()
  if (!data) {
    throw new AppError("Category not found", 404)
  }

  return {
    id: doc.id,
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    icon: data.icon ?? "",
    is_active: data.is_active ?? true,
    created_at: data.created_at?.toDate?.()?.toISOString?.() ?? null,
  }
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * GET /api/categories
 * Ambil semua kategori, bisa filter is_active
 */
export async function listCategories(onlyActive = false): Promise<Category[]> {
  let query: FirebaseFirestore.Query = db
    .collection(CATEGORY_COLLECTION)
    .orderBy("name", "asc")

  if (onlyActive) {
    query = query.where("is_active", "==", true)
  }

  const snapshot = await query.get()
  return snapshot.docs.map(mapCategoryDoc)
}

/**
 * GET /api/categories/:id
 */
export async function getCategoryById(id: string): Promise<Category> {
  const ref = db.collection(CATEGORY_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Category not found", 404)
  }

  return mapCategoryDoc(snapshot)
}

/**
 * POST /api/categories
 */
export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  const { name } = input

  if (!name || name.trim() === "") {
    throw new AppError("name is required", 400)
  }

  // Cek duplikasi nama
  const existing = await db
    .collection(CATEGORY_COLLECTION)
    .where("name", "==", name.trim())
    .limit(1)
    .get()

  if (!existing.empty) {
    throw new AppError("Category with this name already exists", 409)
  }

  const { Timestamp } = await import("firebase-admin/firestore")

  const payload = {
    name: name.trim(),
    slug: input.slug ?? slugify(name),
    description: input.description ?? "",
    icon: input.icon ?? "",
    is_active: input.is_active ?? true,
    created_at: Timestamp.now(),
  }

  const docRef = await db.collection(CATEGORY_COLLECTION).add(payload)
  const created = await docRef.get()
  return mapCategoryDoc(created)
}

/**
 * PATCH /api/categories/:id
 */
export async function updateCategory(
  id: string,
  input: UpdateCategoryInput
): Promise<Category> {
  const ref = db.collection(CATEGORY_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Category not found", 404)
  }

  const allowed: (keyof UpdateCategoryInput)[] = [
    "name",
    "slug",
    "description",
    "icon",
    "is_active",
  ]

  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (input[key] !== undefined) {
      updates[key] = input[key]
    }
  }

  // Auto-update slug jika name berubah dan slug tidak disediakan manual
  if (input.name && !input.slug) {
    updates.slug = slugify(input.name)
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError("No valid fields to update", 400)
  }

  await ref.update(updates)
  const updated = await ref.get()
  return mapCategoryDoc(updated)
}

/**
 * DELETE /api/categories/:id
 * Tidak bisa hapus jika masih ada services aktif di kategori ini
 */
export async function deleteCategory(id: string): Promise<void> {
  const ref = db.collection(CATEGORY_COLLECTION).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    throw new AppError("Category not found", 404)
  }

  // Cek apakah ada services yang menggunakan kategori ini
  const linkedServices = await db
    .collection("services")
    .where("category_id", "==", id)
    .limit(1)
    .get()

  if (!linkedServices.empty) {
    throw new AppError(
      "Cannot delete category that still has services linked to it",
      409
    )
  }

  await ref.delete()
}
