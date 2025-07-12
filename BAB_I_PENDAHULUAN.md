# BAB I PENDAHULUAN

## 1.1 Latar Belakang

Perkembangan teknologi digital dan e-commerce telah mengubah cara masyarakat melakukan transaksi pembayaran. Sistem payment gateway menjadi komponen krusial dalam ekosistem perdagangan elektronik yang memfasilitasi transaksi keuangan antara konsumen, merchant, dan penyedia layanan pembayaran. Namun, popularitas sistem pembayaran digital ini juga membawa tantangan besar dalam aspek keamanan data dan privasi pengguna.

Berdasarkan laporan Cybersecurity Ventures (2024), kerugian akibat cybercrime diproyeksikan mencapai $10.5 triliun per tahun pada 2025, dengan sektor keuangan menjadi target utama serangan siber. Data menunjukkan bahwa 43% dari serangan siber menargetkan sistem pembayaran online, dengan metode serangan yang semakin canggih seperti data breach, man-in-the-middle attacks, dan session hijacking.

Sistem payment gateway konvensional umumnya menghadapi beberapa kelemahan mendasar dalam aspek keamanan. Pertama, penggunaan enkripsi yang tidak end-to-end sering menyebabkan data sensitif terbuka pada titik-titik tertentu dalam alur transaksi. Kedua, implementasi single key encryption untuk semua pengguna menciptakan single point of failure yang dapat mengkompromikan seluruh sistem jika terjadi kebocoran kunci. Ketiga, manajemen kunci yang tidak optimal, seperti penyimpanan kunci enkripsi dalam database atau file konfigurasi, meningkatkan risiko exposure kunci kepada pihak yang tidak berwenang.

Algoritma Advanced Encryption Standard (AES) telah diakui sebagai standar enkripsi yang robust dan efisien oleh National Institute of Standards and Technology (NIST) sejak tahun 2001. AES-256 memberikan tingkat keamanan yang sangat tinggi dengan kompleksitas komputasi 2^256, namun implementasinya dalam sistem payment gateway masih jarang mengadopsi pendekatan user-specific key generation yang dapat meningkatkan tingkat keamanan secara signifikan.

Konsep kunci pribadi berdasarkan identifier unik pengguna menawarkan solusi inovatif untuk mengatasi kelemahan sistem konvensional. Dengan menggenerate kunci enkripsi yang unik untuk setiap pengguna berdasarkan identifier mereka (seperti User ID dan email), sistem dapat memberikan isolasi keamanan yang lebih baik, mengurangi impact dari potential key compromise, dan meningkatkan accountability dalam audit trail.

Penelitian ini mengusulkan implementasi sistem keamanan end-to-end pada payment gateway yang mengombinasikan kekuatan algoritma AES-256 dengan sistem kunci pribadi berdasarkan identifier unik pengguna menggunakan SHA-256 hash function. Pendekatan ini diharapkan dapat memberikan tingkat keamanan yang superior sambil mempertahankan performa dan usability yang optimal.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah dijelaskan, penelitian ini merumuskan beberapa permasalahan sebagai berikut:

### 1.2.1 Permasalahan Utama
1. **Bagaimana merancang dan mengimplementasikan proses enkripsi end-to-end dengan kunci unik per pengguna menggunakan kombinasi User ID dan Email sebagai dasar pembentukan kunci pada sistem Payment Gateway?**

2. **Bagaimana efektivitas dan tantangan keamanan dari model enkripsi individual berbasis pengguna dalam validasi transaksi menuju sistem payment gateway?**

### 1.2.2 Sub-Permasalahan Penelitian
1. **Desain Arsitektur Keamanan**: Bagaimana merancang arsitektur sistem keamanan end-to-end yang mengintegrasikan algoritma AES-256 dengan sistem kunci pribadi berdasarkan kombinasi User ID dan Email pengguna?

2. **Implementasi Key Generation**: Bagaimana mengimplementasikan algoritma deterministic key generation menggunakan SHA-256 yang mengombinasikan User ID dan Email untuk menghasilkan kunci enkripsi yang unik dan secure untuk setiap pengguna?

3. **Mekanisme Enkripsi Data**: Bagaimana mengimplementasikan proses enkripsi AES-256-CBC untuk data pembayaran sensitif dengan menggunakan kunci pribadi yang telah di-generate berdasarkan identifier unik pengguna?

4. **Validasi Keamanan**: Bagaimana memvalidasi efektivitas sistem enkripsi individual dalam melindungi data transaksi dari berbagai jenis serangan seperti data breach, man-in-the-middle, dan unauthorized access?

