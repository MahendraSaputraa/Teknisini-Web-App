/**
 * Seeder: Populate collection `categories` dan `services` ke Firestore
 *
 * Cara pakai:
 *   1. Pastikan file .env.local sudah ada dan berisi:
 *      FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   2. Jalankan: npx tsx scripts/seed-categories-services.ts
 */

import * as admin from "firebase-admin"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

// ─── Init Firebase Admin ──────────────────────────────────────────────────────

const projectId   = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
// .env.local menyimpan \n sebagai literal "\n" — replace agar jadi newline nyata
const privateKey  = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n")

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Pastikan FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, dan FIREBASE_PRIVATE_KEY ada di .env.local")
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const db = admin.firestore()

// ─── Data Seed ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "AC & Pendingin",
    slug: "ac-pendingin",
    description: "Servis, pemasangan, dan perbaikan AC serta perangkat pendingin ruangan",
    icon: "wind",
    is_active: true,
  },
  {
    name: "Elektronik",
    slug: "elektronik",
    description: "Perbaikan TV, kulkas, mesin cuci, dan perangkat elektronik rumah tangga",
    icon: "zap",
    is_active: true,
  },
  {
    name: "Plumbing & Saluran Air",
    slug: "plumbing",
    description: "Perbaikan pipa bocor, kran, WC, dan instalasi air bersih",
    icon: "droplets",
    is_active: true,
  },
  {
    name: "Listrik",
    slug: "listrik",
    description: "Instalasi listrik, perbaikan kabel, stop kontak, dan saklar",
    icon: "lightbulb",
    is_active: true,
  },
  {
    name: "Furnitur & Interior",
    slug: "furnitur-interior",
    description: "Perakitan furnitur, pemasangan rak, cermin, dan dekorasi interior",
    icon: "sofa",
    is_active: true,
  },
]

// Services akan diisi setelah category ID diketahui
const SERVICES_BY_CATEGORY_SLUG: Record<
  string,
  Array<{
    name: string
    description: string
    price: number
    duration_minutes: number
  }>
> = {
  "ac-pendingin": [
    {
      name: "Cuci AC Split",
      description: "Pembersihan filter, evaporator, dan kondensor AC split 0.5-2 PK",
      price: 150000,
      duration_minutes: 90,
    },
    {
      name: "Isi Freon AC",
      description: "Pengisian freon R32 / R410A untuk AC rumahan",
      price: 200000,
      duration_minutes: 60,
    },
    {
      name: "Pasang AC Baru",
      description: "Pemasangan unit AC split baru termasuk braket dan pipa standar 3 meter",
      price: 450000,
      duration_minutes: 180,
    },
    {
      name: "Servis AC Tidak Dingin",
      description: "Diagnosa dan perbaikan AC yang tidak dingin atau bocor air",
      price: 250000,
      duration_minutes: 120,
    },
  ],
  "elektronik": [
    {
      name: "Servis TV LED/LCD",
      description: "Perbaikan TV mati total, layar bermasalah, atau tidak ada gambar",
      price: 200000,
      duration_minutes: 120,
    },
    {
      name: "Servis Kulkas",
      description: "Perbaikan kulkas tidak dingin, bocor, atau berbunyi keras",
      price: 250000,
      duration_minutes: 90,
    },
    {
      name: "Servis Mesin Cuci",
      description: "Perbaikan mesin cuci tidak berputar, bocor, atau error kode",
      price: 200000,
      duration_minutes: 90,
    },
    {
      name: "Servis Water Heater",
      description: "Perbaikan water heater listrik atau gas yang tidak panas",
      price: 175000,
      duration_minutes: 60,
    },
  ],
  "plumbing": [
    {
      name: "Perbaikan Pipa Bocor",
      description: "Penambalan atau penggantian pipa PVC / PPR yang bocor",
      price: 150000,
      duration_minutes: 60,
    },
    {
      name: "Pasang Kran Baru",
      description: "Pemasangan kran air wastafel, dapur, atau kamar mandi",
      price: 100000,
      duration_minutes: 45,
    },
    {
      name: "Bongkar WC Mampet",
      description: "Pembersihan saluran WC / toilet yang tersumbat",
      price: 200000,
      duration_minutes: 60,
    },
    {
      name: "Pasang Shower",
      description: "Instalasi shower set termasuk kepala shower dan selang",
      price: 175000,
      duration_minutes: 60,
    },
  ],
  "listrik": [
    {
      name: "Pasang Stop Kontak",
      description: "Pemasangan stop kontak / colokan listrik baru di dinding",
      price: 100000,
      duration_minutes: 45,
    },
    {
      name: "Pasang Lampu",
      description: "Pemasangan lampu downlight, gantung, atau dinding",
      price: 75000,
      duration_minutes: 30,
    },
    {
      name: "Perbaikan MCB/Sikring",
      description: "Perbaikan atau penggantian MCB yang sering trip",
      price: 150000,
      duration_minutes: 60,
    },
    {
      name: "Instalasi Listrik Baru",
      description: "Penarikan kabel listrik baru untuk ruangan atau area tertentu",
      price: 350000,
      duration_minutes: 180,
    },
  ],
  "furnitur-interior": [
    {
      name: "Rakit Furnitur",
      description: "Perakitan furnitur flat-pack (IKEA, INFORMA, dll) dari awal",
      price: 150000,
      duration_minutes: 120,
    },
    {
      name: "Pasang Rak Dinding",
      description: "Pemasangan rak gantung dinding dengan bor dan fisher",
      price: 100000,
      duration_minutes: 60,
    },
    {
      name: "Pasang Cermin / Pigura",
      description: "Pemasangan cermin atau pigura besar di dinding",
      price: 75000,
      duration_minutes: 30,
    },
    {
      name: "Perbaikan Pintu / Engsel",
      description: "Perbaikan pintu yang macet, turun, atau engsel rusak",
      price: 125000,
      duration_minutes: 60,
    },
  ],
}

