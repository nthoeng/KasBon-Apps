const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  PageNumber, LevelFormat, PageBreak, Header, Footer, TabStopType,
  TabStopPosition, ExternalHyperlink
} = require('docx');
const fs = require('fs');

const NAVY   = "0F1923";
const GOLD   = "D4A000";
const MINT   = "1A9E7A";
const RED    = "C0392B";
const VIOLET = "5B4FD6";
const GRAY_H = "2C3E50";
const LIGHT  = "F0F4F8";
const MID    = "7F8C9A";
const WHITE  = "FFFFFF";
const BORDER_CLR = "CCCCCC";

const brd = (c = BORDER_CLR) => ({ style: BorderStyle.SINGLE, size: 1, color: c });
const borders = { top: brd(), bottom: brd(), left: brd(), right: brd() };
const noBorder = { top: brd("FFFFFF"), bottom: brd("FFFFFF"), left: brd("FFFFFF"), right: brd("FFFFFF") };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: NAVY })],
    spacing: { before: 360, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } }
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: GRAY_H })],
    spacing: { before: 300, after: 120 }
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial", color: VIOLET })],
    spacing: { before: 200, after: 100 }
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: "Arial", color: "2C3E50", ...opts })],
    spacing: { before: 60, after: 80 },
    alignment: AlignmentType.JUSTIFIED
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: [new TextRun({ text, size: 22, font: "Arial", color: "2C3E50" })],
    spacing: { before: 40, after: 40 }
  });
}

function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    children: [new TextRun({ text, size: 22, font: "Arial", color: "2C3E50" })],
    spacing: { before: 40, after: 40 }
  });
}

function spacer(lines = 1) {
  return new Paragraph({
    children: [new TextRun({ text: "", size: 22 })],
    spacing: { before: 0, after: lines * 120 }
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function labeledRow(label, value, labelColor = NAVY) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 2500, type: WidthType.DXA }, cellMargins,
        shading: { fill: "EEF2F7", type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial", color: labelColor })] })]
      }),
      new TableCell({
        borders, width: { size: 6860, type: WidthType.DXA }, cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, font: "Arial", color: "2C3E50" })] })]
      })
    ]
  });
}

function sectionTable(rows, colWidths = [2500, 6860]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows
  });
}

function headerRow(cells, widths) {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      cellMargins,
      shading: { fill: NAVY, type: ShadingType.CLEAR },
      children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, font: "Arial", color: WHITE })] })]
    }))
  });
}

function dataRow(cells, widths, shade = "FFFFFF") {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      cellMargins,
      shading: { fill: shade, type: ShadingType.CLEAR },
      children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: "Arial", color: "2C3E50" })] })]
    }))
  });
}

