import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';

export const TransactionDetailScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Detail Transaksi</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.amountHeader}>
          <View style={[styles.iconWrapper, { backgroundColor: colors.tagExpense }]}>
            <Ionicons name="cart" size={40} color={colors.expense} />
          </View>
          <Text style={styles.transactionTitle}>Belanja Bulanan</Text>
          <AmountText amount={1250000} type="expense" style={styles.amount} />
          <Text style={styles.date}>08 Okt 2026, 14:30 WIB</Text>
        </View>

        <GlassCard style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Berhasil</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kategori</Text>
            <Text style={styles.detailValue}>Kebutuhan Rumah</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dari Dompet</Text>
            <Text style={styles.detailValue}>Kas Keluarga Utama</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dicatat Oleh</Text>
            <Text style={styles.detailValue}>Budi Santoso (Ayah)</Text>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Catatan</Text>
        <GlassCard style={styles.notesCard}>
          <Text style={styles.notesText}>Belanja popok, susu, dan kebutuhan dapur di Superindo.</Text>
        </GlassCard>

        <TouchableOpacity style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={20} color={colors.expense} />
          <Text style={styles.deleteBtnText}>Hapus Transaksi</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.header3,
  },
  container: {
    padding: spacing.lg,
  },
  amountHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  transactionTitle: {
    ...typography.header3,
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.header1,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.body2,
  },
  detailsCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    ...typography.body2,
  },
  detailValue: {
    ...typography.body1,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  statusBadge: {
    backgroundColor: colors.tagIncome,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '700',
  },
  sectionTitle: {
    ...typography.header3,
    marginBottom: spacing.md,
  },
  notesCard: {
    padding: spacing.md,
    marginBottom: spacing.xxl,
  },
  notesText: {
    ...typography.body1,
    fontStyle: 'italic',
  },
  deleteBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.expense,
    backgroundColor: colors.tagExpense,
  },
  deleteBtnText: {
    ...typography.button,
    marginLeft: 8,
  },
});
