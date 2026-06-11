import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Buat akun baru</Text>
            <Text style={styles.subtitle}>Gabung ke ruang keluarga KasBon.</Text>
          </View>

          <View style={styles.stepsRow}>
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepDone]}>
                <Ionicons name="checkmark" size={14} color={colors.background} />
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelDone]}>Profil</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLineDone]} />
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepCircleText}>2</Text>
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelActive]}>Akun</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepIdle]}>
                <Text style={styles.stepCircleText}>3</Text>
              </View>
              <Text style={styles.stepLabel}>Keluarga</Text>
            </View>
          </View>

          <GlassCard style={styles.card}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatarCircle}>
                  <Ionicons name="person" size={28} color={colors.textMuted} />
                </View>
                <TouchableOpacity style={styles.avatarAdd}>
                  <Ionicons name="camera" size={14} color={colors.background} />
                </TouchableOpacity>
              </View>
              <Text style={styles.avatarHint}>Ketuk untuk upload foto profil</Text>
            </View>

            <View style={styles.row2}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Nama depan</Text>
                <View style={[styles.fieldWrap, firstName ? styles.fieldWrapActive : null]}>
                  <Ionicons name="person-outline" size={18} color={colors.textMuted} />
                  <TextInput
                    style={styles.fieldText}
                    placeholder="Bayu"
                    placeholderTextColor={colors.textMuted}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Nama belakang</Text>
                <View style={[styles.fieldWrap, lastName ? styles.fieldWrapActive : null]}>
                  <Ionicons name="person-outline" size={18} color={colors.textMuted} />
                  <TextInput
                    style={styles.fieldText}
                    placeholder="Santoso"
                    placeholderTextColor={colors.textMuted}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Alamat email</Text>
              <View style={[styles.fieldWrap, email ? styles.fieldWrapActive : null]}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="budi@keluarga.com"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Nomor HP (opsional)</Text>
              <View style={[styles.fieldWrap, phone ? styles.fieldWrapActive : null]}>
                <Ionicons name="call-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="+62 8xx xxxx xxxx"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={[styles.fieldWrap, password ? styles.fieldWrapActive : null]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="Minimal 8 karakter"
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

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Konfirmasi password</Text>
              <View style={[styles.fieldWrap, confirmPassword ? styles.fieldWrapActive : null]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.fieldText}
                  placeholder="Ketik ulang password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inviteCard}>
              <View style={styles.inviteTop}>
                <View style={styles.inviteIcon}>
                  <Ionicons name="at" size={18} color={colors.project} />
                </View>
                <Text style={styles.inviteTitle}>Punya kode undangan keluarga?</Text>
              </View>
              <View style={styles.inviteField}>
                <Ionicons name="key-outline" size={16} color={colors.textMuted} />
                <Text style={styles.inviteFieldText}>Masukkan kode undangan</Text>
              </View>
            </View>

            <View style={styles.termsRow}>
              <View style={styles.checkBox}>
                <Ionicons name="checkmark" size={12} color={colors.background} />
              </View>
              <Text style={styles.termsText}>Saya setuju dengan <Text style={styles.termsLink}>Syarat & Ketentuan</Text></Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('SetupFamily')}
            >
              <Text style={styles.primaryButtonText}>Buat akun</Text>
            </TouchableOpacity>
          </GlassCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Sudah punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Masuk</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.header1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textMuted,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  step: {
    alignItems: 'center',
    width: 42,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleText: {
    ...typography.caption,
    fontWeight: '700',
  },
  stepDone: {
    backgroundColor: colors.income,
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
  stepIdle: {
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  stepLineDone: {
    backgroundColor: colors.income,
  },
  stepLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
    color: colors.textMuted,
  },
  stepLabelDone: {
    color: colors.income,
  },
  stepLabelActive: {
    color: colors.primary,
  },
  card: {
    padding: spacing.xl,
    borderRadius: 24,
    marginBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarAdd: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatarHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
  row2: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
    flex: 1,
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
  inviteCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  inviteTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.sm,
  },
  inviteIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(124,111,247,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteTitle: {
    ...typography.body1,
    fontWeight: '600',
  },
  inviteField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.glassDarker,
    borderRadius: 12,
    padding: 12,
  },
  inviteFieldText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.lg,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    ...typography.body2,
    color: colors.textMuted,
    flex: 1,
  },
  termsLink: {
    color: colors.project,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  loginText: {
    ...typography.body2,
    fontWeight: '700',
    color: colors.primary,
  },
});
