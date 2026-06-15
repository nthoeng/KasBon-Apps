import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const txConfig = {
    expense: { color: UI_COLORS.red, label: 'Pengeluaran', icon: 'arrow-up-right' },
    income: { color: UI_COLORS.mint, label: 'Pemasukan', icon: 'arrow-down-left' },
    transfer: { color: UI_COLORS.violet, label: 'Transfer', icon: 'swap-horizontal' }
  };

  const txType = route.params?.type || 'expense';
  const amount = route.params?.amount || '87.500';
  
  const currentConfig = txConfig[txType as keyof typeof txConfig] || txConfig.expense;
  const themeCol = currentConfig.color;
  const themeBg = hexToRgba(themeCol, 0.12);
  const prefix = txType === 'expense' ? '-' : txType === 'income' ? '+' : '';

  const [screenState, setScreenState] = useState<'review' | 'success'>('review');

  if (screenState === 'review') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Konfirmasi transaksi</Text>
          <View style={{ width: 32 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
          <View style={styles.amountHero}>
            <View style={[styles.tipeBadge, { backgroundColor: hexToRgba(themeCol, 0.1) }]}>
              <Ionicons name={currentConfig.icon as any} size={12} color={themeCol} />
              <Text style={[styles.tipeBadgeTxt, { color: themeCol }]}>{currentConfig.label}</Text>
            </View>
            <Text style={[styles.amountBig, { color: themeCol }]}>{prefix} Rp {amount}</Text>
            <Text style={styles.amountSub}>dari Kas keluarga · barusan</Text>
          </View>
          <View style={styles.receiptCard}>
            <View style={styles.receiptHeader}>
              <View style={[styles.receiptIcon, { backgroundColor: themeBg }]}>
                <Ionicons name={txType === 'transfer' ? 'swap-horizontal' : 'cart'} size={18} color={themeCol} />
              </View>
              <View>
                <Text style={styles.receiptTitle}>{txType === 'transfer' ? 'Pindah Dompet' : 'Belanja Indomaret'}</Text>
                <Text style={styles.receiptSub}>{txType === 'transfer' ? 'Kategori: Transfer Internal' : 'Kategori: Belanja'}</Text>
              </View>
            </View>
            {txType === 'transfer' ? (
              <View style={styles.transferVisual}>
                <View style={styles.twBlock}>
                  <Text style={styles.twLbl}>Dari</Text>
                  <Text style={styles.twName}>Kas keluarga</Text>
                </View>
                <View style={styles.twArrow}>
                  <View style={styles.taLine} />
                  <View style={styles.taHead} />
                </View>
                <View style={styles.twBlockRight}>
                  <Text style={styles.twLbl}>Ke</Text>
                  <Text style={styles.twName}>BCA Bayu</Text>
                </View>
              </View>
            ) : (
              <View style={styles.receiptRow}>
                <View style={styles.rowLbl}>
                  <Ionicons name="wallet" size={14} color={UI_COLORS.t2} />
                  <Text style={styles.rowLblTxt}>{txType === 'income' ? 'Masuk ke' : 'Dari dompet'}</Text>
                </View>
                <View style={styles.walletPill}>
                  <View style={[styles.wIconXs, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.12) }]}>
                    <Ionicons name="home" size={12} color={UI_COLORS.gold} />
                  </View>
                  <Text style={[styles.rowVal, { color: UI_COLORS.gold }]}>Kas keluarga</Text>
                </View>
              </View>
            )}
            <View style={styles.receiptRow}>
              <View style={styles.rowLbl}>
                <Ionicons name="person" size={14} color={UI_COLORS.t2} />
                <Text style={styles.rowLblTxt}>Dicatat oleh</Text>
              </View>
              <Text style={styles.rowVal}>Istri</Text>
            </View>
            <View style={styles.receiptRow}>
              <View style={styles.rowLbl}>
                <Ionicons name="calendar" size={14} color={UI_COLORS.t2} />
                <Text style={styles.rowLblTxt}>Tanggal</Text>
              </View>
              <Text style={styles.rowVal}>11 Jun 2026 · 11:24</Text>
            </View>
            <View style={styles.receiptRow}>
              <View style={styles.rowLbl}>
                <Ionicons name="pencil" size={14} color={UI_COLORS.t2} />
                <Text style={styles.rowLblTxt}>Catatan</Text>
              </View>
              <Text style={styles.rowVal}>Belanja Indomaret — snack + minum</Text>
            </View>
            <View style={styles.dividerDashed} />
            <View style={styles.receiptRow}>
              <Text style={styles.rowLblTxt}>Saldo sebelum</Text>
              <Text style={styles.rowVal}>Rp 6.887.500</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.rowLblTxt}>Nominal</Text>
              <Text style={[styles.rowVal, { color: themeCol }]}>{prefix} Rp {amount}</Text>
            </View>
            <View style={[styles.receiptRow, { backgroundColor: hexToRgba(themeCol, 0.04), borderBottomWidth: 0 }]}>
              <Text style={[styles.rowLblTxt, { color: UI_COLORS.text, fontWeight: '500' }]}>Saldo sesudah</Text>
              <Text style={[styles.rowVal, { color: themeCol, fontSize: 14 }]}>Rp 6.800.000</Text>
            </View>
          </View>
          <View style={styles.securityRow}>
            <Ionicons name="shield-checkmark" size={18} color={UI_COLORS.mint} />
            <View>
              <Text style={styles.secRowTitle}>Transaksi aman & terenkripsi</Text>
              <Text style={styles.secRowDesc}>Data tersimpan hanya untuk keluargamu</Text>
            </View>
          </View>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.goBack()}>
              <Ionicons name="create" size={16} color={UI_COLORS.t2} />
              <Text style={styles.btnSecondaryTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
              <Ionicons name="camera" size={16} color={UI_COLORS.t2} />
              <Text style={styles.btnSecondaryTxt}>Foto struk</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: themeCol }]} onPress={() => setScreenState('success')}>
            <Ionicons name="checkmark-circle" size={18} color={UI_COLORS.bg} />
            <Text style={styles.btnPrimaryTxt}>Simpan transaksi</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topbar}>
        <View style={{ width: 32 }} />
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="close" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.successBody}>
        <View style={[styles.successRing, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.1), borderColor: hexToRgba(UI_COLORS.mint, 0.3) }]}>
          <Ionicons name="checkmark" size={38} color={UI_COLORS.mint} />
        </View>
        <Text style={styles.successTitle}>Transaksi tersimpan!</Text>
        <Text style={[styles.successAmt, { color: themeCol }]}>{prefix} Rp {amount}</Text>
        <Text style={styles.successDesc}>
          {txType === 'expense' ? 'Pengeluaran berhasil dicatat dan saldo dompet sudah diperbarui.' : 'Transaksi berhasil dicatat ke dalam sistem.'}
        </Text>
        <View style={styles.successCard}>
          <View style={styles.scRow}>
            <Text style={styles.scLbl}>Kategori</Text>
            <Text style={styles.scVal}>Belanja</Text>
          </View>
          <View style={styles.scRow}>
            <Text style={styles.scLbl}>Dompet</Text>
            <Text style={[styles.scVal, { color: UI_COLORS.gold }]}>Kas keluarga</Text>
          </View>
          <View style={styles.scRow}>
            <Text style={styles.scLbl}>Saldo baru</Text>
            <Text style={[styles.scVal, { color: UI_COLORS.mint }]}>Rp 6.800.000</Text>
          </View>
          {txType === 'expense' && (
            <View style={[styles.scRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={styles.scLbl}>Budget Belanja</Text>
              <Text style={[styles.scVal, { color: UI_COLORS.gold }]}>84% terpakai</Text>
            </View>
          )}
        </View>
        <View style={styles.successActions}>
          <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={16} color={UI_COLORS.bg} />
            <Text style={styles.btnHomeTxt}>Kembali ke home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.goBack()}>
            <Ionicons name="add" size={16} color={UI_COLORS.t2} />
            <Text style={styles.btnOutlineTxt}>Catat transaksi lagi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('TransactionHistory')}>
            <Ionicons name="list" size={16} color={UI_COLORS.t2} />
            <Text style={styles.btnOutlineTxt}>Lihat semua aktivitas</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.txId}>ID transaksi: TXN-2026061100042</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  scrollBody: { paddingHorizontal: 18, paddingBottom: 30 },
  amountHero: { alignItems: 'center', paddingVertical: 20 },
  tipeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginBottom: 12 },
  tipeBadgeTxt: { fontSize: 11, fontWeight: '500' },
  amountBig: { fontSize: 38, fontWeight: '600', letterSpacing: -1, marginBottom: 4 },
  amountSub: { fontSize: 12, color: UI_COLORS.t3 },
  receiptCard: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 18, overflow: 'hidden', marginBottom: 12 },
  receiptHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  receiptIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  receiptTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  receiptSub: { fontSize: 11, color: UI_COLORS.t3 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  rowLbl: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowLblTxt: { fontSize: 12, color: UI_COLORS.t2 },
  rowVal: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, textAlign: 'right', maxWidth: 180 },
  walletPill: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  wIconXs: { width: 22, height: 22, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  dividerDashed: { borderBottomWidth: 1, borderBottomColor: UI_COLORS.b2, borderStyle: 'dashed', marginVertical: 2 },
  transferVisual: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  twBlock: { flex: 1 },
  twBlockRight: { flex: 1, alignItems: 'flex-end' },
  twLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  twName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  twArrow: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  taLine: { width: 40, height: 2, backgroundColor: hexToRgba(UI_COLORS.violet, 0.4), borderRadius: 1 },
  taHead: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 6, borderTopWidth: 4, borderBottomWidth: 4, borderLeftColor: UI_COLORS.violet, borderTopColor: 'transparent', borderBottomColor: 'transparent', position: 'absolute', right: 8 },
  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(45,212,164,0.06)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.2)', borderRadius: 12, padding: 12, marginBottom: 16 },
  secRowTitle: { fontSize: 12, fontWeight: '600', color: UI_COLORS.mint, marginBottom: 2 },
  secRowDesc: { fontSize: 11, color: UI_COLORS.t3 },
  actionsGrid: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  btnSecondary: { flex: 1, height: 46, borderRadius: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnSecondaryTxt: { fontSize: 13, color: UI_COLORS.t2 },
  btnPrimary: { width: '100%', height: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnPrimaryTxt: { fontSize: 15, fontWeight: '600', color: UI_COLORS.bg },
  successBody: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  successRing: { width: 80, height: 80, borderRadius: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontSize: 20, fontWeight: '600', color: UI_COLORS.text, marginBottom: 6 },
  successAmt: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  successDesc: { fontSize: 12, color: UI_COLORS.t3, textAlign: 'center', lineHeight: 18, marginBottom: 24, paddingHorizontal: 10 },
  successCard: { width: '100%', backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14, marginBottom: 24 },
  scRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  scLbl: { fontSize: 11, color: UI_COLORS.t3 },
  scVal: { fontSize: 11, fontWeight: '600', color: UI_COLORS.text },
  successActions: { width: '100%', gap: 8 },
  btnHome: { width: '100%', height: 48, borderRadius: 14, backgroundColor: UI_COLORS.mint, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnHomeTxt: { fontSize: 14, fontWeight: '600', color: UI_COLORS.bg },
  btnOutline: { width: '100%', height: 42, borderRadius: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnOutlineTxt: { fontSize: 13, color: UI_COLORS.t2 },
  txId: { fontSize: 11, color: UI_COLORS.t3, marginTop: 24 }
});