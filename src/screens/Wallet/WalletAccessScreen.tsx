/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Untuk Fase Laravel + MySQL Nanti)
 * ============================================================================
 * * 1. METHOD & ENDPOINT KUNCI:
 * - GET /api/wallets/{id}/access
 * Mengambil daftar anggota keluarga beserta hak aksesnya pada dompet tertentu.
 * - PUT /api/wallets/{id}/access
 * Menyimpan/memperbarui hak akses (permissions) secara batch.
 * * * 2. POTENSI TABEL DATABASE (MySQL):
 * - `wallet_users` (Pivot table untuk Many-to-Many antara wallets & users)
 * (id, wallet_id, user_id, access_level ['owner', 'full', 'view', 'none'], 
 * created_at, updated_at)
 * * * 3. LOGIKA BACKEND (Laravel Form Request & Policy):
 * - Validasi Ownership: Hanya user dengan `access_level = 'owner'` pada wallet
 * tersebut yang diizinkan memanggil endpoint PUT (mengubah izin akses).
 * - Middleware/Policy: Saat anggota mencoba mencatat transaksi (POST transaction),
 * backend wajib mengecek apakah status user adalah 'owner' atau 'full'.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── TEMA WARNA KASBON (DARK / GLASSMORPHISM) ───────────────────────────────
