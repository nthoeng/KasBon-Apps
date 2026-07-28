/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Untuk Fase Laravel + MySQL Nanti)
 * ============================================================================
 * * 1. METHOD & ENDPOINT KUNCI:
 * - GET /api/savings-plans
 * Mengambil semua rencana tabungan aktif + data agregasi untuk ringkasan atas.
 * - POST /api/savings-plans/{id}/deposit
 * Dipanggil saat klik "Setor sekarang" -> Menambahkan riwayat setoran.
 * * 2. POTENSI TABEL DATABASE (MySQL):
 * - `savings_plans`
 * (id, user_id, name, target_amount, current_amount, start_date, target_date, monthly_contribution, priority, status)
 * - `savings_history`
 * (id, savings_plan_id, amount, deposit_date, notes)
 * * 3. LOGIKA BACKEND (Laravel Controller):
 * - Total Ditabung = SUM(current_amount) dari user yang login.
 * - Persentase Capaian = (Total Ditabung / Total Target) * 100.
 * - Validasi Status "Perlu Akselerasi": Jika sisa bulan menuju `target_date` 
 * dikalikan `monthly_contribution` hasilnya kurang dari sisa target dana, 
 * maka Laravel otomatis mengubah/mengirim status `needs_acceleration = true`.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons'; // ← TAMBAHAN: Import Ionicons untuk tombol back
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Simulasi UI_COLORS bawaan proyek KasBon (Tema Dark/Glassmorphism)
const UI_COLORS = {
  bg: '#0A1628',
  bg2: '#0F1E35',
  card: '#152238',
  card2: '#1A2A42',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  text: '#F0F4FF',
  t2: '#8FA8CC',
  t3: '#3E5878',
};

// Fungsi helper transparansi warna untuk efek glassmorphism
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface SavingsPlanScreenProps {
  navigation: any;
}

