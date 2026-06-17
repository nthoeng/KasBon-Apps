import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.07)', b2: 'rgba(255,255,255,0.14)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const SettingsScreen = () => {
  const navigation = useNavigation<any>();

  // States untuk beberapa toggle penting (sebagai contoh simulasi)
  const [bioActive, setBioActive] = useState(true);
  const [notifTransfer, setNotifTransfer] = useState(true);
  const [notifBudget, setNotifBudget] = useState(true);
  const [notifDue, setNotifDue] = useState(true);
  const [notifMilestone, setNotifMilestone] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);

  // Komponen bantuan untuk merender Baris Pengaturan agar kode tetap DRY (Don't Repeat Yourself)
  const renderRow = (
    icon: any, iconColor: string, label: string, value: string, isMuted: boolean = false, 
    rightElement: React.ReactNode, isDanger: boolean = false, isLast: boolean = false
  ) => (
    <TouchableOpacity style={[styles.fieldRow, isLast && { borderBottomWidth: 0 }, isDanger && { borderBottomColor: 'rgba(255,107,107,0.15)' }]} activeOpacity={0.7}>
      <View style={[styles.frIcon, { backgroundColor: hexToRgba(iconColor, 0.12) }]}>
        <Ionicons name={icon} size={17} color={iconColor} />
      </View>
      <View style={styles.frInfo}>
        <Text style={[styles.frLbl, isDanger && { color: 'rgba(255,107,107,0.7)' }]}>{label}</Text>
        <Text style={[styles.frVal, isMuted && styles.frValMuted, isDanger && { color: '#FF9090' }]} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <View style={styles.frRight}>{rightElement}</View>
    </TouchableOpacity>
  );

  // Komponen Toggle Custom
  const renderToggle = (isActive: boolean, onToggle: () => void) => (
    <TouchableOpacity style={[styles.toggle, isActive ? styles.toggleOn : styles.toggleOff]} onPress={onToggle} activeOpacity={0.8}>
      <View style={isActive ? styles.togThumbOn : styles.togThumbOff} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Pengaturan akun</Text>
        <TouchableOpacity style={styles.saveBtnTop}>
          <Ionicons name="save" size={15} color={UI_COLORS.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* AVATAR SECTION */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}><Text style={styles.avatarTxt}>B</Text></View>
            <TouchableOpacity style={styles.avatarEdit}>
              <Ionicons name="camera" size={12} color="#0A1628" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarName}>Bayu Pratama</Text>
          <Text style={styles.avatarEmail}>bayu@email.com</Text>
        </View>

        {/* SECTION: INFORMASI PROFIL */}
        <Text style={styles.secLabel}>Informasi profil</Text>
        <View style={styles.card}>
          {renderRow('person', UI_COLORS.violet, 'Nama lengkap', 'Bayu Pratama', false, <Ionicons name="pencil" size={15} color={UI_COLORS.t3} />)}
          {renderRow('mail', UI_COLORS.mint, 'Alamat email', 'bayu@email.com', false, <View style={[styles.badge, styles.badgeGreen]}><Text style={styles.badgeTxtGreen}>Terverifikasi</Text></View>)}
          {renderRow('call', UI_COLORS.gold, 'Nomor HP', '+62 812-xxxx-xxxx', false, <Ionicons name="pencil" size={15} color={UI_COLORS.t3} />)}
          {renderRow('star', UI_COLORS.gold, 'Peran dalam keluarga', 'Admin keluarga', false, <View style={[styles.badge, styles.badgeGold]}><Text style={styles.badgeTxtGold}>Admin</Text></View>, false, true)}
        </View>

        {/* SECTION: KEAMANAN */}
        <Text style={styles.secLabel}>Keamanan</Text>
        <View style={styles.card}>
          {renderRow('lock-closed', UI_COLORS.mint, 'Password', '••••••••••', false, <View style={styles.frRightWrap}><Text style={styles.frRightTxt}>Ganti</Text><Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} /></View>)}
          {renderRow('keypad', UI_COLORS.violet, 'PIN konfirmasi transaksi', 'Belum diatur', true, <View style={styles.frRightWrap}><Text style={[styles.frRightTxt, {color: UI_COLORS.violet}]}>Atur PIN</Text><Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} /></View>)}
          {renderRow('finger-print', UI_COLORS.gold, 'Login biometrik', 'Sidik jari / Face ID', false, renderToggle(bioActive, () => setBioActive(!bioActive)))}
          {renderRow('shield-checkmark', UI_COLORS.red, 'Verifikasi 2 langkah', 'Nonaktif', true, <View style={styles.frRightWrap}><View style={[styles.badge, styles.badgeRed]}><Text style={styles.badgeTxtRed}>Nonaktif</Text></View><Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} /></View>)}
          {renderRow('phone-portrait', UI_COLORS.t2, 'Sesi aktif', '2 perangkat masuk', false, <View style={styles.frRightWrap}><Text style={[styles.frRightTxt, {color: UI_COLORS.violet}]}>Kelola</Text><Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} /></View>, false, true)}
        </View>

        {/* SECTION: NOTIFIKASI */}
        <Text style={styles.secLabel}>Notifikasi</Text>
        <View style={styles.card}>
          {renderRow('swap-horizontal', UI_COLORS.mint, 'Transfer masuk', 'Push + notif dalam app', false, renderToggle(notifTransfer, () => setNotifTransfer(!notifTransfer)))}
          {renderRow('bar-chart', UI_COLORS.red, 'Alert budget hampir habis', 'Notif saat 80% terpakai', false, renderToggle(notifBudget, () => setNotifBudget(!notifBudget)))}
          {renderRow('time', UI_COLORS.gold, 'Jatuh tempo hutang', 'H-3 & H-1 sebelum jatuh tempo', false, renderToggle(notifDue, () => setNotifDue(!notifDue)))}
          {renderRow('trophy', UI_COLORS.violet, 'Pencapaian tabungan', 'Milestone target tercapai', false, renderToggle(notifMilestone, () => setNotifMilestone(!notifMilestone)))}
          {renderRow('trending-up', UI_COLORS.t2, 'Laporan mingguan', 'Nonaktif', true, renderToggle(notifWeekly, () => setNotifWeekly(!notifWeekly)), false, true)}
        </View>

        {/* SECTION: PREFERENSI TAMPILAN */}
        <Text style={styles.secLabel}>Preferensi tampilan</Text>
        <View style={styles.card}>
          {renderRow('moon', UI_COLORS.violet, 'Tema gelap', 'Dark mode', false, renderToggle(darkMode, () => setDarkMode(!darkMode)))}
          {renderRow('cash', UI_COLORS.t2, 'Format mata uang', 'Rupiah (IDR) — Rp 1.000', false, <Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} />)}
          {renderRow('language', UI_COLORS.t2, 'Bahasa aplikasi', 'Bahasa Indonesia', false, <Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} />)}
          {renderRow('calendar', UI_COLORS.mint, 'Awal periode budget', 'Tanggal 1 setiap bulan', false, <Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} />, false, true)}
        </View>

        {/* SECTION: PRIVASI & DATA */}
        <Text style={styles.secLabel}>Privasi & data</Text>
        <View style={styles.card}>
          {renderRow('download', UI_COLORS.mint, 'Export data saya', 'Unduh semua transaksi CSV/PDF', true, <Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} />)}
          {renderRow('eye-off', UI_COLORS.t2, 'Sembunyikan saldo dari feed', 'Saldo tidak tampil di aktivitas', true, renderToggle(hideBalance, () => setHideBalance(!hideBalance)))}
          {renderRow('shield', UI_COLORS.t2, 'Kebijakan privasi', 'Baca kebijakan KasBon', true, <Ionicons name="open-outline" size={15} color={UI_COLORS.t3} />, false, true)}
        </View>

        {/* SECTION: ZONA BAHAYA */}
        <Text style={[styles.secLabel, { color: '#FF9090' }]}>Zona bahaya</Text>
        <View style={styles.dangerCard}>
          {renderRow('log-out', UI_COLORS.red, 'Keluar dari akun', 'Logout semua perangkat', false, <Ionicons name="chevron-forward" size={15} color="rgba(255,107,107,0.4)" />, true)}
          {renderRow('trash', UI_COLORS.red, 'Hapus akun', 'Hapus akun & semua data', false, <Ionicons name="chevron-forward" size={15} color="rgba(255,107,107,0.4)" />, true, true)}
        </View>

        <TouchableOpacity style={styles.btnSaveMain}>
          <Ionicons name="checkmark" size={18} color="#0A1628" />
          <Text style={styles.btnSaveMainTxt}>Simpan perubahan</Text>
        </TouchableOpacity>

        <Text style={styles.versionTxt}>KasBon v1.0.0 · catat bareng, hemat bareng</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  saveBtnTop: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // AVATAR
  avatarSection: { alignItems: 'center', paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18, gap: 8 },
  avatarRing: { position: 'relative', width: 72, height: 72 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: UI_COLORS.violet, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 24, fontWeight: '500', color: '#FFF' },
  avatarEdit: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: UI_COLORS.bg },
  avatarName: { fontSize: 16, fontWeight: '500', color: UI_COLORS.text },
  avatarEmail: { fontSize: 12, color: UI_COLORS.t3, marginTop: -4 },

  // SECTIONS
  secLabel: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  card: { marginHorizontal: 16, marginBottom: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  dangerCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: 'rgba(255,107,107,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.2)', borderRadius: 16, overflow: 'hidden' },
  
  // ROWS
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  frIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  frInfo: { flex: 1 },
  frLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 2 },
  frVal: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  frValMuted: { color: UI_COLORS.t2, fontWeight: '400' },
  frRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  frRightWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  frRightTxt: { fontSize: 11, color: UI_COLORS.t3 },

  // BADGES
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeGreen: { backgroundColor: 'rgba(45,212,164,0.12)' },
  badgeTxtGreen: { fontSize: 10, fontWeight: '500', color: UI_COLORS.mint },
  badgeGold: { backgroundColor: 'rgba(245,200,66,0.12)' },
  badgeTxtGold: { fontSize: 10, fontWeight: '500', color: UI_COLORS.gold },
  badgeRed: { backgroundColor: 'rgba(255,107,107,0.12)' },
  badgeTxtRed: { fontSize: 10, fontWeight: '500', color: '#FF9090' },

  // TOGGLES
  toggle: { width: 38, height: 22, borderRadius: 11, justifyContent: 'center' },
  toggleOn: { backgroundColor: UI_COLORS.mint },
  togThumbOn: { width: 16, height: 16, borderRadius: 8, backgroundColor: UI_COLORS.bg, position: 'absolute', right: 3 },
  toggleOff: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  togThumbOff: { width: 16, height: 16, borderRadius: 8, backgroundColor: UI_COLORS.t3, position: 'absolute', left: 3 },

  // BUTTONS & FOOTER
  btnSaveMain: { marginHorizontal: 16, marginBottom: 10, height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnSaveMainTxt: { fontSize: 14, fontWeight: '500', color: '#0A1628' },
  versionTxt: { textAlign: 'center', fontSize: 11, color: UI_COLORS.t3, paddingHorizontal: 18, marginBottom: 20 }
});