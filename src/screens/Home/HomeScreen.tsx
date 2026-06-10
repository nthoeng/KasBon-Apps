import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';
import { TransactionItem } from '../../components/ui/TransactionItem';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, Keluarga KasBon! 👋</Text>
            <Text style={styles.dateText}>Oktober 2026</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <GlassCard style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Saldo Tersedia</Text>
          <AmountText amount={12500000} type="income" style={styles.balanceAmount} />
          
          <View style={styles.budgetRow}>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetLabel}>Pengeluaran Bulan Ini</Text>
              <Text style={styles.budgetAmount}>Rp 4.500.000</Text>
            </View>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetLabel}>Sisa Budget</Text>
              <Text style={styles.budgetAmount}>Rp 2.500.000</Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>65% dari budget bulanan terpakai</Text>
        </GlassCard>

        {/* Quick Actions (Optional, since we have Bottom Tabs, but we can add secondary actions) */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: colors.tagIncome }]}>
              <Ionicons name="arrow-down" size={20} color={colors.income} />
            </View>
            <Text style={styles.actionText}>Terima</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: colors.tagExpense }]}>
              <Ionicons name="arrow-up" size={20} color={colors.expense} />
            </View>
            <Text style={styles.actionText}>Kirim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: colors.tagGlobal }]}>
              <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: colors.tagProject }]}>
              <Ionicons name="pie-chart" size={20} color={colors.project} />
            </View>
            <Text style={styles.actionText}>Analitik</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          <TransactionItem 
            title="Beli Token Listrik"
            category="Utilitas"
            amount={200000}
            type="expense"
            date="Hari ini, 14:30"
          />
          <TransactionItem 
            title="Gaji Bulan Oktober"
            category="Gaji"
            amount={15000000}
            type="income"
            date="Kemarin, 09:00"
          />
          <TransactionItem 
            title="Transfer ke Tabungan Liburan"
            category="Project"
            amount={1000000}
            type="transfer"
            date="10 Okt 2026"
          />
          <TransactionItem 
            title="Belanja Bulanan"
            category="Kebutuhan"
            amount={1250000}
            type="expense"
            date="08 Okt 2026"
          />
        </View>

        {/* Extra spacing for Bottom Tab Bar */}
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
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.header2,
    marginBottom: 4,
  },
  dateText: {
    ...typography.body2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  balanceCard: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  balanceLabel: {
    ...typography.body2,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    ...typography.header1,
    marginBottom: spacing.lg,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  budgetInfo: {},
  budgetLabel: {
    ...typography.caption,
    marginBottom: 4,
  },
  budgetAmount: {
    ...typography.body1,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.glassDarker,
    borderRadius: 3,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.expense,
    borderRadius: 3,
  },
  progressText: {
    ...typography.caption,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionText: {
    ...typography.caption,
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
  seeAllText: {
    ...typography.body2,
    fontWeight: '600',
  },
  transactionsList: {
    marginBottom: spacing.lg,
  },
});
