import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { AmountText } from '../../components/ui/AmountText';
import { TransactionItem } from '../../components/ui/TransactionItem';

const walletData = [
  {
    id: 'wallet-1',
    name: 'Kas keluarga',
    balance: 6800000,
    subtitle: 'Tunai bersama',
    badge: 'Global',
    badgeColor: colors.tagGlobal,
    icon: 'home-outline',
  },
  {
    id: 'wallet-2',
    name: 'BCA Bayu',
    balance: 4100000,
    subtitle: 'Rekening bank',
    badge: 'Private',
    badgeColor: colors.tagPrivate,
    icon: 'business-outline',
  },
  {
    id: 'wallet-3',
    name: 'GoPay Istri',
    balance: 850000,
    subtitle: 'E-wallet',
    badge: 'Private',
    badgeColor: colors.tagPrivate,
    icon: 'phone-portrait-outline',
  },
  {
    id: 'wallet-4',
    name: 'Dana darurat',
    balance: 2500000,
    subtitle: 'Target Rp 10jt',
    badge: 'Global',
    badgeColor: colors.tagGlobal,
    icon: 'wallet-outline',
  },
];

const quickActions = [
  {
    id: 'action-1',
    label: 'Catat keluar',
    icon: 'remove',
    iconColor: colors.expense,
    backgroundColor: 'rgba(255,107,107,0.15)',
    screen: 'Add',
    params: { type: 'expense' },
  },
  {
    id: 'action-2',
    label: 'Catat masuk',
    icon: 'add',
    iconColor: colors.income,
    backgroundColor: 'rgba(45,212,164,0.15)',
    screen: 'Add',
    params: { type: 'income' },
  },
  {
    id: 'action-3',
    label: 'Transfer',
    icon: 'swap-horizontal',
    iconColor: colors.primary,
    backgroundColor: 'rgba(245,200,66,0.15)',
    screen: 'Add',
    params: { type: 'transfer' },
  },
  {
    id: 'action-4',
    label: 'Project',
    icon: 'rocket-outline',
    iconColor: colors.project,
    backgroundColor: 'rgba(124,111,247,0.15)',
    screen: 'Projects',
  },
];

type TransactionType = 'income' | 'expense' | 'transfer';

