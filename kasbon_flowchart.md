# KasBon App — Navigation Flowchart

Dokumen ini berisi flowchart lengkap navigasi aplikasi KasBon, mulai dari saat pertama kali dibuka hingga seluruh fitur di setiap tab.

---

## 1. Root Flow (App Launch → Main App)

```mermaid
flowchart TD
    A["🚀 App Launch"] --> B["Splash Screen"]
    B --> C{"User sudah login?"}
    C -- Ya --> D["🏠 Main App<br/>(Tab Navigator)"]
    C -- Tidak --> E["Onboarding<br/>(3 slide)"]
    E --> F["Login Screen"]
    F --> G{"Punya akun?"}
    G -- Ya --> H["Input Email/HP + Password"]
    G -- Tidak --> I["Register Screen"]
    I --> J["Input Nama, Email/HP, Password"]
    J --> K["Verifikasi OTP"]
    K --> L["Setup Profil Keluarga<br/>(Nama keluarga, foto)"]
    L --> D
    H --> C2{"Login berhasil?"}
    C2 -- Ya --> D
    C2 -- Tidak --> F2["Tampilkan Error<br/>+ Coba Lagi"]
    F2 --> F
    F --> M["Lupa Password"]
    M --> N["Input Email/HP"]
    N --> O["Kirim Link Reset"]
    O --> F

    style A fill:#F5C842,color:#0F1923,stroke:#F5C842
    style D fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style B fill:#1E2D3D,color:#fff,stroke:#F5C842
    style E fill:#1E2D3D,color:#fff,stroke:#7C6FF7
    style F fill:#1E2D3D,color:#fff,stroke:#F5C842
    style I fill:#1E2D3D,color:#fff,stroke:#F5C842
    style F2 fill:#FF6B6B,color:#fff,stroke:#FF6B6B
```

---

## 2. Main Tab Navigator (5 Tab)

```mermaid
flowchart LR
    TAB["Tab Navigator"]
    TAB --> T1["🏠 Home"]
    TAB --> T2["💰 Dompet"]
    TAB --> T3["✏️ Catat (+)<br/>FAB Style"]
    TAB --> T4["🎯 Project"]
    TAB --> T5["👤 Profil"]

    style TAB fill:#0F1923,color:#F5C842,stroke:#F5C842,stroke-width:2px
    style T1 fill:#F5C842,color:#0F1923,stroke:#F5C842
    style T2 fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style T3 fill:#FF6B6B,color:#fff,stroke:#FF6B6B,stroke-width:3px
    style T4 fill:#7C6FF7,color:#fff,stroke:#7C6FF7
    style T5 fill:#1E2D3D,color:#fff,stroke:#F5C842
```

---

## 3. Tab 1 — Home (Dashboard)

```mermaid
flowchart TD
    H1["🏠 Home Dashboard"] --> H2["Total Saldo Gabungan<br/>(semua dompet visible)"]
    H1 --> H3["Budget Bulanan<br/>(progress bar)"]
    H1 --> H4["Transaksi Terbaru<br/>(5 item terakhir)"]
    H1 --> H5["Ringkasan Pemasukan<br/>vs Pengeluaran bulan ini"]

    H2 -- Tap --> H6["Detail Saldo<br/>per Dompet"]
    H3 -- Tap --> H7["Detail Budget<br/>(kategori breakdown)"]
    H4 -- Tap item --> H8["Detail Transaksi"]
    H4 -- "Lihat Semua" --> H9["Riwayat Transaksi<br/>(Full List + Filter)"]
    H5 -- Tap --> H10["Laporan Bulanan<br/>(Chart Pie/Bar)"]

    H8 --> H8a{"Aksi"}
    H8a -- Edit --> H8b["Edit Transaksi"]
    H8a -- Hapus --> H8c["Konfirmasi Hapus"]

    H9 --> H9a["Filter by:<br/>Tanggal / Kategori /<br/>Dompet / Anggota"]

    style H1 fill:#F5C842,color:#0F1923,stroke:#F5C842
    style H8 fill:#1E2D3D,color:#fff,stroke:#F5C842
    style H10 fill:#7C6FF7,color:#fff,stroke:#7C6FF7
```

---

## 4. Tab 2 — Dompet (Wallets)