// ─── Seeder Logic ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Memulai seeder categories & services...\n")

  const now = admin.firestore.Timestamp.now()

  // Simpan mapping slug → category doc ID
  const categoryIdBySlug: Record<string, string> = {}

  // ── 1. Seed Categories ────────────────────────────────────────────────────
  console.log("📂 Membuat categories...")

  for (const cat of CATEGORIES) {
    // Cek apakah sudah ada berdasarkan slug
    const existing = await db
      .collection("categories")
      .where("slug", "==", cat.slug)
      .limit(1)
      .get()

    if (!existing.empty) {
      const existingDoc = existing.docs[0]
      categoryIdBySlug[cat.slug] = existingDoc.id
      console.log(`  ⏭  Skip (sudah ada): ${cat.name} [${existingDoc.id}]`)
      continue
    }

    const docRef = await db.collection("categories").add({
      ...cat,
      created_at: now,
    })

    categoryIdBySlug[cat.slug] = docRef.id
    console.log(`  ✅ Dibuat: ${cat.name} [${docRef.id}]`)
  }

  // ── 2. Seed Services ──────────────────────────────────────────────────────
  console.log("\n🔧 Membuat services...")

  for (const [slug, services] of Object.entries(SERVICES_BY_CATEGORY_SLUG)) {
    const categoryId = categoryIdBySlug[slug]
    const categoryName =
      CATEGORIES.find((c) => c.slug === slug)?.name ?? slug

    if (!categoryId) {
      console.warn(`  ⚠️  Category '${slug}' tidak ditemukan, skip services-nya`)
      continue
    }

    for (const svc of services) {
      // Cek apakah sudah ada berdasarkan nama + category_id
      const existing = await db
        .collection("services")
        .where("name", "==", svc.name)
        .where("category_id", "==", categoryId)
        .limit(1)
        .get()

      if (!existing.empty) {
        console.log(`  ⏭  Skip (sudah ada): ${svc.name}`)
        continue
      }

      await db.collection("services").add({
        ...svc,
        category_id: categoryId,
        category_name: categoryName,
        is_active: true,
        created_at: now,
      })

      console.log(`  ✅ [${categoryName}] ${svc.name} — Rp ${svc.price.toLocaleString("id-ID")}`)
    }
  }

  console.log("\n🎉 Seeder selesai!")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seeder gagal:", err)
  process.exit(1)
})
