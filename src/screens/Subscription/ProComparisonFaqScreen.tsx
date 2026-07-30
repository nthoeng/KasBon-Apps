import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  gold: '#F5C842',
  mint: '#2DD4A4',
  violet: '#7C6FF7',
  text: '#F0F4FF',
  t2: '#8FA8CC',
  t3: '#3E5878',
  b1: 'rgba(255,255,255,0.08)',
  b2: 'rgba(255,255,255,0.15)',
};

export const ProComparisonFaqScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.ibtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.tcenter}>Free vs Pro & FAQ</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TABEL PERBANDINGAN */}
        <Text style={styles.sectLbl}>Perbandingan Paket</Text>
        <View style={styles.tableCard}>
          <View style={styles.cmpHead}>
            <Text style={[styles.cmpHeadTxt, { textAlign: 'left' }]}>Fitur</Text>
            <Text style={styles.cmpHeadTxt}>Free</Text>
            <Text style={[styles.cmpHeadTxt, { color: UI_COLORS.gold }]}>Pro</Text>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>Anggota keluarga</Text>
            <Text style={styles.cmpVal}>2</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="infinite" size={16} color={UI_COLORS.mint} />
            </View>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>Project & usaha</Text>
            <Text style={styles.cmpVal}>1</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="infinite" size={16} color={UI_COLORS.mint} />
            </View>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>Riwayat transaksi</Text>
            <Text style={styles.cmpVal}>3 bulan</Text>
            <Text style={[styles.cmpVal, { color: UI_COLORS.gold }]}>Tanpa batas</Text>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>QR transfer</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
            </View>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
            </View>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>Export PDF/Excel</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
            </View>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
            </View>
          </View>

          <View style={styles.cmpRow}>
            <Text style={styles.cmpLabel}>Web admin dashboard</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
            </View>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
            </View>
          </View>

          <View style={[styles.cmpRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.cmpLabel}>Statistik lengkap</Text>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
            </View>
            <View style={styles.cmpCheckWrap}>
              <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
            </View>
          </View>
        </View>

        {/* PERTANYAAN UMUM (FAQ) */}
        <Text style={styles.sectLbl}>Pertanyaan Umum (FAQ)</Text>

        <View style={styles.faqItem}>
          <View style={styles.faqQ}>
            <Ionicons name="help-circle-outline" size={16} color={UI_COLORS.violet} />
            <Text style={styles.faqQTxt}>Apakah semua anggota harus bayar?</Text>
          </View>
          <Text style={styles.faqA}>
            Tidak. Satu langganan Pro berlaku untuk seluruh keluarga yang tergabung dalam satu workspace.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <View style={styles.faqQ}>
            <Ionicons name="help-circle-outline" size={16} color={UI_COLORS.violet} />
            <Text style={styles.faqQTxt}>Bagaimana jika trial berakhir?</Text>
          </View>
          <Text style={styles.faqA}>
            Akun otomatis turun ke Free, data tetap aman tersimpan, hanya fitur Pro yang terkunci kembali.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <View style={styles.faqQ}>
            <Ionicons name="help-circle-outline" size={16} color={UI_COLORS.violet} />
            <Text style={styles.faqQTxt}>Bisa batalkan kapan saja?</Text>
          </View>
          <Text style={styles.faqA}>
            Bisa, langsung dari menu Pengaturan tanpa perlu hubungi siapa pun.
          </Text>
        </View>

        {/* CTA UPGRADE DARI HALAMAN FAQ */}
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ProUpgrade')}
        >
          <Text style={styles.ctaBtnTxt}>Upgrade ke KasBon Pro Sekarang</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.bg },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  ibtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tcenter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  scrollContent: { paddingHorizontal: 18 },
  sectLbl: {
    fontSize: 11,
    color: UI_COLORS.t3,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 10,
  },
  tableCard: {
    backgroundColor: UI_COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    marginBottom: 16,
  },
  cmpHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
  },
  cmpHeadTxt: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: UI_COLORS.t2,
  },
  cmpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
  },
  cmpLabel: { flex: 1.4, fontSize: 12, color: UI_COLORS.text },
  cmpVal: { flex: 1, textAlign: 'center', fontSize: 11.5, color: UI_COLORS.t2 },
  cmpCheckWrap: { flex: 1, alignItems: 'center' },
  faqItem: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  faqQ: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  faqQTxt: { fontSize: 12.5, fontWeight: '600', color: UI_COLORS.text },
  faqA: { fontSize: 11.5, color: UI_COLORS.t2, lineHeight: 17, paddingLeft: 24 },
  ctaBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: UI_COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  ctaBtnTxt: { fontSize: 14.5, fontWeight: '700', color: UI_COLORS.bg },
});