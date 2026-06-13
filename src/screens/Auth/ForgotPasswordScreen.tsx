import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  input: '#111E30',
  text: '#F0F4FF',
  text2: '#8FA8CC',
  text3: '#3E5878',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  border: 'rgba(255,255,255,0.09)',
  border2: 'rgba(255,255,255,0.16)',
};

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('bayu@email.com');
  const [otp, setOtp] = useState(['8', '3', '4', '', '', '']);
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Helper untuk Header TopNav
  const renderHeader = (title: string, sub: string) => (
    <View style={styles.topnav}>
      <TouchableOpacity style={styles.backBtn} onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
        <Ionicons name="arrow-back" size={16} color={UI_COLORS.text2} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSub}>Langkah {step} dari 3</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* ==================== TAHAP 1: EMAIL ==================== */}
          {step === 1 && (
            <View>
              {renderHeader('Lupa password', 'Email')}
              <View style={styles.screenBody}>
                <View style={styles.illus}>
                  <View style={[styles.illusCircle, { borderColor: UI_COLORS.border2 }]}>
                    <Ionicons name="mail" size={30} color={UI_COLORS.gold} />
                  </View>
                </View>
                <Text style={styles.screenTitle}>Masukkan emailmu</Text>
                <Text style={styles.screenDesc}>Kami akan kirimkan kode verifikasi ke alamat email yang terdaftar.</Text>
                
                <Text style={styles.fieldLabel}>Alamat email</Text>
                <View style={[styles.fieldWrap, email ? styles.focused : null]}>
                  <Ionicons name="mail" size={16} color={UI_COLORS.text3} />
                  <TextInput 
                    style={styles.fieldTxt} 
                    placeholder="nama@keluarga.com" 
                    placeholderTextColor={UI_COLORS.text3} 
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {email ? <Ionicons name="checkmark-circle" size={16} color={UI_COLORS.mint} /> : null}
                </View>
                <Text style={styles.hint}>Pastikan ini email yang kamu daftarkan di KasBon.</Text>
                
                <TouchableOpacity style={styles.btnGold} onPress={() => setStep(2)}>
                  <Text style={styles.btnGoldTxt}>Kirim kode verifikasi</Text>
                </TouchableOpacity>
                
                <View style={styles.dividerRow}>
                  <View style={styles.divLine} />
                  <Text style={styles.divTxt}>atau</Text>
                  <View style={styles.divLine} />
                </View>

                <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.btnGhostTxt}>Kembali ke login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ==================== TAHAP 2: OTP ==================== */}
          {step === 2 && (
            <View>
              {renderHeader('Verifikasi kode', 'OTP')}
              <View style={styles.screenBody}>
                <View style={styles.illus}>
                  <View style={[styles.illusCircle, { backgroundColor: 'rgba(124,111,247,0.12)', borderColor: 'rgba(124,111,247,0.2)' }]}>
                    <Ionicons name="shield-checkmark" size={30} color={UI_COLORS.violet} />
                  </View>
                </View>
                <Text style={styles.screenTitle}>Cek emailmu</Text>
                <Text style={styles.screenDesc}>Masukkan 6 digit kode yang dikirim ke <Text style={{color: UI_COLORS.gold, fontWeight: '500'}}>{email || 'emailmu'}</Text></Text>
                
                <View style={styles.otpRow}>
                  {otp.map((digit, i) => (
                    <View key={i} style={[
                      styles.otpBox, 
                      digit ? styles.otpFilled : null,
                      !digit && otp[i-1] ? styles.otpActive : null // Simulasi kursor
                    ]}>
                      <Text style={[styles.otpTxt, digit ? { color: UI_COLORS.mint } : null]}>{digit}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.resendRow}>
                  <Text style={styles.resendTxt}>Tidak terima kode?</Text>
                  <TouchableOpacity>
                    <Text style={styles.resendLink}>Kirim ulang (55s)</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnGold} onPress={() => setStep(3)}>
                  <Text style={styles.btnGoldTxt}>Verifikasi kode</Text>
                </TouchableOpacity>
                <View style={{height: 14}} />
                <TouchableOpacity style={styles.btnGhost} onPress={() => setStep(1)}>
                  <Text style={styles.btnGhostTxt}>Ganti alamat email</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ==================== TAHAP 3: RESET PASSWORD ==================== */}
          {step === 3 && (
            <View>
              {renderHeader('Password baru', 'Reset')}
              <View style={styles.screenBody}>
                <View style={styles.illus}>
                  <View style={[styles.illusCircle, { backgroundColor: 'rgba(45,212,164,0.1)', borderColor: 'rgba(45,212,164,0.2)' }]}>
                    <Ionicons name="lock-open" size={30} color={UI_COLORS.mint} />
                  </View>
                </View>
                <Text style={styles.screenTitle}>Buat password baru</Text>
                <Text style={[styles.screenDesc, { marginBottom: 18 }]}>Buat password yang kuat dan belum pernah kamu pakai sebelumnya.</Text>
                
                {/* Field Password Baru */}
                <Text style={styles.fieldLabel}>Password baru</Text>
                <View style={[styles.fieldWrap, password ? styles.valid : null, { marginBottom: 6 }]}>
                  <Ionicons name="lock-closed" size={16} color={UI_COLORS.text3} />
                  <TextInput 
                    style={styles.fieldTxt}
                    placeholder="Minimal 8 karakter"
                    placeholderTextColor={UI_COLORS.text3}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={17} color={UI_COLORS.text3} />
                  </TouchableOpacity>
                </View>
                
                {/* Strength Bar */}
                <View style={styles.strengthRow}>
                  <View style={styles.sbarLbl}>
                    <Text style={{ color: UI_COLORS.text3, fontSize: 10 }}>Kekuatan</Text>
                    <Text style={{ color: UI_COLORS.mint, fontSize: 10, fontWeight: '600' }}>Kuat</Text>
                  </View>
                  <View style={styles.sbarTrack}>
                    <View style={[styles.sbarSeg, styles.segG]} />
                    <View style={[styles.sbarSeg, styles.segG]} />
                    <View style={[styles.sbarSeg, styles.segG]} />
                    <View style={[styles.sbarSeg, styles.segE]} />
                  </View>
                </View>

                {/* Field Konfirmasi Password */}
                <Text style={styles.fieldLabel}>Konfirmasi password</Text>
                <View style={[styles.fieldWrap, confirmPassword && password === confirmPassword ? styles.valid : null, { marginBottom: 24 }]}>
                  <Ionicons name="lock-closed" size={16} color={UI_COLORS.text3} />
                  <TextInput 
                    style={styles.fieldTxt}
                    placeholder="Ketik ulang password"
                    placeholderTextColor={UI_COLORS.text3}
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  {confirmPassword && password === confirmPassword ? (
                    <Ionicons name="checkmark-circle" size={16} color={UI_COLORS.mint} />
                  ) : null}
                </View>
                
                <TouchableOpacity style={styles.btnGold} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.btnGoldTxt}>Simpan password baru</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  
  /* TOP NAV */
  topnav: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  backBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  headerSub: { fontSize: 11, color: UI_COLORS.text3 },
  
  /* LAYOUT */
  screenBody: { paddingHorizontal: 18, paddingBottom: 32 },
  illus: { alignItems: 'center', paddingVertical: 20 },
  illusCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' },
  screenTitle: { fontSize: 30, fontWeight: '600', color: UI_COLORS.text, marginBottom: 6 },
  screenDesc: { fontSize: 18, color: UI_COLORS.text2, lineHeight: 18, marginBottom: 22 },
  
  /* FIELDS */
  fieldLabel: { fontSize: 14, color: UI_COLORS.text2, marginBottom: 6 },
  fieldWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: UI_COLORS.input, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 12, paddingHorizontal: 14, height: 46, gap: 10, marginBottom: 6 },
  focused: { borderColor: UI_COLORS.gold },
  valid: { borderColor: UI_COLORS.mint },
  fieldTxt: { flex: 1, fontSize: 14, color: UI_COLORS.text },
  hint: { fontSize: 12, color: UI_COLORS.text3, marginBottom: 20, lineHeight: 16 },
  
  /* BUTTONS & DIVIDERS */
  btnGold: { width: '100%', height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  btnGoldTxt: { fontSize: 18, fontWeight: '600', color: UI_COLORS.bg },
  btnGhost: { width: '100%', height: 44, borderRadius: 14, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  btnGhostTxt: { fontSize: 18, fontWeight: '500', color: UI_COLORS.text2 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  divLine: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.border2 },
  divTxt: { fontSize: 11, color: UI_COLORS.text3 },
  
  /* OTP SECTION */
  otpRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 22 },
  otpBox: { width: 44, height: 52, borderRadius: 12, backgroundColor: UI_COLORS.input, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  otpActive: { borderColor: UI_COLORS.gold },
  otpFilled: { borderColor: UI_COLORS.mint },
  otpTxt: { fontSize: 22, fontWeight: '600', color: UI_COLORS.text },
  resendRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 24 },
  resendTxt: { fontSize: 12, color: UI_COLORS.text3 },
  resendLink: { fontSize: 12, color: UI_COLORS.violet, fontWeight: '500' },
  
  /* STRENGTH BAR */
  strengthRow: { marginBottom: 18 },
  sbarLbl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sbarTrack: { flexDirection: 'row', gap: 4 },
  sbarSeg: { flex: 1, height: 3, borderRadius: 2 },
  segG: { backgroundColor: UI_COLORS.mint },
  segE: { backgroundColor: UI_COLORS.border2 },
});