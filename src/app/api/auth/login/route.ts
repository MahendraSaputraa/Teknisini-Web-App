import { NextResponse } from "next/server";
import { adminAuth, db } from "@/lib/firebaseAdmin";
import { AppError } from "@/lib/services/errors";

interface LoginBody {
  email?: string;
  password?: string;
}

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    // Authenticate user with Firebase
    const userRecord = await adminAuth.getUserByEmail(email);

    // Get custom token from Firebase Admin SDK
    const customToken = await adminAuth.createCustomToken(userRecord.uid);

    // Get user profile from Firestore
    const userSnapshot = await db.collection("users").doc(userRecord.uid).get();

    if (!userSnapshot.exists) {
      throw new AppError("User profile not found", 404);
    }

    const userData = userSnapshot.data();
    console.log("DEBUG - User Data dari Firestore:", userData); // Cek di terminal/console backend
    console.log("DEBUG - Role yang didapat:", userData?.role);

    return NextResponse.json(
      {
        message: "Login successful",
        data: {
          token: customToken,
          user: {
            uid: userRecord.uid,
            email: userData?.email,
            name: userData?.name,
            role: userData?.role || "user",
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