```mermaid
flowchart TD
    W1["💰 Dompet List"] --> W2["Kas Keluarga<br/>(Global)"]
    W1 --> W3["Uang Jajan Ayah<br/>(Personal)"]
    W1 --> W4["Usaha Cimol<br/>(Bisnis)"]
    W1 --> W5["+ Buat Dompet Baru"]

    W2 -- Tap --> W6["Detail Dompet"]
    W3 -- Tap --> W6
    W4 -- Tap --> W7["Detail Dompet Bisnis"]

    W6 --> W6a["Saldo & Riwayat<br/>Transaksi Dompet"]
    W6 --> W6b["Pengaturan Dompet"]
    W6b --> W6c["Ubah Nama / Ikon"]
    W6b --> W6d["Set Visibilitas<br/>(3 level)"]
    W6b --> W6e["Hapus / Arsipkan<br/>Dompet"]

    W7 --> W7a["Saldo & Riwayat"]
    W7 --> W7b["Sub-modul Bisnis"]
    W7b --> W7c["Omset Harian"]
    W7b --> W7d["Modal / HPP"]
    W7b --> W7e["Laba Kotor<br/>(auto-hitung)"]

    W5 --> W5a["Pilih Tipe:<br/>Global / Personal / Bisnis"]
    W5a --> W5b["Input Nama,<br/>Saldo Awal, Ikon"]
    W5b --> W5c["Set Visibilitas"]
    W5c --> W5d["Dompet Dibuat ✅"]

    W6d --> VIS["3 Level Visibilitas"]
    VIS --> V1["👁️ Semua bisa<br/>lihat & catat"]
    VIS --> V2["👁️ Semua bisa<br/>lihat saja"]
    VIS --> V3["🔒 Hanya saya"]

    style W1 fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style W5d fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style W7 fill:#F5C842,color:#0F1923,stroke:#F5C842
    style V3 fill:#FF6B6B,color:#fff,stroke:#FF6B6B
```

---

## 5. Tab 3 — Catat (+) (Floating Action Button)

Tombol ini dibuat **menonjol (FAB)** di tengah tab bar, sesuai preferensi.

```mermaid
flowchart TD
    C1["✏️ Tap Tombol Catat (+)<br/>FAB di tengah tab bar"] --> C2["Bottom Sheet Muncul<br/>(animasi slide up)"]

    C2 --> C3["💸 Pengeluaran"]
    C2 --> C4["💰 Pemasukan"]
    C2 --> C5["🔄 Transfer<br/>antar Dompet"]

    C3 --> C6["Form Input"]
    C4 --> C6
    C5 --> C7["Form Transfer"]

    C6 --> F1["Nominal<br/>(keypad angka)"]
    C6 --> F2["Kategori<br/>(pilih dari grid ikon)"]
    C6 --> F3["Dompet<br/>(pilih dari list)"]
    C6 --> F4["Catatan<br/>(opsional)"]
    C6 --> F5["Tanggal<br/>(default: hari ini)"]
    C6 --> F6["Foto Struk<br/>(opsional, kamera/galeri)"]

    C7 --> T1["Dari Dompet: ___"]
    C7 --> T2["Ke Dompet: ___"]
    C7 --> T3["Nominal Transfer"]

    F1 --> S1{"Simpan?"}
    T3 --> S1
    S1 -- Ya --> S2["✅ Transaksi Tersimpan<br/>(animasi sukses)"]
    S1 -- Tidak --> S3["❌ Batal<br/>(tutup bottom sheet)"]

    S2 --> S4["Kembali ke<br/>tab sebelumnya"]

    style C1 fill:#FF6B6B,color:#fff,stroke:#FF6B6B,stroke-width:3px
    style C2 fill:#1E2D3D,color:#fff,stroke:#F5C842
    style S2 fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style S3 fill:#FF6B6B,color:#fff,stroke:#FF6B6B
```

---

## 6. Tab 4 — Project (Goals / Tabungan Bersama)

