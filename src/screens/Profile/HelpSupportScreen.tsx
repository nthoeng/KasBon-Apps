import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.07)', b2: 'rgba(255,255,255,0.14)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const HelpSupportScreen = () => {
  const navigation = useNavigation<any>();
  
  // State untuk FAQ Accordion dan Rating Bintang
  const [activeFaq, setActiveFaq] = useState<number | null>(0); // Buka FAQ pertama by default
  const [rating, setRating] = useState<number>(0);

  const guides = [
    { 
      id: 'g1', 
      title: 'Catat transaksi', 
      sub: 'Cara input masuk & keluar', 
      icon: 'add', 
      color: UI_COLORS.red, 
      bg: 'rgba(255,107,107,0.12)',
      onPress: () => navigation.navigate('Add') // Menuju ke halaman form input transaksi
    },
    { 
      id: 'g2', 
      title: 'QR Transfer', 
      sub: 'Kirim & terima antar dompet', 
      icon: 'qr-code', 
      color: UI_COLORS.gold, 
      bg: 'rgba(245,200,66,0.12)',
      onPress: () => navigation.navigate('QRWallet') // Menuju ke halaman QR kamu
    },
    { 
      id: 'g3', 
      title: 'Tabungan target', 
      sub: 'Atur target & pantau progres', 
      icon: 'wallet', 
      color: UI_COLORS.violet, 
      bg: 'rgba(124,111,247,0.12)',
      onPress: () => Alert.alert('KasBon Info', 'Fitur Tabungan Target sedang dalam tahap pengembangan.') // Placeholder Alert
    },
    { 
      id: 'g4', 
      title: 'Budget bulanan', 
      sub: 'Batas & alert per kategori', 
      icon: 'bar-chart', 
      color: UI_COLORS.mint, 
      bg: 'rgba(45,212,164,0.12)',
      onPress: () => Alert.alert('KasBon Info', 'Fitur Budget Bulanan sedang dalam tahap pengembangan.') // Placeholder Alert
    },
    { 
      id: 'g5', 
      title: 'Undang anggota', 
      sub: 'Tambah keluarga ke app', 
      icon: 'people', 
      color: UI_COLORS.mint, 
      bg: 'rgba(45,212,164,0.1)',
      onPress: () => navigation.navigate('ManageMembers') // Menuju ke halaman Kelola Anggota
    },
  ];

  const faqs = [
    { q: 'Apakah data saya aman di KasBon?', a: 'Ya. Semua data dienkripsi saat penyimpanan dan pengiriman menggunakan TLS 1.3. Password menggunakan bcrypt. Data keuanganmu tidak dibagikan ke pihak ketiga manapun.' },
    { q: 'Berapa maks. anggota keluarga yang bisa bergabung?', a: 'Untuk pengguna gratis, maksimal 10 anggota per keluarga. Jika kamu membutuhkan lebih banyak, silakan pertimbangkan untuk upgrade ke KasBon PRO.' },
    { q: 'Bagaimana cara transfer antar dompet pakai QR?', a: 'Masuk ke menu Catat > Transfer, lalu pilih mode Scan QR. Arahkan kamera ke QR profil tujuan. Dana akan langsung tercatat sebagai mutasi antar dompet.' },
    { q: 'Apakah bisa backup & restore data?', a: 'KasBon menggunakan sistem cloud. Selama kamu ingat email dan password akun, seluruh datamu akan otomatis tersinkronisasi saat login di perangkat baru.' },
    { q: 'Kenapa saldo saya tidak sinkron?', a: 'Pastikan koneksi internet stabil. Kamu bisa melakukan tarik ke bawah (pull-to-refresh) di halaman Home untuk memaksa sinkronisasi ulang data terbaru.' },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Tentang & bantuan</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* HERO BRANDING */}
        <View style={styles.heroBrand}>
          <View style={styles.brandCoin}>
            <View style={styles.brandCoinInner}>
              {/* Simulasi Logo Geometris KasBon menggunakan styling murni */}
              <View style={styles.logoShapeLeft} />
              <View style={styles.logoShapeRight} />
              <View style={styles.logoShapeDot} />
            </View>
          </View>
          <Text style={styles.brandName}><Text style={{ color: UI_COLORS.gold }}>Kas</Text>Bon</Text>
          <Text style={styles.brandTagline}>catat bareng, hemat bareng</Text>
          <View style={styles.versionChip}>
            <Ionicons name="cube-outline" size={14} color={UI_COLORS.t2} />
            <Text style={styles.vcTxt}>Versi 1.0.0 (build 2026.06.18)</Text>
            <View style={styles.vcBadge}><Text style={styles.vcBadgeTxt}>Terbaru</Text></View>
          </View>
        </View>

        {/* PANDUAN FITUR (HORIZONTAL SCROLL) */}
        <Text style={styles.secLbl}>Panduan fitur</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.guideScroll}
        >
          {guides.map((item) => (
            <TouchableOpacity 
                key={item.id} 
                style={styles.guideCard} 
                activeOpacity={0.7} 
                onPress={item.onPress}
            >
              <View style={[styles.gcIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.gcTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.gcSub} numberOfLines={2}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FAQ ACCORDION */}
        <Text style={styles.secLbl}>Pertanyaan umum (FAQ)</Text>
        <View style={styles.card}>
          {faqs.map((faq, index) => {
            const isActive = activeFaq === index;
            const isLast = index === faqs.length - 1;
            return (
              <View key={index} style={[styles.faqItem, isLast && { borderBottomWidth: 0 }]}>
                <TouchableOpacity style={styles.faqQ} onPress={() => toggleFaq(index)} activeOpacity={0.7}>
                  <Text style={styles.faqQtxt}>{faq.q}</Text>
                  <Ionicons name={isActive ? "chevron-up" : "chevron-down"} size={16} color={UI_COLORS.t3} />
                </TouchableOpacity>
                {isActive && (
                  <Text style={styles.faqAns}>{faq.a}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* HUBUNGI KAMI */}
        <Text style={styles.secLbl}>Hubungi kami</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.contactRow} activeOpacity={0.7}>
            <View style={[styles.crIcon, { backgroundColor: 'rgba(45,212,164,0.12)' }]}><Ionicons name="mail" size={18} color={UI_COLORS.mint} /></View>
            <View style={styles.crInfo}>
              <Text style={styles.crTitle}>Email support</Text>
              <Text style={styles.crSub}>support@kasbon.app · balas 1×24 jam</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactRow} activeOpacity={0.7}>
            <View style={[styles.crIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="logo-whatsapp" size={18} color={UI_COLORS.mint} /></View>
            <View style={styles.crInfo}>
              <Text style={styles.crTitle}>WhatsApp support</Text>
              <Text style={styles.crSub}>Chat langsung · Senin–Jumat 08–17</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactRow, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
            <View style={[styles.crIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="logo-instagram" size={18} color={UI_COLORS.violet} /></View>
            <View style={styles.crInfo}>
              <Text style={styles.crTitle}>Instagram</Text>
              <Text style={styles.crSub}>@kasbon.app · tips & update fitur</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
        </View>

        {/* INFO APLIKASI */}
        <Text style={styles.secLbl}>Informasi aplikasi</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Versi aplikasi</Text><Text style={styles.irVal}>1.0.0</Text></View>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Nomor build</Text><Text style={styles.irVal}>2026.06.18</Text></View>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Platform</Text><Text style={styles.irVal}>React Native / Expo</Text></View>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Terakhir diperbarui</Text><Text style={styles.irVal}>18 Juni 2026</Text></View>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Syarat & ketentuan</Text><TouchableOpacity><Text style={styles.irLink}>Baca ↗</Text></TouchableOpacity></View>
          <View style={styles.infoRow}><Text style={styles.irLbl}>Kebijakan privasi</Text><TouchableOpacity><Text style={styles.irLink}>Baca ↗</Text></TouchableOpacity></View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}><Text style={styles.irLbl}>Lisensi open source</Text><TouchableOpacity><Text style={styles.irLink}>Lihat ↗</Text></TouchableOpacity></View>
        </View>

        {/* FEEDBACK RATING */}
        <View style={styles.feedbackCard}>
          <View style={styles.fcHeader}>
            <View style={styles.fcIcon}><Ionicons name="star" size={18} color="#7C6FF7" /></View>
            <Text style={styles.fcTitle}>Kasih rating untuk KasBon</Text>
          </View>
          <Text style={styles.fcSub}>Bantu kami berkembang! Rating kamu sangat berarti untuk pengembangan fitur berikutnya.</Text>
          
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((starIdx) => (
              <TouchableOpacity key={starIdx} onPress={() => setRating(starIdx)}>
                <Ionicons 
                  name={rating >= starIdx ? "star" : "star-outline"} 
                  size={32} 
                  color={rating >= starIdx ? UI_COLORS.gold : UI_COLORS.t3} 
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[styles.btnFeedback, rating === 0 && { opacity: 0.5 }]} disabled={rating === 0}>
            <Ionicons name="send" size={14} color="#FFF" />
            <Text style={styles.btnFeedbackTxt}>{rating > 0 ? `Kirim bintang ${rating}` : 'Kirim feedback'}</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerTxt}>Dibuat dengan ❤ oleh keluarga, untuk keluarga.</Text>
          <Text style={styles.footerTxt}>© 2026 KasBon · All rights reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },

  // HERO BRANDING
  heroBrand: { alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 16 },
  brandCoin: { width: 64, height: 64, borderRadius: 32, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  brandCoinInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#E8A800', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  logoShapeLeft: { width: 24, height: 24, backgroundColor: UI_COLORS.gold, borderBottomRightRadius: 16, position: 'absolute', left: 4, top: 8 },
  logoShapeRight: { width: 20, height: 20, backgroundColor: '#FDE8D8', borderTopLeftRadius: 10, position: 'absolute', right: 4, bottom: 8 },
  logoShapeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: UI_COLORS.gold, position: 'absolute', right: 12, top: 12 },
  brandName: { fontSize: 24, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -0.5, marginBottom: 3 },
  brandTagline: { fontSize: 12, color: UI_COLORS.t3, fontStyle: 'italic', marginBottom: 12 },
  versionChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 14 },
  vcTxt: { fontSize: 11, color: UI_COLORS.t2 },
  vcBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, backgroundColor: 'rgba(45,212,164,0.12)' },
  vcBadgeTxt: { fontSize: 9, fontWeight: '600', color: UI_COLORS.mint },

  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },
  
  // PANDUAN FITUR
  guideScroll: { paddingHorizontal: 18, paddingBottom: 12, gap: 10 },
  guideCard: { width: 110, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12 },
  gcIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  gcTitle: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, lineHeight: 16, marginBottom: 3 },
  gcSub: { fontSize: 10, color: UI_COLORS.t3, lineHeight: 14 },

  card: { marginHorizontal: 16, marginBottom: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  
  // FAQ
  faqItem: { borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  faqQ: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 12, gap: 10 },
  faqQtxt: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, flex: 1, lineHeight: 18 },
  faqAns: { paddingHorizontal: 13, paddingBottom: 12, paddingTop: 2, fontSize: 12, color: UI_COLORS.t2, lineHeight: 20 },

  // CONTACT ROW
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 13, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  crIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  crInfo: { flex: 1 },
  crTitle: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  crSub: { fontSize: 11, color: UI_COLORS.t3 },

  // INFO ROW
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 11, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  irLbl: { fontSize: 12, color: UI_COLORS.t2 },
  irVal: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  irLink: { fontSize: 12, fontWeight: '600', color: UI_COLORS.violet },

  // FEEDBACK RATING
  feedbackCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(124,111,247,0.07)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.2)', borderRadius: 16, padding: 14 },
  fcHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  fcIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: 'rgba(124,111,247,0.12)', alignItems: 'center', justifyContent: 'center' },
  fcTitle: { fontSize: 13, fontWeight: '600', color: '#A89FF9' },
  fcSub: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 14, lineHeight: 17 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 16 },
  btnFeedback: { height: 42, borderRadius: 12, backgroundColor: UI_COLORS.violet, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnFeedbackTxt: { fontSize: 13, fontWeight: '600', color: '#FFF' },

  // FOOTER
  footerWrap: { paddingHorizontal: 18, paddingVertical: 8, alignItems: 'center', gap: 4 },
  footerTxt: { fontSize: 11, color: UI_COLORS.t3 }
});