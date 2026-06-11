# Rencana Implementasi Frontend: Aplikasi KasBon

Dokumen ini memuat detail perencanaan untuk sisi frontend (mobile app) dari aplikasi KasBon menggunakan React Native (Expo). Rencana ini berfokus pada panduan UI/UX, alur navigasi, dan struktur halaman.

## User Review Required

> [!IMPORTANT]
> Mohon tinjau rencana navigasi dan panduan desain UI/UX di bawah ini. Pastikan alur antar layarnya sudah sesuai dengan visi Anda sebelum kita mulai melakukan inisiasi proyek Expo dan mulai membuat komponen-komponen antarmuka.

## Keputusan Desain (Sudah Dikonfirmasi ✅)

> [!NOTE]
> 1. **Tombol "Catat (+)"** → Menggunakan **Floating Action Button (FAB)** yang menonjol di tengah tab bar, lebih besar dari ikon tab lainnya.
> 2. **Navigasi sub-halaman** → Menggunakan **Bottom Sheet / Modal** untuk interaksi ringan (input transaksi, pilih dompet, pilih kategori). Full screen stack hanya untuk halaman detail yang kompleks.
>
> Flowchart navigasi lengkap: [kasbon_flowchart.md](file:///C:/Users/micha/.gemini/antigravity-ide/brain/0e017a0a-319e-468c-90a6-deb037106451/kasbon_flowchart.md)

## Panduan UI/UX (Aesthetics & Design System)

Aplikasi akan mengusung tema **Dark Mode + Glassmorphism** yang memberikan kesan premium, modern, dan tidak melelahkan mata.

### Palet Warna
- **Background Utama (Deep Navy):** `#0F1923`
- **Surface/Card Dark:** `#1E2D3D` (dengan efek transparansi/glassmorphism)
- **Aksen Utama (Sunny Gold):** `#F5C842` (untuk tombol utama, ikon logo, highlight)
- **Aksen Pemasukan (Mint Fresh):** `#2DD4A4`
- **Aksen Pengeluaran (Coral Red):** `#FF6B6B`
- **Aksen Project/Tabungan (Electric Violet):** `#7C6FF7`

### Tipografi
- **Font:** Inter atau Outfit (Google Fonts) untuk memberikan tampilan *sleek* dan modern.
- **Hierarki:** Penggunaan variasi weight (Bold untuk nilai uang, Medium/Regular untuk teks sekunder).

### Style Komponen (Glassmorphism)
- Card akan memiliki `backgroundColor` semi-transparan (misal `rgba(30, 45, 61, 0.6)`).
- Menambahkan `blur` effect pada latar belakang elemen floating (bottom tab bar, modal).
- Menggunakan *subtle borders* (`rgba(255, 255, 255, 0.1)`) untuk membatasi card di atas background gelap.
- Menambahkan mikro-animasi pada tombol saat ditekan (scale/opacity feedback).

---

## Alur Navigasi (App Navigation Flow)

Aplikasi akan menggunakan kombinasi **Bottom Tab Navigation** (untuk menu utama) dan **Stack Navigation** (untuk detail/sub-halaman).

### 1. Root Flow
- **Splash Screen:** Menampilkan logo KasBon + animasi loading ringan.
- **Auth Stack:** Login / Register / Lupa Password.
- **Main App (Tab Navigator):** Muncul setelah user berhasil login.

### 2. Main Tab Navigation (5 Menu)

1. **Home (Dashboard)**
   - Menampilkan ringkasan total saldo gabungan (berdasarkan dompet yang diizinkan untuk dilihat).
   - Menampilkan *monthly budget progress* (visual bar).
   - Daftar transaksi terbaru (Recent Transactions).
   - *Sub-halaman:* Detail Saldo, Detail Transaksi.
2. **Dompet (Wallets)**
   - Daftar semua dompet: Kas Keluarga (Global), Uang Jajan (Personal), Usaha Cimol (Bisnis).
   - Indikator visibilitas tiap dompet ("Semua bisa lihat/catat", "Hanya saya", dll).
   - *Sub-halaman:* Buat Dompet Baru, Pengaturan Dompet, Detail Dompet (termasuk fitur omset/modal untuk dompet bisnis).
3. **Catat (+) (Floating Center Action)**
   - Saat di-tap, akan membuka *Bottom Sheet* atau halaman penuh untuk input transaksi.
   - Pilihan: Pemasukan, Pengeluaran, Transfer antar Dompet.
   - Pilihan input cepat untuk nominal, kategori, dan dompet yang digunakan.
4. **Project (Goals / Tabungan)**
   - Daftar proyek bersama (contoh: "Renovasi Dapur", "Liburan Akhir Tahun").
   - Progress bar target vs terkumpul.
   - *Sub-halaman:* Buat Project Baru, Detail Project, Top-up/Tarik dana project.
5. **Profil (Settings & Family)**
   - Info user saat ini.
   - Manajemen Anggota Keluarga (Invite member, set role).
   - Pengaturan Notifikasi & Akun.

---

## Tahapan Eksekusi (Proposed Changes)

Eksekusi akan dibagi ke dalam beberapa tahap. Pada tahap pertama, kita tidak memerlukan koneksi backend, melainkan kita akan membuat UI statis (Mockup) terlebih dahulu dengan *dummy data*.

### Tahap 1: Setup & UI Foundation
#### [NEW] `App.js` / `app/_layout.tsx` (jika menggunakan Expo Router)
#### [NEW] `src/theme/colors.ts` & `src/theme/typography.ts`
#### [NEW] `src/components/ui/`
Pembuatan komponen dasar *reusable*:
- `GlassCard`
- `PrimaryButton`
- `TransactionItem`
- `AmountText`

### Tahap 2: Home & Auth Screens
#### [NEW] `src/screens/Auth/LoginScreen.tsx`
#### [NEW] `src/screens/Home/HomeScreen.tsx`

### Tahap 3: Fitur Inti (Tab Navigator & Pencatatan)
#### [NEW] `src/navigation/TabNavigator.tsx`
#### [NEW] `src/screens/Transaction/AddTransactionScreen.tsx` (atau Bottom Sheet)
#### [NEW] `src/screens/Wallet/WalletListScreen.tsx`

### Tahap 4: Fitur Tambahan (Project & Profil)
#### [NEW] `src/screens/Project/ProjectListScreen.tsx`
#### [NEW] `src/screens/Profile/ProfileScreen.tsx`

---

## Verification Plan

### Manual Verification
- Meluncurkan aplikasi via Expo Go atau Simulator (iOS/Android).
- Memastikan navigasi antar 5 tab berjalan mulus tanpa lag.
- Memeriksa tampilan *Dark Mode + Glassmorphism* sudah sesuai, terutama kontras teks (warna putih/emas di atas biru gelap) dapat terbaca jelas.
- Menguji *floating button* "Catat" dapat membuka modal/halaman input transaksi dengan benar.
