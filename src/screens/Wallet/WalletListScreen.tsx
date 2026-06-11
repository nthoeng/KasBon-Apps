import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

interface WalletItem {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  tags: Array<{ label: string; bg: string; color: string }>;
  balance: number;
  balanceColor?: string;
  subtitle: string;
  footerLeft?: string;
  footerLeftColor?: string;
  footerRight?: string;
  progress?: number;
  progressColor?: string;
  progressLabelRight?: string;
  highlight?: boolean;
  members?: Array<{ initials: string; gradient: string }>;
  onPress?: () => void;
}

const walletGroups = [
  {
    title: 'Bersama keluarga',
    count: 2,
    items: [
      {
        id: 'wallet-1',
        name: 'Kas keluarga',
        icon: 'home-outline',
        iconColor: colors.primary,
        iconBg: 'rgba(245,200,66,0.12)',
        tags: [
          { label: 'Kas tunai', bg: 'transparent', color: colors.textMuted },
          { label: 'Global — catat', bg: 'rgba(245,200,66,0.12)', color: colors.primary },
        ],
        members: [
          { initials: 'B', gradient: 'linear-gradient(135deg,#7C6FF7,#2DD4A4)' },
          { initials: 'I', gradient: 'linear-gradient(135deg,#F5C842,#FF6B6B)' },
        ],
        balance: 6800000,
        subtitle: '+Rp 500rb bulan ini',
        footerLeft: '28 transaksi bulan ini',
        footerRight: '',
        highlight: true,
      },
      {
        id: 'wallet-2',
        name: 'Dana darurat',
        icon: 'shield-outline',
        iconColor: colors.income,
        iconBg: 'rgba(45,212,164,0.1)',
        tags: [
          { label: 'Tabungan', bg: 'rgba(124,111,247,0.12)', color: colors.project },
          { label: 'Global — lihat', bg: 'rgba(45,212,164,0.1)', color: colors.income },
        ],
        balance: 2500000,
        subtitle: 'Progress target',
        progress: 25,
        progressColor: colors.income,
        progressLabelRight: '25% dari Rp 10jt',
        footerLeft: '+Rp 200rb',
      },
    ],
  },
  {
    title: 'Dompet pribadi',
    count: 3,
    items: [
      {
        id: 'wallet-3',
        name: 'BCA Bayu',
        icon: 'business-outline',
        iconColor: colors.income,
        iconBg: 'rgba(45,212,164,0.1)',
        tags: [
          { label: 'Rekening bank', bg: 'transparent', color: colors.textMuted },
          { label: 'Private', bg: 'rgba(255,255,255,0.06)', color: colors.textMuted },
        ],
        balance: 4100000,
        subtitle: '12 transaksi bulan ini',
      },
      {
        id: 'wallet-4',
        name: 'GoPay Istri',
        icon: 'phone-portrait-outline',
        iconColor: colors.project,
        iconBg: 'rgba(124,111,247,0.12)',
        tags: [
          { label: 'E-wallet', bg: 'transparent', color: colors.textMuted },
          { label: 'Private', bg: 'rgba(255,255,255,0.06)', color: colors.textMuted },
        ],
        balance: 850000,
        subtitle: '-Rp 120rb',
        footerLeft: '8 transaksi bulan ini',
      },
      {
        id: 'wallet-5',
        name: 'OVO Bayu',
        icon: 'phone-portrait-outline',
        iconColor: '#EF9F27',
        iconBg: 'rgba(186,117,23,0.12)',
        tags: [
          { label: 'E-wallet', bg: 'transparent', color: colors.textMuted },
          { label: 'Private', bg: 'rgba(255,255,255,0.06)', color: colors.textMuted },
        ],
        balance: 3200000,
        subtitle: '+Rp 300rb',
      },
    ],
  },
  {
    title: 'Tabungan & target',
    count: 2,
    items: [
      {
        id: 'wallet-6',
        name: 'Beli mobil',
        icon: 'car-outline',
        iconColor: colors.project,
        iconBg: 'rgba(124,111,247,0.12)',
        tags: [
          { label: 'Target: Rp 80jt', bg: 'transparent', color: colors.textMuted },
          { label: 'Tabungan', bg: 'rgba(124,111,247,0.15)', color: colors.project },
        ],
        balance: 4800000,
        subtitle: '6% tercapai',
        progress: 6,
        progressColor: colors.project,
        progressLabelRight: 'sisa Rp 75,2jt',
        footerLeft: '+Rp 500rb',
      },
      {
        id: 'wallet-7',
        name: 'Liburan keluarga',
        icon: 'airplane-outline',
        iconColor: colors.income,
        iconBg: 'rgba(45,212,164,0.1)',
        tags: [
          { label: 'Target: Rp 15jt', bg: 'transparent', color: colors.textMuted },
          { label: 'Tabungan', bg: 'rgba(45,212,164,0.1)', color: colors.income },
        ],
        balance: 500000,
        subtitle: '3% tercapai',
        progress: 3,
        progressColor: colors.income,
        progressLabelRight: 'sisa Rp 14,5jt',
        footerLeft: 'baru mulai',
      },
    ],
  },
  {
    title: 'Hutang & piutang',
    count: 1,
    items: [
      {
        id: 'wallet-8',
        name: 'Cicilan motor',
        icon: 'bicycle-outline',
        iconColor: colors.expense,
        iconBg: 'rgba(255,107,107,0.1)',
        tags: [
          { label: 'Jatuh tempo: 25 Jun', bg: 'transparent', color: colors.textMuted },
          { label: 'Hutang', bg: 'rgba(255,107,107,0.12)', color: colors.expense },
        ],
        balance: 8200000,
        balanceColor: colors.expense,
        subtitle: 'Terlunasi 63%',
        progress: 63,
        progressColor: colors.expense,
        progressLabelRight: '14 bulan lagi',
        footerLeft: 'cicilan Rp 800rb/bln',
      },
    ],
  },
];

