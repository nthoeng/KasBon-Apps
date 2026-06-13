import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  bg: '#0A1628', card: '#152238', card2: '#1A2A42', input: '#111E30',
  text: '#F0F4FF', text2: '#8FA8CC', text3: '#3E5878',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B',
  border: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.16)',
};

export const LoginErrorScreen = ({ navigation }: any) => {
  // --- STATE MANAGEMENT ---
  const [email, setEmail] = useState('bayu@email.com');
  const [password, setPassword] = useState('12345');
  const [showPassword, setShowPassword] = useState(false);
  
  // Logic untuk simulasi error
  const [attempts, setAttempts] = useState(0); // 0: Normal, 1: Salah 1x, 2: Salah 2x, 3: Terkunci
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(277); // 04:37 dalam detik
  const [loginError, setLoginError] = useState<string | null>(null);

  // Animation ref untuk efek getar (shake)
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // --- LOGIC FUNCTIONS ---

  // Efek Getar (Shake Animation)
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  // Simulasi Login (Untuk mendemonstrasikan error)
  const handleLogin = () => {
    if (isLocked) return;

    setLoginError(null); // Reset error lama

    // Simulasi: Apapun passwordnya dianggap salah
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts === 1) {
      // State 1: Salah pertama kali
      setLoginError('Password salah. Coba lagi.');
      triggerShake(); // Getarkan input password
    } else if (nextAttempts === 2) {
      // State 2: Salah kedua kali (Block Error muncul)
      // Teks error diatur langsung di render body
    } else if (nextAttempts >= 3) {
      // State 3: Terkunci
      setIsLocked(true);
      setCountdown(300); // Mulai dari 5 menit (300 detik)
    }
  };

  // Timer untuk Countdown (State 3)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsLocked(false);
      setAttempts(0); // Reset percobaan setelah waktu habis
    }
    return () => clearInterval(timer);
  }, [isLocked, countdown]);

  // Helper untuk format timer (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- RENDER HELPER ---
  const renderLogoSection = () => (
    <View style={[styles.logoRow, isLocked && { paddingBottom: 10 }]}>
      <View style={styles.coin}><View style={styles.coinInner}>
        <Ionicons name="home" size={24} color={UI_COLORS.gold} />
      </View></View>
      <Text style={styles.appName}><Text style={{ color: UI_COLORS.gold }}>Kas</Text>Bon</Text>
      {!isLocked && <Text style={styles.appSub}>Masuk ke akun keluargamu</Text>}
    </View>
  );

  // ==================== RENDER MAIN ====================
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {renderLogoSection()}

          <View style={styles.formArea}>

            {/* 🛑 STATE 2: BLOCK ERROR (Muncul jika salah 2x) */}
            {attempts === 2 && !isLocked && (
              <View style={styles.errBlock}>
                <Ionicons name="alert-triangle" size={18} color={UI_COLORS.red} style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.errBlockTitle}>Password salah lagi</Text>
                  <Text style={styles.errBlockSub}>Sisa 1 percobaan sebelum akun dikunci sementara. Yakin ingat password-mu?</Text>
                </View>
              </View>
            )}

            {/* 🔒 STATE 3: LOCK ICON & COUNTDOWN (Muncul jika terkunci) */}
            {isLocked && (
              <View>
                <View style={styles.lockIconWrap}>
                  <View style={styles.lockCircle}>
                    <Ionicons name="lock-closed" size={26} color={UI_COLORS.red} />
                  </View>
                </View>
                <View style={styles.countdownCard}>
                  <Text style={styles.cdTitle}>Akun dikunci sementara</Text>
                  <Text style={styles.cdTimer}>{formatTime(countdown)}</Text>
                  <Text style={styles.cdSub}>Terlalu banyak percobaan gagal. Tunggu sebentar atau reset password.</Text>
                </View>
              </View>
            )}


            {/* --- INPUT EMAIL --- */}
            {!isLocked && <Text style={styles.fieldLbl}>Email</Text>}
            <View style={[
              styles.fieldWrap, 
              isLocked ? styles.locked : styles.neutral,
              { marginBottom: 12 }
            ]}>
              <Ionicons name="mail" size={16} color={isLocked ? "rgba(255,107,107,0.5)" : UI_COLORS.mint} />
              <TextInput 
                style={styles.fieldText} 
                value={email} 
                editable={!isLocked}
                color={isLocked ? UI_COLORS.text3 : UI_COLORS.text}
              />
              <Ionicons name={isLocked ? "lock-closed" : "checkmark-circle"} size={16} color={isLocked ? "rgba(255,107,107,0.4)" : UI_COLORS.mint} />
            </View>


            {/* --- INPUT PASSWORD (DENGAN ANIMASI GETAR) --- */}
            {!isLocked && <Text style={styles.fieldLbl}>Password</Text>}
            <Animated.View style={[
              styles.fieldWrap,
              isLocked ? styles.locked : (loginError || attempts === 2 ? styles.error : styles.neutral),
              { transform: [{ translateX: shakeAnimation }] } // Terapkan animasi getar
            ]}>
              <Ionicons name="lock-closed" size={16} color={isLocked ? "rgba(255,107,107,0.5)" : (loginError || attempts === 2 ? UI_COLORS.red : UI_COLORS.text3)} />
              <TextInput 
                style={styles.fieldText} 
                value={password} 
                secureTextEntry={!showPassword}
                editable={!isLocked}
                placeholder="••••••••"
                placeholderTextColor={isLocked ? "rgba(255,107,107,0.4)" : UI_COLORS.text3}
                onChangeText={setPassword}
              />
              {!isLocked ? (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={16} color={UI_COLORS.text3} />
                </TouchableOpacity>
              ) : (
                <Ionicons name="lock-closed" size={14} color="rgba(255,107,107,0.4)" />
              )}
            </Animated.View>

            {/* 🛑 STATE 1: INLINE ERROR (Muncul jika salah 1x) */}
            {loginError && attempts === 1 && (
              <View style={styles.errInline}>
                <Ionicons name="alert-circle" size={14} color={UI_COLORS.red} />
                <Text style={{ color: UI_COLORS.red, fontSize: 11 }}>{loginError}</Text>
              </View>
            )}


            {/* --- FORGOT & REMEMBER ROW --- */}
            {!isLocked ? (
              <View>
                <View style={styles.forgotRow}>
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={{ fontSize: 12, color: UI_COLORS.violet }}>Lupa password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.checkRow}>
                  <View style={[styles.checkBox, styles.checkOn]}><Ionicons name="checkmark" size={12} color={UI_COLORS.bg} /></View>
                  <Text style={styles.checkLbl}>Ingat saya</Text>
                  
                  {/* Sisa Percobaan (State 1) */}
                  {attempts === 1 && (
                    <View style={styles.attemptInfo}>
                      <Ionicons name="shield-checkmark" size={14} color="#FF9090" />
                      <Text style={{ color: '#FF9090', fontSize: 11 }}>2 kesempatan lagi</Text>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              /* Attempt Chips (State 2, ditaruh sebelum tombol terkunci) */
              attempts === 2 && (
                <View style={styles.attemptChipRow}>
                  <View style={styles.attemptChip}>
                    <View style={[styles.attemptDot, {backgroundColor: UI_COLORS.red}]} />
                    <View style={[styles.attemptDot, {backgroundColor: UI_COLORS.red}]} />
                    <View style={[styles.attemptDot, {backgroundColor: UI_COLORS.text3}]} />
                    <Text style={styles.attemptTxt}>2 dari 3 percobaan digunakan</Text>
                  </View>
                </View>
              )
            )}


            {/* --- BUTTONS --- */}
            <TouchableOpacity 
              style={[styles.btnPrimary, isLocked && styles.btnDisabled]} 
              onPress={handleLogin}
              disabled={isLocked}
            >
              <Text style={[styles.btnPrimaryTxt, isLocked && {color: UI_COLORS.text3}]}>
                {isLocked ? 'Masuk (terkunci)' : (attempts > 0 ? 'Coba lagi' : 'Masuk')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnGhost, isLocked && styles.btnGhostLocked]} 
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={[styles.btnGhostTxt, isLocked && {color: UI_COLORS.gold}]}>
                {isLocked ? 'Reset password sekarang' : 'Lupa password? Reset sekarang'}
              </Text>
            </TouchableOpacity>


            {/* --- REGISTER ROW / FOOTER --- */}
            {!isLocked ? (
              <View style={styles.registerRow}>
                <Text style={styles.regTxt}>Belum punya akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.regLink}>Daftar ↗</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.lockFooter}>
                <Text style={styles.lockFooterTxt}>Bukan kamu? Hubungi admin keluarga</Text>
              </View>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContent: { paddingBottom: 36 },
  
  /* LOGO SECTION */
  logoRow: { alignItems: 'center', padding: 28, paddingBottom: 20 },
  coin: { width: 52, height: 52, borderRadius: 26, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  coinInner: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E8A800', alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 22, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -0.5, marginBottom: 3 },
  appSub: { fontSize: 12, color: UI_COLORS.text3 },
  
  /* FORM AREA */
  formArea: { paddingHorizontal: 18 },
  fieldLbl: { fontSize: 11, color: UI_COLORS.text2, marginBottom: 5, paddingLeft: 2 },
  fieldWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: UI_COLORS.input, borderRadius: 12, paddingHorizontal: 12, height: 44, gap: 8 },
  neutral: { borderFocusColor: UI_COLORS.border2, borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  error: { borderWidth: 1, borderColor: UI_COLORS.red, backgroundColor: 'rgba(255,107,107,0.06)' },
  locked: { borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.4)', backgroundColor: 'rgba(255,107,107,0.08)' },
  fieldText: { flex: 1, fontSize: 13, paddingVertical: 0 },
  pwDots: { flexDirection: 'row', gap: 4, alignItems: 'center', flex: 1 },
  pwDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: UI_COLORS.text2 },
  
  /* ERROR STATES */
  errInline: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6, marginBottom: 10, paddingLeft: 2 },
  errBlock: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: 'rgba(255,107,107,0.1)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.3)', borderRadius: 12, padding: 10, marginBottom: 12 },
  errBlockTitle: { fontSize: 12, fontWeight: '600', color: '#FF9090', marginBottom: 2 },
  errBlockSub: { fontSize: 11, color: 'rgba(255,107,107,0.7)', lineHeight: 16 },
  
  /* ATTEMPTS */
  attemptInfo: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4 },
  attemptChipRow: { alignItems: 'center', marginBottom: 14, paddingTop: 6 },
  attemptChip: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  attemptDot: { width: 8, height: 8, borderRadius: 4 },
  attemptTxt: { fontSize: 11, color: '#FF9090', marginLeft: 2 },
  
  /* LOCKOUT STATE */
  lockIconWrap: { alignItems: 'center', paddingBottom: 14 },
  lockCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,107,107,0.1)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.3)', alignItems: 'center', justifyContent: 'center' },
  countdownCard: { backgroundColor: 'rgba(255,107,107,0.08)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.25)', borderRadius: 14, padding: 14, alignItems: 'center', marginBottom: 14 },
  cdTitle: { fontSize: 13, fontWeight: '500', color: '#FF9090', marginBottom: 6 },
  cdTimer: { fontSize: 32, fontWeight: '600', color: UI_COLORS.red, letterSpacing: 2, marginBottom: 4 },
  cdSub: { fontSize: 11, color: 'rgba(255,107,107,0.6)', textAlign: 'center', lineHeight: 16 },
  lockFooter: { alignItems: 'center', paddingTop: 12 },
  lockFooterTxt: { fontSize: 11, color: UI_COLORS.text3 },

  /* ROWS */
  forgotRow: { alignItems: 'flex-end', marginBottom: 16 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  checkBox: { width: 18, height: 18, borderRadius: 5, borderWidth: 0.5, borderColor: UI_COLORS.border2, backgroundColor: UI_COLORS.input, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: UI_COLORS.gold, borderColor: UI_COLORS.gold },
  checkLbl: { fontSize: 12, color: UI_COLORS.text2 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', gap: 4, paddingTop: 8 },
  regTxt: { fontSize: 12, color: UI_COLORS.text3 },
  regLink: { fontSize: 12, color: UI_COLORS.gold, fontWeight: '500' },
  
  /* BUTTONS */
  btnPrimary: { width: '100%', height: 46, borderRadius: 13, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  btnPrimaryTxt: { fontSize: 14, fontWeight: '600', color: '#0A1628' },
  btnDisabled: { backgroundColor: '#3E5878' },
  btnGhost: { width: '100%', height: 40, borderRadius: 12, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  btnGhostTxt: { fontSize: 12, color: UI_COLORS.text2, fontWeight: '500' },
  btnGhostLocked: { borderColor: 'rgba(245,200,66,0.3)' },
});