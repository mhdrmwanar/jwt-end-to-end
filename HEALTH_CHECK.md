# Health Check Endpoint Documentation

## 🏥 Health Check: `http://localhost:3000/health`

### Apa itu Health Check?

Health Check adalah **endpoint khusus** yang digunakan untuk:

### 🎯 **Fungsi Utama:**

1. **Monitoring Status Aplikasi** - Mengecek apakah server masih berjalan dengan baik
2. **Database Connection Check** - Memverifikasi koneksi ke database SQLite
3. **System Information** - Menampilkan info sistem dan performa
4. **API Endpoints List** - Daftar semua endpoint yang tersedia
5. **Debugging & Troubleshooting** - Membantu diagnosa masalah

### 📊 **Response Format:**

```json
{
  "status": "OK",
  "timestamp": "2025-07-11T03:53:45.123Z",
  "service": "Secure Payment Gateway",
  "version": "1.0.0",
  "environment": "development",
  "database": {
    "type": "SQLite",
    "connected": true,
    "status": "Connected"
  },
  "server": {
    "port": 3000,
    "uptime": 1234.56,
    "memory": {
      "used": "45 MB",
      "total": "128 MB"
    }
  },
  "endpoints": {
    "userLogin": "/login.html",
    "adminLogin": "/admin-login.html",
    "api": {
      "auth": "/auth",
      "users": "/users",
      "payments": "/payments",
      "admin": "/admin"
    }
  }
}
```

### 🚨 **Status Codes:**

- **200 OK** - Aplikasi berjalan normal
- **503 Service Unavailable** - Ada masalah (database disconnect, error)

### 💼 **Kegunaan Praktis:**

#### 1. **Development & Testing**

```bash
# Cek apakah server sudah jalan
curl http://localhost:3000/health

# Monitoring saat development
watch -n 5 curl -s http://localhost:3000/health
```

#### 2. **Production Monitoring**

- Load balancer dapat menggunakan endpoint ini
- Monitoring tools (Nagios, Zabbix, etc.)
- Docker health checks
- Kubernetes liveness/readiness probes

#### 3. **Debugging**

- Cek status database connection
- Monitor memory usage
- Verify all endpoints tersedia
- Check server uptime

### 🔧 **Contoh Penggunaan:**

#### Browser

Buka: `http://localhost:3000/health`

#### PowerShell

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health"
```

#### curl

```bash
curl -X GET http://localhost:3000/health
```

#### JavaScript/Fetch

```javascript
fetch('/health')
  .then((response) => response.json())
  .then((data) => console.log('Server status:', data.status));
```

### 🛡️ **Security Note:**

Health check endpoint biasanya **tidak memerlukan autentikasi** karena:

- Digunakan untuk monitoring eksternal
- Hanya menampilkan informasi status umum
- Tidak mengekspos data sensitif

### 📈 **Best Practices:**

1. **Selalu sediakan health check** untuk aplikasi production
2. **Include database status** untuk memastikan konektivitas
3. **Monitor response time** - health check harus cepat (<1 detik)
4. **Log health check failures** untuk debugging
5. **Gunakan untuk automated alerts** saat ada masalah

Health check adalah **standar industri** untuk memastikan aplikasi web berjalan dengan baik! 🚀