5. **Analisis Performa**: Bagaimana menganalisis impact implementasi enkripsi end-to-end dengan kunci individual terhadap performa sistem payment gateway dalam hal response time, throughput, dan resource utilization?

6. **Evaluasi Tantangan**: Bagaimana mengidentifikasi dan mengatasi tantangan teknis dalam implementasi model enkripsi individual, termasuk key management, data integrity verification, dan scalability issues?

## 1.3 Tujuan Penelitian

### 1.3.1 Tujuan Umum
Mengimplementasikan dan menganalisis sistem keamanan end-to-end dengan algoritma AES dan kunci pribadi berdasarkan identifier unik pengguna pada sistem payment gateway untuk meningkatkan tingkat keamanan transaksi digital.

### 1.3.2 Tujuan Khusus
1. **Analisis Kebutuhan Keamanan**
   - Menganalisis kebutuhan dan requirement keamanan pada sistem payment gateway modern
   - Mengidentifikasi vulnerabilities dan threats yang umum terjadi pada sistem pembayaran online
   - Mengevaluasi standar keamanan internasional yang berlaku untuk payment systems

2. **Perancangan Arsitektur Keamanan**
   - Merancang arsitektur sistem keamanan end-to-end yang mengintegrasikan multiple security layers
   - Mendesain mekanisme key generation berdasarkan identifier unik pengguna menggunakan SHA-256
   - Mengembangkan framework enkripsi AES-256 untuk data pembayaran sensitif

3. **Implementasi Sistem**
   - Mengimplementasikan sistem payment gateway dengan teknologi Node.js dan TypeScript
   - Membangun service enkripsi yang menggunakan algoritma AES-256-CBC untuk data protection
   - Mengembangkan sistem authentication dan authorization berbasis JWT (JSON Web Tokens)

4. **Pengujian dan Validasi**
   - Melakukan unit testing untuk setiap komponen keamanan yang diimplementasikan
   - Menjalankan integration testing untuk memvalidasi alur keamanan end-to-end
   - Melakukan security testing untuk memverifikasi resistensi sistem terhadap common attacks

5. **Evaluasi Performa**
   - Menganalisis impact implementasi enkripsi terhadap response time dan throughput sistem
   - Mengevaluasi scalability sistem dalam kondisi high-traffic scenarios
   - Membandingkan performa sistem dengan baseline payment gateway konvensional

6. **Dokumentasi dan Rekomendasi**
   - Menyusun dokumentasi teknis lengkap untuk implementasi dan deployment
   - Memberikan rekomendasi best practices untuk payment gateway security
   - Mengidentifikasi area improvement untuk pengembangan future enhancements

## 1.4 Manfaat Penelitian

### 1.4.1 Manfaat Teoritis
1. **Kontribusi Ilmiah**
   - Memberikan kontribusi terhadap pengembangan metodologi keamanan payment gateway dengan pendekatan user-specific encryption
   - Mengembangkan framework integrasi algoritma AES dengan sistem kunci pribadi berbasis identifier unik
   - Menyediakan basis penelitian untuk pengembangan sistem keamanan payment gateway yang lebih advanced

2. **Pengembangan Konsep**
   - Mengembangkan konsep deterministic key generation yang secure untuk aplikasi payment systems
   - Memberikan insight tentang implementasi end-to-end encryption dalam arsitektur microservices
   - Menyajikan analisis comprehensive tentang trade-off antara security dan performance dalam payment systems

3. **Referensi Akademik**
   - Menyediakan referensi implementasi praktis untuk penelitian serupa di bidang cybersecurity dan payment systems
   - Memberikan benchmark untuk evaluasi sistem keamanan payment gateway
   - Menjadi foundation untuk penelitian lanjutan tentang quantum-resistant payment security

### 1.4.2 Manfaat Praktis
1. **Industri Payment Gateway**
   - Memberikan solusi konkret untuk meningkatkan keamanan sistem payment gateway yang sudah ada
   - Menyediakan implementasi reference yang dapat diadopsi oleh fintech companies dan payment service providers
   - Mengurangi risiko financial losses akibat data breach dan fraud dalam transaksi digital

2. **Pengembang Sistem**
   - Menyediakan source code dan dokumentasi lengkap yang dapat digunakan sebagai learning resource
   - Memberikan best practices implementation untuk security-critical applications
   - Menyajikan framework yang dapat diadaptasi untuk berbagai jenis financial applications

3. **Pengguna Akhir**
   - Meningkatkan confidence pengguna dalam melakukan transaksi online melalui enhanced security measures
   - Memberikan protection yang lebih baik terhadap personal dan financial data
   - Mengurangi risiko identity theft dan financial fraud

