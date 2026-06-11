import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const transactionTypes = [
  {
    key: 'expense',
    label: 'Pengeluaran',
    tone: colors.expense,
    description: 'Uang keluar',
    icon: 'arrow-up-right',
    bg: 'rgba(255,107,107,0.08)',
    iconBg: 'rgba(255,107,107,0.15)',
  },
  {
    key: 'income',
    label: 'Pemasukan',
    tone: colors.income,
    description: 'Uang masuk',
    icon: 'arrow-down-left',
    bg: 'rgba(45,212,164,0.06)',
    iconBg: 'rgba(45,212,164,0.12)',
  },
  {
    key: 'transfer',
    label: 'Transfer',
    tone: colors.project,
    description: 'Pindah dompet',
    icon: 'swap-horizontal',
    bg: 'rgba(124,111,247,0.06)',
    iconBg: 'rgba(124,111,247,0.12)',
  },
];

const categories = [
  { label: 'Belanja', icon: 'cart-outline', color: colors.expense, bg: 'rgba(255,107,107,0.12)' },
  { label: 'Makan', icon: 'restaurant-outline', color: colors.primary, bg: 'rgba(245,200,66,0.1)' },
  { label: 'Transport', icon: 'car-outline', color: colors.income, bg: 'rgba(45,212,164,0.1)' },
  { label: 'Tagihan', icon: 'flash-outline', color: colors.project, bg: 'rgba(124,111,247,0.1)' },
  { label: 'Kesehatan', icon: 'heart-outline', color: colors.income, bg: 'rgba(45,212,164,0.1)' },
  { label: 'Hiburan', icon: 'game-controller-outline', color: colors.expense, bg: 'rgba(255,107,107,0.1)' },
  { label: 'Lainnya', icon: 'ellipse-outline', color: colors.textMuted, bg: 'rgba(255,255,255,0.06)' },
];

const recentItems = [
  { label: 'Makan siang', amount: '-Rp 35.000', icon: 'restaurant-outline', color: colors.primary },
  { label: 'Indomaret', amount: '-Rp 87.500', icon: 'cart-outline', color: colors.expense },
  { label: 'Listrik PLN', amount: '-Rp 185.000', icon: 'flash-outline', color: colors.project },
  { label: 'Bensin', amount: '-Rp 100.000', icon: 'car-outline', color: colors.income },
];

