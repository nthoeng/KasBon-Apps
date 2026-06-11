import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const SetupFamilyScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Setup Keluarga</Text>
          <Text style={styles.subtitle}>Satu ruang lingkup untuk mengelola kas bersama.</Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.iconWrapper}>
            <Ionicons name="home" size={40} color={colors.primary} />
          </View>
          
          <Text style={styles.sectionTitle}>Buat Ruang Keluarga Baru</Text>
          <Text style={styles.sectionDesc}>Anda akan menjadi Admin. Nantinya Anda bisa mengundang pasangan atau anak.</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nama Keluarga</Text>
            <TextInput 
              style={styles.input}
              placeholder="Keluarga Cemara"
              placeholderTextColor={colors.textDim}
            />
          </View>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.replace('MainTabs')}
          >
            <Text style={styles.primaryButtonText}>Buat & Mulai Aplikasi</Text>
          </TouchableOpacity>
        </GlassCard>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ATAU</Text>
          <View style={styles.dividerLine} />
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.iconWrapperSecondary}>
            <Ionicons name="mail-open" size={40} color={colors.text} />
          </View>
          
          <Text style={styles.sectionTitle}>Gabung dengan Undangan</Text>
          <Text style={styles.sectionDesc}>Punya kode undangan dari anggota keluarga Anda?</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Kode Undangan</Text>
            <TextInput 
              style={styles.input}
              placeholder="Contoh: KB-1234-ABCD"
              placeholderTextColor={colors.textDim}
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.replace('MainTabs')}
          >
            <Text style={styles.secondaryButtonText}>Gabung Keluarga</Text>
          </TouchableOpacity>
        </GlassCard>

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
    paddingTop: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.header1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body1,
  },
  card: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.tagGlobal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconWrapperSecondary: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.header3,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  sectionDesc: {
    ...typography.body2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.glassDarker,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body1,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...typography.button,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: colors.glassDarker,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    ...typography.button,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    ...typography.caption,
    marginHorizontal: spacing.md,
    fontWeight: '600',
  },
});
