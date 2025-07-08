# 🔐 Secure Payment Gateway - JWT End-to-End Authentication

Project ini merupakan implementasi **"Secure Payment Gateway dengan Sistem Autentikasi JWT End-to-End"** menggunakan Express.js, TypeScript, dan SQLite untuk pembelajaran dan demonstrasi keamanan aplikasi web modern.

## ✨ Fitur Utama

### � Sistem Autentikasi JWT Lengkap
- **JWT Token Management**: JSON Web Token untuk session management yang stateless
- **BCrypt Password Hashing**: Enkripsi password dengan salt rounds untuk keamanan maksimal
- **Protected Routes**: Middleware untuk melindungi endpoint yang memerlukan autentikasi
- **Token Expiration**: Automatic token expiry dengan refresh mechanism

### 💾 Database Management
- **SQLite Database**: Database file-based yang mudah untuk development dan testing
- **TypeORM Integration**: ORM modern untuk TypeScript dengan auto-migration
- **Entity Modeling**: Model User dengan relasi dan validasi yang proper
- **Data Persistence**: Penyimpanan data yang aman dengan enkripsi password

### 🎨 User Interface & Frontend
- **Responsive HTML Pages**: Halaman login, registrasi, dan payment gateway
- **Form Validation**: Validasi client-side dan server-side yang komprehensif
- **Modern UI Design**: Interface yang clean dan user-friendly
- **Real-time Error Handling**: Feedback error yang informatif

### �️ Security Features
- **Input Sanitization**: Validasi dan sanitasi input untuk mencegah injection
- **CORS Protection**: Konfigurasi CORS untuk keamanan cross-origin
- **Environment Variables**: Secure configuration management
- **Audit Logging**: Comprehensive logging untuk monitoring keamanan

## 🏗️ Teknologi & Arsitektur

### Backend Technologies
- **Node.js 16+**: Runtime JavaScript untuk server-side development
- **TypeScript**: Superset JavaScript dengan static typing untuk development yang aman
- **Express.js**: Web framework minimalis dan fleksibel
- **TypeORM**: Object-Relational Mapping untuk database management
- **SQLite**: Database SQL yang ringan dan file-based

### Authentication & Security Stack
- **JSON Web Token (JWT)**: Standard untuk secure token-based authentication
- **BCrypt**: Library untuk hashing password dengan salt
- **Crypto**: Built-in Node.js module untuk operasi kriptografi
- **dotenv**: Environment variable management

### Frontend Technologies
- **HTML5**: Markup language untuk struktur halaman web
- **CSS3**: Modern styling dengan responsive design
- **Vanilla JavaScript**: Client-side scripting untuk interaktivitas

### Development Tools
- **ts-node**: TypeScript execution untuk development
- **nodemon**: Auto-restart server saat development

## 📁 Struktur Project

```
mhdrmwanar/
├── src/
│   ├── app.ts                 # Entry point aplikasi
│   ├── config/
│   │   └── db.ts             # Konfigurasi database SQLite
│   ├── controllers/
│   │   ├── authController.ts  # Logic untuk authentication
│   │   ├── userController.ts  # Logic untuk user management
│   │   └── paymentController.ts # Logic untuk payment gateway
│   ├── middleware/
│   │   └── authMiddleware.ts  # JWT verification middleware
│   ├── models/
│   │   ├── userModel.ts      # TypeORM User entity
│   │   ├── paymentModel.ts   # Payment entity
│   │   └── transactionModel.ts # Transaction entity
│   ├── routes/
│   │   ├── authRoutes.ts     # Authentication endpoints
│   │   ├── userRoutes.ts     # User management endpoints
│   │   └── paymentRoutes.ts  # Payment gateway endpoints
│   ├── services/
│   │   ├── jwtService.ts     # JWT token management
│   │   └── encryptionService.ts # Encryption utilities
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── views/
│       ├── login.html        # Login page
│       ├── register.html     # Registration page
│       ├── payment.html      # Payment gateway
│       └── dashboard.html    # User dashboard
├── dist/                      # Compiled JavaScript output
├── data.sql                   # Database schema dan sample data
├── database.sqlite           # SQLite database file (auto-generated)
├── package.json              # NPM dependencies dan scripts
├── tsconfig.json             # TypeScript configuration
├── wajib.md                  # Development checklist
├── .env                      # Environment variables
└── readme.md                 # Project documentation
```

## 🚀 API Endpoints

### Authentication Routes
- `POST /auth/register` - Registrasi user baru
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- `POST /auth/login` - Login user dan dapatkan JWT token
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- `POST /auth/logout` - Logout user (optional)

### User Management Routes
- `GET /users/profile` - Dapatkan profile user (🔒 protected)
- `PUT /users/profile` - Update profile user (🔒 protected)

### Payment Gateway Routes (Advanced Features)
- `POST /payments/create` - Buat payment baru dengan enkripsi
- `POST /payments/process` - Proses payment dengan verifikasi token
- `GET /payments/history` - Riwayat payment pengguna (🔒 protected)
- `GET /payments/status/:paymentId` - Cek status payment

### Static Pages
- `GET /` - Redirect ke payment gateway
- `GET /login.html` - Login form
- `GET /register.html` - Registration form
- `GET /payment.html` - Payment gateway interface
- `GET /health` - Health check endpoint

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js 16+** 
- **NPM** atau **Yarn**
- **Git** untuk version control

