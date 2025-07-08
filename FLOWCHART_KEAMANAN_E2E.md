# FLOWCHART - IMPLEMENTASI KEAMANAN END-TO-END PAYMENT GATEWAY

## **Alur Keamanan End-to-End dengan AES dan Kunci Pribadi Berdasarkan Identifier Unik Pengguna**

### **Flowchart Proses Utama**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│          IMPLEMENTASI KEAMANAN END-TO-END PAYMENT GATEWAY                      │
│         dengan Algoritma AES dan Kunci Pribadi Berdasarkan                     │
│                   Identifier Unik Pengguna                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

1. INPUT TRANSAKSI
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Pengguna memasukkan informasi pembayaran:                                      │
│ • Jumlah pembayaran dan currency                                               │
│ • Metode pembayaran (Credit Card)                                              │
│ • Data kartu: nomor, CVV, expiry date, nama pemegang                          │
│ • Alamat billing                                                               │
│ • Informasi merchant                                                            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
2. GENERATE DYNAMIC KEY (SERVER SIDE)
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Sistem server menghasilkan kunci enkripsi pribadi berbasis:                    │
│ • User ID (dari JWT token)                                                     │
│ • Email pengguna (dari JWT token)                                              │
│ • Master key (environment variable)                                            │
│ • Timestamp (8 digit terakhir untuk variasi)                                  │
│                                                                                 │
│ Process: userIdentifier = userId + "_" + userEmail                             │
│ Kunci = SHA256(userIdentifier + "_" + masterKey + "_" + timestamp)             │
│ Output: Kunci AES-256 bit yang unik untuk setiap pengguna                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
3. ENKRIPSI DATA (SERVER SIDE)
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Data transaksi sensitif dienkripsi menggunakan AES-256-CBC:                   │
│ • Input: JSON data pembayaran                                                  │
│ • Kunci: Private key yang telah di-generate                                    │
│ • Algorithm: AES-256-CBC                                                        │
│ • Output: Base64 encrypted string                                              │
│                                                                                 │
│ Data yang dienkripsi: card number, CVV, expiry, billing address               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
4. PENYIMPANAN AMAN (DATABASE)
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Data terenkripsi disimpan di database SQLite:                                  │
│ • encryptedPaymentData: AES-256 encrypted data                                │
│ • keyHash: SHA-256 hash dari kunci untuk verifikasi                           │
│ • paymentToken: Token sementara (15 menit expiry)                             │
│ • metadata: amount, currency, status (tidak sensitif)                          │
│                                                                                 │
│ TIDAK ADA data sensitif dalam bentuk plain text!                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
5. REGENERASI KUNCI (SERVER SIDE)
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Saat memproses payment, server membentuk ulang kunci:                         │
│ • Extract User ID + Email dari JWT token                                       │
│ • Generate kunci dengan proses yang identik (SHA-256)                         │
│ • Verifikasi: SHA-256(regeneratedKey) === storedKeyHash                       │
│ • Jika cocok: lanjut dekripsi, jika tidak: tolak akses                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
6. DEKRIPSI DAN VALIDASI
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Data didekripsi dan diverifikasi:                                              │
│ • Dekripsi: AES.decrypt(encryptedData, regeneratedKey)                        │
│ • Parse JSON kembali ke object                                                 │
│ • Validasi format dan integritas data                                          │
│ • Business logic validation (amount, currency, etc.)                           │
│ • Anti-fraud checks                                                             │
│ • Verifikasi payment token belum expired                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
7. KIRIM KE PAYMENT GATEWAY
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Data yang sudah didekripsi dikirim ke payment processor:                      │
│ • Protokol: HTTPS/TLS untuk komunikasi aman                                   │
│ • API authentication dengan payment gateway                                    │
│ • Transmisi data pembayaran yang sudah diverifikasi                           │
│ • Receive response: success/failure dari payment gateway                       │
│ • Update transaction status di database                                        │
│ • Generate response untuk client                                               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **Diagram Visual Sederhana**

```
[USER INPUT] → [JWT AUTH] → [KEY GENERATION] → [AES ENCRYPTION] → [DATABASE]
     │               │            │                   │              │
     │               │            │                   │              │
  Payment         User ID       SHA-256           AES-256-CBC    Encrypted
   Data          + Email       Hashing           Encryption      Storage
                              
[PAYMENT PROCESSING] ← [KEY REGENERATION] ← [VERIFICATION] ← [DATABASE QUERY]
        │                      │                │                │
        │                      │                │                │
    External              Same Process      SHA-256 Hash    Retrieve
   Gateway                as Step 2         Verification    Encrypted Data

[CLIENT RESPONSE] ← [UPDATE STATUS] ← [GATEWAY RESPONSE] ← [AES DECRYPTION]
```

### **Keunggulan Sistem Ini**

1. **🔐 User-Specific Encryption**: Setiap pengguna memiliki kunci enkripsi yang unik
2. **🔄 Reproducible Keys**: Kunci dapat di-regenerate tanpa disimpan di database
3. **🛡️ Multi-Layer Security**: Transport, Application, Data, dan Database security
4. **⚡ Performance Efficient**: Overhead minimal dengan keamanan maksimal
5. **🔍 Audit Trail**: Logging lengkap untuk compliance dan monitoring
6. **⏰ Time-Limited Tokens**: Payment token dengan expiry untuk mengurangi risk window
7. **🚫 No Plain Text**: Tidak ada data sensitif yang disimpan dalam bentuk plain text

### **Teknologi yang Digunakan**

- **SHA-256**: Key generation berdasarkan identifier unik pengguna
- **AES-256-CBC**: Symmetric encryption untuk data payload
- **SHA-256**: Hashing untuk integrity verification  
- **JWT**: Authentication dan session management
- **HTTPS/TLS**: Transport layer security
- **SQLite + TypeORM**: Database dengan relational constraints
