# Gateway Service

API Gateway dan Authentication Service untuk Sistem SIAKAD Terdistribusi.

## Fitur

- ✅ Autentikasi JWT
- ✅ Register & Login User
- ✅ Rate Limiting (10 requests/60 detik)
- ✅ Reverse Proxy ke semua service
- ✅ CORS enabled

## Konfigurasi

Port: **3000**  
IP VM: **192.168.10.11**

## Environment Variables

```env
PORT=3000
DB_HOST=192.168.10.16
DB_PORT=3306
DB_USERNAME=siakad_app
DB_PASSWORD=admin
DB_DATABASE=siakad
JWT_SECRET=siakad_jwt_secret_key_2025
JWT_EXPIRATION=1d
STUDENT_SERVICE_URL=http://192.168.10.12:3001
COURSE_SERVICE_URL=http://192.168.10.13:3002
GRADES_SERVICE_URL=http://192.168.10.14:3003
```

## Install Dependencies

```bash
npm install
```

## Run

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login dan dapatkan JWT token

### Proxy Routes (Require JWT)

- `/api/students/*` → Student Service (192.168.10.12:3001)
- `/api/courses/*` → Course Service (192.168.10.13:3002)
- `/api/grades/*` → Grades Service (192.168.10.14:3003)

## Request Example

```bash
# Register
curl -X POST http://192.168.10.11:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","fullName":"Administrator","role":"admin"}'

# Login
curl -X POST http://192.168.10.11:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Access Student Service (dengan token)
curl -X GET http://192.168.10.11:3000/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Deployment ke VM

1. Copy seluruh folder `gateway-service` ke VM1
2. Install Node.js dan npm
3. Konfigurasi `.env` sesuai IP VM
4. Jalankan `npm install`
5. Jalankan `npm run start:prod`
