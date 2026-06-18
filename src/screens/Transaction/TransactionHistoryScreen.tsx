import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.07)', b2: 'rgba(255,255,255,0.14)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878',
};

// --- DATA MOCKUP ---
const filters = ['Semua', 'Keluar', 'Masuk', 'Transfer', 'Bayu', 'Istri', 'Kas keluarga'];

export const TransactionHistoryScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <View style={styles.topbarLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color={UI_COLORS.text2} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Aktivitas</Text>
            <Text style={styles.pageSub}>Juni 2026 · 24 transaksi</Text>
          </View>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SUMMARY STRIP */}
      <View style={styles.summaryStrip}>
        <View style={styles.sumCard}>
          <Text style={styles.sumLbl}>Pemasukan</Text>
          <Text style={[styles.sumVal, { color: UI_COLORS.mint }]}>Rp 8,5jt</Text>
        </View>
        <View style={styles.sumCard}>
          <Text style={styles.sumLbl}>Pengeluaran</Text>
          <Text style={[styles.sumVal, { color: UI_COLORS.red }]}>Rp 4,25jt</Text>
        </View>
        <View style={styles.sumCard}>
          <Text style={styles.sumLbl}>Transfer</Text>
          <Text style={[styles.sumVal, { color: UI_COLORS.violet }]}>Rp 2jt</Text>
        </View>
      </View>

      {/* FILTER SCROLL */}
      <View style={{ paddingBottom: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map((f, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.filterChip, activeFilter === f ? styles.fcActive : styles.fcIdle]}
              onPress={() => setActiveFilter(f)}
            >
              <Ionicons 
                name={f === 'Semua' ? 'list' : f === 'Keluar' ? 'arrow-up-right' : f === 'Masuk' ? 'arrow-down-left' : f === 'Transfer' ? 'swap-horizontal' : f === 'Kas keluarga' ? 'wallet' : 'person'} 
                size={12} 
                color={activeFilter === f ? '#FFF' : UI_COLORS.t2} 
              />
              <Text style={{ fontSize: 11, fontWeight: '500', color: activeFilter === f ? '#FFF' : UI_COLORS.t2 }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- HARI INI --- */}
        <View style={styles.dayGroup}>
          <View style={styles.dayLabel}>
            <Text style={styles.dayTxt}>Hari ini — 11 Jun</Text>
            <View style={styles.dayLine} />
            <Text style={[styles.daySummary, { color: UI_COLORS.red }]}>-Rp 272.500</Text>
          </View>

          {/* Item 1 */}
          <TouchableOpacity style={styles.txItem} activeOpacity={0.7}>
            <View style={styles.txLeft}>
              <View style={[styles.txIcon, { backgroundColor: 'rgba(255,107,107,0.12)' }]}><Ionicons name="cart" size={18} color={UI_COLORS.red} /></View>
              <View style={[styles.txAvatar, { backgroundColor: UI_COLORS.gold }]}><Text style={styles.txAvatarTxt}>I</Text></View>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Belanja Indomaret</Text>
              <View style={styles.txMeta}>
                <Text style={styles.txCat}>Belanja</Text><View style={styles.txDot} /><Text style={styles.txWallet} numberOfLines={1}>Kas keluarga</Text><View style={styles.txDot} /><Text style={styles.txTime}>11:24</Text>
              </View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 87.500</Text>
              <Text style={styles.txSaldo}>saldo 6,8jt</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.txSep} />

          {/* Item 2 */}
          <TouchableOpacity style={styles.txItem} activeOpacity={0.7}>
            <View style={styles.txLeft}>
              <View style={[styles.txIcon, { backgroundColor: 'rgba(255,107,107,0.12)' }]}><Ionicons name="restaurant" size={18} color={UI_COLORS.red} /></View>
              <View style={[styles.txAvatar, { backgroundColor: UI_COLORS.violet }]}><Text style={styles.txAvatarTxt}>B</Text></View>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Makan siang warung</Text>
              <View style={styles.txMeta}>
                <Text style={styles.txCat}>Makan</Text><View style={styles.txDot} /><Text style={styles.txWallet} numberOfLines={1}>Kas keluarga</Text><View style={styles.txDot} /><Text style={styles.txTime}>12:05</Text>
              </View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 35.000</Text>
              <Text style={styles.txSaldo}>saldo 6,76jt</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.txSep} />

          {/* Item 3 */}
          <TouchableOpacity style={styles.txItem} activeOpacity={0.7}>
            <View style={styles.txLeft}>
              <View style={[styles.txIcon, { backgroundColor: 'rgba(255,107,107,0.12)' }]}><Ionicons name="flash" size={18} color={UI_COLORS.red} /></View>
              <View style={[styles.txAvatar, { backgroundColor: UI_COLORS.violet }]}><Text style={styles.txAvatarTxt}>B</Text></View>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Listrik PLN</Text>
              <View style={styles.txMeta}>
                <Text style={styles.txCat}>Tagihan</Text><View style={styles.txDot} /><Text style={styles.txWallet} numberOfLines={1}>GoPay Istri</Text><View style={styles.txDot} /><Text style={styles.txTime}>09:15</Text>
              </View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 150.000</Text>
              <Text style={styles.txSaldo}>saldo 680rb</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- KEMARIN --- */}
        <View style={styles.dayGroup}>
          <View style={styles.dayLabel}>
            <Text style={styles.dayTxt}>Kemarin — 10 Jun</Text>
            <View style={styles.dayLine} />
            <Text style={[styles.daySummary, { color: UI_COLORS.mint }]}>+Rp 4,3jt</Text>
          </View>

          {/* Item 4: Income */}
          <TouchableOpacity style={styles.txItem} activeOpacity={0.7}>
            <View style={styles.txLeft}>
              <View style={[styles.txIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="briefcase" size={18} color={UI_COLORS.mint} /></View>
              <View style={[styles.txAvatar, { backgroundColor: UI_COLORS.violet }]}><Text style={styles.txAvatarTxt}>B</Text></View>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Gaji Juni 2026</Text>
              <View style={styles.txMeta}>
                <Text style={styles.txCat}>Gaji</Text><View style={styles.txDot} /><Text style={styles.txWallet} numberOfLines={1}>BCA Bayu</Text><View style={styles.txDot} /><Text style={styles.txTime}>08:00</Text>
              </View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.mint }]}>+Rp 6.500.000</Text>
              <Text style={styles.txSaldo}>saldo 4,1jt</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.txSep} />

          {/* Item 5: TRANSFER UI KHUSUS */}
          <TouchableOpacity style={styles.transferItem} activeOpacity={0.7}>
            <View style={styles.txLeft}>
              <View style={[styles.txIcon, { backgroundColor: 'rgba(124,111,247,0.1)' }]}><Ionicons name="swap-horizontal" size={18} color={UI_COLORS.violet} /></View>
              <View style={[styles.txAvatar, { backgroundColor: UI_COLORS.violet }]}><Text style={styles.txAvatarTxt}>B</Text></View>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Transfer kas bulanan</Text>
              <View style={styles.transferFlowMini}>
                <View style={styles.tfPill}><Ionicons name="business" size={10} color="#A89FF9" /><Text style={styles.tfPillTxt}>BCA Bayu</Text></View>
                <Text style={styles.tfArrowTxt}>→</Text>
                <View style={styles.tfPill}><Ionicons name="home" size={10} color="#A89FF9" /><Text style={styles.tfPillTxt}>Kas keluarga</Text></View>
                <View style={styles.txDot} />
                <Text style={styles.txTime}>09:41</Text>
              </View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.violet }]}>Rp 2.000.000</Text>
              <Text style={styles.txSaldo}>transfer</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loadMore} activeOpacity={0.6}>
          <Ionicons name="chevron-down" size={16} color={UI_COLORS.t3} />
          <Text style={styles.lmTxt}>Muat lebih banyak — 18 transaksi lagi</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContent: { paddingBottom: 24 },
  
  /* TOPBAR */
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 12 },
  topbarLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 18, fontWeight: '600', color: UI_COLORS.text },
  pageSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  
  /* SUMMARY STRIP */
  summaryStrip: { flexDirection: 'row', gap: 8, paddingHorizontal: 18, paddingVertical: 10 },
  sumCard: { flex: 1, backgroundColor: UI_COLORS.card2, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 10, borderWidth: 0.5, borderColor: UI_COLORS.b1 },
  sumLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  sumVal: { fontSize: 13, fontWeight: '600' },

  /* FILTER SCROLL */
  filterScroll: { paddingHorizontal: 18, gap: 8 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 0.5 },
  fcActive: { backgroundColor: UI_COLORS.violet, borderColor: UI_COLORS.violet },
  fcIdle: { backgroundColor: UI_COLORS.card, borderColor: UI_COLORS.b2 },

  /* DAY GROUP */
  dayGroup: { marginBottom: 4 },
  dayLabel: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 12, paddingBottom: 6 },
  dayTxt: { fontSize: 11, fontWeight: '600', color: UI_COLORS.t3, letterSpacing: 0.5 },
  dayLine: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.b1 },
  daySummary: { fontSize: 11, fontWeight: '500' },

  /* TX ITEM */
  txItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 18 },
  txLeft: { position: 'relative' },
  txIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txAvatar: { position: 'absolute', bottom: -4, right: -4, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: UI_COLORS.bg },
  txAvatarTxt: { fontSize: 10, fontWeight: '700', color: '#FFF' },
  
  txInfo: { flex: 1 },
  txName: { fontSize: 14, fontWeight: '500', color: UI_COLORS.text, marginBottom: 4 },
  txMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  txCat: { fontSize: 11, color: UI_COLORS.t3 },
  txDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: UI_COLORS.t3 },
  txWallet: { fontSize: 11, color: UI_COLORS.t3, maxWidth: 90 },
  txTime: { fontSize: 11, color: UI_COLORS.t3 },
  
  txRight: { alignItems: 'flex-end' },
  txAmt: { fontSize: 14, fontWeight: '600' },
  txSaldo: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },
  txSep: { height: 0.5, backgroundColor: UI_COLORS.b1, marginHorizontal: 18 },

  /* TRANSFER ITEM UI KHUSUS */
  transferItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 18 },
  transferFlowMini: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  tfPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(124,111,247,0.1)', borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6 },
  tfPillTxt: { fontSize: 10, color: '#A89FF9', fontWeight: '500' },
  tfArrowTxt: { fontSize: 10, color: UI_COLORS.t3 },

  /* LOAD MORE */
  loadMore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 20 },
  lmTxt: { fontSize: 12, color: UI_COLORS.t3, fontWeight: '500' },
});