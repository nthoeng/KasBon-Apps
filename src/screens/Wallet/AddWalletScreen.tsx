import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const AddWalletScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Tambah Dompet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Nama Dompet</Text>
            <TextInput style={styles.input} placeholder="Contoh: Kas Keluarga" placeholderTextColor={colors.textDim} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tipe Dompet</Text>
            <TextInput style={styles.input} placeholder="Contoh: Tunai / Bank / E-wallet" placeholderTextColor={colors.textDim} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Saldo Awal</Text>
            <TextInput style={styles.input} placeholder="0" placeholderTextColor={colors.textDim} keyboardType="numeric" />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Catatan (opsional)</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Contoh: Untuk kebutuhan harian" placeholderTextColor={colors.textDim} multiline />
          </View>
        </GlassCard>

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveButtonText}>Simpan Dompet</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    padding: spacing.lg,
    borderRadius: 24,
    marginTop: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textDim,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body1,
    color: colors.text,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: spacing.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    ...typography.button,
    fontWeight: '700',
    color: colors.background,
  },
});
