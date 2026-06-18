import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.07)', b2: 'rgba(255,255,255,0.14)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

export const ManageMembersScreen = () => {
  const navigation = useNavigation<any>();

  // State untuk efek Salin (opsional, untuk UI feedback)
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Kelola anggota</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* SUMMARY STRIP */}
        <View style={styles.summaryStrip}>
          <View style={styles.ssBox}>
            <Text style={styles.ssLbl}>Anggota aktif</Text>
            <Text style={[styles.ssVal, { color: UI_COLORS.mint }]}>2</Text>
          </View>
          <View style={styles.ssBox}>
            <Text style={styles.ssLbl}>Pending</Text>
            <Text style={[styles.ssVal, { color: UI_COLORS.violet }]}>1</Text>
          </View>
          <View style={styles.ssBox}>
            <Text style={styles.ssLbl}>Maks. anggota</Text>
            <Text style={[styles.ssVal, { color: UI_COLORS.gold }]}>10</Text>
          </View>
        </View>

        {/* ANGGOTA AKTIF */}
        <Text style={styles.secLabel}>Anggota aktif</Text>
        
        {/* MEMBER 1: ADMIN (BAYU) */}
        <View style={styles.memberCard}>
          <View style={styles.mcTop}>
            <LinearGradient colors={[UI_COLORS.violet, UI_COLORS.mint]} style={styles.avatar}>
              <Text style={styles.avatarTxt}>B</Text>
            </LinearGradient>
            <View style={styles.mcInfo}>
              <Text style={styles.mcName}>Bayu Pratama</Text>
              <View style={styles.mcMeta}>
                <View style={[styles.badge, styles.badgeAdmin]}><Text style={styles.badgeTxtAdmin}>Admin</Text></View>
                <View style={[styles.badge, styles.badgeOnline]}><Text style={styles.badgeTxtOnline}>Online</Text></View>
                <Text style={styles.mcLast}>kamu</Text>
              </View>
            </View>
            <View style={styles.mcRight}>
              <Text style={styles.mcTxCount}>24 tx</Text>
              <Text style={styles.mcTxSub}>bulan ini</Text>
            </View>
          </View>

          <View style={styles.mcStats}>
            <View style={styles.mcs}>
              <Text style={styles.mcsLbl}>Pengeluaran</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.red }]}>Rp 3,06jt</Text>
            </View>
            <View style={styles.mcs}>
              <Text style={styles.mcsLbl}>Pemasukan</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.mint }]}>Rp 8,5jt</Text>
            </View>
            <View style={[styles.mcs, { borderRightWidth: 0 }]}>
              <Text style={styles.mcsLbl}>Dompet diakses</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.violet }]}>5 dompet</Text>
            </View>
          </View>

          <View style={styles.accessRow}>
            <Text style={styles.arLbl}>Akses dompet</Text>
            <View style={styles.arChips}>
              <View style={[styles.arChip, styles.arChipOn]}><Text style={styles.arChipTxtOn}>Global</Text></View>
              <View style={[styles.arChip, styles.arChipOn]}><Text style={styles.arChipTxtOn}>Pribadi</Text></View>
              <View style={[styles.arChip, styles.arChipOn]}><Text style={styles.arChipTxtOn}>Project</Text></View>
            </View>
          </View>

          <View style={styles.mcActions}>
            <View style={styles.mcActionDisabled}>
              <Ionicons name="lock-closed" size={14} color={UI_COLORS.t3} />
              <Text style={styles.mcActionTxtDisabled}>Tidak bisa diubah</Text>
            </View>
          </View>
        </View>

        {/* MEMBER 2: ISTRI */}
        <View style={styles.memberCard}>
          <View style={styles.mcTop}>
            <LinearGradient colors={[UI_COLORS.gold, UI_COLORS.red]} style={styles.avatar}>
              <Text style={[styles.avatarTxt, { color: UI_COLORS.bg }]}>I</Text>
            </LinearGradient>
            <View style={styles.mcInfo}>
              <Text style={styles.mcName}>Istri</Text>
              <View style={styles.mcMeta}>
                <View style={[styles.badge, styles.badgeMember]}><Text style={styles.badgeTxtMember}>Member</Text></View>
                <Text style={styles.mcLast}>aktif 11:24 · hari ini</Text>
              </View>
            </View>
            <View style={styles.mcRight}>
              <Text style={styles.mcTxCount}>8 tx</Text>
              <Text style={styles.mcTxSub}>bulan ini</Text>
            </View>
          </View>

          <View style={styles.mcStats}>
            <View style={styles.mcs}>
              <Text style={styles.mcsLbl}>Pengeluaran</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.red }]}>Rp 1,19jt</Text>
            </View>
            <View style={styles.mcs}>
              <Text style={styles.mcsLbl}>Pemasukan</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.mint }]}>Rp 0</Text>
            </View>
            <View style={[styles.mcs, { borderRightWidth: 0 }]}>
              <Text style={styles.mcsLbl}>Dompet diakses</Text>
              <Text style={[styles.mcsVal, { color: UI_COLORS.violet }]}>3 dompet</Text>
            </View>
          </View>

          <View style={styles.accessRow}>
            <Text style={styles.arLbl}>Akses dompet</Text>
            <View style={styles.arChips}>
              <View style={[styles.arChip, styles.arChipOn]}><Text style={styles.arChipTxtOn}>Global</Text></View>
              <View style={[styles.arChip, styles.arChipOn]}><Text style={styles.arChipTxtOn}>Pribadi</Text></View>
              <View style={[styles.arChip, styles.arChipOff]}><Text style={styles.arChipTxtOff}>Project</Text></View>
            </View>
          </View>

          <View style={styles.mcActions}>
            <TouchableOpacity style={styles.mcActionBtn}>
              <Ionicons name="shield" size={14} color={UI_COLORS.violet} />
              <Text style={[styles.mcActionTxt, { color: UI_COLORS.violet }]}>Atur akses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mcActionBtn, { borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: UI_COLORS.b1 }]}>
              <Ionicons name="star" size={14} color={UI_COLORS.gold} />
              <Text style={[styles.mcActionTxt, { color: UI_COLORS.gold }]}>Jadikan admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mcActionBtn}>
              <Ionicons name="person-remove" size={14} color={UI_COLORS.red} />
              <Text style={[styles.mcActionTxt, { color: UI_COLORS.red }]}>Keluarkan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UNDANGAN TERTUNDA */}
        <Text style={[styles.secLabel, { marginTop: 4 }]}>Undangan tertunda</Text>
        <View style={styles.pendingCard}>
          <View style={styles.pcTop}>
            <View style={styles.pcAvatar}>
              <Ionicons name="person-add" size={16} color={UI_COLORS.violet} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName}>anak@email.com</Text>
              <Text style={styles.pcMeta}>Undangan dikirim 3 hari lalu · belum bergabung</Text>
            </View>
            <View style={[styles.badge, styles.badgePending]}><Text style={styles.badgeTxtPending}>Pending</Text></View>
          </View>
          <View style={styles.pcActions}>
            <TouchableOpacity style={styles.btnCancel}>
              <Ionicons name="close" size={14} color={UI_COLORS.t2} />
              <Text style={styles.btnCancelTxt}>Batalkan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnResend}>
              <Ionicons name="send" size={14} color="#A89FF9" />
              <Text style={styles.btnResendTxt}>Kirim ulang</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UNDANG ANGGOTA BARU */}
        <Text style={[styles.secLabel, { marginTop: 4 }]}>Undang anggota baru</Text>
        <View style={styles.inviteCard}>
          <TouchableOpacity style={styles.invMethod}>
            <View style={[styles.invIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="link" size={18} color={UI_COLORS.mint} /></View>
            <View style={styles.invInfo}>
              <Text style={styles.invTitle}>Bagikan tautan undangan</Text>
              <Text style={styles.invSub}>Kirim link via WhatsApp, SMS, dll.</Text>
            </View>
            <Ionicons name="share-social" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.invMethod}>
            <View style={[styles.invIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}><Ionicons name="qr-code" size={18} color={UI_COLORS.gold} /></View>
            <View style={styles.invInfo}>
              <Text style={styles.invTitle}>Tampilkan QR undangan</Text>
              <Text style={styles.invSub}>Minta calon anggota scan QR ini</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.invMethod, { borderBottomWidth: 0 }]}>
            <View style={[styles.invIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="mail" size={18} color={UI_COLORS.violet} /></View>
            <View style={styles.invInfo}>
              <Text style={styles.invTitle}>Undang via email</Text>
              <Text style={styles.invSub}>Kirim undangan ke alamat email</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
        </View>

        {/* CODE BOX */}
        <View style={styles.codeBox}>
          <Text style={styles.cbLbl}>Atau bagikan kode undangan ini</Text>
          <View style={styles.cbCodeRow}>
            <View style={styles.cbChars}>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>K</Text></View>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>A</Text></View>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>S</Text></View>
              <Text style={styles.cbDash}>—</Text>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>7</Text></View>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>X</Text></View>
              <View style={styles.cbChar}><Text style={styles.cbCharTxt}>9</Text></View>
            </View>
            <TouchableOpacity style={styles.cbCopy} onPress={handleCopy}>
              <Ionicons name={copied ? "checkmark-done" : "copy"} size={14} color={UI_COLORS.gold} />
              <Text style={styles.cbCopyTxt}>{copied ? "Tersalin" : "Salin"}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.cbExpire}>Kode berlaku 7 hari · kedaluwarsa 18 Jun 2026</Text>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoHead}>
            <Ionicons name="information-circle" size={15} color={UI_COLORS.violet} />
            <Text style={styles.infoTitle}>Tentang akses anggota</Text>
          </View>
          <Text style={styles.infoBody}>Anggota baru bergabung sebagai Member. Hanya Admin yang bisa mengubah peran, mengatur akses dompet, dan mengeluarkan anggota.</Text>
        </View>

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
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // SUMMARY STRIP
  summaryStrip: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  ssBox: { flex: 1, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  ssLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  ssVal: { fontSize: 14, fontWeight: '600' },

  secLabel: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 4, paddingBottom: 8 },

  // MEMBER CARDS
  memberCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  mcTop: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingTop: 13, paddingBottom: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: UI_COLORS.bg },
  avatarTxt: { fontSize: 15, fontWeight: '600', color: '#FFF' },
  mcInfo: { flex: 1 },
  mcName: { fontSize: 14, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  mcMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  mcLast: { fontSize: 10, color: UI_COLORS.t3 },
  mcRight: { alignItems: 'flex-end' },
  mcTxCount: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  mcTxSub: { fontSize: 10, color: UI_COLORS.t3 },
  
  // BADGES
  badge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  badgeAdmin: { backgroundColor: 'rgba(245,200,66,0.12)' },
  badgeTxtAdmin: { fontSize: 9, fontWeight: '600', color: UI_COLORS.gold },
  badgeMember: { backgroundColor: 'rgba(255,255,255,0.06)' },
  badgeTxtMember: { fontSize: 9, fontWeight: '600', color: UI_COLORS.t2 },
  badgeOnline: { backgroundColor: 'rgba(45,212,164,0.12)' },
  badgeTxtOnline: { fontSize: 9, fontWeight: '600', color: UI_COLORS.mint },
  badgePending: { backgroundColor: 'rgba(124,111,247,0.12)' },
  badgeTxtPending: { fontSize: 9, fontWeight: '600', color: '#A89FF9' },

  // STATS
  mcStats: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1 },
  mcs: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: UI_COLORS.b1 },
  mcsLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  mcsVal: { fontSize: 12, fontWeight: '600' },

  // ACCESS ROW
  accessRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.02)', borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1 },
  arLbl: { fontSize: 11, color: UI_COLORS.t2 },
  arChips: { flexDirection: 'row', gap: 5 },
  arChip: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, borderWidth: 0.5 },
  arChipOn: { backgroundColor: 'rgba(45,212,164,0.1)', borderColor: 'rgba(45,212,164,0.3)' },
  arChipTxtOn: { fontSize: 10, color: UI_COLORS.mint, fontWeight: '500' },
  arChipOff: { borderColor: UI_COLORS.b2, backgroundColor: 'transparent' },
  arChipTxtOff: { fontSize: 10, color: UI_COLORS.t3 },

  // ACTIONS
  mcActions: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1 },
  mcActionDisabled: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  mcActionTxtDisabled: { fontSize: 11, fontWeight: '500', color: UI_COLORS.t3 },
  mcActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 10 },
  mcActionTxt: { fontSize: 11, fontWeight: '500' },

  // PENDING CARD
  pendingCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 16, padding: 13 },
  pcTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  pcAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: UI_COLORS.card2, borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.4)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  pcInfo: { flex: 1 },
  pcName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  pcMeta: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  pcActions: { flexDirection: 'row', gap: 8 },
  btnCancel: { flex: 1, height: 36, borderRadius: 11, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnCancelTxt: { fontSize: 12, color: UI_COLORS.t2 },
  btnResend: { flex: 1, height: 36, borderRadius: 11, backgroundColor: 'rgba(124,111,247,0.12)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.3)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnResendTxt: { fontSize: 12, fontWeight: '500', color: '#A89FF9' },

  // INVITE CARDS
  inviteCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  invMethod: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  invIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  invInfo: { flex: 1 },
  invTitle: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  invSub: { fontSize: 11, color: UI_COLORS.t3 },

  // CODE BOX
  codeBox: { marginHorizontal: 16, marginBottom: 10, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.25)', borderRadius: 14, padding: 14 },
  cbLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 10 },
  cbCodeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cbChars: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cbChar: { width: 34, height: 38, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.3)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cbCharTxt: { fontSize: 18, fontWeight: '600', color: UI_COLORS.gold },
  cbDash: { fontSize: 18, color: UI_COLORS.t3 },
  cbCopy: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(245,200,66,0.1)', borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.25)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  cbCopyTxt: { fontSize: 12, fontWeight: '500', color: UI_COLORS.gold },
  cbExpire: { fontSize: 10, color: UI_COLORS.t3, marginTop: 10 },

  // INFO CARD
  infoCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12 },
  infoHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  infoTitle: { fontSize: 12, fontWeight: '600', color: '#A89FF9' },
  infoBody: { fontSize: 11, color: UI_COLORS.t3, lineHeight: 18, paddingLeft: 23 }
});