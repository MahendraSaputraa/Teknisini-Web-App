import { NextResponse } from "next/server"
import { extractBearerToken, getCurrentUserFromToken } from "@/lib/auth"
import { AppError } from "@/lib/services/errors"

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function GET(request: Request) {
  try {
    const token = extractBearerToken(request)
    const user = await getCurrentUserFromToken(token)

    return NextResponse.json(
      {
        data: {
          uid: user.uid,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