4. **Regulator dan Policymaker**
   - Menyediakan technical insight untuk pengembangan regulasi payment system security
   - Memberikan guidance untuk security assessment dan compliance evaluation
   - Menyajikan evidence-based approach untuk payment security standards

### 1.4.3 Manfaat Ekonomi
1. **Cost Reduction**
   - Mengurangi potential losses akibat security breaches dan fraud
   - Menurunkan cost of compliance melalui implementation of robust security measures
   - Mengoptimalkan operational costs melalui efficient security architecture

2. **Business Value**
   - Meningkatkan competitive advantage melalui superior security features
   - Memberikan value proposition yang kuat untuk customer acquisition dan retention
   - Membuka peluang ekspansi ke regulated markets yang mensyaratkan high security standards

## 1.5 Batasan Masalah

Untuk memfokuskan ruang lingkup penelitian dan memastikan kedalaman analisis yang optimal, penelitian ini menetapkan beberapa batasan masalah sebagai berikut:

### 1.5.1 Batasan Teknis
1. **Algoritma Kriptografi**
   - Penelitian ini hanya fokus pada algoritma AES-256 dalam mode CBC (Cipher Block Chaining)
   - Hash function yang digunakan dibatasi pada SHA-256 untuk key generation dan verification
   - Tidak mencakup implementasi algoritma kriptografi lain seperti RSA, ECC, atau post-quantum cryptography

2. **Platform dan Teknologi**
   - Implementasi dibatasi pada teknologi Node.js dengan TypeScript sebagai bahasa pemrograman utama
   - Database yang digunakan adalah SQLite untuk simplicity dan portability
   - Frontend menggunakan vanilla HTML/CSS/JavaScript tanpa framework modern seperti React atau Vue.js

3. **Scope Fungsionalitas**
   - Sistem payment gateway yang diimplementasikan mencakup fungsi dasar: registration, authentication, dan payment processing
   - Tidak mencakup advanced features seperti multi-currency support, real-time fraud detection, atau integration dengan third-party payment processors
   - Tidak mengimplementasikan compliance dengan specific payment standards seperti PCI DSS secara penuh

### 1.5.2 Batasan Metodologi
1. **Environment Testing**
   - Pengujian dilakukan dalam controlled environment (development dan staging)
   - Tidak mencakup penetration testing oleh ethical hackers eksternal
   - Load testing dibatasi pada simulated traffic dengan tools standar

2. **User Research**
   - Tidak melakukan user experience research atau usability testing dengan real users
   - Evaluasi user interface dibatasi pada technical functionality tanpa comprehensive UX analysis
   - Tidak mencakup user behavior analysis dalam konteks security awareness

3. **Comparative Analysis**
   - Perbandingan performa dibatasi pada baseline implementation tanpa enkripsi
   - Tidak melakukan comparative study dengan commercial payment gateway solutions
   - Benchmark testing dibatasi pada metrics dasar seperti response time dan throughput

### 1.5.3 Batasan Konteks
1. **Regulatory Compliance**
   - Penelitian tidak mencakup full compliance assessment terhadap regulasi payment specific seperti PCI DSS, GDPR, atau regulasi Bank Indonesia
   - Analysis hanya fokus pada technical security implementation tanpa legal compliance verification
   - Tidak mencakup audit trail yang memenuhi specific regulatory requirements

2. **Production Deployment**
   - Implementasi tidak didesain untuk immediate production deployment tanpa additional hardening
   - Tidak mencakup infrastructure security seperti network security, server hardening, atau cloud security
   - Tidak mengimplementasikan high availability dan disaster recovery mechanisms

3. **Scale and Performance**
   - Testing dibatasi pada small to medium scale (< 1000 concurrent users)
   - Tidak mencakup distributed system architecture atau microservices deployment
   - Performance analysis dibatasi pada single-node deployment

### 1.5.4 Batasan Waktu dan Resource
1. **Periode Penelitian**
   - Penelitian dibatasi pada periode 12 bulan untuk design, implementation, testing, dan documentation
   - Tidak mencakup long-term security monitoring atau maintenance phase analysis

2. **Resource Availability**
   - Development dan testing menggunakan standard development hardware tanpa specialized security testing equipment
   - Tidak menggunakan commercial security testing tools atau services

3. **External Dependencies**
   - Tidak mencakup integration dengan real banking systems atau payment processors
   - Testing menggunakan simulated payment scenarios tanpa real money transactions

Dengan batasan-batasan yang telah ditetapkan, penelitian ini diharapkan dapat memberikan kontribusi yang fokus dan mendalam pada area implementasi keamanan end-to-end dengan algoritma AES dan kunci pribadi berdasarkan identifier unik pengguna pada sistem payment gateway.
