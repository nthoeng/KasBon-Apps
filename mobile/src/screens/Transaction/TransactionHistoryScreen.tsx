import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { TransactionItem } from '../../components/ui/TransactionItem';

export const TransactionHistoryScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Riwayat Transaksi</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Cari transaksi..."
          placeholderTextColor={colors.textDim}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.dateHeader}>Hari Ini</Text>
        <TransactionItem 
          title="Beli Token Listrik" category="Utilitas" amount={200000} type="expense" date="14:30"
        />
        <TransactionItem 
          title="Makan Siang GrabFood" category="Makanan" amount={85000} type="expense" date="12:00"
        />

        <Text style={styles.dateHeader}>Kemarin</Text>
        <TransactionItem 
          title="Gaji Bulan Oktober" category="Gaji" amount={15000000} type="income" date="09:00"
        />
        <TransactionItem 
          title="Transfer ke Jajan Ayah" category="Transfer" amount={1500000} type="transfer" date="10:30"
        />

        <Text style={styles.dateHeader}>08 Okt 2026</Text>
        <TransactionItem 
          title="Belanja Bulanan" category="Kebutuhan" amount={1250000} type="expense" date="16:00"
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
  filterBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.header3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    ...typography.body1,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  dateHeader: {
    ...typography.body2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
});
