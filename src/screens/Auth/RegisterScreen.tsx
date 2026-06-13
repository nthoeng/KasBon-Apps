import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

const { colors } = theme;

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

export const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('Bayu');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('bayu@email.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [inviteCode, setInviteCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
          
          {/* TOP NAV */}
          <View style={styles.topnav}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={18} color={UI_COLORS.text2} />
            </TouchableOpacity>
            <View>
              <Text style={styles.pageTitle}>Buat akun baru</Text>
              <Text style={styles.pageSub}>Bergabung ke keluargamu</Text>
            </View>
          </View>

          {/* STEPS INDICATOR */}
          <View style={styles.stepsRow}>
            {/* Step 1: Profil (Done) */}
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepDone]}>
                <Ionicons name="checkmark" size={14} color={UI_COLORS.bg} />
              </View>
              <Text style={[styles.stepLbl, { color: UI_COLORS.mint }]}>Profil</Text>
            </View>
            <View style={[styles.stepLine, styles.lineDone]} />
            
            {/* Step 2: Akun (Active) */}
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: UI_COLORS.bg }}>2</Text>
              </View>
              <Text style={[styles.stepLbl, { color: UI_COLORS.gold }]}>Akun</Text>
            </View>
            <View style={styles.stepLine} />
            
            {/* Step 3: Keluarga (Idle) */}
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepIdle]}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: UI_COLORS.text3 }}>3</Text>
              </View>
              <Text style={styles.stepLbl}>Keluarga</Text>
            </View>
          </View>

          {/* AVATAR UPLOAD */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={28} color={UI_COLORS.text3} />
              </View>
              <TouchableOpacity style={styles.avatarAdd}>
                <Ionicons name="camera" size={12} color={UI_COLORS.bg} />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarHint}>Ketuk untuk upload foto profil</Text>
          </View>

          {/* FORM AREA */}
          <View style={styles.formArea}>
            
            <View style={styles.row2}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>Nama depan</Text>
                <View style={[styles.fieldWrap, firstName ? styles.wrapValid : null]}>
                  <TextInput style={styles.fieldText} value={firstName} onChangeText={setFirstName} placeholder="Mis: Bayu" placeholderTextColor={UI_COLORS.text3} />
                  {firstName ? <Ionicons name="checkmark-circle" size={16} color={UI_COLORS.mint} /> : null}
                </View>
              </View>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>Nama belakang</Text>
                <View style={[styles.fieldWrap, !lastName ? styles.wrapFocused : null]}>
                  <TextInput style={styles.fieldText} value={lastName} onChangeText={setLastName} placeholder="Pratama" placeholderTextColor={UI_COLORS.text3} />
                </View>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Alamat email</Text>
              <View style={[styles.fieldWrap, email ? styles.wrapValid : null]}>
                <Ionicons name="mail" size={17} color={UI_COLORS.text3} />
                <TextInput style={styles.fieldText} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="bayu@email.com" placeholderTextColor={UI_COLORS.text3} autoCapitalize="none" />
                {email ? <Ionicons name="checkmark-circle" size={16} color={UI_COLORS.mint} /> : null}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Nomor HP (opsional)</Text>
              <View style={styles.fieldWrap}>
                <Ionicons name="call" size={17} color={UI_COLORS.text3} />
                <TextInput style={styles.fieldText} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+62 8xx xxxx xxxx" placeholderTextColor={UI_COLORS.text3} />
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 4 }]}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={[styles.fieldWrap, password ? styles.wrapValid : null]}>
                <Ionicons name="lock-closed" size={17} color={UI_COLORS.text3} />
                <TextInput 
                  style={styles.fieldText} 
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry={!showPassword} 
                  placeholder="Minimal 8 karakter" 
                  placeholderTextColor={UI_COLORS.text3} 
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={17} color={UI_COLORS.text3} />
                </TouchableOpacity>
              </View>
            </View>

            {/* PASSWORD STRENGTH */}
            <View style={styles.strengthRow}>
              <View style={styles.strengthLabelRow}>
                <Text style={styles.strengthLabel}>Kekuatan password</Text>
                <Text style={[styles.strengthLabel, { color: UI_COLORS.mint, fontWeight: '600' }]}>Kuat</Text>
              </View>
              <View style={styles.strengthBarGroup}>
                <View style={[styles.sbar, { backgroundColor: UI_COLORS.mint }]} />
                <View style={[styles.sbar, { backgroundColor: UI_COLORS.mint }]} />
                <View style={[styles.sbar, { backgroundColor: UI_COLORS.mint }]} />
                <View style={[styles.sbar, { backgroundColor: UI_COLORS.gold }]} />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Konfirmasi password</Text>
              <View style={[styles.fieldWrap, confirmPassword && confirmPassword === password ? styles.wrapValid : null]}>
                <Ionicons name="lock-closed" size={17} color={UI_COLORS.text3} />
                <TextInput 
                  style={styles.fieldText} 
                  value={confirmPassword} 
                  onChangeText={setConfirmPassword} 
                  secureTextEntry={!showPassword} 
                  placeholder="Ketik ulang password" 
                  placeholderTextColor={UI_COLORS.text3} 
                />
                {confirmPassword && confirmPassword === password ? <Ionicons name="checkmark-circle" size={16} color={UI_COLORS.mint} /> : null}
              </View>
            </View>

            {/* INVITE CARD */}
            <View style={styles.inviteCard}>
              <View style={styles.inviteTop}>
                <View style={styles.inviteIcon}>
                  <Ionicons name="people" size={16} color={UI_COLORS.violet} />
                </View>
                <Text style={styles.inviteTitle}>Kode undangan keluarga</Text>
                <TouchableOpacity>
                  <Text style={styles.inviteSkip}>Lewati</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inviteField}>
                <Ionicons name="key" size={16} color={UI_COLORS.text3} />
                <TextInput 
                  style={styles.inviteFieldTxt} 
                  value={inviteCode} 
                  onChangeText={setInviteCode} 
                  placeholder="Masukkan kode dari anggota keluarga" 
                  placeholderTextColor={UI_COLORS.text3} 
                />
              </View>
            </View>

            {/* TERMS & CONDITIONS */}
            <View style={styles.termsRow}>
              <View style={[styles.checkBox, styles.checkBoxChecked]}>
                <Ionicons name="checkmark" size={12} color={UI_COLORS.bg} />
              </View>
              <Text style={styles.termsTxt}>
                Saya setuju dengan <Text style={styles.termsLink}>Syarat & Ketentuan</Text> dan <Text style={styles.termsLink}>Kebijakan Privasi</Text> KasBon
              </Text>
            </View>

            {/* ACTION BUTTON */}
            <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('MainTabs')} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryTxt}>Buat akun</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginTxt}>Sudah punya akun?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}> Masuk ↗</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  screen: { paddingBottom: 36 },
  
  /* TOP NAV */
  topnav: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 },
  backBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 18, fontWeight: '600', color: UI_COLORS.text },
  pageSub: { fontSize: 11, color: UI_COLORS.text3 },
  
  /* STEPS */
  stepsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 18 },
  step: { alignItems: 'center', gap: 6, zIndex: 2 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepDone: { backgroundColor: UI_COLORS.mint },
  stepActive: { backgroundColor: UI_COLORS.gold },
  stepIdle: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  stepLbl: { fontSize: 10, color: UI_COLORS.text3 },
  stepLine: { flex: 1, height: 1, backgroundColor: UI_COLORS.border2, marginTop: -16, zIndex: 1, marginHorizontal: -4 },
  lineDone: { backgroundColor: UI_COLORS.mint },

  /* AVATAR */
  avatarSection: { alignItems: 'center', paddingBottom: 24 },
  avatarWrap: { position: 'relative', width: 72, height: 72, marginBottom: 10 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: UI_COLORS.card2, borderWidth: 2, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  avatarAdd: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: UI_COLORS.bg },
  avatarHint: { fontSize: 11, color: UI_COLORS.text3 },

  /* FORM AREA */
  formArea: { paddingHorizontal: 20 },
  row2: { flexDirection: 'row', gap: 10 },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 11, color: UI_COLORS.text2, marginBottom: 6 },
  fieldWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: UI_COLORS.input, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 12, paddingHorizontal: 14, height: 46, gap: 10 },
  wrapFocused: { borderColor: UI_COLORS.gold },
  wrapValid: { borderColor: UI_COLORS.mint },
  fieldText: { flex: 1, fontSize: 14, color: UI_COLORS.text },
  
  /* STRENGTH BAR */
  strengthRow: { marginBottom: 16, marginTop: 4 },
  strengthLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  strengthLabel: { fontSize: 10, color: UI_COLORS.text3 },
  strengthBarGroup: { flexDirection: 'row', gap: 4 },
  sbar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: UI_COLORS.border2 },

  /* INVITE CARD */
  inviteCard: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 14, padding: 14, marginBottom: 20, marginTop: 6 },
  inviteTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  inviteIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(124,111,247,0.15)', alignItems: 'center', justifyContent: 'center' },
  inviteTitle: { flex: 1, fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  inviteSkip: { fontSize: 11, color: UI_COLORS.text3, fontWeight: '500' },
  inviteField: { flexDirection: 'row', alignItems: 'center', backgroundColor: UI_COLORS.input, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 10, paddingHorizontal: 12, height: 40, gap: 8 },
  inviteFieldTxt: { flex: 1, fontSize: 13, color: UI_COLORS.text },

  /* TERMS & ACTIONS */
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  checkBox: { width: 18, height: 18, borderRadius: 5, borderWidth: 0.5, borderColor: UI_COLORS.border2, backgroundColor: UI_COLORS.input, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkBoxChecked: { backgroundColor: UI_COLORS.gold, borderColor: UI_COLORS.gold },
  termsTxt: { flex: 1, fontSize: 11, color: UI_COLORS.text3, lineHeight: 18 },
  termsLink: { color: UI_COLORS.violet, fontWeight: '500' },
  btnPrimary: { width: '100%', height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  btnPrimaryTxt: { fontSize: 15, fontWeight: '600', color: UI_COLORS.bg },
  loginRow: { flexDirection: 'row', justifyContent: 'center', gap: 4 },
  loginTxt: { fontSize: 12, color: UI_COLORS.text3 },
  loginLink: { fontSize: 12, color: UI_COLORS.gold, fontWeight: '600' },
});