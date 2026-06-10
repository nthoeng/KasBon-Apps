import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';

interface WalletProps {
  name: string;
  type: 'global' | 'private' | 'business';
  balance: number;
  owner: string;
}

const WalletCard = ({ name, type, balance, owner }: WalletProps) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'global': return { icon: 'people', color: colors.primary, bg: colors.tagGlobal, label: 'Keluarga' };
      case 'private': return { icon: 'lock-closed', color: colors.textMuted, bg: colors.tagPrivate, label: 'Pribadi' };
      case 'business': return { icon: 'briefcase', color: colors.income, bg: colors.tagIncome, label: 'Bisnis' };
    }
  };

  const { icon, color, bg, label } = getIconAndColor();

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View style={styles.walletHeaderLeft}>
            <View style={[styles.iconContainer, { backgroundColor: bg }]}>
              <Ionicons name={icon as any} size={24} color={color} />
            </View>
            <View>
              <Text style={styles.walletName}>{name}</Text>
              <Text style={styles.walletOwner}>{owner}</Text>
            </View>
          </View>
          <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>{label}</Text>
          </View>
        </View>

        <View style={styles.walletBalanceContainer}>
          <Text style={styles.balanceLabel}>Total Saldo</Text>
          <AmountText amount={balance} type="income" style={styles.balanceText} />
        </View>

        <View style={styles.walletFooter}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-horizontal" size={16} color={colors.text} />
            <Text style={styles.actionBtnText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="time-outline" size={16} color={colors.text} />
            <Text style={styles.actionBtnText}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

export const WalletListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Dompet</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Dompet Bersama</Text>
        <WalletCard 
          name="Kas Keluarga Utama" 
          type="global" 
          balance={12500000} 
          owner="Bisa dilihat & dipakai semua" 
        />
        <WalletCard 
          name="Tabungan Liburan" 
          type="global" 
          balance={5000000} 
          owner="Bisa dilihat & dipakai semua" 
        />

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Dompet Pribadi</Text>
        <WalletCard 
          name="Uang Jajan Ayah" 
          type="private" 
          balance={1500000} 
          owner="Hanya bisa dilihat Ayah" 
        />

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Dompet Usaha</Text>
        <WalletCard 
          name="Bisnis Cimol Ibu" 
          type="business" 
          balance={3450000} 
          owner="Bisa dilihat Ibu & Ayah" 
        />
        
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.header2,
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  container: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.header3,
    marginBottom: spacing.md,
  },
  walletCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
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
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  walletName: {
    ...typography.body1,
    fontWeight: '700',
    marginBottom: 2,
  },
  walletOwner: {
    ...typography.caption,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
    fontSize: 10,
  },
  walletBalanceContainer: {
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    ...typography.caption,
    marginBottom: 4,
  },
  balanceText: {
    ...typography.header2,
  },
  walletFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  actionBtnText: {
    ...typography.body2,
    marginLeft: 6,
  },
});
