import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

export const QRWalletScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'show' | 'scan'>('show');
  
  // Animasi garis scan kamera
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeTab === 'scan') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, { toValue: 150, duration: 1500, useNativeDriver: true }),
          Animated.timing(scanLineAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
        ])
      ).start();
    } else {
      scanLineAnim.stopAnimation();
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <View style={styles.topbarCenter}>
          <Text style={styles.pageTitle}>QR dompet</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name={activeTab === 'show' ? "share-social" : "time"} size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity style={[styles.tab, activeTab === 'show' ? styles.tabActiveGold : styles.tabIdle]} onPress={() => setActiveTab('show')}>
          <Ionicons name="qr-code" size={14} color={activeTab === 'show' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: activeTab === 'show' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Tampilkan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'scan' ? styles.tabActiveViolet : styles.tabIdle]} onPress={() => setActiveTab('scan')}>
          <Ionicons name="scan" size={14} color={activeTab === 'scan' ? '#FFF' : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: activeTab === 'scan' ? '#FFF' : UI_COLORS.t3 }]}>Scan</Text>
        </TouchableOpacity>
      </View>

      {/* KONTEN DINAMIS */}
      {activeTab === 'show' ? (
        <ScrollView contentContainerStyle={styles.qrScreen} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.walletChip}>
            <View style={[styles.wcIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="home" size={18} color={UI_COLORS.gold} /></View>
            <View style={styles.wcInfo}>
              <Text style={styles.wcName}>Kas keluarga</Text>
              <Text style={styles.wcSaldo}>Saldo: Rp 6.800.000</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>

          <View style={styles.qrCard}>
            <View style={styles.qrLogoArea}>
              <View style={styles.qrLogo}><Ionicons name="wallet" size={18} color="#FFF" /></View>
              <Text style={styles.qrBrand}>KasBon</Text>
            </View>
            {/* Placeholder Visual QR */}
            <View style={styles.qrGridPlaceholder}>
              <Ionicons name="qr-code" size={120} color="#0F1923" />
            </View>
            <Text style={styles.qrName}>Kas keluarga</Text>
            <Text style={styles.qrType}>Dompet keluarga — Global</Text>
          </View>

          <View style={styles.timerRow}>
            <Ionicons name="time" size={14} color={UI_COLORS.t3} />
            <Text style={styles.timerTxt}>QR aktif selama</Text>
            <Text style={styles.timerVal}>08:42</Text>
            <Text style={styles.timerTxt}>— lalu refresh otomatis</Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actBtn}><Ionicons name="refresh" size={16} color={UI_COLORS.t2} /><Text style={styles.actBtnTxt}>Refresh QR</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actBtn}><Ionicons name="download" size={16} color={UI_COLORS.t2} /><Text style={styles.actBtnTxt}>Simpan foto</Text></TouchableOpacity>
          </View>

          <View style={styles.securityBox}>
            <Ionicons name="shield-checkmark" size={18} color={UI_COLORS.violet} style={{ flexShrink: 0 }} />
            <View>
              <Text style={styles.secTitle}>QR aman & terenkripsi</Text>
              <Text style={styles.secDesc}>Berisi ID terenkripsi, bukan data saldo</Text>
            </View>
          </View>
        </ScrollView>

      ) : (

        <View style={styles.scanScreen}>
          {/* AREA KAMERA (MOCKUP) */}
          <View style={styles.cameraArea}>
            <View style={styles.camTopbar}>
              <Text style={styles.camTitle}>Arahkan ke QR dompet</Text>
              <TouchableOpacity style={styles.torchBtn}><Ionicons name="flashlight" size={16} color="rgba(255,255,255,0.7)" /></TouchableOpacity>
            </View>
            
            <View style={styles.camOverlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.sfCorner, styles.sfTl]} />
                <View style={[styles.sfCorner, styles.sfTr]} />
                <View style={[styles.sfCorner, styles.sfBl]} />
                <View style={[styles.sfCorner, styles.sfBr]} />
                <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineAnim }] }]} />
              </View>
            </View>
            <Text style={styles.camHint}>Scan QR dompet atau QR profil anggota</Text>
          </View>

          {/* AREA BAWAH KAMERA */}
          <View style={styles.scanBody}>
            <View style={styles.scanInfoBox}>
              <Ionicons name="information-circle" size={18} color={UI_COLORS.violet} style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.siTitle}>Cara pakai scan QR</Text>
                <Text style={styles.siDesc}>Minta anggota keluarga tampilkan QR dompet mereka, lalu scan — form transfer akan terisi otomatis.</Text>
              </View>
            </View>

            <View style={styles.scanRecents}>
              <Text style={styles.srLbl}>Scan terakhir</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.srScroll}>
                <TouchableOpacity style={styles.srChip}>
                  <View style={[styles.srWIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="phone-portrait" size={14} color={UI_COLORS.violet} /></View>
                  <View><Text style={styles.srName}>GoPay Istri</Text><Text style={styles.srSub}>kemarin · 14:22</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.srChip}>
                  <View style={[styles.srWIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}><Ionicons name="home" size={14} color={UI_COLORS.gold} /></View>
                  <View><Text style={styles.srName}>Kas keluarga</Text><Text style={styles.srSub}>2 hari lalu · 09:41</Text></View>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* KEMBALI KE FORM MANUAL */}
            <TouchableOpacity 
              style={styles.btnScanFull}
              onPress={() => navigation.navigate('Add', { type: 'transfer' })}
            >
              <Ionicons name="scan" size={18} color="#FFF" />
              <Text style={styles.btnScanFullTxt}>Atau pilih dompet manual</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  topbarCenter: { flex: 1, alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '600', color: UI_COLORS.text },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  tabsWrap: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 14, padding: 3, marginHorizontal: 18, marginTop: 8 },
  tab: { flex: 1, height: 36, borderRadius: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  tabActiveGold: { backgroundColor: UI_COLORS.gold },
  tabActiveViolet: { backgroundColor: UI_COLORS.violet },
  tabIdle: { backgroundColor: 'transparent' },
  tabTxt: { fontSize: 12, fontWeight: '600' },
  
  // SHOW TAB
  qrScreen: { padding: 18, alignItems: 'center' },
  walletChip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12, width: '100%', marginBottom: 18 },
  wcIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  wcInfo: { flex: 1 },
  wcName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  wcSaldo: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  qrCard: { backgroundColor: '#F8FAFC', borderRadius: 24, padding: 24, width: width * 0.65, alignItems: 'center', marginBottom: 18 },
  qrLogoArea: { alignItems: 'center', marginBottom: 16 },
  qrLogo: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E8A800', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  qrBrand: { fontSize: 12, fontWeight: '700', color: '#0F1923' },
  qrGridPlaceholder: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  qrName: { fontSize: 14, fontWeight: '700', color: '#1E2D3D', marginTop: 12 },
  qrType: { fontSize: 11, color: '#5F7A96', marginTop: 4 },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  timerTxt: { fontSize: 11, color: UI_COLORS.t3 },
  timerVal: { fontSize: 11, fontWeight: '700', color: UI_COLORS.gold },
  actionsRow: { flexDirection: 'row', gap: 10, width: '100%', marginBottom: 16 },
  actBtn: { flex: 1, height: 46, borderRadius: 13, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  actBtnTxt: { fontSize: 12, color: UI_COLORS.t2, fontWeight: '500' },
  securityBox: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', backgroundColor: 'rgba(124,111,247,0.08)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.2)', borderRadius: 12, padding: 12 },
  secTitle: { fontSize: 12, fontWeight: '600', color: '#A89FF9' },
  secDesc: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },

  // SCAN TAB
  scanScreen: { flex: 1, backgroundColor: UI_COLORS.bg },
  cameraArea: { width: '100%', height: 300, backgroundColor: '#0A0F18', alignItems: 'center', justifyContent: 'center' },
  camTopbar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, zIndex: 10 },
  camTitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  torchBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  camOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  scanFrame: { width: 180, height: 180, position: 'relative' },
  sfCorner: { position: 'absolute', width: 30, height: 30, borderColor: UI_COLORS.gold, borderStyle: 'solid' },
  sfTl: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  sfTr: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  sfBl: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  sfBr: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  scanLine: { width: '100%', height: 2, backgroundColor: 'rgba(245,200,66,0.8)' },
  camHint: { position: 'absolute', bottom: 16, fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' },
  scanBody: { padding: 18, flex: 1 },
  scanInfoBox: { flexDirection: 'row', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 14, marginBottom: 18 },
  siTitle: { fontSize: 13, fontWeight: '600', color: '#A89FF9', marginBottom: 4 },
  siDesc: { fontSize: 11, color: UI_COLORS.t3, lineHeight: 18 },
  scanRecents: { marginBottom: 24 },
  srLbl: { fontSize: 12, color: UI_COLORS.t3, marginBottom: 10 },
  srScroll: { gap: 10 },
  srChip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 10, paddingRight: 16, marginRight: 10 },
  srWIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  srName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  srSub: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },
  btnScanFull: { width: '100%', height: 52, borderRadius: 16, backgroundColor: UI_COLORS.violet, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnScanFullTxt: { fontSize: 14, fontWeight: '600', color: '#FFF' },
});