# TekniSini API Documentation

Dokumentasi ini dibuat dari implementasi API yang ada saat ini di project.

## Base URL

- Local: `http://localhost:3000/api`

## Format Response

- Sukses (umum):

```json
{
  "data": {}
}
```

- Sukses (register auth):

```json
{
  "message": "User registered successfully"
}
```

- Error:

```json
{
  "error": "error message"
}
```

## Authentication

### Token format

- Header: `Authorization: Bearer <firebase_id_token>`
- Token didapat dari Firebase Auth client:
  - login email/password: `signInWithEmailAndPassword`
  - opsional google: `signInWithPopup`
  - ambil token: `await user.getIdToken()`

### Cookie untuk proteksi `/admin`

- Frontend menyimpan token di cookie `token`.
- Route `/admin/:path*` diproteksi oleh proxy:
  - tidak ada token -> redirect `/login`
  - role bukan admin -> redirect `/`

## Enum

### Order Status

- `pending`
- `diproses`
- `menuju_lokasi`
- `completed`
- `cancelled`

Transisi valid:

- `pending -> diproses`
- `pending -> cancelled`
- `diproses -> menuju_lokasi`
- `diproses -> cancelled`
- `menuju_lokasi -> completed`

### Payment Status

- `pending`
- `waiting_verification`
- `paid`
- `rejected`

### Technician Status

- `available`
- `busy`
- `suspended`

### User Role

- `user`
- `admin`

---

## Auth Endpoints

### 1) Register User

- Method: `POST`
- URL: `/auth/register`
- Auth: tidak perlu

Request body:

```json
{
  "name": "Wahyu",
  "email": "wahyu@mail.com",
  "phone": "08123456789",
  "password": "secret123"
}
```

Validasi:

- semua field wajib
- password minimal 6 karakter

Sukses (`201`):

```json
{
  "message": "User registered successfully"
}
```

Error umum:

- `400`: field tidak lengkap / password kurang / email sudah terdaftar

Server action:

- create user di Firebase Auth
- simpan profile ke Firestore `users/{uid}`:
  - `name`, `email`, `phone`, `role: "user"`, `created_at`

### 2) Get Current User

- Method: `GET`
- URL: `/auth/me`
- Auth: wajib Bearer token

Headers:

```http
Authorization: Bearer <firebase_id_token>
```

Sukses (`200`):

```json
{
  "data": {
    "uid": "uid_firebase",
    "name": "Wahyu",
    "email": "wahyu@mail.com",
    "role": "user"
  }
}
```

Error umum:

- `401`: token tidak ada / format salah
- `404`: profile user tidak ditemukan di Firestore

---

## Orders Endpoints

### 1) List Orders

- Method: `GET`
- URL: `/orders`
- Auth: belum diproteksi di route saat ini

Sukses (`200`):

```json
{
  "data": [
    {
      "id": "order_id",
      "user_id": "user-1",
      "service_id": "svc-1",
      "price_service": 100000,
      "platform_fee": 25000,
      "total_price": 125000,
      "status": "pending",
      "payment_status": "pending",
      "created_at": "2026-04-09T10:00:00.000Z",
      "completed_at": null
    }
  ]
}
```

### 2) Create Order

- Method: `POST`
- URL: `/orders`
- Auth: belum diproteksi di route saat ini

Request body minimum:

```json
{
  "user_id": "user-1",
  "service_id": "svc-1",
  "price_service": 100000,
  "location": {
    "lat": -6.2,
    "lng": 106.8
  }
}
```

Field opsional tambahan:

- `user_name`, `user_phone`, `user_email`
- `service_name`
- `problem_note`
- `address_text`

Auto value dari server:

- `platform_fee = price_service * 0.25`
- `total_price = price_service + platform_fee`
- `status = "pending"`
- `payment_status = "pending"`
- `technician_id = null`
- `technician_name = null`
- `payment_proof = null`
- `created_at = now`

Sukses (`201`):

```json
{
  "data": {
    "id": "order_id",
    "platform_fee": 25000,
    "total_price": 125000,
    "status": "pending",
    "payment_status": "pending"
  }
}
```