const UI_COLORS = {
  bg: '#0A1628',
  bg2: '#0F1E35',
  card: '#152338',
  card2: '#1A2D47',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  text: '#F0F4FF',
  t2: '#8AA0BE',
  t3: '#3E5878',
  b1: 'rgba(255,255,255,0.07)',
  b2: 'rgba(255,255,255,0.14)',
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type AccessLevel = 'full' | 'view' | 'none';

interface MemberPermission {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarTheme: 'gold' | 'mint' | 'violet';
  isOwner?: boolean;
  access: AccessLevel;
}

export function WalletAccessScreen() {
  const navigation = useNavigation<any>();
  const [isSaving, setIsSaving] = useState(false);

  // State awal akses anggota
  const [members, setMembers] = useState<MemberPermission[]>([
    {
      id: 'm1',
      name: 'Bos (Saya)',
      role: 'Admin keluarga · Pembuat dompet',
      avatar: 'B',
      avatarTheme: 'gold',
      isOwner: true,
      access: 'full',
    },
    {
      id: 'm2',
      name: 'Istri',
      role: 'Anggota keluarga',
      avatar: 'I',
      avatarTheme: 'mint',
      access: 'full',
    },
    {
      id: 'm3',
      name: 'Andi (Anak)',
      role: 'Anggota keluarga · Akun terbatas',
      avatar: 'A',
      avatarTheme: 'violet',
      access: 'view',
    },
  ]);

  const handleSelectAccess = (id: string, newAccess: AccessLevel) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id && !m.isOwner ? { ...m, access: newAccess } : m))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Bisa dilanjutkan dengan navigation.goBack() atau menampilkan toast alert
    }, 1200);
  };

  // Kalkulasi ringkasan akses (tidak termasuk pemilik)
  const nonOwners = members.filter((m) => !m.isOwner);
  const countFull = nonOwners.filter((m) => m.access === 'full').length;
  const countView = nonOwners.filter((m) => m.access === 'view').length;
  const countNone = nonOwners.filter((m) => m.access === 'none').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* ── TOPBAR ── */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Atur Akses Anggota</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── WALLET BANNER ── */}
        <View style={styles.walletBanner}>
          <View style={styles.wbIcon}>
            <Ionicons name="home" size={18} color={UI_COLORS.gold} />
          </View>
          <View style={styles.wbInfo}>
            <Text style={styles.wbName}>Kas Keluarga</Text>
            <Text style={styles.wbBal}>Rp 4.250.000 · Dompet Global</Text>
          </View>
          <View style={styles.wbBadge}>
            <Text style={styles.wbBadgeTxt}>{members.length} anggota</Text>
          </View>
        </View>

        <Text style={styles.sectLbl}>Atur izin per anggota</Text>

        {/* ── MEMBER LIST ── */}
        {members.map((member) => {
          const getAvatarStyle = () => {
            switch (member.avatarTheme) {
              case 'gold':
                return { bg: hexToRgba(UI_COLORS.gold, 0.2), border: hexToRgba(UI_COLORS.gold, 0.3), text: UI_COLORS.gold };
              case 'mint':
                return { bg: hexToRgba(UI_COLORS.mint, 0.2), border: hexToRgba(UI_COLORS.mint, 0.3), text: UI_COLORS.mint };
              default:
                return { bg: hexToRgba(UI_COLORS.violet, 0.2), border: hexToRgba(UI_COLORS.violet, 0.3), text: UI_COLORS.violet };
            }
          };

          const avatarStyle = getAvatarStyle();

          return (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberHead}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: avatarStyle.bg,
                      borderColor: avatarStyle.border,
                    },
                  ]}
                >
                  <Text style={[styles.avatarText, { color: avatarStyle.text }]}>
                    {member.avatar}
                  </Text>
                </View>
                <View style={styles.mInfo}>
                  <Text style={styles.mName}>{member.name}</Text>
                  <Text style={styles.mRole}>{member.role}</Text>
                </View>
                {member.isOwner && (
                  <View style={styles.ownerTag}>
                    <Text style={styles.ownerTagTxt}>Pemilik</Text>
                  </View>
                )}
              </View>

              {member.isOwner ? (
                <View style={styles.lockedNote}>
                  <Ionicons name="lock-closed" size={12} color={UI_COLORS.t3} />
                  <Text style={styles.lockedNoteTxt}>
                    Akses pemilik tidak bisa diubah
                  </Text>
                </View>
              ) : (
                <View style={styles.accessOptions}>
                  {/* OPSI 1: FULL AKSES */}
                  <TouchableOpacity
                    style={[
                      styles.accessOpt,
                      member.access === 'full' && styles.selectedGold,
                    ]}
                    onPress={() => handleSelectAccess(member.id, 'full')}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.aoIcon,
                        { backgroundColor: hexToRgba(UI_COLORS.gold, 0.15) },
                      ]}
                    >
                      <Ionicons
                        name="create-outline"
                        size={15}
                        color={UI_COLORS.gold}
                      />
                    </View>
                    <View style={styles.aoText}>
                      <Text style={styles.aoTitle}>Bisa lihat & catat</Text>
                      <Text style={styles.aoSub}>
                        Boleh menambah transaksi di dompet ini
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioSm,
                        member.access === 'full' && styles.radioOnGold,
                      ]}
                    />
                  </TouchableOpacity>

                  {/* OPSI 2: VIEW ONLY */}
                  <TouchableOpacity
                    style={[
                      styles.accessOpt,
                      member.access === 'view' && styles.selectedMint,
                    ]}
                    onPress={() => handleSelectAccess(member.id, 'view')}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.aoIcon,
                        { backgroundColor: hexToRgba(UI_COLORS.mint, 0.15) },
                      ]}
                    >
                      <Ionicons
                        name="eye-outline"
                        size={15}
                        color={UI_COLORS.mint}
                      />
                    </View>
                    <View style={styles.aoText}>
                      <Text style={styles.aoTitle}>Bisa lihat saja</Text>
                      <Text style={styles.aoSub}>
                        Hanya bisa memantau, tidak bisa catat
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioSm,
                        member.access === 'view' && styles.radioOnMint,
                      ]}
                    />
                  </TouchableOpacity>

                  {/* OPSI 3: NO ACCESS */}
                  <TouchableOpacity
                    style={[
                      styles.accessOpt,
                      member.access === 'none' && styles.selectedGray,
                    ]}
                    onPress={() => handleSelectAccess(member.id, 'none')}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.aoIcon,
                        { backgroundColor: hexToRgba(UI_COLORS.t2, 0.15) },
                      ]}
                    >
                      <Ionicons
                        name="eye-off-outline"
                        size={15}
                        color={UI_COLORS.t2}
                      />
                    </View>
                    <View style={styles.aoText}>
                      <Text style={styles.aoTitle}>Tidak ada akses</Text>
                      <Text style={styles.aoSub}>
                        Dompet disembunyikan dari anggota ini
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioSm,
                        member.access === 'none' && styles.radioOnGray,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {/* ── INVITE MEMBER CARD ── */}
        <TouchableOpacity
          style={styles.inviteCard}
          activeOpacity={0.8}
          onPress={() => {
            // Bisa diarahkan ke halaman Undang Anggota
          }}
        >
          <View style={styles.inviteIcon}>
            <Ionicons
              name="person-add-outline"
              size={18}
              color={UI_COLORS.violet}
            />
          </View>
          <View style={styles.inviteText}>
            <Text style={styles.inviteTitle}>Undang anggota baru</Text>
            <Text style={styles.inviteSub}>
              Tambahkan anggota keluarga lain ke KasBon
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={UI_COLORS.violet}
          />
        </TouchableOpacity>

        {/* ── SUMMARY STRIP ── */}
        <View style={styles.summaryStrip}>
          <View style={styles.sumChip}>
            <Text style={[styles.sumChipNum, { color: UI_COLORS.gold }]}>
              {countFull}
            </Text>
            <Text style={styles.sumChipLbl}>Bisa catat</Text>
          </View>
          <View style={styles.sumChip}>
            <Text style={[styles.sumChipNum, { color: UI_COLORS.mint }]}>
              {countView}
            </Text>
            <Text style={styles.sumChipLbl}>Lihat saja</Text>
          </View>
          <View style={styles.sumChip}>
            <Text style={[styles.sumChipNum, { color: UI_COLORS.t2 }]}>
              {countNone}
            </Text>
            <Text style={styles.sumChipLbl}>Tanpa akses</Text>
          </View>
        </View>

        {/* ── SAVE BUTTON ── */}
        <View style={styles.saveBar}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              isSaving && { backgroundColor: UI_COLORS.mint },
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={isSaving}
          >
            <Text
              style={[
                styles.saveBtnText,
                isSaving && { color: '#0A1628', fontWeight: '700' },
              ]}
            >
              {isSaving ? 'Tersimpan ✓' : 'Simpan Perubahan Akses'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 👇 PENGAMAN BOTTOM NAV BAR */}
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
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: UI_COLORS.card2,
    borderWidth: 1,
    borderColor: UI_COLORS.b2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbarTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },

  // WALLET BANNER
  walletBanner: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 1,
    borderColor: UI_COLORS.b2,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  wbIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.15),
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.gold, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wbInfo: { flex: 1 },
  wbName: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  wbBal: {
    fontSize: 11,
    color: UI_COLORS.t2,
    marginTop: 2,
  },
  wbBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.12),
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.gold, 0.2),
  },
  wbBadgeTxt: {
    fontSize: 10,
    fontWeight: '600',
    color: UI_COLORS.gold,
  },

  sectLbl: {
    fontSize: 11,
    color: UI_COLORS.t3,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '600',
    marginBottom: 10,
  },

  // MEMBER CARD
  memberCard: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 1,
    borderColor: UI_COLORS.b2,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  memberHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mInfo: { flex: 1 },
  mName: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  mRole: {
    fontSize: 11,
    color: UI_COLORS.t2,
    marginTop: 2,
  },
  ownerTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.12),
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.gold, 0.2),
  },
  ownerTagTxt: {
    fontSize: 10,
    fontWeight: '600',
    color: UI_COLORS.gold,
  },

  // ACCESS OPTIONS
  accessOptions: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 2,
  },
  accessOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: UI_COLORS.b2,
  },
  selectedGold: {
    borderColor: hexToRgba(UI_COLORS.gold, 0.45),
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.06),
  },
  selectedMint: {
    borderColor: hexToRgba(UI_COLORS.mint, 0.45),
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.06),
  },
  selectedGray: {
    borderColor: hexToRgba(UI_COLORS.t2, 0.4),
    backgroundColor: hexToRgba(UI_COLORS.t2, 0.06),
  },
  aoIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aoText: { flex: 1 },
  aoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  aoSub: {
    fontSize: 10,
    color: UI_COLORS.t2,
    marginTop: 2,
  },
  radioSm: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: UI_COLORS.t3,
  },
  radioOnGold: {
    borderColor: UI_COLORS.gold,
    backgroundColor: UI_COLORS.gold,
  },
  radioOnMint: {
    borderColor: UI_COLORS.mint,
    backgroundColor: UI_COLORS.mint,
  },
  radioOnGray: {
    borderColor: UI_COLORS.t2,
    backgroundColor: UI_COLORS.t2,
  },
  lockedNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: UI_COLORS.b1,
  },
  lockedNoteTxt: {
    fontSize: 11,
    color: UI_COLORS.t3,
  },

  // INVITE CARD
  inviteCard: {
    backgroundColor: hexToRgba(UI_COLORS.violet, 0.06),
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: hexToRgba(UI_COLORS.violet, 0.3),
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  inviteIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: hexToRgba(UI_COLORS.violet, 0.15),
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.violet, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteText: { flex: 1 },
  inviteTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: UI_COLORS.violet,
  },
  inviteSub: {
    fontSize: 11,
    color: UI_COLORS.t2,
    marginTop: 2,
  },

  // SUMMARY STRIP
  summaryStrip: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginBottom: 14,
  },
  sumChip: {
    flex: 1,
    backgroundColor: UI_COLORS.card,
    borderWidth: 1,
    borderColor: UI_COLORS.b2,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sumChipNum: {
    fontSize: 16,
    fontWeight: '600',
  },
  sumChipLbl: {
    fontSize: 10,
    color: UI_COLORS.t2,
    marginTop: 2,
  },

  // SAVE BAR
  saveBar: {
    marginTop: 4,
  },
  saveBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: UI_COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: UI_COLORS.bg,
    fontSize: 14,
    fontWeight: '600',
  },
});