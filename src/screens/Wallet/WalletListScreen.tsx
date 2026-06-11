import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';

interface WalletItem {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  tags: Array<{ label: string; bg: string; color: string }>;
  balance: number;
  subtitle: string;
  footerLeft: string;
  footerLeftColor?: string;
  footerRight: string;
  progress?: number;
  progressColor?: string;
  highlight?: boolean;
  onPress?: () => void;
}

const walletGroups = [
  {
    title: 'Dompet Bersama',
    count: 3,
    items: [
      {
        id: 'wallet-1',
        name: 'Kas keluarga',
        icon: 'home-outline',
        iconColor: colors.primary,
        iconBg: 'rgba(245,200,66,0.12)',
        tags: [
          { label: 'Global · catat', bg: 'rgba(245,200,66,0.12)', color: colors.primary },
          { label: 'Tunai', bg: 'transparent', color: colors.textMuted },
        ],
        balance: 6800000,
        subtitle: '28 transaksi bulan ini',
        footerLeft: '28 transaksi bulan ini',
        footerRight: '',
        highlight: true,
        onPress: undefined,
      },
      {
        id: 'wallet-2',
        name: 'Dana darurat',
        icon: 'shield-outline',
        iconColor: colors.income,
        iconBg: 'rgba(45,212,164,0.1)',
        tags: [
          { label: 'Global · lihat', bg: 'rgba(45,212,164,0.1)', color: colors.income },
          { label: 'Tabungan', bg: 'rgba(124,111,247,0.12)', color: colors.project },
        ],
        balance: 2500000,
        subtitle: '25% dari Rp 10jt',
        progress: 25,
        progressColor: colors.income,
        footerLeft: 'Estimasi tercapai: Des 2026',
        footerLeftColor: colors.income,
        footerRight: '+Rp 250rb/bln',
      },
      {
        id: 'wallet-3',
        name: 'Nabung beli mobil',
        icon: 'car-outline',
        iconColor: colors.project,
        iconBg: 'rgba(124,111,247,0.1)',
        tags: [
          { label: 'Global · catat', bg: 'rgba(124,111,247,0.1)', color: colors.project },
          { label: 'Tabungan', bg: 'rgba(124,111,247,0.1)', color: colors.project },
        ],
        balance: 4200000,
        subtitle: '14% dari Rp 30jt',
        progress: 14,
        progressColor: colors.project,
        footerLeft: 'Estimasi tercapai: Mar 2027',
        footerLeftColor: colors.project,
        footerRight: '+Rp 1jt/bln',
      },
    ],
  },
  {
    title: 'Dompet pribadi',
    count: 3,
    items: [
      {
        id: 'wallet-4',
        name: 'BCA Bayu',
        icon: 'business-outline',
        iconColor: colors.income,
        iconBg: 'rgba(45,212,164,0.1)',
        tags: [
          { label: 'Private', bg: 'rgba(255,255,255,0.07)', color: colors.textMuted },
          { label: 'Rekening bank', bg: 'transparent', color: colors.textMuted },
        ],
        balance: 4100000,
        subtitle: '12 transaksi bulan ini',
        footerLeft: '12 transaksi bulan ini',
        footerRight: '',
      },
      {
        id: 'wallet-5',
        name: 'GoPay Istri',
        icon: 'phone-portrait-outline',
        iconColor: colors.project,
        iconBg: 'rgba(124,111,247,0.1)',
        tags: [
          { label: 'Private', bg: 'rgba(255,255,255,0.07)', color: colors.textMuted },
          { label: 'E-wallet', bg: 'transparent', color: colors.textMuted },
        ],
        balance: 850000,
        subtitle: '8 transaksi bulan ini',
        footerLeft: '8 transaksi bulan ini',
        footerRight: '',
      },
      {
        id: 'wallet-6',
        name: 'Cicilan motor',
        icon: 'card-outline',
        iconColor: colors.expense,
        iconBg: 'rgba(255,107,107,0.1)',
        tags: [
          { label: 'Private', bg: 'rgba(255,255,255,0.07)', color: colors.textMuted },
          { label: 'Hutang', bg: 'rgba(255,107,107,0.12)', color: colors.expense },
        ],
        balance: 8400000,
        subtitle: 'Rp 700rb/bln',
        progress: 60,
        progressColor: colors.expense,
        footerLeft: 'Jatuh tempo: 25 Juli 2025',
        footerLeftColor: colors.expense,
        footerRight: '',
      },
    ],
  },
];

