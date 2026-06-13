import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mapping warna sesuai variabel CSS dari mockup
const UI_COLORS = {
  bg: '#0A1628',
  bgDimmed: '#060E1A',
  sheetBg: '#111E30',
  card: '#152238',
  card2: '#1A2A42',
  text: '#F0F4FF',
  textSub: '#8FA8CC',
  textMuted: '#3E5878',
  gold: '#F5C842',
  mint: '#2DD4A4',
  violet: '#7C6FF7',
  red: '#FF6B6B',
  border1: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.15)',
};

// Data Dummy Kategori Cepat (Pengeluaran)
const categories = [
  { label: 'Belanja', icon: 'cart', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.12)' },
  { label: 'Makan', icon: 'restaurant', color: UI_COLORS.gold, bg: 'rgba(245,200,66,0.1)' },
  { label: 'Transport', icon: 'car', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)' },
  { label: 'Tagihan', icon: 'flash', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.1)' },
  { label: 'Kesehatan', icon: 'pulse', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)' },
  { label: 'Hiburan', icon: 'game-controller', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.1)' },
  { label: 'Lainnya', icon: 'ellipsis-horizontal', color: UI_COLORS.textSub, bg: 'rgba(255,255,255,0.06)' },
];

// Data Dummy Transaksi Terakhir
const recents = [
  { label: 'Makan siang', amount: '-Rp 35.000', icon: 'restaurant', color: UI_COLORS.gold },
  { label: 'Indomaret', amount: '-Rp 87.500', icon: 'cart', color: UI_COLORS.red },
  { label: 'Listrik PLN', amount: '-Rp 185.000', icon: 'flash', color: UI_COLORS.violet },
  { label: 'Bensin', amount: '-Rp 100.000', icon: 'car', color: UI_COLORS.mint },
];

type TransactionType = 'expense' | 'income' | 'transfer';

