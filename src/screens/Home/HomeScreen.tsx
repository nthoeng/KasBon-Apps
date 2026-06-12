import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// ✅ MENGGUNAKAN THEME GLOBAL (UI FOUNDATION)
import { theme } from '../../theme';

// ✅ MENGGUNAKAN STABLE UI COMPONENTS
import { AmountText } from '../../components/ui/AmountText';
import { TransactionItem } from '../../components/ui/TransactionItem';
import { GlassCard } from '../../components/ui/GlassCard';

// Ekstrak theme untuk digunakan di StyleSheet
const { colors, spacing, typography } = theme;

// --- MOCK DATA BERDASARKAN MOCKUP ---
const walletData = [
  { id: 'w1', name: 'Kas keluarga', balance: 6800000, subtitle: 'Tunai bersama', badge: 'Global', icon: 'home', color: '#F5C842', bg: 'rgba(245,200,66,0.15)' },
  { id: 'w2', name: 'BCA Bayu', balance: 4100000, subtitle: 'Rekening bank', badge: 'Private', icon: 'business', color: '#2DD4A4', bg: 'rgba(45,212,164,0.12)' },
  { id: 'w3', name: 'GoPay Istri', balance: 850000, subtitle: 'E-wallet', badge: 'Private', icon: 'phone-portrait', color: '#7C6FF7', bg: 'rgba(124,111,247,0.12)' },
  { id: 'w4', name: 'Dana darurat', balance: 2500000, subtitle: 'Target Rp 10jt', badge: 'Global', icon: 'wallet', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' },
];

const quickActions = [
  { id: 'q1', label: 'Catat keluar', icon: 'remove', color: '#FF6B6B', bg: 'rgba(255,107,107,0.15)', screen: 'Add', params: { type: 'expense' } },
  { id: 'q2', label: 'Catat masuk', icon: 'add', color: '#2DD4A4', bg: 'rgba(45,212,164,0.15)', screen: 'Add', params: { type: 'income' } },
  { id: 'q3', label: 'Transfer QR', icon: 'qr-code', color: '#F5C842', bg: 'rgba(245,200,66,0.15)', screen: 'Add', params: { type: 'transfer' } },
  { id: 'q4', label: 'Statistik', icon: 'bar-chart', color: '#7C6FF7', bg: 'rgba(124,111,247,0.15)', screen: 'Statistics' },
];

const recentTransactions: any[] = [
  { id: 't1', title: 'Belanja Indomaret', category: 'Istri · Kas keluarga', amount: -87500, type: 'expense', date: '11:24', icon: 'cart' },
  { id: 't2', title: 'Gaji Juni', category: 'Bayu · BCA Bayu', amount: 6500000, type: 'income', date: 'Kemarin', icon: 'briefcase' },
  { id: 't3', title: 'Transfer ke kas keluarga', category: 'Bayu · via QR', amount: -2000000, type: 'transfer', date: 'Kemarin', icon: 'swap-horizontal' },
  { id: 't4', title: 'Listrik PLN', category: 'Bayu · GoPay Istri', amount: -18500, type: 'expense', date: '2 hari lalu', icon: 'flash' },
];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingSub}>Selamat pagi,</Text>
            <Text style={styles.greetingName}>Bayu</Text>
          </View>
          <View style={styles.topbarRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={colors.textSecondary || '#8FA8CC'} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>B</Text>
            </View>
          </View>
        </View>

        {/* HERO CARD (MENGGUNAKAN GLASS CARD & AMOUNT TEXT) */}
        <View style={styles.heroWrapper}>
          <GlassCard>
            <Text style={styles.heroLabel}>Saldo dompet keluarga</Text>
            <AmountText amount={14250000} type="balance" />
            <Text style={styles.heroSub}>Diperbarui barusan · Juni 2025</Text>
            
            <View style={styles.heroStats}>
              <View style={styles.hStat}>
                <View style={styles.hStatRow}>
                  <View style={[styles.hStatDot, { backgroundColor: colors.income || '#2DD4A4' }]} />
                  <Text style={styles.hStatLbl}>Pemasukan</Text>
                </View>
                <AmountText amount={8500000} type="income" />
                <Text style={styles.hStatChange}>+12% vs bulan lalu</Text>
              </View>
              <View style={styles.hStat}>
                <View style={styles.hStatRow}>
                  <View style={[styles.hStatDot, { backgroundColor: colors.expense || '#FF6B6B' }]} />
                  <Text style={styles.hStatLbl}>Pengeluaran</Text>
                </View>
                <AmountText amount={4250000} type="expense" />
                <Text style={styles.hStatChange}>-5% vs bulan lalu</Text>
              </View>
            </View>

            <View style={styles.budgetRow}>
              <View style={styles.budgetLblWrap}>
                <Text style={styles.budgetLbl}>Budget bulan ini</Text>
                <Text style={styles.budgetTag}>68% terpakai</Text>
              </View>
              <View style={styles.budgetBar}>
                <View style={[styles.budgetFill, { width: '68%' }]} />
              </View>
            </View>
          </GlassCard>
        </View>

        {/* DOMPET SAYA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Dompet saya</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallets')}>
            <Text style={styles.secLink}>Lihat semua ↗</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.walletsScroll}>
          {walletData.map((w) => (
            <TouchableOpacity key={w.id} style={styles.walletChip} activeOpacity={0.8}>
              <View style={styles.wcTop}>
                <View style={[styles.wcIcon, { backgroundColor: w.bg }]}>
                  <Ionicons name={w.icon as any} size={14} color={w.color} />
                </View>
                <Text style={styles.wcName}>{w.name}</Text>
              </View>
              <Text style={styles.wcSaldo}>Rp {w.balance.toLocaleString('id-ID')}</Text>
              <Text style={styles.wcSub}>{w.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* AKSI CEPAT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aksi cepat</Text>
        </View>
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.qBtn} activeOpacity={0.8} onPress={() => navigation.navigate(action.screen, action.params)}>
              <View style={[styles.qBtnIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon as any} size={20} color={action.color} />
              </View>
              <Text style={styles.qBtnLbl}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INSIGHT (MENGGUNAKAN GLASS CARD) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Insight bulan ini</Text>
        </View>
        <View style={styles.insightWrapper}>
          <GlassCard>
            <View style={styles.insightRow}>
              <View style={styles.insightIcon}>
                <Ionicons name="bulb" size={20} color={colors.primary || '#7C6FF7'} />
              </View>
              <View style={styles.insightTextWrap}>
                <Text style={styles.insightTitle}>Pengeluaran makan turun 18%</Text>
                <Text style={styles.insightSub}>Hemat Rp 320rb dibanding Mei. Pertahankan!</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* AKTIVITAS TERBARU (MENGGUNAKAN TRANSACTION ITEM) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aktivitas terbaru</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.secLink}>Semua ↗</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.txList}>
          {recentTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              title={tx.title}
              category={tx.category}
              amount={tx.amount}
              type={tx.type}
              date={tx.date}
            />
          ))}
        </View>

        {/* AKTIVITAS ANGGOTA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aktivitas anggota</Text>
        </View>
        <View style={styles.membersRow}>
          <View style={styles.memberItem}>
            <View style={[styles.memberAvatar, { backgroundColor: '#7C6FF7' }]}>
              <Text style={styles.memberAvatarText}>B</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Bayu</Text>
              <Text style={styles.memberLast}>Terakhir: Transfer kas · tadi</Text>
            </View>
            <Text style={styles.memberTx}>12 tx</Text>
          </View>
          <View style={[styles.memberItem, { borderBottomWidth: 0 }]}>
            <View style={[styles.memberAvatar, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.memberAvatarText}>I</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Istri</Text>
              <Text style={styles.memberLast}>Terakhir: Belanja · 11:24</Text>
            </View>
            <Text style={styles.memberTx}>8 tx</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || '#0A1628',
  },
  container: {
    paddingBottom: 90,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greetingSub: {
    fontSize: 12,
    color: colors.textSecondary || '#8FA8CC',
  },
  greetingName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  topbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface || '#152238',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.expense || '#FF6B6B',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary || '#7C6FF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  heroLabel: {
    fontSize: 12,
    color: colors.textSecondary || '#8FA8CC',
    marginBottom: 4,
  },
  heroSub: {
    fontSize: 11,
    color: '#4A6080',
    marginTop: 4,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  hStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  hStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  hStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  hStatLbl: {
    fontSize: 11,
    color: colors.textSecondary || '#8FA8CC',
  },
  hStatChange: {
    fontSize: 10,
    color: '#4A6080',
    marginTop: 2,
  },
  budgetRow: {
    marginTop: 16,
  },
  budgetLblWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  budgetLbl: {
    fontSize: 11,
    color: colors.textSecondary || '#8FA8CC',
  },
  budgetTag: {
    fontSize: 11,
    color: '#F5C842',
    fontWeight: '500',
  },
  budgetBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
  },
  budgetFill: {
    height: 6,
    backgroundColor: '#F5C842',
    borderRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  secTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  secLink: {
    fontSize: 12,
    color: colors.primary || '#7C6FF7',
    fontWeight: '500',
  },
  walletsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  walletChip: {
    backgroundColor: colors.surface || '#152238',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.14)',
    padding: 14,
    minWidth: 140,
    marginRight: 12,
  },
  wcTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  wcIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wcName: {
    fontSize: 12,
    color: colors.textSecondary || '#8FA8CC',
    flex: 1,
  },
  wcSaldo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  wcSub: {
    fontSize: 11,
    color: '#4A6080',
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  qBtn: {
    width: '23%',
    backgroundColor: colors.surface || '#152238',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },
  qBtnIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qBtnLbl: {
    fontSize: 11,
    color: colors.textSecondary || '#8FA8CC',
    textAlign: 'center',
  },
  insightWrapper: {
    paddingHorizontal: 16,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(124,111,247,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTextWrap: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  insightSub: {
    fontSize: 11,
    color: colors.textSecondary || '#8FA8CC',
    marginTop: 2,
  },
  txList: {
    paddingHorizontal: 16,
  },
  membersRow: {
    paddingHorizontal: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    color: colors.textPrimary || '#F0F4FF',
    fontWeight: '500',
  },
  memberLast: {
    fontSize: 11,
    color: '#4A6080',
    marginTop: 2,
  },
  memberTx: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary || '#8FA8CC',
  },
});