import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const WALLET_TYPES = [
  { id: 'cash', name: 'Kas / tunai', desc: 'Uang fisik di tangan', icon: 'cash', color: UI_COLORS.gold },
  { id: 'bank', name: 'Rekening bank', desc: 'BCA, BRI, Mandiri, dll.', icon: 'business', color: UI_COLORS.text },
  { id: 'ewallet', name: 'E-wallet', desc: 'GoPay, OVO, Dana, dll.', icon: 'phone-portrait', color: UI_COLORS.violet },
  { id: 'saving', name: 'Tabungan', desc: 'Target + deadline', icon: 'cube', color: '#A89FF9' }, // Pengganti piggy-bank
  { id: 'debt', name: 'Hutang / piutang', desc: 'Cicilan, pinjaman, tagihan', icon: 'card', color: UI_COLORS.red, isWide: true },
];

const ICONS = ['home', 'wallet', 'business', 'phone-portrait', 'cube', 'car', 'airplane', 'shield', 'briefcase', 'star'];

const COLORS = [
  '#F5C842', '#2DD4A4', '#7C6FF7', '#FF6B6B', '#60A5FA', 
  '#F59E0B', '#34D399', '#F472B6', '#A78BFA', '#8FA8CC'
];

const VISIBILITY_OPTIONS = [
  { id: 'global_all', name: 'Global — semua bisa catat', desc: 'Semua anggota bisa lihat saldo & mencatat transaksi', icon: 'people', color: UI_COLORS.mint },
  { id: 'global_view', name: 'Global — lihat saja', desc: 'Semua anggota bisa lihat, tapi hanya pemilik yang bisa catat', icon: 'eye', color: UI_COLORS.text },
  { id: 'private', name: 'Private — hanya saya', desc: 'Hanya kamu yang bisa lihat dan mencatat di dompet ini', icon: 'lock-closed', color: UI_COLORS.text },
];

