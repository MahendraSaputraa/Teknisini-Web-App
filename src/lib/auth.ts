import { adminAuth, db } from "@/lib/firebaseAdmin"
import { AppError } from "@/lib/services/errors"

export type UserRole = "user" | "admin"

export interface AppUser {
  uid: string
  name: string
  email: string
  phone: string
  role: UserRole
}

export function extractBearerToken(request: Request) {
  const authorization = request.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) {
    throw new AppError("Missing or invalid Authorization header", 401)
  }

  const token = authorization.slice("Bearer ".length).trim()
  if (!token) {
    throw new AppError("Missing token", 401)
  }

  return token
}

export async function getCurrentUserFromToken(token: string): Promise<AppUser> {
  const decoded = await adminAuth.verifyIdToken(token)
  const userSnapshot = await db.collection("users").doc(decoded.uid).get()

  if (!userSnapshot.exists) {
    throw new AppError("User profile not found", 404)
  }

  const userData = userSnapshot.data() as Omit<AppUser, "uid">
  return {
    uid: decoded.uid,
    ...userData,
  }
}

export async function verifyAdmin(request: Request) {
  const token = extractBearerToken(request)
  const user = await getCurrentUserFromToken(token)

  if (user.role !== "admin") {
    throw new AppError("Admin access only", 403)
  }

  return user
}
