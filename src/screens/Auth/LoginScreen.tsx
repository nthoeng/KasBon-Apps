import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

const { colors } = theme;

const UI_COLORS = {
  bg: '#0A1628',
  input: '#111E30',
  text: '#F0F4FF',
  text2: '#8FA8CC',
  text3: '#3E5878',
  gold: '#F5C842',
  violet: '#7C6FF7',
  border: 'rgba(255,255,255,0.09)',
};

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('bayu@email.com');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        
        {/* LOGO SECTION */}
        <View style={styles.logoRow}>
          <View style={styles.coin}>
            <View style={styles.coinInner}>
              <Ionicons name="home" size={24} color="#F5C842" />
            </View>
          </View>
          <Text style={styles.appName}><Text style={{ color: UI_COLORS.gold }}>Kas</Text>Bon</Text>
          <Text style={styles.appSub}>Masuk ke akun keluargamu</Text>
        </View>

        {/* FORM AREA */}
        <View style={styles.formArea}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={[styles.fieldWrap, { borderColor: UI_COLORS.gold }]}>
              <Ionicons name="mail" size={17} color={UI_COLORS.text3} />
              <TextInput 
                style={styles.fieldText} 
                value={email} 
                onChangeText={setEmail}
                placeholder="bayu@email.com"
                placeholderTextColor={UI_COLORS.text3}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.fieldWrap}>
              <Ionicons name="lock-closed" size={17} color={UI_COLORS.text3} />
              <View style={styles.pwDots}>
                {[1,2,3,4,5,6,7,8].map((d) => <View key={d} style={styles.pwDot} />)}
              </View>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name="eye" size={16} color={UI_COLORS.text3} style={styles.eyeBtn} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.checkRow} activeOpacity={0.7}>
              <View style={[styles.checkBox, styles.checkBoxChecked]}>
                <Ionicons name="checkmark" size={12} color={UI_COLORS.bg} />
              </View>
              <Text style={styles.checkLbl}>Ingat saya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ color: UI_COLORS.violet, fontSize: 12 }}>Lupa password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.replace('MainTabs')}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: UI_COLORS.bg }}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divTxt}>atau masuk dengan</Text>
            <View style={styles.divLine} />
          </View>

          <TouchableOpacity style={styles.btnGoogle}>
            <Ionicons name="logo-google" size={16} color={UI_COLORS.text2} />
            <Text style={styles.btnGoogleTxt}>Lanjutkan dengan Google</Text>
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.regTxt}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.regLink}>Daftar sekarang ↗</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  screen: { paddingVertical: 36 },
  logoRow: { alignItems: 'center', marginBottom: 28 },
  coin: { width: 60, height: 60, borderRadius: 30, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  coinInner: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E8A800', alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 40, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -0.5, marginBottom: 4 },
  appSub: { fontSize: 16, color: UI_COLORS.text3 },
  formArea: { paddingHorizontal: 20 },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 14, color: UI_COLORS.text2, marginBottom: 6 },
  fieldWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: UI_COLORS.input, borderWidth: 0.5, borderColor: UI_COLORS.border, borderRadius: 12, paddingHorizontal: 14, height: 46, gap: 10 },
  fieldText: { flex: 1, fontSize: 16, color: UI_COLORS.text },
  eyeBtn: { color: UI_COLORS.text3 },
  pwDots: { flexDirection: 'row', gap: 5, flex: 1 },
  pwDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: UI_COLORS.text2 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 22 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkBox: { width: 18, height: 18, borderRadius: 5, borderWidth: 0.5, borderColor: UI_COLORS.border, alignItems: 'center', justifyContent: 'center' },
  checkBoxChecked: { backgroundColor: UI_COLORS.gold, borderColor: UI_COLORS.gold },
  checkLbl: { fontSize: 14, color: UI_COLORS.text2 },
  forgot: { textAlign: 'right' },
  btnPrimary: { width: '100%', height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  divLine: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.border },
  divTxt: { fontSize: 14, color: UI_COLORS.text3 },
  btnGoogle: { width: '100%', height: 60, borderRadius: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnGoogleTxt: { fontSize: 16, color: UI_COLORS.text2 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', gap: 4, paddingTop: 16 },
  regTxt: { fontSize: 14, color: UI_COLORS.text3 },
  regLink: { fontSize: 14, color: UI_COLORS.gold, fontWeight: '500' },
});