export const TransactionTypeSelectionScreen = ({ navigation }: any) => {
  const [type, setType] = useState<'expense' | 'income' | 'transfer'>('expense');
  const [category, setCategory] = useState(categories[0].label);

  const selectedType = transactionTypes.find((item) => item.key === type)!;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.dimmedBg}>
          <View style={styles.peekBlock}>
            <View style={styles.peekRow}>
              <View>
                <Text style={styles.peekLabel}>Saldo keluarga</Text>
                <Text style={styles.peekAmount}>Rp 14.250.000</Text>
              </View>
              <View style={styles.peekBell}>
                <Ionicons name="notifications-outline" size={18} color={colors.textDim} />
              </View>
            </View>
            <View style={styles.peekMiniGrid}>
              <View style={styles.peekMini}>
                <Text style={styles.peekMiniLabel}>Pemasukan</Text>
                <Text style={[styles.peekMiniValue, { color: colors.income }]}>Rp 8,5jt</Text>
              </View>
              <View style={styles.peekMini}>
                <Text style={styles.peekMiniLabel}>Pengeluaran</Text>
                <Text style={[styles.peekMiniValue, { color: colors.expense }]}>Rp 4,25jt</Text>
              </View>
            </View>
          </View>

          <View style={styles.sheet}>
            <View style={styles.pillHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Catat transaksi</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={16} color={colors.textDim} />
              </TouchableOpacity>
            </View>

            <View style={styles.typeGrid}>
              {transactionTypes.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.typeCard,
                    { backgroundColor: item.bg, borderColor: type === item.key ? item.tone : 'transparent' },
                  ]}
                  onPress={() => setType(item.key as any)}
                >
                  <View style={[styles.typeIcon, { backgroundColor: item.iconBg }]}> 
                    <Ionicons name={item.icon as any} size={20} color={item.tone} />
                  </View>
                  <Text style={[styles.typeLabel, { color: item.tone }]}>{item.label}</Text>
                  <Text style={[styles.typeDesc, { color: item.tone, opacity: 0.7 }]}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Kategori cepat — {selectedType.key === 'expense' ? 'pengeluaran' : selectedType.key === 'income' ? 'pemasukan' : 'transfer'}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
              {categories.map((item) => (
                <TouchableOpacity key={item.label} style={styles.categoryChip} onPress={() => setCategory(item.label)}>
                  <View style={[styles.categoryIcon, { backgroundColor: item.bg }]}>
                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={styles.categoryLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.sectionLabel, { paddingTop: spacing.lg }]}>Dari dompet</Text>
            <TouchableOpacity style={styles.walletRow}>
              <View style={[styles.walletIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}>
                <Ionicons name="home-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>Kas keluarga</Text>
                <Text style={styles.walletBalanceText}>Rp 6.800.000 tersedia</Text>
              </View>
              <View style={styles.walletBadge}>
                <Text style={styles.walletBadgeText}>Aktif</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
            </TouchableOpacity>

            <Text style={[styles.sectionLabel, { paddingTop: spacing.lg }]}>Transaksi serupa terakhir</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll} contentContainerStyle={styles.recentContent}>
              {recentItems.map((item) => (
                <TouchableOpacity key={item.label} style={styles.recentChip}>
                  <View style={styles.recentHeader}>
                    <Ionicons name={item.icon as any} size={14} color={item.color} />
                    <Text style={styles.recentName}>{item.label}</Text>
                  </View>
                  <Text style={[styles.recentAmount, { color: item.color }]}>{item.amount}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: selectedType.tone }]}
              onPress={() => navigation.navigate('AddTransaction', { type })}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.background} />
              <Text style={styles.primaryButtonText}>Lanjut isi detail</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: spacing.sm,
  },
  dimmedBg: {
    backgroundColor: '#060E1A',
    paddingTop: spacing.sm,
  },
  peekBlock: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    opacity: 0.95,
  },
  peekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  peekLabel: {
    ...typography.caption,
    color: colors.textDim,
    marginBottom: 4,
  },
  peekAmount: {
    ...typography.header2,
    fontWeight: '700',
    color: colors.text,
  },
  peekBell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  peekMiniGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  peekMini: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  peekMiniLabel: {
    ...typography.caption,
    color: colors.textDim,
    marginBottom: 4,
  },
  peekMiniValue: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.text,
  },
  sheet: {
    backgroundColor: '#111E30',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  pillHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  sheetTitle: {
    ...typography.header3,
    color: colors.text,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  typeCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    borderWidth: 1.5,
    marginRight: spacing.sm,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  typeLabel: {
    ...typography.body2,
    fontWeight: '700',
    marginBottom: 4,
  },
  typeDesc: {
    ...typography.caption,
    textAlign: 'center',
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  categoryScroll: {
    paddingLeft: spacing.lg,
    paddingTop: spacing.xs,
  },
  categoryContent: {
    paddingRight: spacing.lg,
  },
  categoryChip: {
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    ...typography.caption,
    color: colors.textDim,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
    marginTop: spacing.sm,
  },
  walletIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.text,
  },
  walletBalanceText: {
    ...typography.caption,
    color: colors.textDim,
    marginTop: 2,
  },
  walletBadge: {
    backgroundColor: 'rgba(245,200,66,0.12)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: spacing.sm,
  },
  walletBadgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  recentScroll: {
    paddingLeft: spacing.lg,
    paddingTop: spacing.xs,
  },
  recentContent: {
    paddingRight: spacing.lg,
  },
  recentChip: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentName: {
    ...typography.caption,
    color: colors.text,
  },
  recentAmount: {
    ...typography.caption,
    color: colors.expense,
    marginTop: 2,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.background,
    marginLeft: 8,
  },
});