function titlePage() {
  return [
    spacer(4),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "KasBon", bold: true, size: 72, font: "Arial", color: NAVY })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "catat bareng, hemat bareng", size: 28, font: "Arial", color: MID, italics: true })]
    }),
    spacer(1),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 4 } },
      children: [new TextRun({ text: " ", size: 22 })]
    }),
    spacer(1),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Product Requirements Document (PRD)", bold: true, size: 36, font: "Arial", color: GRAY_H })]
    }),
    spacer(1),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Aplikasi Manajemen Keuangan Keluarga", size: 26, font: "Arial", color: MID })]
    }),
    spacer(2),
    sectionTable([
      labeledRow("Versi dokumen", "1.0.0"),
      labeledRow("Tanggal", "Juni 2025"),
      labeledRow("Status", "Draft — In Review"),
      labeledRow("Author", "Bayu"),
      labeledRow("Platform", "Mobile (React Native + Expo) + Web Admin (Next.js)"),
      labeledRow("Backend", "Laravel 11 + PostgreSQL + Redis"),
    ]),
    pageBreak()
  ];
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }, {
          level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: "2C3E50" } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: GRAY_H },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: VIOLET },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1260, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "KasBon — PRD v1.0", size: 18, font: "Arial", color: MID }),
              new TextRun({ text: "\t", size: 18 }),
              new TextRun({ text: "Halaman ", size: 18, font: "Arial", color: MID }),
              new PageNumber(),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } }
          })
        ]
      })
    },
    children: [
      // ── COVER PAGE ──
      ...titlePage(),

      // ── 1. RINGKASAN EKSEKUTIF ──
      h1("1. Ringkasan Eksekutif"),
      p("KasBon adalah aplikasi manajemen keuangan keluarga yang memungkinkan semua anggota keluarga mencatat, memantau, dan merencanakan keuangan secara terpusat. Aplikasi dirancang untuk penggunaan personal keluarga inti dengan data yang dapat dibagikan secara selektif antar anggota."),
      spacer(),
      p("Filosofi utama aplikasi ini adalah: setiap anggota keluarga mencatat keuangan mereka masing-masing, namun semua data bermuara ke satu dompet global keluarga yang dapat dipantau bersama. Dengan fitur QR transfer, pencatatan antar dompet menjadi semudah scan kode."),
      spacer(),

      h2("1.1 Tujuan Produk"),
      bullet("Menyediakan platform pencatatan keuangan keluarga yang terpusat namun tetap menghargai privasi per anggota"),
      bullet("Memudahkan tracking pemasukan dan pengeluaran lintas dompet dan anggota keluarga"),
      bullet("Menyediakan fitur tabungan dengan target, manajemen hutang, dan budget bulanan"),
      bullet("Mendukung pencatatan keuangan bisnis/usaha keluarga dengan cashflow tersendiri"),
      bullet("Memberikan insight dan statistik keuangan yang actionable"),
      spacer(),

      h2("1.2 Target Pengguna"),
      sectionTable([
        headerRow(["Segmen", "Deskripsi", "Peran"], [1800, 4500, 3060]),
        dataRow(["Pengguna utama", "Kepala keluarga atau yang bertanggung jawab keuangan", "Admin + Member"], [1800, 4500, 3060], "F8F9FA"),
        dataRow(["Anggota keluarga", "Pasangan, anggota keluarga lain yang diundang", "Member"], [1800, 4500, 3060]),
        dataRow(["Pengguna tambahan", "Anggota keluarga inti lainnya (opsional)", "Member"], [1800, 4500, 3060], "F8F9FA"),
      ]),
      spacer(),

      pageBreak(),

      // ── 2. LINGKUP PRODUK ──
      h1("2. Lingkup Produk"),

      h2("2.1 Komponen Aplikasi"),
      sectionTable([
        headerRow(["Komponen", "Platform", "Deskripsi"], [2200, 1800, 5360]),
        dataRow(["Mobile App", "iOS + Android", "Aplikasi utama untuk pencatatan transaksi harian, kelola dompet, QR transfer, dan statistik"], [2200, 1800, 5360], "F8F9FA"),
        dataRow(["Web Admin", "Browser (desktop)", "Dashboard pemantau global: statistik, kelola user, laporan, export data"], [2200, 1800, 5360]),
      ]),
      spacer(),

      h2("2.2 Batasan Produk (Out of Scope — v1.0)"),
      bullet("Integrasi langsung dengan rekening bank / API perbankan"),
      bullet("Fitur multi-bahasa (hanya Bahasa Indonesia di v1.0)"),
      bullet("Fitur berbagi akses ke luar keluarga (misalnya akuntan eksternal)"),
      bullet("Fitur POS (Point of Sale) untuk bisnis"),
      bullet("Sync otomatis mutasi rekening bank"),
      spacer(),

      pageBreak(),

      // ── 3. FITUR DAN MODUL ──
      h1("3. Fitur dan Modul"),

      h2("3.1 Modul Autentikasi"),
      sectionTable([
        headerRow(["Screen", "Deskripsi Fitur"], [2800, 6560]),
        dataRow(["Splash screen", "Tampil logo animasi, cek token login otomatis, redirect ke Home atau Login"], [2800, 6560], "F8F9FA"),
        dataRow(["Onboarding (3 slide)", "Perkenalan fitur utama saat pertama kali install: dompet, catat, statistik"], [2800, 6560]),
        dataRow(["Login", "Email + password, opsi lupa password, link ke halaman register"], [2800, 6560], "F8F9FA"),
        dataRow(["Register", "Nama lengkap, email, password, foto profil opsional, kode undangan keluarga"], [2800, 6560]),
        dataRow(["Lupa password", "Form kirim email reset, halaman set password baru via token"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      h2("3.2 Modul Home Dashboard"),
      p("Halaman utama aplikasi yang memberikan snapshot keuangan keluarga secara real-time."),
      spacer(),
      sectionTable([
        headerRow(["Komponen", "Detail Fungsional"], [2800, 6560]),
        dataRow(["Hero card saldo", "Saldo total dompet global keluarga, pemasukan bulan ini, pengeluaran bulan ini, persentase vs bulan lalu"], [2800, 6560], "F8F9FA"),
        dataRow(["Progress bar budget", "Visual penggunaan budget bulanan yang telah diset, persentase terpakai, warna kuning-merah jika mendekati limit"], [2800, 6560]),
        dataRow(["Dompet carousel", "Scroll horizontal daftar dompet milik user beserta saldo dan badge Global/Private"], [2800, 6560], "F8F9FA"),
        dataRow(["Aksi cepat", "4 shortcut: Catat Keluar, Catat Masuk, Transfer QR, Statistik"], [2800, 6560]),
        dataRow(["Insight otomatis", "Satu insight AI sederhana berdasarkan pola bulan berjalan (misal: pengeluaran makan turun X%)"], [2800, 6560], "F8F9FA"),
        dataRow(["Feed aktivitas terbaru", "5 transaksi terakhir semua anggota, tampil nama user + dompet + nominal"], [2800, 6560]),
        dataRow(["Aktivitas anggota", "Ringkasan per anggota: jumlah transaksi bulan ini, transaksi terakhir"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      h2("3.3 Modul Dompet"),
      p("Sistem dompet multi-tipe dengan visibilitas yang dapat dikonfigurasi per dompet."),
      spacer(),

      h3("3.3.1 Tipe Dompet"),
      sectionTable([
        headerRow(["Tipe", "Deskripsi", "Contoh"], [2000, 4000, 3360]),
        dataRow(["Kas / Tunai", "Uang fisik / cash di tangan", "Kas rumah, uang jajan"], [2000, 4000, 3360], "F8F9FA"),
        dataRow(["Rekening Bank", "Rekening tabungan bank manapun", "BCA, BRI, Mandiri"], [2000, 4000, 3360]),
        dataRow(["E-wallet", "Dompet digital", "GoPay, OVO, Dana, ShopeePay"], [2000, 4000, 3360], "F8F9FA"),
        dataRow(["Tabungan", "Dompet dengan target nominal + deadline", "Dana darurat, beli mobil"], [2000, 4000, 3360]),
        dataRow(["Hutang/Piutang", "Pencatatan hutang dengan jadwal cicilan", "Cicilan motor, pinjaman keluarga"], [2000, 4000, 3360], "F8F9FA"),
      ]),
      spacer(),

      h3("3.3.2 Level Visibilitas Dompet"),
      sectionTable([
        headerRow(["Level", "Hak Akses", "Penggunaan"], [2200, 4000, 3160]),
        dataRow(["Global — catat", "Semua anggota bisa lihat dan mencatat transaksi", "Kas keluarga, dana darurat bersama"], [2200, 4000, 3160], "F8F9FA"),
        dataRow(["Global — lihat saja", "Semua anggota bisa lihat saldo, tapi tidak bisa mencatat", "Investasi yang dipantau bersama"], [2200, 4000, 3160]),
        dataRow(["Private", "Hanya pemilik dompet yang bisa akses", "Rekening pribadi, tabungan rahasia"], [2200, 4000, 3160], "F8F9FA"),
      ]),
      spacer(),

      h3("3.3.3 Screen Dompet"),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["List dompet", "Semua dompet dikelompokkan: Global | Personal | Tabungan | Hutang. Tampil saldo per dompet"], [2800, 6560], "F8F9FA"),
        dataRow(["Detail dompet", "Saldo saat ini, riwayat transaksi dengan filter tanggal/tipe, info siapa saja yang bisa akses"], [2800, 6560]),
        dataRow(["Buat dompet baru", "Form: nama, ikon, warna, tipe, level visibilitas, saldo awal"], [2800, 6560], "F8F9FA"),
        dataRow(["Dompet tabungan", "Progress bar target, estimasi tanggal tercapai berdasarkan setoran rata-rata, riwayat setor"], [2800, 6560]),
        dataRow(["Dompet hutang", "Total hutang, cicilan per periode, sisa hutang, tanggal jatuh tempo, status (aktif/lunas)"], [2800, 6560], "F8F9FA"),
        dataRow(["QR dompet", "Tampilkan QR unik per dompet untuk menerima transfer. Info singkat nama + saldo"], [2800, 6560]),
        dataRow(["Scan QR transfer", "Kamera scan QR dompet tujuan, lanjut otomatis ke form transfer dengan dompet tujuan terisi"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      pageBreak(),

      h2("3.4 Modul Catat Transaksi"),
      sectionTable([
        headerRow(["Screen", "Field & Fungsional"], [2800, 6560]),
        dataRow(["Pilih tipe (bottom sheet)", "3 pilihan: Pemasukan / Pengeluaran / Transfer. Muncul sebagai modal dari bawah layar"], [2800, 6560], "F8F9FA"),
        dataRow(["Form pemasukan", "Nominal (wajib), dompet tujuan, kategori, tanggal, catatan, foto struk (opsional)"], [2800, 6560]),
        dataRow(["Form pengeluaran", "Nominal (wajib), dari dompet mana, kategori, tanggal, catatan, foto struk (opsional)"], [2800, 6560], "F8F9FA"),
        dataRow(["Form transfer", "Dari dompet, ke dompet, nominal, catatan. Mendukung pilihan manual atau via QR scan"], [2800, 6560]),
        dataRow(["Konfirmasi transaksi", "Review semua data sebelum simpan, animasi sukses setelah tersimpan"], [2800, 6560], "F8F9FA"),
        dataRow(["Detail transaksi", "Lihat detail lengkap transaksi tersimpan, opsi edit, opsi hapus, foto struk fullscreen"], [2800, 6560]),
        dataRow(["Transaksi berulang", "Set jadwal otomatis: harian / mingguan / bulanan. Opsi: reminder saja atau catat otomatis"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      h2("3.5 Modul Budget & Rencana Keuangan"),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["Budget bulanan", "Set batas pengeluaran per kategori. Progress bar real-time, alert otomatis jika 80% budget terpakai"], [2800, 6560], "F8F9FA"),
        dataRow(["Rencana tabungan", "Buat target: nama, nominal target, deadline. Auto-hitung setoran rutin yang dibutuhkan per bulan"], [2800, 6560]),
        dataRow(["Manajemen hutang", "List semua hutang/piutang, total, jadwal bayar, notifikasi jatuh tempo H-3 dan H-1"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      h2("3.6 Modul Project & Usaha"),
      p("Modul ini memungkinkan pencatatan keuangan terpisah untuk setiap pekerjaan, project freelance, atau usaha keluarga. Setiap project/usaha memiliki halaman keuangannya sendiri."),
      spacer(),

      h3("3.6.1 Tipe Project"),
      sectionTable([
        headerRow(["Tipe", "Deskripsi"], [2800, 6560]),
        dataRow(["Pekerjaan / freelance", "Project jasa dengan waktu selesai, nominal kontrak, pencatatan biaya operasional"], [2800, 6560], "F8F9FA"),
        dataRow(["Usaha / bisnis", "Usaha yang berjalan terus: omset, HPP, laba kotor, catatan operasional rutin"], [2800, 6560]),
        dataRow(["Project investasi", "Modal awal, return yang didapat, progress target ROI"], [2800, 6560], "F8F9FA"),
      ]),
      spacer(),

      h3("3.6.2 Screen Modul Project"),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["List project", "Semua project aktif dengan saldo masing-masing, status (aktif/selesai/ditunda)"], [2800, 6560], "F8F9FA"),
        dataRow(["Dashboard project", "Saldo project, total pemasukan, total pengeluaran, laba/rugi bersih, progress budget"], [2800, 6560]),
        dataRow(["Cashflow project", "Semua transaksi project dengan filter tanggal, export ringkasan PDF/CSV"], [2800, 6560], "F8F9FA"),
        dataRow(["Sumber pemasukan", "Tambah sumber (gaji, freelance, usaha). Catat per sumber, total per periode"], [2800, 6560]),
        dataRow(["Detail bisnis/usaha", "Halaman khusus usaha: omset, modal/HPP, laba kotor, catatan operasional"], [2800, 6560], "F8F9FA"),
        dataRow(["Buat project baru", "Nama, tipe project, deskripsi, budget awal, ikon, warna identitas project"], [2800, 6560]),
      ]),
      spacer(),

      pageBreak(),

      h2("3.7 Modul Statistik & Laporan"),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["Statistik bulanan", "Grafik pemasukan vs pengeluaran, breakdown per kategori, tren 6 bulan terakhir"], [2800, 6560], "F8F9FA"),
        dataRow(["Statistik per dompet", "Cashflow per dompet, perbandingan antar dompet"], [2800, 6560]),
        dataRow(["Statistik per anggota", "Kontribusi pemasukan dan pengeluaran per user dalam keluarga"], [2800, 6560], "F8F9FA"),
        dataRow(["Laporan keuangan", "Export ringkasan PDF atau CSV per periode, per dompet, per kategori"], [2800, 6560]),
      ]),
      spacer(),

      h2("3.8 Modul Profil & Pengaturan"),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["Profil saya", "Foto, nama, email, statistik kontribusi bulan ini, tombol ke QR profil"], [2800, 6560], "F8F9FA"),
        dataRow(["QR profil", "QR unik per user untuk diidentifikasi saat transfer antar user. Bisa di-share"], [2800, 6560]),
        dataRow(["Kelola anggota", "List semua user, undang via link/kode, atur peran (Admin/Member), hapus akses"], [2800, 6560], "F8F9FA"),
        dataRow(["Pengaturan akun", "Ganti password, preferensi notifikasi, format mata uang (default: IDR), tema"], [2800, 6560]),
        dataRow(["Pengaturan kategori", "Tambah/edit/hapus kategori transaksi kustom. Ikon dan warna per kategori"], [2800, 6560], "F8F9FA"),
        dataRow(["Tentang & bantuan", "Versi aplikasi, FAQ, panduan singkat fitur, kontak support"], [2800, 6560]),
      ]),
      spacer(),

      h2("3.9 Modul Web Admin (Next.js)"),
      p("Dashboard berbasis web untuk pemantauan global dan pengaturan tingkat sistem. Diakses via browser desktop oleh admin keluarga."),
      spacer(),
      sectionTable([
        headerRow(["Screen", "Deskripsi"], [2800, 6560]),
        dataRow(["Login admin", "Kredensial sama dengan akun mobile, tapi role harus Admin"], [2800, 6560], "F8F9FA"),
        dataRow(["Dashboard global", "Total saldo semua dompet, grafik tren bulanan, ringkasan aktivitas semua anggota"], [2800, 6560]),
        dataRow(["Manajemen user", "List user, tambah/hapus/suspend, atur peran, lihat aktivitas per user"], [2800, 6560], "F8F9FA"),
        dataRow(["Manajemen dompet", "Semua dompet (termasuk private), atur visibilitas, set limit, lihat histori lengkap"], [2800, 6560]),
        dataRow(["Laporan keuangan", "Laporan per periode / user / dompet / kategori. Export PDF dan CSV"], [2800, 6560], "F8F9FA"),
        dataRow(["Pengaturan sistem", "Kategori global, budget default, notifikasi sistem, manajemen backup data"], [2800, 6560]),
      ]),
      spacer(),

      pageBreak(),

      // ── 4. ARSITEKTUR TEKNIS ──
      h1("4. Arsitektur Teknis"),

      h2("4.1 Tech Stack"),
      sectionTable([
        headerRow(["Layer", "Teknologi", "Keterangan"], [2000, 3000, 4360]),
        dataRow(["Mobile frontend", "React Native + Expo", "iOS & Android dari satu codebase. Expo Go untuk development"], [2000, 3000, 4360], "F8F9FA"),
        dataRow(["Web frontend", "Next.js 14 (App Router)", "Web admin dashboard, server-side rendering"], [2000, 3000, 4360]),
        dataRow(["Backend", "Laravel 11", "REST API, business logic, autentikasi"], [2000, 3000, 4360], "F8F9FA"),
        dataRow(["Database", "PostgreSQL", "Database utama, relasional, mendukung JSON column"], [2000, 3000, 4360]),
        dataRow(["Cache / Queue", "Redis", "Cache session, antrian notifikasi, rate limiting"], [2000, 3000, 4360], "F8F9FA"),
        dataRow(["Autentikasi", "Laravel Sanctum", "Token-based auth untuk mobile dan web"], [2000, 3000, 4360]),
        dataRow(["Realtime", "Pusher / Laravel Echo", "Sync transaksi real-time antar device anggota keluarga"], [2000, 3000, 4360], "F8F9FA"),
        dataRow(["QR Code", "react-native-qrcode-svg", "Generate & scan QR di mobile"], [2000, 3000, 4360]),
        dataRow(["Notifikasi push", "Expo Notifications", "Push notification untuk alert dan reminder"], [2000, 3000, 4360], "F8F9FA"),
        dataRow(["Storage", "Laravel Storage / S3", "Penyimpanan foto struk transaksi"], [2000, 3000, 4360]),
      ]),
      spacer(),

      h2("4.2 Struktur Data Utama"),
      h3("4.2.1 Entitas Inti"),
      sectionTable([
        headerRow(["Entitas", "Field Utama", "Relasi"], [2200, 4000, 3160]),
        dataRow(["users", "id, name, email, password, avatar, role, created_at", "hasMany wallets, transactions"], [2200, 4000, 3160], "F8F9FA"),
        dataRow(["wallets", "id, user_id, name, type, visibility, balance, color, icon, is_active", "belongsTo user, hasMany transactions"], [2200, 4000, 3160]),
        dataRow(["transactions", "id, wallet_id, user_id, type, amount, category_id, note, date, receipt_url, is_recurring", "belongsTo wallet, user, category"], [2200, 4000, 3160], "F8F9FA"),
        dataRow(["categories", "id, name, icon, color, type (income/expense), is_custom", "hasMany transactions"], [2200, 4000, 3160]),
        dataRow(["projects", "id, user_id, name, type, description, budget, balance, status, icon, color", "hasMany project_transactions"], [2200, 4000, 3160], "F8F9FA"),
        dataRow(["savings_goals", "id, wallet_id, target_amount, current_amount, deadline, name", "belongsTo wallet"], [2200, 4000, 3160]),
        dataRow(["budgets", "id, user_id, category_id, month, year, limit_amount, spent_amount", "belongsTo category"], [2200, 4000, 3160], "F8F9FA"),
        dataRow(["family_members", "id, inviter_id, invitee_id, role, status, joined_at", "pivot users"], [2200, 4000, 3160]),
      ]),
      spacer(),

      h2("4.3 Sistem QR Transfer"),
      p("Setiap dompet dan setiap user memiliki QR code unik. QR berisi payload JSON terenkripsi yang memuat informasi wallet_id atau user_id beserta timestamp untuk mencegah replay attack."),
      spacer(),
      bullet("QR Dompet: digunakan untuk menerima transfer ke dompet spesifik"),
      bullet("QR Profil User: digunakan untuk identifikasi siapa yang melakukan transfer"),
      bullet("Payload QR dienkripsi dengan HMAC-SHA256 menggunakan app secret key"),
      bullet("QR memiliki masa berlaku 10 menit untuk transfer (dapat di-refresh)"),
      spacer(),

      pageBreak(),

      // ── 5. DESAIN UI/UX ──
      h1("5. Desain UI/UX"),

      h2("5.1 Design Language"),
      sectionTable([
        headerRow(["Aspek", "Keputusan Desain"], [2800, 6560]),
        dataRow(["Tema utama", "Dark mode sebagai default. Background deep navy #0F1923"], [2800, 6560], "F8F9FA"),
        dataRow(["Style", "Glassmorphism: card semi-transparan dengan border subtle di atas layer gelap"], [2800, 6560]),
        dataRow(["Warna aksen utama", "#F5C842 Sunny Gold — untuk elemen aktif, CTA utama, bottom nav active"], [2800, 6560], "F8F9FA"),
        dataRow(["Warna pemasukan", "#2DD4A4 Mint Fresh — konsisten di semua tampilan angka positif"], [2800, 6560]),
        dataRow(["Warna pengeluaran", "#FF6B6B Coral Red — konsisten di semua tampilan angka negatif"], [2800, 6560], "F8F9FA"),
        dataRow(["Warna project/tabungan", "#7C6FF7 Electric Violet — untuk semua elemen terkait project & tabungan"], [2800, 6560]),
        dataRow(["Typography", "System font (SF Pro di iOS, Roboto di Android). Heading 500, body 400"], [2800, 6560], "F8F9FA"),
        dataRow(["Bahasa", "Indonesia. Format angka: Rp 1.500.000 (titik sebagai pemisah ribuan)"], [2800, 6560]),
      ]),
      spacer(),

      h2("5.2 Navigasi Mobile"),
      p("Navigasi utama menggunakan Bottom Navigation Bar dengan 5 tab dan FAB (Floating Action Button) di tengah:"),
      spacer(),
      sectionTable([
        headerRow(["Tab", "Ikon", "Halaman Utama"], [1500, 1500, 6360]),
        dataRow(["Home", "ti-home-2", "Dashboard saldo keluarga, feed aktivitas, insight"], [1500, 1500, 6360], "F8F9FA"),
        dataRow(["Dompet", "ti-wallet", "List semua dompet, kelola, QR"], [1500, 1500, 6360]),
        dataRow(["+ (FAB Gold)", "ti-plus", "Bottom sheet pilih tipe transaksi — aksi paling sering dipakai"], [1500, 1500, 6360], "F8F9FA"),
        dataRow(["Project", "ti-briefcase", "List project & usaha keluarga"], [1500, 1500, 6360]),
        dataRow(["Profil", "ti-user", "Profil user, QR personal, pengaturan"], [1500, 1500, 6360], "F8F9FA"),
      ]),
      spacer(),

      pageBreak(),

      // ── 6. KEAMANAN ──
      h1("6. Keamanan & Privasi"),

      h2("6.1 Autentikasi & Otorisasi"),
      bullet("Autentikasi menggunakan Laravel Sanctum dengan token berbasis hash"),
      bullet("Setiap API request wajib menyertakan Bearer Token di header"),
      bullet("Role-based access control: Admin dapat mengakses semua data, Member dibatasi berdasarkan visibilitas dompet"),
      bullet("Sesi mobile expired setelah 30 hari tidak aktif"),
      bullet("Web admin expired setelah 8 jam"),
      spacer(),

      h2("6.2 Keamanan Data"),
      bullet("Password di-hash menggunakan bcrypt dengan cost factor 12"),
      bullet("Data transaksi terenkripsi at-rest di PostgreSQL"),
      bullet("Komunikasi API menggunakan HTTPS/TLS 1.3"),
      bullet("QR transfer menggunakan HMAC-SHA256 dengan expiry timestamp"),
      bullet("Foto struk tidak dapat diakses tanpa autentikasi (private S3 bucket)"),
      bullet("Rate limiting: 60 request/menit per IP untuk endpoint publik"),
      spacer(),

      h2("6.3 Privasi Antar Anggota"),
      bullet("Dompet dengan visibilitas Private TIDAK terlihat oleh anggota keluarga lain, termasuk di total saldo global"),
      bullet("Admin hanya dapat melihat daftar dompet private (bukan isinya) melalui Web Admin"),
      bullet("Setiap aksi sensitif (hapus transaksi, hapus dompet) memerlukan konfirmasi password"),
      spacer(),

      pageBreak(),

      // ── 7. FASE PENGEMBANGAN ──
      h1("7. Rencana Pengembangan"),

      h2("7.1 Fase 1 — Foundation Mobile (Perkiraan: 3–4 minggu)"),
      bullet("Setup project React Native + Expo"),
      bullet("Setup Laravel 11 + PostgreSQL + Sanctum"),
      bullet("Implementasi modul Autentikasi (login, register, lupa password)"),
      bullet("Implementasi Home Dashboard"),
      bullet("Implementasi form Catat Transaksi (masuk, keluar, transfer manual)"),
      bullet("Implementasi Dompet dasar (list, detail, buat baru)"),
      spacer(),

      h2("7.2 Fase 2 — Dompet Lanjutan & QR (Perkiraan: 2–3 minggu)"),
      bullet("Implementasi QR generate dan scan untuk transfer"),
      bullet("Implementasi dompet Tabungan dengan target & progress"),
      bullet("Implementasi dompet Hutang/Piutang"),
      bullet("Sistem visibilitas dompet (Global/Private)"),
      bullet("Realtime sync antar device (Pusher)"),
      spacer(),

      h2("7.3 Fase 3 — Budget, Statistik & Project (Perkiraan: 3–4 minggu)"),
      bullet("Implementasi modul Budget bulanan per kategori"),
      bullet("Implementasi Rencana Tabungan (target + auto-hitung)"),
      bullet("Implementasi Statistik & grafik"),
      bullet("Implementasi modul Project & Usaha"),
      bullet("Transaksi berulang (recurring)"),
      bullet("Notifikasi push (alert budget, jatuh tempo hutang)"),
      spacer(),

      h2("7.4 Fase 4 — Web Admin & Polish (Perkiraan: 2–3 minggu)"),
      bullet("Implementasi Next.js Web Admin dashboard"),
      bullet("Laporan dan export PDF/CSV"),
      bullet("Manajemen user dan undang anggota"),
      bullet("Onboarding flow"),
      bullet("Testing end-to-end, bug fixing, optimasi performa"),
      bullet("Persiapan deployment (App Store / Play Store / server)"),
      spacer(),

      pageBreak(),

      // ── 8. KATEGORI TRANSAKSI DEFAULT ──
      h1("8. Kategori Transaksi Bawaan"),

      h2("8.1 Kategori Pengeluaran"),
      sectionTable([
        headerRow(["Kategori", "Sub-kategori Contoh"], [3000, 6360]),
        dataRow(["Makanan & minuman", "Groceries, restoran, warung, kopi"], [3000, 6360], "F8F9FA"),
        dataRow(["Transportasi", "BBM, parkir, toll, ojek online, angkutan umum"], [3000, 6360]),
        dataRow(["Tagihan & utilitas", "Listrik, air, internet, telepon, TV kabel"], [3000, 6360], "F8F9FA"),
        dataRow(["Belanja", "Pakaian, elektronik, peralatan rumah"], [3000, 6360]),
        dataRow(["Kesehatan", "Obat, dokter, rumah sakit, vitamin"], [3000, 6360], "F8F9FA"),
        dataRow(["Pendidikan", "SPP, buku, kursus, pelatihan"], [3000, 6360]),
        dataRow(["Hiburan", "Streaming, bioskop, rekreasi, game"], [3000, 6360], "F8F9FA"),
        dataRow(["Cicilan & hutang", "Cicilan KPR, cicilan kendaraan, pinjaman"], [3000, 6360]),
        dataRow(["Lainnya", "Pengeluaran yang tidak masuk kategori di atas"], [3000, 6360], "F8F9FA"),
      ]),
      spacer(),

      h2("8.2 Kategori Pemasukan"),
      sectionTable([
        headerRow(["Kategori", "Keterangan"], [3000, 6360]),
        dataRow(["Gaji / upah", "Pendapatan rutin dari pekerjaan tetap"], [3000, 6360], "F8F9FA"),
        dataRow(["Freelance / jasa", "Pendapatan dari project atau pekerjaan lepas"], [3000, 6360]),
        dataRow(["Bisnis / usaha", "Omset atau laba dari usaha yang dijalankan"], [3000, 6360], "F8F9FA"),
        dataRow(["Investasi", "Dividen, return investasi, bunga tabungan"], [3000, 6360]),
        dataRow(["Hadiah / pemberian", "Uang hadiah, THR, transfer dari keluarga"], [3000, 6360], "F8F9FA"),
        dataRow(["Lainnya", "Pemasukan di luar kategori di atas"], [3000, 6360]),
      ]),
      spacer(),

      pageBreak(),

      // ── 9. NOTIFIKASI ──
      h1("9. Sistem Notifikasi"),
      sectionTable([
        headerRow(["Trigger", "Pesan Notifikasi", "Kanal"], [2500, 4500, 2360]),
        dataRow(["Budget 80% terpakai", "Budget [kategori] hampir habis! Sudah [X]% dari Rp [limit]", "Push + in-app"], [2500, 4500, 2360], "F8F9FA"),
        dataRow(["Budget habis (100%)", "Budget [kategori] bulan ini sudah habis.", "Push + in-app"], [2500, 4500, 2360]),
        dataRow(["Jatuh tempo hutang H-3", "Ingat! Cicilan [nama hutang] jatuh tempo 3 hari lagi (Rp [nominal])", "Push"], [2500, 4500, 2360], "F8F9FA"),
        dataRow(["Jatuh tempo hutang H-0", "Hari ini adalah jatuh tempo cicilan [nama hutang]!", "Push"], [2500, 4500, 2360]),
        dataRow(["Transfer diterima", "[Nama user] mentransfer Rp [nominal] ke dompet [nama dompet]", "Push + in-app"], [2500, 4500, 2360], "F8F9FA"),
        dataRow(["Target tabungan tercapai", "Selamat! Target tabungan [nama] sebesar Rp [nominal] sudah tercapai!", "Push + in-app"], [2500, 4500, 2360]),
        dataRow(["Transaksi berulang", "Pengingat: transaksi rutin [nama] akan dicatat hari ini", "Push"], [2500, 4500, 2360], "F8F9FA"),
        dataRow(["Undangan anggota", "[Nama] mengundangmu bergabung ke keluarga [nama]", "Email + Push"], [2500, 4500, 2360]),
      ]),
      spacer(),

      pageBreak(),

      // ── 10. GLOSSARY ──
      h1("10. Glosarium"),
      sectionTable([
        headerRow(["Istilah", "Definisi"], [2800, 6560]),
        dataRow(["Dompet Global", "Dompet yang dapat diakses dan/atau diisi transaksi oleh semua anggota keluarga"], [2800, 6560], "F8F9FA"),
        dataRow(["Dompet Private", "Dompet yang hanya bisa diakses oleh pemiliknya"], [2800, 6560]),
        dataRow(["QR Transfer", "Mekanisme transfer antar dompet menggunakan scan QR code. Otomatis mengisi form transfer"], [2800, 6560], "F8F9FA"),
        dataRow(["Project Wallet", "Dompet yang terikat pada satu project atau usaha, memiliki cashflow tersendiri"], [2800, 6560]),
        dataRow(["Transaksi berulang", "Transaksi yang dijadwalkan otomatis secara periodik (harian/mingguan/bulanan)"], [2800, 6560], "F8F9FA"),
        dataRow(["Insight", "Analisis otomatis berdasarkan pola transaksi untuk membantu keputusan keuangan"], [2800, 6560]),
        dataRow(["Admin", "Peran pengguna dengan akses penuh termasuk kelola anggota dan akses Web Admin"], [2800, 6560], "F8F9FA"),
        dataRow(["Member", "Peran pengguna standar dengan akses terbatas sesuai visibilitas dompet"], [2800, 6560]),
      ]),
      spacer(2),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } },
        children: [new TextRun({ text: "KasBon PRD v1.0  —  Dokumen ini bersifat internal dan dapat berubah seiring perkembangan produk.", size: 18, font: "Arial", color: MID, italics: true })],
        spacing: { before: 240, after: 0 }
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/mnt/user-data/outputs/KasBon_PRD_v1.0.docx', buf);
  console.log('OK');
}).catch(e => { console.error(e); process.exit(1); });