Error umum:

- `400`: `user_id/service_id` kosong
- `400`: `price_service <= 0`
- `400`: `location` tidak valid

### 3) Get Order by ID

- Method: `GET`
- URL: `/orders/{id}`
- Auth: belum diproteksi di route saat ini

Sukses (`200`):

```json
{
  "data": {
    "id": "order_id",
    "status": "pending"
  }
}
```

Error umum:

- `404`: order tidak ditemukan

### 4) Patch Order (Action-based)

- Method: `PATCH`
- URL: `/orders/{id}`
- Auth: belum diproteksi di route saat ini

Wajib body field `action`:

- `upload_payment_proof`
- `verify_payment`
- `assign_technician`
- `update_status`

#### 4a) Upload payment proof

Body:

```json
{
  "action": "upload_payment_proof",
  "payment_proof": "https://example.com/bukti.jpg"
}
```

Hasil:

- `payment_status = "waiting_verification"`

#### 4b) Verify payment

Body approve:

```json
{
  "action": "verify_payment",
  "approve": true
}
```

Body reject:

```json
{
  "action": "verify_payment",
  "approve": false
}
```

Hasil approve:

- `status = "diproses"`
- `payment_status = "paid"`

Hasil reject:

- `payment_status = "rejected"`

#### 4c) Assign technician

Body:

```json
{
  "action": "assign_technician",
  "technician_id": "tech_id"
}
```

Validasi:

- teknisi harus ada
- teknisi harus `available`
- transisi status order harus valid ke `diproses`

Hasil:

- `technician_id` dan `technician_name` terisi
- status order `diproses`
- status teknisi jadi `busy`

#### 4d) Update status order

Body:

```json
{
  "action": "update_status",
  "status": "menuju_lokasi"
}
```

Validasi:

- hanya transisi status valid yang diterima

Khusus saat `status = completed`:

- set `completed_at = now`
- jika ada teknisi, status teknisi dikembalikan ke `available`

Error umum PATCH:

- `400`: `action` tidak ada / unsupported
- `400`: transisi status invalid
- `404`: order/technician tidak ditemukan
- `409`: teknisi tidak available

---

## Technicians Endpoints

### 1) List Technicians

- Method: `GET`
- URL: `/technicians`
- Query opsional: `?status=available|busy|suspended`
- Auth: belum diproteksi di route saat ini

Sukses (`200`):

```json
{
  "data": [
    {
      "id": "tech_id",
      "name": "Budi",
      "phone": "0812...",
      "category": "AC",
      "status": "available",
      "rating_avg": 4.8,
      "total_reviews": 21
    }
  ]
}
```

### 2) Create Technician

- Method: `POST`
- URL: `/technicians`
- Auth: belum diproteksi di route saat ini

Request body minimum:

```json
{
  "name": "Budi",
  "phone": "0812...",
  "category": "AC"
}
```

Field opsional:

- `status` default `available`
- `rating_avg` default `0`
- `total_reviews` default `0`

Sukses (`201`):

```json
{
  "data": {
    "id": "tech_id",
    "name": "Budi",
    "status": "available"
  }
}
```

Error umum:

- `400`: `name/phone/category` wajib diisi

---

## Frontend Integration Checklist

1. Login user via Firebase Auth client.
2. Ambil `idToken` dari Firebase user.
3. Simpan cookie `token=<idToken>` untuk akses area admin.
4. Untuk endpoint auth `/auth/me`, kirim header Bearer token.
5. Untuk endpoint order PATCH, selalu kirim field `action` sesuai operasi.

## Quick Test Flow (Recommended)

1. `POST /technicians`
2. `POST /orders`
3. `PATCH /orders/{id}` action `upload_payment_proof`
4. `PATCH /orders/{id}` action `verify_payment` approve true
5. `PATCH /orders/{id}` action `assign_technician`
6. `PATCH /orders/{id}` action `update_status` -> `menuju_lokasi`
7. `PATCH /orders/{id}` action `update_status` -> `completed`
