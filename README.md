# Implementasi Keamanan End-to-End dengan Algoritma AES dan Kunci Pribadi Berdasarkan Identifier Unik Pengguna pada Sistem Payment Gateway

## Deskripsi Proyek

Proyek ini mengimplementasikan sistem payment gateway yang aman dengan menggunakan teknologi keamanan end-to-end encryption berbasis algoritma AES (Advanced Encryption Standard) dan sistem kunci pribadi yang unik untuk setiap pengguna berdasarkan identifier unik mereka.

## Fitur Keamanan Utama

### 1. **End-to-End Encryption dengan AES**
- Menggunakan algoritma AES-256 untuk enkripsi data pembayaran
- Data sensitif dienkripsi sejak input hingga penyimpanan
- Tidak ada data pembayaran yang disimpan dalam bentuk plain text

### 2. **Kunci Pribadi Berdasarkan Identifier Unik Pengguna**
- Setiap pengguna memiliki kunci enkripsi pribadi yang unik
- Kunci dibuat berdasarkan kombinasi User ID dan Email menggunakan PBKDF2
- 10,000 iterasi untuk meningkatkan keamanan terhadap brute force attack

### 3. **Multiple Layer Security**
- JWT Authentication untuk sesi pengguna
- Payment token dengan expiry 15 menit
- Hash verification untuk integritas data
- IP tracking dan User Agent logging

### 4. **Secure Key Management**
- Master key yang terpisah dari aplikasi
- Key derivation menggunakan PBKDF2 dengan salt
- Kunci tidak pernah disimpan dalam database
- Hash verification tanpa menyimpan kunci asli

## Arsitektur Sistem

```
Frontend (HTML/JS) 
    ↓ [HTTPS]
Express.js Server
    ↓ [JWT Middleware]
Payment Controller
    ↓ [User-Specific AES Encryption]
Database (SQLite)
```

## Teknologi yang Digunakan

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: SQLite dengan TypeORM
- **Encryption**: 
  - AES-256 untuk enkripsi data
  - PBKDF2 untuk key derivation
  - SHA-256 untuk hashing
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## Struktur Database

### Users Table
- `id`: Primary key
- `username`: Username unik
- `email`: Email unik (digunakan untuk key generation)
- `password`: Password yang di-hash dengan bcrypt
- `createdAt`, `updatedAt`: Timestamp

### Payments Table
- `id`: Primary key
- `userId`: Foreign key ke users
- `encryptedPaymentData`: Data pembayaran terenkripsi dengan AES
- `keyHash`: Hash dari kunci untuk verifikasi
- `amount`, `currency`: Informasi pembayaran
- `paymentToken`: Token pembayaran sementara
- `status`: Status pembayaran (PENDING, SUCCESS, FAILED)

### Transactions Table
- `id`: Primary key
- `paymentId`: Foreign key ke payments
- `encryptedTransactionData`: Data transaksi terenkripsi
- `status`: Status transaksi
- `processedAt`: Waktu pemrosesan

## Implementasi Keamanan

### 1. **Proses Enkripsi Data Pembayaran**

```typescript
// Generate kunci pribadi unik untuk setiap user
generateUserPrivateKey(userId: string, userEmail: string): string {
    const userIdentifier = `${userId}_${userEmail}`;
    const privateKey = CryptoJS.PBKDF2(
        userIdentifier, 
        this.masterKey, 
        { 
            keySize: 256/32, 
            iterations: 10000 
        }
    ).toString();
    return privateKey;
}

// Enkripsi data dengan kunci pribadi user
encryptPaymentData(paymentData: any, userId: string, userEmail: string) {
    const privateKey = this.generateUserPrivateKey(userId, userEmail);
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(paymentData), 
        privateKey
    ).toString();
    
    return {
        encryptedData,
        keyHash: CryptoJS.SHA256(privateKey).toString(),
        timestamp: Date.now(),
        userId
    };
}
```

### 2. **Alur Keamanan Payment Gateway**

1. **User Authentication**: Login dengan JWT
2. **Payment Request**: Data pembayaran diterima
3. **Key Generation**: Generate kunci pribadi berdasarkan User ID + Email
4. **Data Encryption**: Enkripsi data pembayaran dengan AES-256
5. **Secure Storage**: Simpan data terenkripsi + key hash
6. **Token Generation**: Buat payment token dengan expiry
7. **Transaction Processing**: Proses dengan verifikasi multi-layer

### 3. **Keamanan Frontend**

- HTTPS enforcement
- Input validation dan sanitization
- CSP (Content Security Policy) headers
- No autocomplete pada form sensitif
- Real-time validation
- Secure session management

## Cara Menjalankan

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Setup Environment**
```bash
# Buat file .env
cp .env.example .env

# Edit variabel environment:
# JWT_SECRET=your_jwt_secret_key
# MASTER_ENCRYPTION_KEY=your_master_encryption_key
```

### 3. **Build Project**
```bash
npm run build
```

### 4. **Inisialisasi Database**
```bash
npm run start
# Database akan dibuat otomatis dengan schema yang diperlukan
```

### 5. **Akses Aplikasi**
- Login: http://localhost:3000/login.html
- Register: http://localhost:3000/register.html
- Payment: http://localhost:3000/payment.html (setelah login)

## Pengujian Keamanan

### 1. **Test Enkripsi/Dekripsi**
```bash
# Jalankan unit test untuk encryption service
npm test
```

### 2. **Test Payment Flow**
1. Register akun baru
2. Login dengan akun tersebut
3. Lakukan transaksi pembayaran
4. Verifikasi data terenkripsi di database
5. Verifikasi dekripsi data dengan kunci yang benar

### 3. **Security Checklist**
- ✅ Data pembayaran tidak pernah dalam plain text
- ✅ Setiap user memiliki kunci enkripsi unik
- ✅ Kunci tidak disimpan di database
- ✅ Token pembayaran memiliki expiry time
- ✅ Multiple layer authentication
- ✅ Input validation dan sanitization
- ✅ Secure headers dan HTTPS

## Kontribusi

Untuk pengembangan lebih lanjut:

1. Fork repository ini
2. Buat branch fitur baru
3. Implementasikan fitur dengan mengikuti standar keamanan
4. Submit pull request dengan dokumentasi yang lengkap

## Lisensi

Proyek ini dibuat untuk keperluan akademik dan penelitian.

## Kontak

Untuk pertanyaan teknis atau kolaborasi, silakan buat issue di repository ini.

---

**Catatan Keamanan**: Proyek ini mengimplementasikan standar keamanan tinggi untuk sistem payment gateway. Pastikan untuk selalu menggunakan HTTPS di production dan mengganti semua kunci default dengan kunci yang aman.