export const CreateWalletScreen = ({ navigation }: any) => {
  // States
  const [walletName, setWalletName] = useState('Kas rumah');
  const [walletType, setWalletType] = useState('cash');
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [selectedColor, setSelectedColor] = useState('#F5C842');
  const [visibility, setVisibility] = useState('global_all');
  const [balance, setBalance] = useState('');

  // Konversi Hex Color ke RGBA untuk background transparan
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Format saldo
  const formatBalance = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setBalance(cleaned);
  };
  const displayBalance = balance ? Number(balance).toLocaleString('id-ID') : '';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Buat dompet baru</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PREVIEW HERO (Dinamis) */}
        <View style={styles.previewHero}>
          <View style={[styles.previewIcon, { backgroundColor: hexToRgba(selectedColor, 0.12), borderColor: hexToRgba(selectedColor, 0.25) }]}>
            <Ionicons name={selectedIcon as any} size={30} color={selectedColor} />
          </View>
          <Text style={styles.previewName}>{walletName || 'Nama Dompet'}</Text>
          <Text style={styles.previewSub}>Preview dompet · akan terlihat seperti ini</Text>
        </View>

        {/* NAMA DOMPET */}
        <Text style={styles.secLbl}>Nama dompet</Text>
        <View style={[styles.fieldWrap, walletName.length > 0 && styles.fieldWrapFocused]}>
          <Ionicons name="pencil" size={16} color={UI_COLORS.t3} style={styles.fwIcon} />
          <TextInput
            style={styles.fwInput}
            value={walletName}
            onChangeText={setWalletName}
            placeholder="Contoh: Kas Keluarga"
            placeholderTextColor={UI_COLORS.t3}
            selectionColor={UI_COLORS.gold}
          />
          {walletName.length > 0 && (
            <TouchableOpacity onPress={() => setWalletName('')}>
              <Ionicons name="close-circle" size={16} color={UI_COLORS.t3} />
            </TouchableOpacity>
          )}
        </View>

        {/* TIPE DOMPET */}
        <Text style={styles.secLbl}>Tipe dompet</Text>
        <View style={styles.typeGrid}>
          {WALLET_TYPES.map((type) => {
            const isSelected = walletType === type.id;
            return (
              <TouchableOpacity 
                key={type.id} 
                style={[styles.typeCard, isSelected && { borderColor: hexToRgba(type.color, 0.5), backgroundColor: hexToRgba(type.color, 0.06) }, type.isWide && { width: '100%' }]}
                onPress={() => { setWalletType(type.id); setSelectedColor(type.color); }}
                activeOpacity={0.7}
              >
                {type.isWide ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={[styles.tcIcon, { backgroundColor: hexToRgba(type.color, 0.1), marginBottom: 0 }]}><Ionicons name={type.icon as any} size={18} color={type.color} /></View>
                    <View style={{ textAlign: 'left', flex: 1 }}>
                      <Text style={[styles.tcName, { color: isSelected ? type.color : UI_COLORS.text }]}>{type.name}</Text>
                      <Text style={styles.tcDesc}>{type.desc}</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <View style={[styles.tcIcon, { backgroundColor: hexToRgba(type.color, 0.12) }]}><Ionicons name={type.icon as any} size={18} color={type.color} /></View>
                    <Text style={[styles.tcName, { color: isSelected ? type.color : UI_COLORS.text }]}>{type.name}</Text>
                    <Text style={styles.tcDesc}>{type.desc}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PILIH IKON */}
        <Text style={styles.secLbl}>Pilih ikon</Text>
        <View style={styles.iconScrollWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iconScroll}>
            {ICONS.map((icon) => (
              <TouchableOpacity 
                key={icon} 
                style={[styles.icItem, selectedIcon === icon && { backgroundColor: hexToRgba(selectedColor, 0.12), borderColor: hexToRgba(selectedColor, 0.4) }]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Ionicons name={icon as any} size={20} color={selectedIcon === icon ? selectedColor : UI_COLORS.t2} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* PILIH WARNA */}
        <Text style={styles.secLbl}>Pilih warna</Text>
        <View style={styles.colorRow}>
          {COLORS.map((col) => (
            <TouchableOpacity 
              key={col} 
              style={[styles.cDot, { backgroundColor: col }, selectedColor === col && styles.cDotSel]} 
              onPress={() => setSelectedColor(col)}
            />
          ))}
        </View>

        {/* VISIBILITAS */}
        <Text style={[styles.secLbl, { paddingTop: 6 }]}>Visibilitas dompet</Text>
        <View style={styles.visGrid}>
          {VISIBILITY_OPTIONS.map((vis) => {
            const isSelected = visibility === vis.id;
            const themeCol = isSelected ? UI_COLORS.mint : UI_COLORS.t2;
            return (
              <TouchableOpacity 
                key={vis.id} 
                style={[styles.visCard, isSelected && styles.visCardSelected]}
                onPress={() => setVisibility(vis.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.vcIcon, { backgroundColor: isSelected ? hexToRgba(UI_COLORS.mint, 0.12) : hexToRgba('#FFFFFF', 0.06) }]}>
                  <Ionicons name={vis.icon as any} size={18} color={themeCol} style={!isSelected && { opacity: 0.7 }} />
                </View>
                <View style={styles.vcInfo}>
                  <Text style={[styles.vcName, { color: isSelected ? UI_COLORS.mint : UI_COLORS.text }]}>{vis.name}</Text>
                  <Text style={styles.vcDesc}>{vis.desc}</Text>
                </View>
                <View style={[styles.vcCheck, isSelected ? styles.vcCheckOn : styles.vcCheckOff]}>
                  {isSelected && <Ionicons name="checkmark" size={12} color={UI_COLORS.bg} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SALDO AWAL */}
        <Text style={styles.secLbl}>Saldo awal (opsional)</Text>
        <View style={styles.saldoField}>
          <Text style={styles.sfLbl}>Berapa uang yang sudah ada di dompet ini sekarang?</Text>
          <View style={styles.sfInputWrap}>
            <Text style={styles.sfPrefix}>Rp</Text>
            <TextInput
              style={styles.sfInput}
              value={displayBalance}
              onChangeText={formatBalance}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={UI_COLORS.t3}
              selectionColor={UI_COLORS.gold}
            />
          </View>
          <Text style={styles.sfSub}>Kosongkan jika dompet baru dimulai dari nol</Text>
        </View>

        {/* BUTTONS */}
        <View style={{ height: 8 }} />
        <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
          <Ionicons name="add" size={18} color={UI_COLORS.bg} />
          <Text style={styles.btnPrimaryTxt}>Buat dompet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.goBack()}>
          <Text style={styles.btnGhostTxt}>Batal</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContent: { paddingBottom: 30 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  
  // PREVIEW HERO
  previewHero: { alignItems: 'center', paddingVertical: 16, paddingHorizontal: 18 },
  previewIcon: { width: 64, height: 64, borderRadius: 20, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  previewName: { fontSize: 16, fontWeight: '600', color: UI_COLORS.text, marginBottom: 3 },
  previewSub: { fontSize: 11, color: UI_COLORS.t3 },
  
  // SHARED SEC LABEL
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingBottom: 7, paddingTop: 4 },
  
  // TEXT FIELD
  fieldWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, paddingHorizontal: 13, height: 46, marginHorizontal: 16, marginBottom: 16 },
  fieldWrapFocused: { borderColor: UI_COLORS.gold },
  fwIcon: { flexShrink: 0 },
  fwInput: { flex: 1, fontSize: 14, color: UI_COLORS.text, height: '100%' },
  
  // TYPE GRID
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginBottom: 16 },
  typeCard: { width: '48.5%', backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12, alignItems: 'center' },
  tcIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  tcName: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
  tcDesc: { fontSize: 10, color: UI_COLORS.t3, textAlign: 'center' },
  
  // ICON SCROLL
  iconScrollWrap: { marginBottom: 16 },
  iconScroll: { paddingHorizontal: 16, gap: 8 },
  icItem: { width: 42, height: 42, borderRadius: 13, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, alignItems: 'center', justifyContent: 'center' },
  
  // COLOR ROW
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, paddingHorizontal: 18, marginBottom: 16 },
  cDot: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: 'transparent' },
  cDotSel: { borderColor: UI_COLORS.text },
  
  // VISIBILITY GRID
  visGrid: { paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  visCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12 },
  visCardSelected: { borderColor: 'rgba(45,212,164,0.4)', backgroundColor: 'rgba(45,212,164,0.05)' },
  vcIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  vcInfo: { flex: 1 },
  vcName: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  vcDesc: { fontSize: 11, color: UI_COLORS.t3, lineHeight: 16 },
  vcCheck: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  vcCheckOn: { backgroundColor: UI_COLORS.mint },
  vcCheckOff: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  
  // SALDO
  saldoField: { marginHorizontal: 16, marginBottom: 16, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12 },
  sfLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8 },
  sfInputWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sfPrefix: { fontSize: 16, color: UI_COLORS.t2 },
  sfInput: { flex: 1, fontSize: 24, fontWeight: '500', color: UI_COLORS.text, padding: 0 },
  sfSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 4 },
  
  // BUTTONS
  btnPrimary: { marginHorizontal: 16, marginBottom: 8, height: 50, borderRadius: 15, backgroundColor: UI_COLORS.gold, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnPrimaryTxt: { fontSize: 15, fontWeight: '600', color: UI_COLORS.bg },
  btnGhost: { marginHorizontal: 16, marginBottom: 16, height: 40, borderRadius: 12, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  btnGhostTxt: { fontSize: 13, color: UI_COLORS.t2 }
});