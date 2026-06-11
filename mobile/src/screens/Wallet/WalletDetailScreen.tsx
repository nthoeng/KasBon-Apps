import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';
import { TransactionItem } from '../../components/ui/TransactionItem';

export const WalletDetailScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.walletHeader}>
          <View style={styles.iconWrapper}>
            <Ionicons name="people" size={32} color={colors.primary} />
          </View>
          <Text style={styles.walletName}>Kas Keluarga Utama</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Dompet Bersama</Text>
          </View>
        </View>

        <GlassCard style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Saldo</Text>
          <AmountText amount={12500000} type="income" style={styles.balanceText} />
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="arrow-down" size={20} color={colors.income} />
              <Text style={styles.actionBtnText}>Isi Saldo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
              <Text style={styles.actionBtnText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="document-text" size={20} color={colors.text} />
              <Text style={styles.actionBtnText}>Laporan</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Anggota dengan Akses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersRow}>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberInitials}>BS</Text>
          </View>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberInitials}>RN</Text>
          </View>
          <TouchableOpacity style={styles.addMemberBtn}>
            <Ionicons name="add" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Riwayat Dompet</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.seeAllText}>Semua</Text>
          </TouchableOpacity>
        </View>

        <TransactionItem 
          title="Gaji Ayah" category="Pemasukan" amount={15000000} type="income" date="Hari ini, 09:00"
        />
        <TransactionItem 
          title="Transfer ke Tabungan" category="Transfer" amount={1000000} type="transfer" date="Kemarin"
        />
        <TransactionItem 
          title="Belanja Bulanan" category="Pengeluaran" amount={1250000} type="expense" date="08 Okt"
        />

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
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.tagGlobal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  walletName: {
    ...typography.header2,
    marginBottom: spacing.xs,
  },
  badge: {
    backgroundColor: colors.tagGlobal,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
  },
  balanceCard: {
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  balanceLabel: {
    ...typography.body2,
    marginBottom: spacing.xs,
  },
  balanceText: {
    ...typography.header1,
    marginBottom: spacing.xl,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.lg,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionBtnText: {
    ...typography.caption,
    marginTop: 8,
  },
  sectionTitle: {
    ...typography.header3,
    marginBottom: spacing.md,
  },
  membersRow: {
    flexDirection: 'row',
    marginBottom: spacing.xxl,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  memberInitials: {
    ...typography.body1,
    fontWeight: '700',
  },
  addMemberBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.glassDarker,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    ...typography.body2,
    fontWeight: '600',
  },
});
