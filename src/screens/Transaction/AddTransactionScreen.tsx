import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const AddTransactionScreen = ({ navigation }: any) => {
  const [transactionType, setTransactionType] = useState<'expense' | 'income' | 'transfer'>('expense');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Catat Transaksi</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Type Selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity 
              style={[styles.typeBtn, transactionType === 'expense' && styles.typeBtnActive, transactionType === 'expense' && { backgroundColor: colors.expense }]}
              onPress={() => setTransactionType('expense')}
            >
              <Text style={[styles.typeText, transactionType === 'expense' && styles.typeTextActive]}>Pengeluaran</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.typeBtn, transactionType === 'income' && styles.typeBtnActive, transactionType === 'income' && { backgroundColor: colors.income }]}
              onPress={() => setTransactionType('income')}
            >
              <Text style={[styles.typeText, transactionType === 'income' && styles.typeTextActive]}>Pemasukan</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.typeBtn, transactionType === 'transfer' && styles.typeBtnActive, transactionType === 'transfer' && { backgroundColor: colors.primary }]}
              onPress={() => setTransactionType('transfer')}
            >
              <Text style={[styles.typeText, transactionType === 'transfer' && styles.typeTextActive]}>Transfer</Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>Rp</Text>
            <TextInput 
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={colors.textDim}
              keyboardType="numeric"
              autoFocus
            />
          </View>

          {/* Form Details */}
          <GlassCard style={styles.formCard}>
            
            <View style={styles.inputGroup}>
              <View style={styles.iconContainer}>
                <Ionicons name="wallet-outline" size={20} color={colors.textMuted} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Dari Dompet</Text>
                <TouchableOpacity>
                  <Text style={styles.inputValue}>Kas Keluarga Utama</Text>
                </TouchableOpacity>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
            </View>

            {transactionType === 'transfer' && (
              <>
                <View style={styles.divider} />
                <View style={styles.inputGroup}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="log-in-outline" size={20} color={colors.textMuted} />
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={styles.inputLabel}>Ke Dompet</Text>
                    <TouchableOpacity>
                      <Text style={styles.inputValuePlaceholder}>Pilih Dompet Tujuan</Text>
                    </TouchableOpacity>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
                </View>
              </>
            )}

            <View style={styles.divider} />
            
            <View style={styles.inputGroup}>
              <View style={styles.iconContainer}>
                <Ionicons name="grid-outline" size={20} color={colors.textMuted} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Kategori</Text>
                <TouchableOpacity>
                  <Text style={styles.inputValuePlaceholder}>Pilih Kategori</Text>
                </TouchableOpacity>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
            </View>

            <View style={styles.divider} />

            <View style={styles.inputGroup}>
              <View style={styles.iconContainer}>
                <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Tanggal</Text>
                <TouchableOpacity>
                  <Text style={styles.inputValue}>Hari ini</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.inputGroup}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={20} color={colors.textMuted} />
              </View>
              <View style={styles.inputContent}>
                <TextInput 
                  style={styles.notesInput}
                  placeholder="Tambah Catatan (Opsional)"
                  placeholderTextColor={colors.textDim}
                />
              </View>
            </View>

          </GlassCard>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Simpan Transaksi</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: spacing.lg,
  },
  closeBtn: {
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
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 4,
    marginBottom: spacing.xl,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  typeBtnActive: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  typeText: {
    ...typography.body2,
    fontWeight: '600',
  },
  typeTextActive: {
    color: colors.background,
    fontWeight: '700',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  currencySymbol: {
    ...typography.header2,
    marginRight: 8,
    marginTop: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.text,
    minWidth: 150,
  },
  formCard: {
    padding: 0,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: 64,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassDarker,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  inputValue: {
    ...typography.body1,
    fontWeight: '500',
  },
  inputValuePlaceholder: {
    ...typography.body1,
  },
  notesInput: {
    ...typography.body1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 72, // Aligned with text content
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    ...typography.button,
    fontWeight: '700',
  },
});
