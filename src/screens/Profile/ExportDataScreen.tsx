import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export const ExportDataScreen = () => {
  const navigation = useNavigation<any>();
  
  // States untuk pilihan opsi ekspor
  const [dateRange, setDateRange] = useState<'this_month' | 'last_3_months' | 'custom'>('this_month');
  const [fileFormat, setFileFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Simulasi proses download/ekspor data
  const handleExportData = () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
    }, 2500); // loading selama 2.5 detik
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Ekspor data</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* PILIHAN RENTANG WAKTU */}
        <Text style={styles.secLabel}>Pilih rentang waktu</Text>
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.optionRow} 
            activeOpacity={0.7} 
            onPress={() => setDateRange('this_month')}
          >
            <View style={[styles.iconWrap, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
              <Ionicons name="calendar-outline" size={16} color={UI_COLORS.mint} />
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.optionTitle}>Bulan ini</Text>
              <Text style={styles.optionSub}>1 Juni 2026 - Sekarang</Text>
            </View>
            <View style={styles.radioCircle}>
              {dateRange === 'this_month' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionRow} 
            activeOpacity={0.7} 
            onPress={() => setDateRange('last_3_months')}
          >
            <View style={[styles.iconWrap, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.12) }]}>
              <Ionicons name="time-outline" size={16} color={UI_COLORS.violet} />
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.optionTitle}>3 Bulan terakhir</Text>
              <Text style={styles.optionSub}>Maret 2026 - Mei 2026</Text>
            </View>
            <View style={styles.radioCircle}>
              {dateRange === 'last_3_months' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionRow, { borderBottomWidth: 0 }]} 
            activeOpacity={0.7} 
            onPress={() => setDateRange('custom')}
          >
            <View style={[styles.iconWrap, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.12) }]}>
              <Ionicons name="options-outline" size={16} color={UI_COLORS.gold} />
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.optionTitle}>Pilih tanggal kustom</Text>
              <Text style={styles.optionSub}>Tentukan sendiri periode laporan</Text>
            </View>
            <View style={styles.radioCircle}>
              {dateRange === 'custom' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* PILIHAN FORMAT FILE */}
        <Text style={styles.secLabel}>Format file laporan</Text>
        <View style={styles.formatGrid}>
          <TouchableOpacity 
            style={[styles.formatCard, fileFormat === 'csv' && styles.formatCardSel]} 
            onPress={() => setFileFormat('csv')}
          >
            <View style={[styles.fIconBox, { backgroundColor: 'rgba(45,212,164,0.1)' }]}>
              <Ionicons name="document-text" size={24} color={UI_COLORS.mint} />
            </View>
            <Text style={styles.formatName}>Excel Spreadsheet (CSV)</Text>
            <Text style={styles.formatDesc}>Cocok untuk diolah kembali di Microsoft Excel atau Google Sheets.</Text>
            <View style={styles.checkPos}>
              <View style={[styles.checkCircle, fileFormat === 'csv' && styles.checkCircleOn]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formatCard, fileFormat === 'pdf' && styles.formatCardSel]} 
            onPress={() => setFileFormat('pdf')}
          >
            <View style={[styles.fIconBox, { backgroundColor: 'rgba(255,107,107,0.1)' }]}>
              <Ionicons name="document" size={24} color={UI_COLORS.red} />
            </View>
            <Text style={styles.formatName}>Dokumen PDF</Text>
            <Text style={styles.formatDesc}>Format rapi siap cetak, cocok untuk arsip bulanan keluarga.</Text>
            <View style={styles.checkPos}>
              <View style={[styles.checkCircle, fileFormat === 'pdf' && styles.checkCircleOn]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* FEEDBACK STATE UTK SIMULASI */}
        {isExporting && (
          <View style={styles.statusBox}>
            <ActivityIndicator size="small" color={UI_COLORS.violet} style={{ marginRight: 10 }} />
            <Text style={styles.statusTxt}>Menyiapkan berkas transaksi...</Text>
          </View>
        )}

        {exportSuccess && (
          <View style={[styles.statusBox, { backgroundColor: 'rgba(45,212,164,0.08)', borderColor: 'rgba(45,212,164,0.3)' }]}>
            <Ionicons name="checkmark-circle" size={18} color={UI_COLORS.mint} style={{ marginRight: 8 }} />
            <Text style={[styles.statusTxt, { color: UI_COLORS.text }]}>Berhasil mengunduh laporan!</Text>
          </View>
        )}

        {/* ACTION BUTTON */}
        <TouchableOpacity 
          style={[styles.btnExport, isExporting && { opacity: 0.6 }]} 
          onPress={handleExportData}
          disabled={isExporting}
        >
          <Ionicons name="cloud-download" size={18} color="#0A1628" />
          <Text style={styles.btnExportTxt}>
            {isExporting ? 'Memproses berkas...' : 'Unduh laporan sekarang'}
          </Text>
        </TouchableOpacity>

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <Ionicons name="information-circle" size={16} color={UI_COLORS.violet} style={{ flexShrink: 0 }} />
          <Text style={styles.tipTxt}>
            File hasil ekspor mencakup data seluruh catatan pemasukan, pengeluaran, transfer internal, nama pencatat, serta catatan memo yang ada dalam periode tersebut.
          </Text>
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

  secLabel: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  card: { marginHorizontal: 16, marginBottom: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },

  // OPTION ROWS (RADIO BUTTON STYLE)
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  iconWrap: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoBlock: { flex: 1 },
  optionTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  optionSub: { fontSize: 11, color: UI_COLORS.t3 },
  radioCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: UI_COLORS.t3, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: UI_COLORS.mint },

  // FORMAT GRID
  formatGrid: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  formatCard: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14, position: 'relative' },
  formatCardSel: { borderColor: 'rgba(124,111,247,0.4)', backgroundColor: 'rgba(124,111,247,0.04)' },
  fIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  formatName: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  formatDesc: { fontSize: 10, color: UI_COLORS.t3, lineHeight: 15, paddingRight: 4 },
  checkPos: { position: 'absolute', top: 14, right: 14 },
  checkCircle: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: UI_COLORS.t3 },
  checkCircleOn: { borderColor: UI_COLORS.violet, backgroundColor: UI_COLORS.violet },

  // FEEDBACK STATE BOX
  statusBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginBottom: 12, padding: 12, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12 },
  statusTxt: { fontSize: 12, color: UI_COLORS.t2 },

  // BUTTON
  btnExport: { marginHorizontal: 16, marginBottom: 14, height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnExportTxt: { fontSize: 14, fontWeight: '600', color: '#0A1628' },

  // TIP CARD
  tipCard: { marginHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  tipTxt: { flex: 1, fontSize: 11, color: UI_COLORS.t3, lineHeight: 17 }
});