const recentTransactions: Array<{
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
}> = [
  {
    id: 'tx-1',
    title: 'Beli Token Listrik',
    category: 'Utilitas',
    amount: 200000,
    type: 'expense',
    date: '14:30',
  },
  {
    id: 'tx-2',
    title: 'Makan Siang GrabFood',
    category: 'Makanan',
    amount: 85000,
    type: 'expense',
    date: '12:00',
  },
  {
    id: 'tx-3',
    title: 'Gaji Bulan Oktober',
    category: 'Gaji',
    amount: 15000000,
    type: 'income',
    date: '09:00',
  },
  {
    id: 'tx-4',
    title: 'Transfer ke Jajan Ayah',
    category: 'Transfer',
    amount: 1500000,
    type: 'transfer',
    date: '10:30',
  },
];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingLabel}>Selamat pagi,</Text>
            <Text style={styles.greeting}>Bayu</Text>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={18} color={colors.textMuted} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>B</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}> 
            <Text style={styles.heroTag}>Saldo dompet keluarga</Text>
            <Text style={styles.heroMeta}>Diperbarui barusan · Juni 2025</Text>
          </View>
          <Text style={styles.heroBalance}>Rp 14.250.000</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statBadge, { backgroundColor: colors.tagIncome }]} />
              <Text style={styles.statLabel}>Pemasukan</Text>
              <Text style={[styles.statValue, { color: colors.income }]}>Rp 8.500.000</Text>
              <Text style={styles.statNote}>+12% vs bulan lalu</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statBadge, { backgroundColor: colors.tagExpense }]} />
              <Text style={styles.statLabel}>Pengeluaran</Text>
              <Text style={[styles.statValue, { color: colors.expense }]}>Rp 4.250.000</Text>
              <Text style={styles.statNote}>-5% vs bulan lalu</Text>
            </View>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>Budget bulan ini</Text>
            <Text style={styles.progressTag}>68% terpakai</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '68%' }]} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dompet saya</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallets')}>
            <Text style={styles.sectionLink}>Lihat semua ↗</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.walletScroll}
        >
          {walletData.map((wallet) => (
            <TouchableOpacity key={wallet.id} style={styles.walletCard} activeOpacity={0.85}>
              <View style={styles.walletHeader}>
                <View style={[styles.walletIcon, { backgroundColor: wallet.badgeColor }]}>
                  <Ionicons name={wallet.icon as any} size={18} color={colors.text} />
                </View>
                <Text style={styles.walletBadge}>{wallet.badge}</Text>
              </View>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <Text style={styles.walletBalance}>{`Rp ${wallet.balance.toLocaleString('id-ID')}`}</Text>
              <Text style={styles.walletSubtitle}>{wallet.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Aksi cepat</Text>
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(action.screen, action.params)}
            >
              <View style={[styles.quickIcon, { backgroundColor: action.backgroundColor }]}>
                <Ionicons name={action.icon as any} size={18} color={action.iconColor} />
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Insight bulan ini</Text>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightRow}>
            <View style={styles.insightIcon}>
              <Ionicons name="bulb-outline" size={18} color={colors.project} />
            </View>
            <View style={styles.insightText}>
              <Text style={styles.insightTitle}>Pengeluaran makan turun 18%</Text>
              <Text style={styles.insightSub}>Hemat Rp 320rb dibanding Mei. Pertahankan!</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aktivitas terbaru</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.sectionLink}>Semua ↗</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {recentTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              title={item.title}
              category={item.category}
              amount={item.amount}
              type={item.type}
              date={item.date}
              onPress={() => navigation.navigate('TransactionDetail')}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aktivitas anggota</Text>
        </View>

        <View style={styles.membersColumn}>
          <View style={styles.memberRow}>
            <View style={[styles.avatar, { backgroundColor: colors.tagProject }]}> 
              <Text style={styles.avatarText}>B</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Bayu</Text>
              <Text style={styles.memberLast}>Terakhir: Transfer kas · tadi</Text>
            </View>
            <Text style={styles.memberTx}>12 tx</Text>
          </View>
          <View style={styles.memberRowLast}>
            <View style={[styles.avatar, { backgroundColor: colors.tagIncome }]}> 
              <Text style={styles.avatarText}>I</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Istri</Text>
              <Text style={styles.memberLast}>Terakhir: Belanja · 11:24</Text>
            </View>
            <Text style={styles.memberTx}>8 tx</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greetingLabel: {
    ...typography.body2,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  greeting: {
    ...typography.header2,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.expense,
    borderWidth: 1,
    borderColor: colors.background,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.tagProject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.project,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroTop: {
    marginBottom: spacing.md,
  },
  heroTag: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  heroMeta: {
    ...typography.body2,
    color: colors.textMuted,
  },
  heroBalance: {
    ...typography.header1,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: spacing.sm,
  },
  statBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
  statValue: {
    ...typography.body1,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statNote: {
    ...typography.caption,
    color: colors.textMuted,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  progressTag: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.glassDarker,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.header3,
  },
  sectionLink: {
    ...typography.body2,
    color: colors.project,
    fontWeight: '600',
  },
  walletScroll: {
    paddingBottom: spacing.sm,
    marginBottom: spacing.xl,
  },
  walletCard: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  walletIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletBadge: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  walletName: {
    ...typography.body1,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  walletBalance: {
    ...typography.header3,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  walletSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  quickButton: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickLabel: {
    ...typography.body2,
    color: colors.text,
  },
  transactionsList: {
    marginBottom: spacing.xl,
  },
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(124,111,247,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  insightSub: {
    ...typography.caption,
    color: colors.textMuted,
  },
  membersColumn: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  memberRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...typography.body2,
    fontWeight: '700',
    color: colors.text,
  },
  memberLast: {
    ...typography.caption,
    color: colors.textMuted,
  },
  memberTx: {
    ...typography.body2,
    color: colors.textMuted,
  },
});