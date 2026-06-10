import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

const OTP_LENGTH = 6;

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);
  };

  const renderEmailStep = () => (
    <View style={styles.contentCard}>
      <Text style={styles.screenTitle}>Lupa password</Text>
      <Text style={styles.screenDesc}>Masukkan email yang kamu daftarkan di KasBon. Kami akan mengirim kode verifikasi.</Text>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Alamat email</Text>
        <View style={styles.fieldWrap}>
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
      <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('otp')}>
        <Text style={styles.primaryButtonText}>Kirim kode verifikasi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryButtonText}>Kembali ke login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOtpStep = () => (
    <View style={styles.contentCard}>
      <Text style={styles.screenTitle}>Verifikasi kode</Text>
      <Text style={styles.screenDesc}>Masukkan 6 digit kode yang dikirim ke {email || 'email kamu'}.</Text>
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value.replace(/[^0-9]/g, ''), index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('reset')}>
        <Text style={styles.primaryButtonText}>Verifikasi kode</Text>
      </TouchableOpacity>
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Tidak menerima kode?</Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Kirim ulang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResetStep = () => (
    <View style={styles.contentCard}>
      <Text style={styles.screenTitle}>Buat password baru</Text>
      <Text style={styles.screenDesc}>Gunakan password yang kuat dan belum pernah dipakai sebelumnya.</Text>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Password baru</Text>
        <View style={styles.fieldWrap}>
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
        <View style={styles.fieldWrap}>
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
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.primaryButtonText}>Simpan password baru</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lupa Password</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {step === 'email' && renderEmailStep()}
          {step === 'otp' && renderOtpStep()}
          {step === 'reset' && renderResetStep()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.header3,
  },
  content: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.xl,
  },
  screenTitle: {
    ...typography.header2,
    marginBottom: spacing.sm,
  },
  screenDesc: {
    ...typography.body2,
    color: colors.textMuted,
    marginBottom: spacing.xl,
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
  fieldText: {
    flex: 1,
    ...typography.body1,
    color: colors.text,
    paddingVertical: 0,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
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
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  secondaryButtonText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  actionText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.glassDarker,
    borderWidth: 0.5,
    borderColor: colors.borderLight,
    textAlign: 'center',
    ...typography.header3,
    color: colors.text,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  resendText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  resendLink: {
    ...typography.caption,
    color: colors.project,
    fontWeight: '600',
  },
});