export const TransactionTypeSelectionScreen = ({ navigation }: any) => {
  const [activeType, setActiveType] = useState<TransactionType>('expense');

  // Menentukan warna dan teks berdasarkan tipe yang dipilih
  const getTypeConfig = () => {
    switch (activeType) {
      case 'income': return { color: UI_COLORS.mint, title: 'Pemasukan' };
      case 'transfer': return { color: UI_COLORS.violet, title: 'Transfer' };
      default: return { color: UI_COLORS.red, title: 'Pengeluaran' };
    }
  };

  const currentConfig = getTypeConfig();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        
        {/* PEEK BACKGROUND (Samar-samar Home Dashboard) */}
        <View style={styles.homePeek} pointerEvents="none">
          <View style={styles.peekRow}>
            <View>
              <Text style={styles.peekSaldoLbl}>Saldo keluarga</Text>
              <Text style={styles.peekSaldo}>Rp 14.250.000</Text>
            </View>
            <View style={styles.peekBell}>
              <Ionicons name="notifications" size={16} color={UI_COLORS.textMuted} />
            </View>
          </View>
          <View style={styles.peekMiniGrid}>
            <View style={styles.peekMini}>
              <Text style={styles.peekMiniLbl}>Pemasukan</Text>
              <Text style={[styles.peekMiniVal, { color: UI_COLORS.mint }]}>Rp 8,5jt</Text>
            </View>
            <View style={styles.peekMini}>
              <Text style={styles.peekMiniLbl}>Pengeluaran</Text>
              <Text style={[styles.peekMiniVal, { color: UI_COLORS.red }]}>Rp 4,25jt</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM SHEET */}
        <View style={styles.sheet}>
          <View style={styles.pillHandle} />
          
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Catat transaksi</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={16} color={UI_COLORS.textSub} />
            </TouchableOpacity>
          </View>

          {/* GRID TIPE TRANSAKSI */}
          <View style={styles.tipeGrid}>
            <TouchableOpacity 
              style={[
                styles.tipeCard, 
                { backgroundColor: 'rgba(255,107,107,0.08)' },
                activeType === 'expense' && { borderColor: UI_COLORS.red }
              ]}
              onPress={() => setActiveType('expense')}
              activeOpacity={0.7}
            >
              <View style={[styles.tipeIcon, { backgroundColor: 'rgba(255,107,107,0.15)' }]}>
                <Ionicons name="arrow-up-outline" size={22} color={UI_COLORS.red} />
              </View>
              <Text style={[styles.tipeLabel, { color: UI_COLORS.red }]}>Pengeluaran</Text>
              <Text style={[styles.tipeDesc, { color: UI_COLORS.red }]}>Uang keluar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.tipeCard, 
                { backgroundColor: 'rgba(45,212,164,0.06)' },
                activeType === 'income' && { borderColor: UI_COLORS.mint }
              ]}
              onPress={() => setActiveType('income')}
              activeOpacity={0.7}
            >
              <View style={[styles.tipeIcon, { backgroundColor: 'rgba(45,212,164,0.12)' }]}>
                <Ionicons name="arrow-down-outline" size={22} color={UI_COLORS.mint} />
              </View>
              <Text style={[styles.tipeLabel, { color: UI_COLORS.mint }]}>Pemasukan</Text>
              <Text style={[styles.tipeDesc, { color: UI_COLORS.mint }]}>Uang masuk</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.tipeCard, 
                { backgroundColor: 'rgba(124,111,247,0.06)' },
                activeType === 'transfer' && { borderColor: UI_COLORS.violet }
              ]}
              onPress={() => setActiveType('transfer')}
              activeOpacity={0.7}
            >
              <View style={[styles.tipeIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}>
                <Ionicons name="swap-horizontal" size={22} color={UI_COLORS.violet} />
              </View>
              <Text style={[styles.tipeLabel, { color: UI_COLORS.violet }]}>Transfer</Text>
              <Text style={[styles.tipeDesc, { color: UI_COLORS.violet }]}>Pindah dompet</Text>
            </TouchableOpacity>
          </View>

          {/* KATEGORI CEPAT */}
          <Text style={styles.secLbl}>Kategori cepat — {currentConfig.title.toLowerCase()}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index} style={styles.catChip} activeOpacity={0.7}>
                <View style={[styles.catIcon, { backgroundColor: cat.bg }]}>
                  <Ionicons name={cat.icon as any} size={18} color={cat.color} />
                </View>
                <Text style={styles.catLbl}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* DARI DOMPET */}
          <Text style={[styles.secLbl, { paddingTop: 14 }]}>Dari dompet</Text>
          <TouchableOpacity style={styles.walletRow} activeOpacity={0.8}>
            <View style={[styles.walletIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}>
              <Ionicons name="home" size={17} color={UI_COLORS.gold} />
            </View>
            <View style={styles.walletInfo}>
              <Text style={styles.walletName}>Kas keluarga</Text>
              <Text style={styles.walletSaldo}>Rp 6.800.000 tersedia</Text>
            </View>
            <View style={styles.walletBadge}>
              <Text style={{ fontSize: 9, color: UI_COLORS.gold, fontWeight: '600' }}>Aktif</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.textMuted} />
          </TouchableOpacity>

          {/* TRANSAKSI TERAKHIR */}
          <Text style={[styles.secLbl, { paddingTop: 10 }]}>Transaksi serupa terakhir</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentsRow}>
            {recents.map((recent, index) => (
              <TouchableOpacity key={index} style={styles.recentChip} activeOpacity={0.7}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <Ionicons name={recent.icon as any} size={13} color={recent.color} />
                  <Text style={styles.recentName}>{recent.label}</Text>
                </View>
                <Text style={styles.recentAmt}>{recent.amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* TOMBOL UTAMA */}
          <TouchableOpacity 
            style={[styles.btnPrimary, { backgroundColor: currentConfig.color }]} 
            activeOpacity={0.8}
            onPress={() => console.log('Arahkan ke AddTransactionScreen')}
          >
            <Ionicons name="pencil" size={18} color="#FFF" />
            <Text style={styles.btnPrimaryTxt}>Lanjut isi detail</Text>
          </TouchableOpacity>
          
		  {/*<View style={{ height: Platform.OS === 'ios' ? 20 : 10 }} />*/}
		  <View style={{ height: 100 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: UI_COLORS.bgDimmed, // Warna background redup
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Dorong sheet ke bawah
  },
  
  /* PEEK BACKGROUND */
  homePeek: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    opacity: 0.35, // Membuat efek redup di belakang modal
  },
  peekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  peekSaldoLbl: {
    fontSize: 11,
    color: UI_COLORS.textSub,
  },
  peekSaldo: {
    fontSize: 22,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  peekBell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: UI_COLORS.card2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  peekMiniGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  peekMini: {
    flex: 1,
    backgroundColor: UI_COLORS.card2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  peekMiniLbl: {
    fontSize: 10,
    color: UI_COLORS.textMuted,
    marginBottom: 2,
  },
  peekMiniVal: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* BOTTOM SHEET CORE */
  sheet: {
    backgroundColor: UI_COLORS.sheetBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 0.5,
    borderTopColor: UI_COLORS.border2,
    paddingBottom: 20,
  },
  pillHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: UI_COLORS.border2,
    alignSelf: 'center',
    marginTop: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 4,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.border2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* TIPE GRID */
  tipeGrid: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 8,
  },
  tipeCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  tipeIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipeLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tipeDesc: {
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 2,
  },

  /* SECTION LABELS & SCROLLS */
  secLbl: {
    fontSize: 11,
    color: UI_COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    fontWeight: '600',
  },
  catScroll: {
    paddingHorizontal: 18,
    paddingBottom: 4,
    gap: 12,
  },
  catChip: {
    alignItems: 'center',
    gap: 6,
  },
  catIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catLbl: {
    fontSize: 10,
    color: UI_COLORS.textSub,
  },

  /* DOMPET ROW */
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: UI_COLORS.card,
    marginHorizontal: 18,
    marginTop: 6,
    marginBottom: 8,
    padding: 10,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: UI_COLORS.border2,
  },
  walletIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 13,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  walletSaldo: {
    fontSize: 11,
    color: UI_COLORS.textMuted,
    marginTop: 2,
  },
  walletBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(245,200,66,0.12)',
  },

  /* RECENTS SCROLL */
  recentsRow: {
    paddingHorizontal: 18,
    paddingBottom: 4,
    gap: 10,
  },
  recentChip: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.border2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  recentName: {
    fontSize: 11,
    color: UI_COLORS.text,
  },
  recentAmt: {
    fontSize: 11,
    color: UI_COLORS.red,
    fontWeight: '500',
  },

  /* PRIMARY BUTTON */
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    borderRadius: 16,
    marginHorizontal: 18,
    marginTop: 18,
  },
  btnPrimaryTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
});