interface WalletCardProps extends WalletItem {
  onPress?: () => void;
}

const WalletCard = ({
  name,
  icon,
  iconColor,
  iconBg,
  tags,
  balance,
  balanceColor,
  subtitle,
  footerLeft,
  footerLeftColor,
  footerRight,
  progress,
  progressColor,
  progressLabelRight,
  highlight,
  members,
  onPress,
}: WalletCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <GlassCard style={[styles.walletCard, highlight && styles.walletCardHighlight]}>
        <View style={styles.walletHeader}>
          <View style={styles.walletHeaderLeft}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}> 
              <Ionicons name={icon as any} size={18} color={iconColor} />
            </View>
            <View style={styles.walletMeta}>
              <Text style={styles.walletName}>{name}</Text>
              <View style={styles.walletTags}>
                {tags.map((tag) => (
                  <View key={tag.label} style={[styles.tag, { backgroundColor: tag.bg }]}> 
                    <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                  </View>
                ))}
              </View>
              {members?.length ? (
                <View style={styles.membersRow}>
                  {members.map((member) => (
                    <View key={member.initials} style={[styles.avatarXs, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
                      <Text style={styles.avatarText}>{member.initials}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={styles.chevronIcon} />
        </View>

        <Text style={[styles.walletBalance, balanceColor ? { color: balanceColor } : {}]}>
          <Text style={styles.walletBalanceCurrency}>Rp </Text>
          {balance.toLocaleString('id-ID')}
        </Text>

        {typeof progress === 'number' && (
          <View style={styles.progressBlock}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>{subtitle}</Text>
              <Text style={[styles.progressPercent, { color: progressColor }]}>{progressLabelRight ?? `${progress}% dari target`}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: progressColor }]} />
            </View>
          </View>
        )}

        {typeof progress !== 'number' && (
          <Text style={styles.walletSubtitle}>{subtitle}</Text>
        )}

        {(footerLeft || footerRight) ? (
          <View style={styles.walletFooter}>
            {footerLeft ? <Text style={[styles.walletFooterText, footerLeftColor ? { color: footerLeftColor } : {}]}>{footerLeft}</Text> : <View />}
            {footerRight ? <Text style={styles.walletFooterText}>{footerRight}</Text> : null}
          </View>
        ) : null}
      </GlassCard>
    </TouchableOpacity>
  );
};

export const WalletListScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}> 
        <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
        </TouchableOpacity>
        <View style={styles.headerTitleBlock}>
          <Text style={styles.title}>Dompet</Text>
          <Text style={styles.subtitle}>Total 7 dompet aktif</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('AddWallet')}>
          <Ionicons name="add" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total saldo semua dompet</Text>
          <Text style={styles.totalAmount}>
            <Text style={styles.totalCurrency}>Rp </Text>
            22.750.000
          </Text>
          <View style={styles.miniStats}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Dompet global</Text>
              <Text style={[styles.statValue, { color: colors.text } ]}>Rp 9.300.000</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Dompet pribadi</Text>
              <Text style={[styles.statValue, { color: colors.text } ]}>Rp 8.150.000</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Tabungan</Text>
              <Text style={[styles.statValue, { color: colors.text } ]}>Rp 5.300.000</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Sisa hutang</Text>
              <Text style={[styles.statValue, { color: colors.expense }]}>Rp 8.200.000</Text>
            </View>
          </View>
        </GlassCard>

        {walletGroups.map((group) => (
          <View key={group.title}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderTitle}>{group.title}</Text>
              <TouchableOpacity style={styles.sectionAdd} onPress={() => navigation.navigate('AddWallet')}>
                <Ionicons name="add" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            {group.items.map((wallet) => (
              <WalletCard key={wallet.id} {...wallet} onPress={() => navigation.navigate('WalletDetail')} />
            ))}
            <View style={styles.spacerSec} />
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.header2,
    flex: 1,
    textAlign: 'center',
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  totalCard: {
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  totalAmount: {
    ...typography.header1,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  totalCurrency: {
    ...typography.body2,
    color: colors.textMuted,
  },
  totalSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  miniStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  statValue: {
    ...typography.body2,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  sectionHeaderTitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  sectionCount: {
    ...typography.body2,
    color: colors.textMuted,
  },
  walletCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  walletCardHighlight: {
    borderColor: 'rgba(245,200,66,0.3)',
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  walletHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  walletMeta: {
    flex: 1,
  },
  walletName: {
    ...typography.body1,
    fontWeight: '700',
    marginBottom: 4,
  },
  walletTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  avatarXs: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.background,
    marginRight: -5,
  },
  avatarText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700',
  },
  tag: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginBottom: 4,
  },
  tagText: {
    ...typography.caption,
    fontWeight: '600',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  walletBalance: {
    ...typography.header3,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  walletBalanceCurrency: {
    ...typography.body2,
    color: colors.textMuted,
  },
  progressBlock: {
    marginBottom: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  progressPercent: {
    ...typography.caption,
    fontWeight: '700',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  walletSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  walletFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  walletFooterText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  sectionAdd: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(245,200,66,0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(245,200,66,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacerSec: {
    height: 6,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleBlock: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textDim,
    marginTop: 2,
  },
  addWalletText: {
    ...typography.body2,
    color: colors.textMuted,
    marginLeft: 8,
  },
});
