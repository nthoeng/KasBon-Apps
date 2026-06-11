import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>KB</Text>
            </View>
            <Text style={styles.title}>KasBon</Text>
            <Text style={styles.subtitle}>Masuk ke akun keluargamu</Text>
          </View>

          <View style={styles.formArea}>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <View style={[styles.fieldWrap, email ? styles.fieldWrapActive : null]}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="nama@keluarga.com"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={[styles.fieldWrap, password ? styles.fieldWrapActive : null]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.checkRow} onPress={() => setRememberMe((prev) => !prev)}>
                <View style={[styles.checkBox, rememberMe && styles.checkBoxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color={colors.background} />}
                </View>
                <Text style={styles.checkLabel}>Ingat saya</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Lupa password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.replace('MainTabs')}
            >
              <Text style={styles.primaryButtonText}>Masuk</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>atau masuk dengan</Text>
              <View style={styles.divLine} />
            </View>

            <TouchableOpacity style={styles.googleButton}>
              <Ionicons name="logo-google" size={18} color={colors.textMuted} />
              <Text style={styles.googleButtonText}>Lanjutkan dengan Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    ...typography.header2,
    color: colors.background,
    fontWeight: '800',
  },
  title: {
    ...typography.header1,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body2,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    color: colors.textMuted,
  },
  formArea: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
    color: colors.textMuted,
  },
  fieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassDarker,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  fieldWrapActive: {
    borderColor: colors.primary,
  },
  fieldText: {
    flex: 1,
    ...typography.body1,
    color: colors.text,
    paddingVertical: 0,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkLabel: {
    ...typography.body2,
    color: colors.textMuted,
  },
  forgotText: {
    ...typography.body2,
    color: colors.project,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...typography.button,
    color: '#0A1628',
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.lg,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  divText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    paddingVertical: 12,
  },
  googleButtonText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  registerText: {
    ...typography.body2,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 4,
  },
});
