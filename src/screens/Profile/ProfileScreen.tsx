import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/ui/GlassCard';
import { theme } from '../../theme';

const { colors } = theme;

// Kumpulan warna yang sudah di-adjust kontrasnya agar UX maksimal
const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  text: '#F0F4FF',
  textSub: '#8FA8CC', 
  gold: '#F5C842',
  mint: '#2DD4A4',
  violet: '#7C6FF7',
  red: '#FF6B6B',
  border: 'rgba(255,255,255,0.08)',
};

// --- KOMPONEN HELPER: MENU ITEM ---
const MenuItem = ({ icon, iconColor, iconBg, name, sub, rightType, rightValue, isLast, onPress }: any) => {
  return (
    <TouchableOpacity 
      style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{name}</Text>
        {sub && <Text style={styles.menuSub}>{sub}</Text>}
      </View>
      
      {rightType === 'chevron' && <Ionicons name="chevron-forward" size={16} color={UI_COLORS.textSub} />}
      {rightType === 'external' && <Ionicons name="open-outline" size={16} color={UI_COLORS.textSub} />}
      {rightType === 'toggle' && (
        <View style={styles.toggleActive}>
          <View style={styles.toggleCircle} />
        </View>
      )}
      {rightType === 'badge-new' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={[styles.menuBadge, { backgroundColor: 'rgba(45,212,164,0.12)' }]}>
            <Text style={[styles.menuBadgeTxt, { color: UI_COLORS.mint }]}>{rightValue}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.textSub} />
        </View>
      )}
      {rightType === 'badge-notif' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={[styles.menuBadge, { backgroundColor: 'rgba(255,107,107,0.15)' }]}>
            <Text style={[styles.menuBadgeTxt, { color: '#FF9090' }]}>{rightValue}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.textSub} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* HEADER */}
      <View style={styles.topbar}>
        <Text style={styles.pageTitle}>Profil</Text>
        <View style={styles.topbarRight}>
          <TouchableOpacity 
		        style={styles.iconBtn}
			      onPress={() => navigation.navigate('NotificationScreen')}
		      >
            <Ionicons name="notifications" size={16} color={UI_COLORS.textSub} />
          </TouchableOpacity>
          <TouchableOpacity 
		        style={styles.iconBtn}
			      onPress={() => navigation.navigate('Settings')}
		      >
            <Ionicons name="settings" size={16} color={UI_COLORS.textSub} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarRing}>
              <Text style={styles.avatarText}>B</Text>
            </View>
            <TouchableOpacity style={styles.avatarEdit}>
              <Ionicons name="camera" size={12} color={UI_COLORS.bg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Bayu Pratama</Text>
          <Text style={styles.profileEmail}>bayu@email.com  •  +62 812-xxxx-xxxx</Text>
          <View style={styles.roleBadgeHero}>
            <Ionicons name="shield-checkmark" size={13} color={UI_COLORS.gold} />
            <Text style={styles.roleTxtHero}>Admin keluarga</Text>
          </View>
        </View>

        {/* ⭐ PREMIUM BANNER (FREEMIUM ENTRY POINT) */}
        <TouchableOpacity 
          style={styles.premiumBanner} 
          activeOpacity={0.8}
          onPress={() => console.log('Arahkan ke Halaman Paywall/Upgrade nantinya')}
        >
          <View style={styles.premiumIconWrap}>
            <Ionicons name="star" size={18} color={UI_COLORS.bg} />
          </View>
          <View style={styles.premiumInfo}>
            <Text style={styles.premiumTitle}>KasBon PRO</Text>
            <Text style={styles.premiumSub}>Buka semua limit & fitur premium</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={UI_COLORS.gold} />
        </TouchableOpacity>

        {/* STATS GRID */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: UI_COLORS.mint }]}>24</Text>
            <Text style={styles.statLbl}>Transaksi bulan ini</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: UI_COLORS.gold }]}>7</Text>
            <Text style={styles.statLbl}>Dompet aktif</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: UI_COLORS.violet }]}>3</Text>
            <Text style={styles.statLbl}>Project berjalan</Text>
          </View>
        </View>

        {/* QR STRIP */}
        <TouchableOpacity 
		  style={styles.qrStrip} 
		  activeOpacity={0.8}
		  onPress={() => navigation.navigate('QRWallet')}
		>
          <View style={styles.qrPreviewBox}>
            <Ionicons name="qr-code" size={32} color={UI_COLORS.bg} />
          </View>
          <View style={styles.qrInfo}>
            <Text style={styles.qrTitle}>QR profil saya</Text>
            <Text style={styles.qrSub}>Scan untuk transfer ke akun Bayu</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={UI_COLORS.textSub} />
        </TouchableOpacity>

        {/* 1. ANGGOTA KELUARGA */}
        <View style={styles.sectionBlock}>
          <Text style={styles.secLbl}>ANGGOTA KELUARGA</Text>
          <GlassCard style={styles.cardContainer}>
            <View style={styles.memberRow}>
              <View style={[styles.mAvatar, { backgroundColor: UI_COLORS.violet }]}>
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>B</Text>
              </View>
              <View style={styles.mInfo}>
                <View style={styles.mNameRow}>
                  <Text style={styles.mName}>Bayu Pratama</Text>
                  <View style={[styles.mRoleBadge, { backgroundColor: 'rgba(245,200,66,0.12)' }]}>
                    <Text style={{ color: UI_COLORS.gold, fontSize: 9, fontWeight: '600' }}>Admin</Text>
                  </View>
                </View>
                <Text style={styles.mMeta}>12 tx bulan ini · aktif barusan</Text>
              </View>
            </View>

            <View style={styles.memberRow}>
              <View style={[styles.mAvatar, { backgroundColor: UI_COLORS.gold }]}>
                <Text style={{ color: UI_COLORS.bg, fontSize: 13, fontWeight: '600' }}>I</Text>
              </View>
              <View style={styles.mInfo}>
                <View style={styles.mNameRow}>
                  <Text style={styles.mName}>Istri</Text>
                  <View style={[styles.mRoleBadge, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                    <Text style={{ color: UI_COLORS.textSub, fontSize: 9, fontWeight: '600' }}>Member</Text>
                  </View>
                </View>
                <Text style={styles.mMeta}>8 tx bulan ini · aktif 11:24</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.inviteRow} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ManageMembers')}> 
              <View style={styles.inviteCircle}>
                <Ionicons name="add" size={18} color={UI_COLORS.violet} />
              </View>
              <View style={styles.mInfo}>
                <Text style={styles.inviteTitle}>Undang anggota</Text>
                <Text style={styles.mMeta}>Kirim link atau kode undangan</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={UI_COLORS.textSub} />
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* 2. AKUN & KEAMANAN */}
        <View style={styles.sectionBlock}>
          <Text style={styles.secLbl}>AKUN & KEAMANAN</Text>
          <GlassCard style={styles.cardContainer}>
            <MenuItem 
              icon="person" 
              iconColor={UI_COLORS.violet} 
              iconBg="rgba(124,111,247,0.12)" 
              name="Edit profil" 
              sub="Nama, foto, nomor HP" 
              rightType="chevron" 
              onPress={() => navigation.navigate('Settings', { scrollToSection: 'profile' })}
            />
            <MenuItem 
              icon="lock-closed" 
              iconColor={UI_COLORS.mint} 
              iconBg="rgba(45,212,164,0.1)" 
              name="Keamanan & password" 
              sub="Ganti password, PIN konfirmasi" 
              rightType="chevron" 
              onPress={() => navigation.navigate('Settings', { scrollToSection: 'security' })}
            />
            <MenuItem 
              icon="finger-print" 
              iconColor={UI_COLORS.gold} 
              iconBg="rgba(245,200,66,0.1)" 
              name="Biometrik" 
              sub="Login dengan sidik jari / wajah" 
              rightType="toggle" 
              isLast 
            />
          </GlassCard>
        </View>

        {/* 3. PREFERENSI */}
        <View style={styles.sectionBlock}>
          <Text style={styles.secLbl}>PREFERENSI</Text>
          <GlassCard style={styles.cardContainer}>
            <MenuItem 
              icon="pricetag" 
              iconColor={UI_COLORS.red} 
              iconBg="rgba(255,107,107,0.1)" 
              name="Kategori transaksi" 
              sub="Tambah & kelola kategori" 
              rightType="badge-new" 
              rightValue="12 aktif" 
              onPress={() => navigation.navigate('CategorySettings')}
            />

            <MenuItem icon="notifications" iconColor={UI_COLORS.mint} iconBg="rgba(45,212,164,0.1)" name="Notifikasi" sub="Aktif: transfer, budget, hutang" rightType="toggle" />
            <MenuItem icon="moon" iconColor={UI_COLORS.violet} iconBg="rgba(124,111,247,0.1)" name="Tema gelap" sub="Dark mode aktif" rightType="toggle" />
            <MenuItem 
              icon="cash" 
              iconColor={UI_COLORS.textSub} 
              iconBg="rgba(255,255,255,0.06)" 
              name="Mata uang" 
              sub="Rupiah (IDR) — Rp 1.000" 
              rightType="chevron" 
              isLast 
              onPress={() => navigation.navigate('CurrencySettings')}
            />
          </GlassCard>
        </View>

        {/* 4. DATA & PRIVASI */}
        <View style={styles.sectionBlock}>
          <Text style={styles.secLbl}>DATA & PRIVASI</Text>
          <GlassCard style={styles.cardContainer}>
            <MenuItem 
              icon="download" 
              iconColor={UI_COLORS.mint} 
              iconBg="rgba(45,212,164,0.1)" 
              name="Export data saya" 
              sub="Download semua transaksi CSV/PDF" 
              rightType="chevron" 
              onPress={() => navigation.navigate('ExportData')}
            />
            <MenuItem icon="shield-checkmark" iconColor={UI_COLORS.textSub} iconBg="rgba(255,255,255,0.06)" name="Kebijakan privasi" sub="Cara kami menjaga datamu" rightType="external" />
            <MenuItem 
              icon="help-circle" 
              iconColor={UI_COLORS.textSub} 
              iconBg="rgba(255,255,255,0.06)" 
              name="Bantuan & FAQ" 
              sub="Panduan fitur & kontak support" 
              rightType="badge-notif" 
              rightValue="2 baru" 
              isLast 
              onPress={() => navigation.navigate('HelpSupport')}
            />
          </GlassCard>
        </View>

        {/* DANGER ZONE */}
        <View style={{ paddingHorizontal: 18, marginBottom: 16 }}>
          <TouchableOpacity 
            style={styles.btnDanger} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Logout', 'Anda akan keluar dari sesi ini setelah backend terhubung.')}
          >
            <Ionicons name="log-out-outline" size={18} color="#FF9090" />
            <Text style={styles.btnDangerTxt}>Keluar dari akun</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionTxt}>KasBon v1.0.0 · catat bareng, hemat bareng</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: UI_COLORS.bg,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 4,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  topbarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: UI_COLORS.border,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: UI_COLORS.violet,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: UI_COLORS.bg,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFF',
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: UI_COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: UI_COLORS.bg,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
    color: UI_COLORS.textSub,
    marginBottom: 10,
  },
  roleBadgeHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245,200,66,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(245,200,66,0.25)',
  },
  roleTxtHero: {
    fontSize: 11,
    color: UI_COLORS.gold,
    fontWeight: '600',
  },

  /* PREMIUM BANNER STYLES */
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245,200,66,0.08)',
    marginHorizontal: 18,
    marginBottom: 20,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245,200,66,0.3)',
  },
  premiumIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: UI_COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: UI_COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: UI_COLORS.gold,
    marginBottom: 2,
  },
  premiumSub: {
    fontSize: 11,
    color: UI_COLORS.textSub,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: UI_COLORS.card2,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: UI_COLORS.border,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLbl: {
    fontSize: 10,
    color: UI_COLORS.textSub,
    textAlign: 'center',
  },
  qrStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: UI_COLORS.card,
    marginHorizontal: 18,
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(245,200,66,0.25)',
  },
  qrPreviewBox: {
    width: 48,
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrInfo: {
    flex: 1,
  },
  qrTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 2,
  },
  qrSub: {
    fontSize: 11,
    color: UI_COLORS.textSub,
  },
  sectionBlock: {
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  secLbl: {
    fontSize: 11,
    color: UI_COLORS.textSub,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardContainer: {
    padding: 0, 
    borderRadius: 16,
    overflow: 'hidden',
  },
  /* MEMBER ROWS */
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.border,
  },
  mAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mInfo: {
    flex: 1,
  },
  mNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  mName: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  mRoleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  mMeta: {
    fontSize: 11,
    color: UI_COLORS.textSub,
  },
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  inviteCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(124,111,247,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(124,111,247,0.3)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.violet,
    marginBottom: 3,
  },
  /* MENU ROWS */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 14,
    fontWeight: '500',
    color: UI_COLORS.text,
    marginBottom: 2,
  },
  menuSub: {
    fontSize: 11,
    color: UI_COLORS.textSub,
  },
  toggleActive: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: UI_COLORS.mint,
    justifyContent: 'center',
    paddingHorizontal: 3,
    alignItems: 'flex-end', 
  },
  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: UI_COLORS.bg,
  },
  menuBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  menuBadgeTxt: {
    fontSize: 10,
    fontWeight: '600',
  },
  btnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,107,107,0.08)',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(255,107,107,0.2)',
  },
  btnDangerTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9090',
  },
  versionTxt: {
    textAlign: 'center',
    fontSize: 11,
    color: UI_COLORS.textSub,
    marginTop: 10,
  },
});