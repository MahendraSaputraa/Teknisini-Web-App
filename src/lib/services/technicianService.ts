import { db } from "@/lib/firebase"
import { AppError } from "@/lib/services/errors"

export type TechnicianStatus = "available" | "busy" | "suspended"

export interface Technician {
  id: string
  name: string
  phone: string
  category: string
  status: TechnicianStatus
  rating_avg: number
  total_reviews: number
}

export interface CreateTechnicianInput {
  name: string
  phone: string
  category: string
  status?: TechnicianStatus
  rating_avg?: number
  total_reviews?: number
}

const TECHNICIAN_COLLECTION = "technicians"

function mapTechnicianDoc(doc: FirebaseFirestore.DocumentSnapshot): Technician {
  const data = doc.data()
  if (!data) {
    throw new AppError("Technician not found", 404)
  }

  return {
    id: doc.id,
    name: data.name,
    phone: data.phone,
    category: data.category,
    status: data.status,
    rating_avg: data.rating_avg,
    total_reviews: data.total_reviews,
  }
}

export async function listTechnicians(status?: TechnicianStatus) {
  let query: FirebaseFirestore.Query = db.collection(TECHNICIAN_COLLECTION)

  if (status) {
    query = query.where("status", "==", status)
  }

  const snapshot = await query.get()
  return snapshot.docs.map(mapTechnicianDoc)
}

export async function getTechnicianById(technicianId: string) {
  const technicianRef = db.collection(TECHNICIAN_COLLECTION).doc(technicianId)
  const snapshot = await technicianRef.get()

  if (!snapshot.exists) {
    throw new AppError("Technician not found", 404)
  }

  return mapTechnicianDoc(snapshot)
}

export async function ensureTechnicianAvailable(technicianId: string) {
  const technician = await getTechnicianById(technicianId)

  if (technician.status !== "available") {
    throw new AppError("Technician is not available", 409)
  }

  return technician
}

export async function updateTechnicianStatus(
  technicianId: string,
  status: TechnicianStatus
) {
  const technicianRef = db.collection(TECHNICIAN_COLLECTION).doc(technicianId)
  const snapshot = await technicianRef.get()

  if (!snapshot.exists) {
    throw new AppError("Technician not found", 404)
  }

  await technicianRef.update({ status })
  const updated = await technicianRef.get()
  return mapTechnicianDoc(updated)
}

export async function createTechnician(input: CreateTechnicianInput) {
  const { name, phone, category } = input

  if (!name || !phone || !category) {
    throw new AppError("name, phone, and category are required", 400)
  }

  const payload = {
    name,
    phone,
    category,
    status: input.status ?? "available",
    rating_avg: input.rating_avg ?? 0,
    total_reviews: input.total_reviews ?? 0,
  }

  const docRef = await db.collection(TECHNICIAN_COLLECTION).add(payload)
  const created = await docRef.get()
  return mapTechnicianDoc(created)
}