const filters = ['Semua', 'Global', 'Private', 'Tabungan', 'Hutang'];

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
  subtitle,
  footerLeft,
  footerLeftColor,
  footerRight,
  progress,
  progressColor,
  highlight,
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
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={styles.chevronIcon} />
        </View>

        <Text style={styles.walletBalance}>
          <Text style={styles.walletBalanceCurrency}>Rp </Text>
          {balance.toLocaleString('id-ID')}
        </Text>

        {typeof progress === 'number' && (
          <View style={styles.progressBlock}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>{subtitle}</Text>
              <Text style={[styles.progressPercent, { color: progressColor }]}>{progress}% dari target</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: progressColor }]} />
            </View>
          </View>
        )}

        {typeof progress !== 'number' && (
          <Text style={styles.walletSubtitle}>{subtitle}</Text>
        )}

        <View style={styles.walletFooter}>
          <Text style={[styles.walletFooterText, footerLeftColor ? { color: footerLeftColor } : {}]}>{footerLeft}</Text>
          {footerRight ? <Text style={styles.walletFooterText}>{footerRight}</Text> : null}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

export const WalletListScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}> 
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={colors.textMuted} />
        </TouchableOpacity>
        <Text style={styles.title}>Dompet saya</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddWallet')}>
          <Ionicons name="add" size={18} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total semua dompet (yang terlihat)</Text>
          <Text style={styles.totalAmount}>
            <Text style={styles.totalCurrency}>Rp </Text>
            14.250.000
          </Text>
          <Text style={styles.totalSub}>7 dompet aktif · Diperbarui barusan</Text>
          <View style={styles.totalStats}>
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={[styles.statDot, { backgroundColor: colors.income }]} />
                <Text style={styles.statLabel}>Global</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.income }]}>3 dompet</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={[styles.statDot, { backgroundColor: colors.textMuted }]} />
                <Text style={styles.statLabel}>Private</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.textMuted }]}>4 dompet</Text>
            </View>
          </View>
        </GlassCard>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
          {filters.map((filter) => (
            <View key={filter} style={[styles.filterChip, filter === 'Semua' ? styles.filterActive : styles.filterIdle]}>
              <Text style={filter === 'Semua' ? styles.filterActiveText : styles.filterIdleText}>{filter}</Text>
            </View>
          ))}
        </ScrollView>

        {walletGroups.map((group) => (
          <View key={group.title}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderTitle}>{group.title}</Text>
              <Text style={styles.sectionCount}>{group.count} dompet</Text>
            </View>
            {group.items.map((wallet) => (
              <WalletCard key={wallet.id} {...wallet} onPress={() => navigation.navigate('WalletDetail')} />
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.addWalletBtn} onPress={() => navigation.navigate('AddWallet')}>
          <Ionicons name="add" size={16} color={colors.textMuted} />
          <Text style={styles.addWalletText}>Tambah dompet baru</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
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
  totalStats: {
    flexDirection: 'row',
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
  filterRow: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  filterContent: {
    paddingHorizontal: 2,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 0.5,
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterIdle: {
    backgroundColor: 'transparent',
    borderColor: colors.borderLight,
  },
  filterActiveText: {
    ...typography.body2,
    color: colors.background,
  },
  filterIdleText: {
    ...typography.body2,
    color: colors.textMuted,
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
  addWalletBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWalletText: {
    ...typography.body2,
    color: colors.textMuted,
    marginLeft: 8,