```mermaid
flowchart TD
    P1["🎯 Project List"] --> P2["Renovasi Dapur<br/>Rp 8jt / 15jt (53%)"]
    P1 --> P3["Liburan Bali<br/>Rp 3jt / 10jt (30%)"]
    P1 --> P4["+ Buat Project Baru"]

    P2 -- Tap --> P5["Detail Project"]
    P3 -- Tap --> P5

    P5 --> P5a["Progress Bar Visual<br/>(target vs terkumpul)"]
    P5 --> P5b["Riwayat Kontribusi<br/>(siapa top-up berapa)"]
    P5 --> P5c["Aksi"]

    P5c --> A1["💰 Top-up Dana"]
    P5c --> A2["💸 Tarik Dana"]
    P5c --> A3["⚙️ Edit Project"]
    P5c --> A4["🗑️ Hapus / Arsipkan"]

    A1 --> A1a["Pilih Sumber Dompet"]
    A1a --> A1b["Input Nominal"]
    A1b --> A1c["✅ Top-up Berhasil"]

    P4 --> N1["Input Nama Project"]
    N1 --> N2["Target Dana (Rp)"]
    N2 --> N3["Deadline (opsional)"]
    N3 --> N4["Pilih Anggota<br/>yang boleh kontribusi"]
    N4 --> N5["Project Dibuat ✅"]

    style P1 fill:#7C6FF7,color:#fff,stroke:#7C6FF7
    style P5 fill:#1E2D3D,color:#fff,stroke:#7C6FF7
    style A1c fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style N5 fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
```

---

## 7. Tab 5 — Profil & Pengaturan

```mermaid
flowchart TD
    PR1["👤 Profil Saya"] --> PR2["Info Akun<br/>(Nama, Email, Foto)"]
    PR1 --> PR3["👨‍👩‍👧‍👦 Keluarga Saya"]
    PR1 --> PR4["🔔 Notifikasi"]
    PR1 --> PR5["📊 Laporan &<br/>Ekspor Data"]
    PR1 --> PR6["⚙️ Pengaturan Umum"]
    PR1 --> PR7["🚪 Logout"]

    PR2 -- Tap --> PR2a["Edit Profil"]

    PR3 --> PR3a["Daftar Anggota<br/>+ Role masing-masing"]
    PR3 --> PR3b["+ Undang Anggota<br/>(via link/kode)"]
    PR3 --> PR3c["Kelola Role"]
    PR3c --> R1["👑 Admin<br/>(full access)"]
    PR3c --> R2["✏️ Member<br/>(catat & lihat)"]
    PR3c --> R3["👁️ Viewer<br/>(lihat saja)"]

    PR4 --> PR4a["Toggle Notifikasi:<br/>Transaksi baru,<br/>Budget hampir habis,<br/>Target project tercapai"]

    PR5 --> PR5a["Laporan Bulanan<br/>(chart + tabel)"]
    PR5 --> PR5b["Ekspor ke PDF / CSV"]

    PR6 --> PR6a["Bahasa"]
    PR6 --> PR6b["Mata Uang"]
    PR6 --> PR6c["Tema (Dark/Light)<br/>— default: Dark"]
    PR6 --> PR6d["Keamanan<br/>(PIN / Biometrik)"]

    style PR1 fill:#1E2D3D,color:#F5C842,stroke:#F5C842
    style R1 fill:#F5C842,color:#0F1923,stroke:#F5C842
    style R2 fill:#2DD4A4,color:#0F1923,stroke:#2DD4A4
    style R3 fill:#7C6FF7,color:#fff,stroke:#7C6FF7
```

---

## 8. Ringkasan Jumlah Screen per Modul

| Modul | Screen | Jumlah |
|-------|--------|--------|
| **Auth** | Splash, Onboarding, Login, Register, OTP, Lupa Password, Setup Keluarga | 7 |
| **Home** | Dashboard, Detail Saldo, Detail Budget, Detail Transaksi, Riwayat Transaksi, Laporan Bulanan | 6 |
| **Dompet** | List, Detail Dompet, Detail Bisnis, Buat Baru, Pengaturan Dompet | 5 |
| **Catat** | Bottom Sheet (Pengeluaran/Pemasukan), Form Transfer, Pilih Kategori | 3 |
| **Project** | List, Detail, Buat Baru, Top-up, Tarik Dana | 5 |
| **Profil** | Profil, Edit Profil, Keluarga, Undang Anggota, Kelola Role, Notifikasi, Laporan, Ekspor, Pengaturan Umum, Keamanan | 10 |
| | | **Total: 36 screen** |

> [!TIP]
> Dari 36 screen, banyak yang bisa menggunakan komponen *reusable* yang sama (misalnya `GlassCard`, `TransactionItem`, `ProgressBar`). Jadi effort sebenarnya lebih ringan dari angka 36.
