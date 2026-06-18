import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

export const CurrencySettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCurrency, setSelectedCurrency] = useState('IDR');
  const [searchQuery, setSearchQuery] = useState('');

  const currencies = [
    { code: 'IDR', name: 'Rupiah Indonesia', symbol: 'Rp', country: 'Indonesia', flagBg: '#FF6B6B' },
    { code: 'USD', name: 'Dolar Amerika Serikat', symbol: '$', country: 'Amerika Serikat', flagBg: '#60A5FA' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'Uni Eropa', flagBg: '#F5C842' },
    { code: 'SGD', name: 'Dolar Singapura', symbol: 'S$', country: 'Singapura', flagBg: '#7C6FF7' },
    { code: 'MYR', name: 'Ringgit Malaysia', symbol: 'RM', country: 'Malaysia', flagBg: '#34D399' },
  ];

  const filteredCurrencies = currencies.filter(cur => 
    cur.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cur.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Mata uang</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={UI_COLORS.t3} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Cari mata uang atau negara..."
              placeholderTextColor={UI_COLORS.t3}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={UI_COLORS.t2} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.secLabel}>Semua mata uang</Text>

        {/* CURRENCY LIST */}
        <View style={styles.card}>
          {filteredCurrencies.map((cur, index) => {
            const isSelected = selectedCurrency === cur.code;
            const isLast = index === filteredCurrencies.length - 1;
            
            return (
              <TouchableOpacity 
                key={cur.code} 
                style={[styles.row, isLast && { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={() => setSelectedCurrency(cur.code)}
              >
                <View style={[styles.symbolBadge, { backgroundColor: hexToRgba(cur.flagBg, 0.12) }]}>
                  <Text style={[styles.symbolTxt, { color: cur.flagBg }]}>{cur.symbol}</Text>
                </View>

                <View style={styles.infoBlock}>
                  <View style={styles.codeRow}>
                    <Text style={styles.currencyCode}>{cur.code}</Text>
                    <Text style={styles.currencySymbolHint}>{`(${cur.symbol})`}</Text>
                  </View>
                  <Text style={styles.currencyName}>{`${cur.name} · ${cur.country}`}</Text>
                </View>

                <View style={styles.rightBlock}>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={12} color={UI_COLORS.bg} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredCurrencies.length === 0 && (
            <Text style={styles.emptyTxt}>Mata uang tidak ditemukan</Text>
          )}
        </View>

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <Ionicons name="information-circle" size={16} color={UI_COLORS.violet} style={{ flexShrink: 0 }} />
          <Text style={styles.tipTxt}>
            Mengubah format mata uang akan menyesuaikan simbol tampilan nominal ($ / Rp) di seluruh feed transaksi dan laporan tanpa merubah nilai kurs asli.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  searchContainer: { paddingHorizontal: 16, marginTop: 8, marginBottom: 4 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 13, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, fontSize: 13, color: UI_COLORS.text },
  secLabel: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  card: { marginHorizontal: 16, marginBottom: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  emptyTxt: { padding: 20, textAlign: 'center', color: UI_COLORS.t3, fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  symbolBadge: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  symbolTxt: { fontSize: 14, fontWeight: '700' },
  infoBlock: { flex: 1 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  currencyCode: { fontSize: 14, fontWeight: '600', color: UI_COLORS.text },
  currencySymbolHint: { fontSize: 12, color: UI_COLORS.t2 },
  currencyName: { fontSize: 11, color: UI_COLORS.t3 },
  rightBlock: { width: 22, height: 22, justifyContent: 'center', alignItems: 'center' },
  checkCircle: { width: 18, height: 18, borderRadius: 9, backgroundColor: UI_COLORS.mint, alignItems: 'center', justifyContent: 'center' },
  tipCard: { marginHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  tipTxt: { flex: 1, fontSize: 11, color: UI_COLORS.t3, lineHeight: 17 }
});