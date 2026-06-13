import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  border: 'rgba(255,255,255,0.09)',
  border2: 'rgba(255,255,255,0.16)',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  text: '#F0F4FF',
  text2: '#8FA8CC',
  text3: '#3E5878',
};

// --- DATA SLIDES ---
const slides = [
  {
    badgeIcon: 'wallet', badgeText: 'Dompet keluarga', badgeColor: UI_COLORS.gold,
    title: 'Semua keuangan,\nsatu tempat',
    desc: 'Kelola dompet bersama keluarga. Pilih mana yang dibagi, mana yang private.',
    btnColor: UI_COLORS.gold, btnTextColor: UI_COLORS.bg,
    pills: [
      { icon: 'people', text: 'Multi user', color: UI_COLORS.gold },
      { icon: 'eye', text: 'Global & private', color: UI_COLORS.mint },
      { icon: 'sync', text: 'Sync real-time', color: UI_COLORS.violet },
    ]
  },
  {
    badgeIcon: 'qr-code', badgeText: 'QR Transfer', badgeColor: UI_COLORS.violet,
    title: 'Transfer semudah\nscan QR',
    desc: 'Tunjukkan QR dompetmu, minta pasangan scan — transfer langsung tercatat otomatis.',
    btnColor: UI_COLORS.violet, btnTextColor: '#FFF',
    pills: [
      { icon: 'flash', text: 'Instan & otomatis', color: UI_COLORS.gold },
      { icon: 'phone-portrait', text: 'Antar HP', color: UI_COLORS.violet },
      { icon: 'checkmark-circle', text: 'Langsung tercatat', color: UI_COLORS.mint },
    ]
  },
  {
    badgeIcon: 'bar-chart', badgeText: 'Statistik & budget', badgeColor: UI_COLORS.mint,
    title: 'Pantau & rencanakan\nbersama',
    desc: 'Statistik lengkap, atur budget bulanan, tabungan bertarget, dan pantau hutang — semua di satu layar.',
    btnColor: UI_COLORS.mint, btnTextColor: UI_COLORS.bg,
    pills: [
      { icon: 'trending-up', text: 'Statistik bulanan', color: UI_COLORS.mint },
      { icon: 'wallet', text: 'Target tabungan', color: UI_COLORS.violet },
      { icon: 'calendar', text: 'Budget rutin', color: UI_COLORS.gold },
    ]
  }
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigation.replace('Login');
    } else {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  // --- KOMPONEN MINI UI UNTUK SETIAP SLIDE ---
  const renderMiniUISlide1 = () => (
    <View style={styles.miniUi}>
      <Text style={{ fontSize: 10, color: UI_COLORS.text3, marginBottom: 8, letterSpacing: 0.5 }}>Dompet keluarga</Text>
      <Text style={{ fontSize: 20, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 }}>Rp 14.250.000</Text>
      <Text style={{ fontSize: 10, color: UI_COLORS.text3, marginBottom: 14 }}>Saldo terpusat</Text>
      
      <View style={styles.miniRow}>
        <View style={[styles.miniIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="home" size={15} color={UI_COLORS.gold} /></View>
        <View style={styles.miniInfo}><Text style={styles.miniName}>Kas keluarga</Text><Text style={styles.miniSub}>Global · semua bisa akses</Text></View>
        <Text style={[styles.miniAmt, { color: UI_COLORS.gold }]}>Rp 6,8jt</Text>
      </View>
      <View style={styles.miniRow}>
        <View style={[styles.miniIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="business" size={15} color={UI_COLORS.mint} /></View>
        <View style={styles.miniInfo}><Text style={styles.miniName}>BCA Bayu</Text><Text style={styles.miniSub}>Private · hanya kamu</Text></View>
        <Text style={[styles.miniAmt, { color: UI_COLORS.mint }]}>Rp 4,1jt</Text>
      </View>
      <View style={[styles.miniRow, { borderBottomWidth: 0 }]}>
        <View style={[styles.miniIcon, { backgroundColor: 'rgba(124,111,247,0.1)' }]}><Ionicons name="wallet" size={15} color={UI_COLORS.violet} /></View>
        <View style={styles.miniInfo}><Text style={styles.miniName}>Dana darurat</Text><Text style={styles.miniSub}>Global · target Rp 10jt</Text></View>
        <Text style={[styles.miniAmt, { color: UI_COLORS.violet }]}>Rp 2,5jt</Text>
      </View>
    </View>
  );

  const renderMiniUISlide2 = () => (
    <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center', width: '100%', paddingHorizontal: 10 }}>
      <View style={{ flex: 1, alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 10, color: UI_COLORS.text3 }}>Dompet Bayu</Text>
        <View style={styles.qrBox}><Ionicons name="qr-code" size={40} color={UI_COLORS.gold} /></View>
        <Text style={{ fontSize: 10, color: UI_COLORS.text3 }}>Tunjukkan QR ini</Text>
      </View>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Ionicons name="swap-horizontal" size={24} color={UI_COLORS.violet} />
        <Text style={{ fontSize: 10, color: UI_COLORS.text3 }}>Scan</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 10, color: UI_COLORS.text3 }}>Dompet Istri</Text>
        <View style={[styles.qrBox, { backgroundColor: 'rgba(45,212,164,0.05)', borderColor: 'rgba(45,212,164,0.2)' }]}>
          <Ionicons name="scan" size={32} color={UI_COLORS.mint} />
        </View>
        <Text style={{ fontSize: 10, color: UI_COLORS.text3 }}>Scan & transfer</Text>
      </View>
    </View>
  );

  const renderMiniUISlide3 = () => (
    <View style={styles.miniUi}>
      <Text style={{ fontSize: 10, color: UI_COLORS.text3, marginBottom: 12 }}>Ringkasan Juni 2026</Text>
      
      <View style={styles.statBarRow}>
        <View style={styles.statBarLbl}><Text style={{fontSize:11, color:UI_COLORS.text2}}>Pemasukan</Text><Text style={{fontSize:11, color:UI_COLORS.mint, fontWeight:'600'}}>Rp 8.500.000</Text></View>
        <View style={styles.statBarTrack}><View style={[styles.statBarFill, { width: '85%', backgroundColor: UI_COLORS.mint }]} /></View>
      </View>
      <View style={[styles.statBarRow, { marginBottom: 14 }]}>
        <View style={styles.statBarLbl}><Text style={{fontSize:11, color:UI_COLORS.text2}}>Pengeluaran</Text><Text style={{fontSize:11, color:UI_COLORS.red, fontWeight:'600'}}>Rp 4.250.000</Text></View>
        <View style={styles.statBarTrack}><View style={[styles.statBarFill, { width: '42%', backgroundColor: UI_COLORS.red }]} /></View>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statCard}><Text style={styles.statCardLbl}>Budget terpakai</Text><Text style={[styles.statCardVal, {color: UI_COLORS.gold}]}>68%</Text></View>
        <View style={styles.statCard}><Text style={styles.statCardLbl}>Sisa bulan ini</Text><Text style={[styles.statCardVal, {color: UI_COLORS.mint}]}>Rp 4,25jt</Text></View>
        <View style={styles.statCard}><Text style={styles.statCardLbl}>Target tabungan</Text><Text style={[styles.statCardVal, {color: UI_COLORS.violet}]}>Rp 10jt</Text></View>
        <View style={styles.statCard}><Text style={styles.statCardLbl}>Sisa hutang</Text><Text style={[styles.statCardVal, {color: UI_COLORS.red}]}>Rp 3,2jt</Text></View>
      </View>
    </View>
  );

  const currentSlide = slides[activeIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* HEADER LEWATI */}
        <View style={styles.skipRow}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipBtn}>Lewati</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {/* AREA ILUSTRASI MINI-UI */}
          <View style={styles.illusArea}>
            {activeIndex === 0 && renderMiniUISlide1()}
            {activeIndex === 1 && renderMiniUISlide2()}
            {activeIndex === 2 && renderMiniUISlide3()}
          </View>

          {/* AREA KONTEN BAWAH */}
          <View style={styles.slideContent}>
            
            {/* BADGE */}
            <View style={styles.slideBadge}>
              <Ionicons name={currentSlide.badgeIcon as any} size={14} color={currentSlide.badgeColor} />
              <Text style={{ fontSize: 11, fontWeight: '600', color: currentSlide.badgeColor }}>{currentSlide.badgeText}</Text>
            </View>
            
            <Text style={styles.slideTitle}>{currentSlide.title}</Text>
            <Text style={styles.slideDesc}>{currentSlide.desc}</Text>
            
            {/* FEATURE PILLS */}
            <View style={styles.featPills}>
              {currentSlide.pills.map((pill, idx) => (
                <View key={idx} style={styles.pill}>
                  <Ionicons name={pill.icon as any} size={13} color={pill.color} />
                  <Text style={styles.pillTxt}>{pill.text}</Text>
                </View>
              ))}
            </View>

            {/* DOTS INDICATOR */}
            <View style={styles.dotsRow}>
              {slides.map((_, index) => (
                <View key={index} style={[styles.dotOb, index === activeIndex ? styles.dotActive : styles.dotIdle]} />
              ))}
            </View>

            {/* BUTTONS */}
            <TouchableOpacity 
              style={[styles.btnNext, { backgroundColor: currentSlide.btnColor }]} 
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={[styles.btnNextTxt, { color: currentSlide.btnTextColor }]}>
                {activeIndex === 2 ? 'Mulai sekarang' : 'Selanjutnya'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={currentSlide.btnTextColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnGhost} onPress={handleSkip}>
              <Text style={styles.btnGhostTxt}>Masuk ke akun</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  container: { flex: 1 },
  
  /* HEADER */
  skipRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 24, paddingTop: 10 },
  skipBtn: { fontSize: 13, color: UI_COLORS.text3, padding: 4, fontWeight: '500' },
  
  /* ILUSTRASI AREA */
  illusArea: { minHeight: 280, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
  
  /* MINI UI GLOBAL */
  miniUi: { width: '100%', backgroundColor: UI_COLORS.card2, borderRadius: 20, borderWidth: 0.5, borderColor: UI_COLORS.border2, padding: 16 },
  
  /* MINI UI S1 (DOMPET) */
  miniRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.border },
  miniIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  miniInfo: { flex: 1 },
  miniName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  miniSub: { fontSize: 10, color: UI_COLORS.text3 },
  miniAmt: { fontSize: 14, fontWeight: '600' },

  /* MINI UI S2 (QR) */
  qrBox: { width: 90, height: 90, backgroundColor: UI_COLORS.card, borderRadius: 16, borderWidth: 0.5, borderColor: UI_COLORS.border2, justifyContent: 'center', alignItems: 'center' },

  /* MINI UI S3 (STAT) */
  statBarRow: { marginBottom: 10 },
  statBarLbl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statBarTrack: { height: 6, backgroundColor: UI_COLORS.border2, borderRadius: 3, overflow: 'hidden' },
  statBarFill: { height: '100%', borderRadius: 3 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  statCard: { width: '48%', backgroundColor: UI_COLORS.card, borderRadius: 12, padding: 10, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.05)' },
  statCardLbl: { fontSize: 10, color: UI_COLORS.text3, marginBottom: 4 },
  statCardVal: { fontSize: 15, fontWeight: '600' },

  /* CONTENT AREA */
  slideContent: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  slideBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginBottom: 16 },
  slideTitle: { fontSize: 24, fontWeight: '700', color: UI_COLORS.text, lineHeight: 32, marginBottom: 10 },
  slideDesc: { fontSize: 13, color: UI_COLORS.text2, lineHeight: 20, marginBottom: 24 },
  
  /* PILLS */
  featPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  pillTxt: { fontSize: 11, color: UI_COLORS.text2, fontWeight: '500' },

  /* DOTS */
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 24 },
  dotOb: { height: 8, borderRadius: 4 },
  dotActive: { width: 24, backgroundColor: UI_COLORS.gold },
  dotIdle: { width: 8, backgroundColor: UI_COLORS.text3 },

  /* BUTTONS */
  btnNext: { flexDirection: 'row', width: '100%', height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnNextTxt: { fontSize: 15, fontWeight: '600' },
  btnGhost: { width: '100%', height: 44, marginTop: 12, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnGhostTxt: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text2 },
});