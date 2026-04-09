import { Timestamp } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { adminAuth, db } from "@/lib/firebaseAdmin"
import { AppError } from "@/lib/services/errors"

interface RegisterBody {
  name?: string
  email?: string
  phone?: string
  password?: string
}

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody
    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()
    const phone = body.phone?.trim()
    const password = body.password

    if (!name || !email || !phone || !password) {
      throw new AppError("name, email, phone, and password are required", 400)
    }

    if (password.length < 6) {
      throw new AppError("password must be at least 6 characters", 400)
    }

    const createdAuthUser = await adminAuth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone.startsWith("+") ? phone : undefined,
    })

    await db.collection("users").doc(createdAuthUser.uid).set({
      name,
      email,
      phone,
      role: "user",
      created_at: Timestamp.now(),
    })

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