export function SavingsPlanScreen({ navigation }: SavingsPlanScreenProps) {
  return (
    // Edges hanya 'top' agar area bawah fleksibel terhadap bottom nav global
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      {/* ── HEADER BAR (DIUBAH DENGAN TOMBOL BACK) ── */}
      <View style={styles.topbar}>
        <View style={styles.headerLeft}>
          {/* 👇 TAMBAHAN: Tombol Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color={UI_COLORS.text} />
          </TouchableOpacity>
          
          <View>
            <Text style={styles.headerTitle}>Rencana tabungan</Text>
            <Text style={styles.headerSubtitle}>3 target aktif</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={{ color: UI_COLORS.t2, fontSize: 14 }}>🕒</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconBtn} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CreateSavingsPlanScreen')}
          >
            <Text style={{ color: UI_COLORS.gold, fontSize: 14 }}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.smTop}>
            <View>
              <Text style={styles.smLbl}>Total ditabung</Text>
              <Text style={styles.smVal}>Rp 7.800.000</Text>
              <Text style={styles.smSub}>dari 3 target aktif</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.smLbl}>Total target</Text>
              <Text style={[styles.smVal, { fontSize: 18 }]}>Rp 105.000.000</Text>
              <Text style={[styles.smSub, { color: UI_COLORS.violet }]}>7,4% tercapai</Text>
            </View>
          </View>
          
          <View style={styles.miniGrid}>
            <View style={styles.mg}>
              <Text style={styles.mgLbl}>Setor bulan ini</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.mint }]}>Rp 1,2jt</Text>
            </View>
            <View style={styles.mg}>
              <Text style={styles.mgLbl}>Target tercepat</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.gold }]}>Agt 2025</Text>
            </View>
            <View style={styles.mg}>
              <Text style={styles.mgLbl}>Konsistensi</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.violet }]}>6 bulan</Text>
            </View>
          </View>
        </View>

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Text style={{ color: UI_COLORS.mint, fontSize: 14 }}>💡</Text>
          </View>
          <Text style={styles.tipTxt}>
            Kalau setor Rp 500rb/bulan ekstra ke Dana darurat, target Rp 10jt tercapai{' '}
            <Text style={{ color: UI_COLORS.mint, fontWeight: 'bold' }}>4 bulan lebih cepat.</Text>
          </Text>
        </View>

        {/* SECTION HEADER */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Target aktif</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateSavingsPlanScreen')}>
            <Text style={styles.secLink}>+ Tambah target ↗</Text>
          </TouchableOpacity>
        </View>

        {/* TARGET CARD 1: DANA DARURAT */}
        <View style={styles.savCard}>
          <View style={[styles.scAccent, { backgroundColor: UI_COLORS.mint }]} />
          <View style={styles.scHeaderContainer}>
            <View style={styles.scTop}>
              <View style={[styles.scIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
                <Text style={{ color: UI_COLORS.mint, fontSize: 18 }}>🛡️</Text>
              </View>
              <View style={styles.scInfo}>
                <Text style={styles.scName}>Dana darurat keluarga</Text>
                <View style={styles.scMeta}>
                  <Text style={{ fontSize: 10, color: UI_COLORS.t3 }}>Prioritas utama</Text>
                  <View style={[styles.badge, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
                    <Text style={{ color: UI_COLORS.mint, fontSize: 9, fontWeight: '500' }}>Aktif</Text>
                  </View>
                </View>
              </View>
              <View style={styles.scRight}>
                <Text style={[styles.scCurrent, { color: UI_COLORS.mint }]}>Rp 2.500.000</Text>
                <Text style={styles.scTargetTxt}>dari Rp 10.000.000</Text>
              </View>
            </View>
            
            <View style={styles.progLbl}>
              <Text style={[styles.progLblText, { color: UI_COLORS.mint, fontWeight: '500' }]}>25% tercapai</Text>
              <Text style={[styles.progLblText, { color: UI_COLORS.t3 }]}>sisa Rp 7.500.000</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: '25%', backgroundColor: UI_COLORS.mint }]} />
            </View>
            <View style={styles.progSub}>
              <Text style={[styles.progSubText, { color: UI_COLORS.t3 }]}>Mulai Jan 2025</Text>
              <Text style={[styles.progSubText, { color: UI_COLORS.mint }]}>Target Rp 500rb/bln</Text>
            </View>
          </View>
          
          <View style={styles.scBody}>
            <View style={styles.scStats}>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Setor rutin</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.mint }]}>Rp 500rb</Text>
              </View>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Estimasi lunas</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.violet }]}>Mar 2027</Text>
              </View>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Sisa bulan</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.text }]}>15 bln</Text>
              </View>
            </View>
            
            <View style={styles.setorAlert}>
              <Text style={{ color: UI_COLORS.gold, fontSize: 14 }}>⏰</Text>
              <Text style={styles.saTxt}>Setor rutin bulan ini belum dilakukan — jadwal tgl 1 setiap bulan</Text>
            </View>
            
            <View style={styles.actionStrip}>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.mint, fontSize: 12, fontWeight: '500' }}>＋ Setor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.t2, fontSize: 12, fontWeight: '500' }}>📊 Riwayat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.t2, fontSize: 12, fontWeight: '500' }}>✏️ Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TARGET CARD 2: BELI MOBIL */}
        <View style={styles.savCard}>
          <View style={[styles.scAccent, { backgroundColor: UI_COLORS.violet }]} />
          <View style={styles.scHeaderContainer}>
            <View style={styles.scTop}>
              <View style={[styles.scIcon, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.12) }]}>
                <Text style={{ color: UI_COLORS.violet, fontSize: 18 }}>🚗</Text>
              </View>
              <View style={styles.scInfo}>
                <Text style={styles.scName}>Beli mobil keluarga</Text>
                <View style={styles.scMeta}>
                  <Text style={{ fontSize: 10, color: UI_COLORS.t3 }}>Deadline Des 2026</Text>
                  <View style={[styles.badge, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) }]}>
                    <Text style={{ color: UI_COLORS.gold, fontSize: 9, fontWeight: '500' }}>Perlu akselerasi</Text>
                  </View>
                </View>
              </View>
              <View style={styles.scRight}>
                <Text style={[styles.scCurrent, { color: UI_COLORS.violet }]}>Rp 4.800.000</Text>
                <Text style={styles.scTargetTxt}>dari Rp 80.000.000</Text>
              </View>
            </View>
            
            <View style={styles.progLbl}>
              <Text style={[styles.progLblText, { color: UI_COLORS.violet, fontWeight: '500' }]}>6% tercapai</Text>
              <Text style={[styles.progLblText, { color: UI_COLORS.t3 }]}>sisa Rp 75.200.000</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: '6%', backgroundColor: UI_COLORS.violet }]} />
            </View>
            <View style={styles.progSub}>
              <Text style={[styles.progSubText, { color: UI_COLORS.t3 }]}>Mulai Mar 2025</Text>
              <Text style={[styles.progSubText, { color: UI_COLORS.gold }]}>Butuh Rp 4,4jt/bln!</Text>
            </View>
          </View>
          
          <View style={styles.scBody}>
            <View style={styles.scStats}>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Setor saat ini</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.gold }]}>Rp 500rb/bln</Text>
              </View>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Perlu/bulan</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.red }]}>Rp 4,4jt</Text>
              </View>
              <View style={styles.scs}>
                <Text style={styles.scsLbl}>Gap</Text>
                <Text style={[styles.scsVal, { color: UI_COLORS.red }]}>-Rp 3,9jt</Text>
              </View>
            </View>
            
            <View style={[styles.setorAlert, { backgroundColor: hexToRgba(UI_COLORS.red, 0.07), borderColor: hexToRgba(UI_COLORS.red, 0.2) }]}>
              <Text style={{ color: UI_COLORS.red, fontSize: 14 }}>⚠️</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#FF9090', marginBottom: 2 }}>Tidak on track dengan setor saat ini</Text>
                <Text style={{ fontSize: 11, color: hexToRgba(UI_COLORS.red, 0.65), lineHeight: 15 }}>Dengan Rp 500rb/bln, target baru tercapai Agustus 2036 — 10 tahun telat dari deadline Des 2026.</Text>
              </View>
            </View>
            
            <View style={styles.actionStrip}>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.violet, fontSize: 12, fontWeight: '500' }}>＋ Setor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.t2, fontSize: 12, fontWeight: '500' }}>🧮 Simulasi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actBtn} activeOpacity={0.7}>
                <Text style={{ color: UI_COLORS.t2, fontSize: 12, fontWeight: '500' }}>📅 Deadline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* BUTTON TAMBAH DI BAWAH ACCORDION */}
        <TouchableOpacity 
          style={styles.addBtnBig} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('CreateSavingsPlanScreen')}
        >
          <Text style={{ color: UI_COLORS.violet, fontSize: 16 }}>＋</Text>
          <Text style={styles.addBtnBigText}>Tambah rencana tabungan baru</Text>
        </TouchableOpacity>

        {/* 👇 TAMBAHAN: Spacer pengaman bawah agar tidak tertutup bottom nav menu bar */}
        <View style={{ height: 100 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.bg,
  },
  // 👇 DIUBAH: topbar sekarang pakai susunan flexrow dengan gap
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  // 👇 TAMBAHAN: Container kiri untuk tombol back + teks judul
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  // 👇 TAMBAHAN: Styling tombol back bergaya glassmorphism
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: UI_COLORS.t3,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 👇 DIUBAH: Di-set 0 karena jarak bawah sudah dihandle oleh Spacer View
  scrollContent: {
    paddingBottom: 0,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: UI_COLORS.card2,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    borderRadius: 18,
    padding: 14,
  },
  smTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  smLbl: {
    fontSize: 11,
    color: UI_COLORS.t3,
    marginBottom: 3,
  },
  smVal: {
    fontSize: 22,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  smSub: {
    fontSize: 11,
    marginTop: 2,
    color: UI_COLORS.t3,
  },
  miniGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  mg: {
    flex: 1,
    backgroundColor: hexToRgba(UI_COLORS.text, 0.04),
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.07),
  },
  mgLbl: {
    fontSize: 10,
    color: UI_COLORS.t3,
    marginBottom: 2,
  },
  mgVal: {
    fontSize: 12,
    fontWeight: '500',
  },
  tipCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.07),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.mint, 0.2),
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  tipIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTxt: {
    flex: 1,
    fontSize: 12,
    color: '#6EE7C0',
    lineHeight: 18,
  },
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 8,
  },
  secLbl: {
    fontSize: 11,
    color: UI_COLORS.t3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  secLink: {
    fontSize: 11,
    color: UI_COLORS.violet,
  },
  savCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: UI_COLORS.card,
    borderRadius: 18,
    overflow: 'hidden',
  },
  scAccent: {
    height: 3,
  },
  scHeaderContainer: {
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    borderBottomWidth: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 10,
  },
  scTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 10,
  },
  scIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scInfo: {
    flex: 1,
  },
  scName: {
    fontSize: 14,
    fontWeight: '500',
    color: UI_COLORS.text,
    marginBottom: 3,
  },
  scMeta: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  scRight: {
    alignItems: 'flex-end',
  },
  scCurrent: {
    fontSize: 16,
    fontWeight: '500',
  },
  scTargetTxt: {
    fontSize: 10,
    color: UI_COLORS.t3,
    marginTop: 2,
  },
  progLbl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progTrack: {
    height: 6,
    backgroundColor: hexToRgba(UI_COLORS.text, 0.07),
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progFill: {
    height: 6,
    borderRadius: 3,
  },
  progSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progLblText: {
    fontSize: 10,
  },
  progSubText: {
    fontSize: 10,
  },
  scBody: {
    paddingHorizontal: 13,
    paddingBottom: 11,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    borderTopWidth: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  scStats: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: hexToRgba(UI_COLORS.text, 0.07),
    marginTop: 10,
  },
  scs: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: hexToRgba(UI_COLORS.text, 0.07),
  },
  scsLbl: {
    fontSize: 10,
    color: UI_COLORS.t3,
    marginBottom: 2,
  },
  scsVal: {
    fontSize: 12,
    fontWeight: '500',
  },
  setorAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.07),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.gold, 0.2),
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginTop: 8,
  },
  saTxt: {
    flex: 1,
    fontSize: 11,
    color: UI_COLORS.gold,
    lineHeight: 15,
  },
  actionStrip: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: hexToRgba(UI_COLORS.text, 0.07),
    marginTop: 10,
  },
  actBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRightWidth: 0.5,
    borderRightColor: hexToRgba(UI_COLORS.text, 0.07),
  },
  addBtnBig: {
    marginHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: UI_COLORS.card,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: hexToRgba(UI_COLORS.violet, 0.2),
    borderRadius: 16,
    padding: 14,
  },
  addBtnBigText: {
    fontSize: 13,
    fontWeight: '500',
    color: UI_COLORS.violet,
  },
});