### 🛠️ Setup dan Instalasi

**1. Clone Repository**
```bash
git clone <repository-url>
cd mhdrmwanar
```

**2. Install Dependencies**
```bash
npm install
```

**3. Environment Configuration**
Buat file `.env` di root project:
```env
JWT_SECRET=mysecretkey_super_secret_change_in_production
PORT=3000
NODE_ENV=development
```

**4. Database Setup**
Database SQLite akan otomatis dibuat. File `database.sqlite` akan muncul di root project.

**5. Start Development Server**
```bash
# Build TypeScript
npm run build

# Start server
npm run dev
# atau
node dist/app.js
```

**6. Akses Aplikasi**
- 🌐 **Login**: `http://localhost:3000/login.html`
- 🌐 **Register**: `http://localhost:3000/register.html`  
- 🌐 **Payment Gateway**: `http://localhost:3000/payment.html`
- 🌐 **Health Check**: `http://localhost:3000/health`

## 💻 Cara Penggunaan

### 1. Registrasi User Baru
1. Buka `http://localhost:3000/register.html`
2. Isi form registrasi dengan username, email, dan password
3. Klik tombol "Register"
4. Jika berhasil, akan diarahkan ke halaman login

### 2. Login & Authentication
1. Buka `http://localhost:3000/login.html`
2. Masukkan username/email dan password
3. Klik tombol "Login"
4. JWT token akan disimpan di localStorage
5. Redirect ke payment gateway

### 3. Payment Gateway (Advanced Feature)
1. Setelah login, akses payment gateway
2. Isi form payment dengan data kartu
3. Klik "Create Secure Payment"
4. Monitoring transaksi di tab "Payment History"

### 4. API Testing dengan curl/Postman

**Register User:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Access Protected Route:**
```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     http://localhost:3000/users/profile
```

## �️ Security Best Practices

### Password Security
- Password di-hash menggunakan BCrypt dengan salt rounds 10
- Minimum password length direkomendasikan 8 karakter
- Kombinasi huruf besar, kecil, angka, dan simbol

### JWT Token Security
- Token expired dalam 1 jam (dapat dikonfigurasi)
- Secret key harus diganti di production
- Token disimpan di localStorage (untuk demo, gunakan httpOnly cookies di production)

### Database Security
- Validasi input untuk mencegah SQL injection
- Unique constraints untuk email dan username
- Proper indexing untuk performa

### Production Recommendations
1. **Environment Variables**: Ganti semua default keys
2. **HTTPS**: Gunakan SSL/TLS certificate
3. **Database**: Gunakan PostgreSQL/MySQL untuk production
4. **Monitoring**: Setup security monitoring dan alerting
5. **Backup**: Regular encrypted backups
6. **Access Control**: Implement role-based access control

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
```bash
# Pastikan file database.sqlite dapat ditulis
chmod 666 database.sqlite
```

**2. TypeScript Compilation Error**
```bash
# Clean dan rebuild
rm -rf dist
npm run build
```

**3. Port Already in Use**
```bash
# Ganti port di .env file
PORT=3001
```

**4. JWT Secret Error**
```bash
# Pastikan .env file ada dan JWT_SECRET ter-set
echo "JWT_SECRET=your_secret_key" > .env
```

### Debugging Tips
- Aktifkan logging di `src/config/db.ts`: `logging: true`
- Check console output untuk error messages
- Verify database.sqlite file ter-create di root folder

## 🎯 Development Status

Berdasarkan checklist di `wajib.md`, status development saat ini:

- ✅ **Setup & Environment**: Database SQLite, TypeScript config, dependencies
- ✅ **Backend Development**: Models, Controllers, Routes, Middleware
- ✅ **Frontend Development**: HTML views, form validation, static file serving
- ✅ **Authentication Flow**: Register, login, JWT token management
- ✅ **Security Implementation**: BCrypt hashing, JWT middleware, input validation
- 🔄 **Testing**: Manual testing dengan Postman/curl (in progress)
- 🔄 **Payment Features**: Advanced encryption features (optional enhancement)

## 📚 Learning Objectives

Project ini dirancang untuk pembelajaran:
1. **JWT Authentication**: Implementasi secure token-based authentication
2. **TypeScript & Express.js**: Modern backend development dengan type safety
3. **Database Management**: TypeORM dengan SQLite untuk rapid development
4. **Security Best Practices**: Password hashing, input validation, CORS protection
5. **Full-stack Integration**: Frontend dan backend communication

## 📝 Contributing & License

### Contributing
1. Fork repository ini
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### License
Project ini menggunakan MIT License. Lihat file `LICENSE` untuk detail lengkap.

---

## 🚀 Status Aplikasi

**✅ APLIKASI BERHASIL BERJALAN!**

- **Server**: Running di `http://localhost:3000` 
- **Database**: SQLite connected dan synchronized
- **Frontend**: HTML pages tersedia dan terintegrasi
- **Authentication**: JWT system berfungsi normal

**🌐 Akses URLs:**
- Login: `http://localhost:3000/login.html`
- Register: `http://localhost:3000/register.html`
- Payment Gateway: `http://localhost:3000/payment.html`
- Health Check: `http://localhost:3000/health`

---

**🔒 Security Notice**: Project ini dirancang untuk tujuan edukatif dan demonstrasi. Untuk penggunaan production, pastikan implementasi additional security measures.

**💡 Built with Modern Technologies & Security First Approach**
