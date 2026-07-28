import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionItem } from '../../components/ui/TransactionItem';
import { theme } from '../../theme';

const { colors } = theme;

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  text: '#F0F4FF',
  text2: '#8FA8CC',
  text3: '#4A6080',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  border: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.14)',
};

// --- MOCK DATA ---
const walletData = [
  { id: 'w1', name: 'Kas keluarga', balance: 6800000, subtitle: 'Tunai bersama', badge: 'Global', icon: 'home', color: '#F5C842', bg: 'rgba(245,200,66,0.15)' },
  { id: 'w2', name: 'BCA Bayu', balance: 4100000, subtitle: 'Rekening bank', badge: 'Private', icon: 'business', color: '#2DD4A4', bg: 'rgba(45,212,164,0.12)' },
  { id: 'w3', name: 'GoPay Istri', balance: 850000, subtitle: 'E-wallet', badge: 'Private', icon: 'phone-portrait', color: '#7C6FF7', bg: 'rgba(124,111,247,0.12)' },
  { id: 'w4', name: 'Dana darurat', balance: 2500000, subtitle: 'Target Rp 10jt', badge: 'Global', icon: 'wallet', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' },
];

const quickActions = [
  { id: 'q1', label: 'Catat keluar', icon: 'arrow-up', color: '#FF6B6B', bg: 'rgba(255,107,107,0.15)', screen: 'Add', params: { type: 'expense' } },
  { id: 'q2', label: 'Catat masuk', icon: 'arrow-down', color: '#2DD4A4', bg: 'rgba(45,212,164,0.15)', screen: 'Add', params: { type: 'income' } },
  { id: 'q3', label: 'Transfer QR', icon: 'qr-code', color: '#F5C842', bg: 'rgba(245,200,66,0.15)', screen: 'QRWallet' }, // Langsung ke layar QR
  { id: 'q4', label: 'Statistik', icon: 'bar-chart', color: '#7C6FF7', bg: 'rgba(124,111,247,0.15)', screen: 'MonthlyStats' },
];

const recentTransactions: any[] = [
  { id: 't1', title: 'Belanja Indomaret', category: 'Istri �� Kas keluarga', amount: -87500, type: 'expense', date: '11:24', icon: 'cart' },
  { id: 't2', title: 'Gaji Juni', category: 'Bayu �� BCA Bayu', amount: 6500000, type: 'income', date: 'Kemarin', icon: 'briefcase' },
  { id: 't3', title: 'Transfer ke kas keluarga', category: 'Bayu �� via QR', amount: -2000000, type: 'transfer', date: 'Kemarin', icon: 'swap-horizontal' },
  { id: 't4', title: 'Listrik PLN', category: 'Bayu �� GoPay Istri', amount: -18500, type: 'expense', date: '2 hari lalu', icon: 'flash' },
];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingSub}>Selamat pagi,</Text>
            <Text style={styles.greetingName}>Bayu</Text>
          </View>
          <View style={styles.topbarRight}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('NotificationScreen')}>
              <Ionicons name="notifications" size={17} color={UI_COLORS.text2} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>B</Text>
            </View>
          </View>
        </View>

        {/* HERO CARD (RETUCHED) */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Saldo dompet keluarga</Text>
          
          {/* ?? TIPOGRAFI SALDO SESUAI MOCKUP */}
          <Text style={styles.heroSaldoText}>
            <Text style={styles.heroCurrency}>Rp </Text>
            14.250.000
          </Text>
          
          <Text style={styles.heroSub}>Diperbarui barusan  ��  Juni 2026</Text>
          
          <View style={styles.heroStats}>
            <View style={styles.hStat}>
              <View style={styles.hStatRow}>
                <View style={[styles.hStatDot, { backgroundColor: UI_COLORS.mint }]} />
                <Text style={styles.hStatLbl}>Pemasukan</Text>
              </View>
              <Text style={[styles.hStatVal, { color: UI_COLORS.mint }]}>Rp 8.500.000</Text>
              <Text style={styles.hStatChange}>+12% vs bulan lalu</Text>
            </View>
            <View style={styles.hStat}>
              <View style={styles.hStatRow}>
                <View style={[styles.hStatDot, { backgroundColor: UI_COLORS.red }]} />
                <Text style={styles.hStatLbl}>Pengeluaran</Text>
              </View>
              <Text style={[styles.hStatVal, { color: UI_COLORS.red }]}>Rp 4.250.000</Text>
              <Text style={styles.hStatChange}>-5% vs bulan lalu</Text>
            </View>
          </View>

          {/* BUDGET PROGRESS */}
          {/* BUDGET PROGRESS (SEKARANG BISA DI-KLIK) */}
          <TouchableOpacity 
            style={styles.budgetRow} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MonthlyBudget')}
          >
            <View style={styles.budgetLblWrap}>
              <Text style={styles.budgetLbl}>Budget bulan ini</Text>
              <Text style={styles.budgetTag}>68% terpakai</Text>
            </View>
            <View style={styles.budgetBar}>
              <View style={[styles.budgetFill, { width: '68%' }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* DOMPET SAYA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Dompet saya</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallets')}>
            <Text style={styles.secLink}>Lihat semua �J</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.walletsScroll}>
          {walletData.map((w) => (
            <TouchableOpacity 
			  key={w.id} 
			  style={styles.walletChip} 
			  activeOpacity={0.8}
			  // Navigasi ke Detail Dompet dengan membawa ID dompet
			  onPress={() => navigation.navigate('WalletDetail', {walletId: w.id})}
			>
              <View style={styles.wcTop}>
                <View style={[styles.wcIcon, { backgroundColor: w.bg }]}>
                  <Ionicons name={w.icon as any} size={14} color={w.color} />
                </View>
                <Text style={styles.wcName}>{w.name}</Text>
                
                {/* ?? PENAMBAHAN BADGE GLOBAL/PRIVATE */}
                <View style={[styles.wcBadge, w.badge === 'Global' ? styles.badgeGlobalBg : styles.badgePrivateBg]}>
                  <Text style={[styles.wcBadgeTxt, w.badge === 'Global' ? {color: UI_COLORS.mint} : {color: UI_COLORS.text2}]}>
                    {w.badge}
                  </Text>
                </View>

              </View>
              <Text style={styles.wcSaldo}>Rp {w.balance.toLocaleString('id-ID')}</Text>
              <Text style={styles.wcSub}>{w.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* AKSI CEPAT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aksi cepat</Text>
        </View>
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.qBtn} 
              activeOpacity={0.8} 
              onPress={() => {
                if (action.screen === 'Add') {
                  // Arahkan ke AddTransactionScreen dengan tipe yang sesuai (income/expense)
                  navigation.navigate('Add', action.params);
                } else if (action.screen === 'QRWallet') {
                  // Arahkan langsung ke layar scan/show QR
                  navigation.navigate('QRWallet');
                } else if (action.screen === 'MonthlyStats') {
                  // Arahkan langsung ke layar monthlystats
                  navigation.navigate('MonthlyStats');
                }
              }}
            >
              <View style={[styles.qBtnIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon as any} size={18} color={action.color} />
              </View>
              <Text style={styles.qBtnLbl}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INSIGHT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Insight bulan ini</Text>
        </View>
        <View style={styles.insightWrapper}>
          <View style={styles.insightCard}>
            <View style={styles.insightRow}>
              <View style={styles.insightIcon}>
                <Ionicons name="bulb" size={18} color={UI_COLORS.violet} />
              </View>
              <View style={styles.insightTextWrap}>
                <Text style={styles.insightTitle}>Pengeluaran makan turun 18%</Text>
                <Text style={styles.insightSub}>Hemat Rp 320rb dibanding Mei. Pertahankan!</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AKTIVITAS TERBARU */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aktivitas terbaru</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.secLink}>Semua �J</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.txList}>
          {recentTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              title={tx.title}
              category={tx.category}
              amount={tx.amount}
              type={tx.type}
              date={tx.date}
            />
          ))}
        </View>

        {/* AKTIVITAS ANGGOTA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secTitle}>Aktivitas anggota</Text>
        </View>
        <View style={styles.membersRow}>
          <View style={styles.memberItem}>
            <View style={[styles.memberAvatar, { backgroundColor: UI_COLORS.violet }]}>
              <Text style={styles.memberAvatarText}>B</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Bayu</Text>
              <Text style={styles.memberLast}>Terakhir: Transfer kas �� tadi</Text>
            </View>
            <Text style={styles.memberTx}>12 tx</Text>
          </View>
          <View style={[styles.memberItem, { borderBottomWidth: 0 }]}>
            <View style={[styles.memberAvatar, { backgroundColor: UI_COLORS.red }]}>
              <Text style={styles.memberAvatarText}>I</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Istri</Text>
              <Text style={styles.memberLast}>Terakhir: Belanja �� 11:24</Text>
            </View>
            <Text style={styles.memberTx}>8 tx</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  container: { paddingBottom: 100 },
  
  /* TOP BAR */
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  greetingSub: { fontSize: 11, color: UI_COLORS.text2 },
  greetingName: { fontSize: 16, fontWeight: '600', color: UI_COLORS.text },
  topbarRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, justifyContent: 'center', alignItems: 'center' },
  notifDot: { position: 'absolute', top: 6, right: 8, width: 7, height: 7, borderRadius: 3.5, backgroundColor: UI_COLORS.red, borderWidth: 1.5, borderColor: UI_COLORS.bg },
  avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: UI_COLORS.violet, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  
  /* HERO CARD */
  heroCard: { marginHorizontal: 16, marginTop: 4, backgroundColor: UI_COLORS.card2, borderRadius: 24, borderWidth: 0.5, borderColor: UI_COLORS.border2, padding: 20 },
  heroLabel: { fontSize: 11, color: UI_COLORS.text2, marginBottom: 4, letterSpacing: 0.5 },
  
  /* ?? STYLING KHUSUS SALDO RAKSASA */
  heroSaldoText: { fontSize: 30, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -0.5 },
  heroCurrency: { fontSize: 17, fontWeight: '400', color: UI_COLORS.text2 },
  
  heroSub: { fontSize: 11, color: UI_COLORS.text3, marginTop: 3 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, gap: 8 },
  hStat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 12, borderWidth: 0.5, borderColor: UI_COLORS.border },
  hStatRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  hStatDot: { width: 8, height: 8, borderRadius: 4 },
  hStatLbl: { fontSize: 10, color: UI_COLORS.text2 },
  hStatVal: { fontSize: 14, fontWeight: '600' },
  hStatChange: { fontSize: 10, color: UI_COLORS.text3, marginTop: 2 },
  
  /* BUDGET PROGRESS */
  budgetRow: { marginTop: 14 },
  budgetLblWrap: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  budgetLbl: { fontSize: 10, color: UI_COLORS.text2 },
  budgetTag: { fontSize: 10, color: UI_COLORS.gold, fontWeight: '600' },
  budgetBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  budgetFill: { height: '100%', backgroundColor: UI_COLORS.gold, borderRadius: 2 },
  
  /* SECTIONS */
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 10 },
  secTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  secLink: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },
  
  /* WALLET SCROLL */
  walletsScroll: { paddingHorizontal: 20, gap: 10, paddingBottom: 4 },
  walletChip: { backgroundColor: UI_COLORS.card, borderRadius: 16, borderWidth: 0.5, borderColor: UI_COLORS.border2, paddingVertical: 12, paddingHorizontal: 14, minWidth: 130, marginRight: 10 },
  wcTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  wcIcon: { width: 28, height: 28, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  wcName: { fontSize: 11, fontWeight: '500', color: UI_COLORS.text2, flex: 1 },
  
  /* ?? STYLING BADGES */
  wcBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20 },
  badgeGlobalBg: { backgroundColor: 'rgba(45,212,164,0.15)' },
  badgePrivateBg: { backgroundColor: 'rgba(255,255,255,0.08)' },
  wcBadgeTxt: { fontSize: 9, fontWeight: '600' },

  wcSaldo: { fontSize: 14, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -0.3 },
  wcSub: { fontSize: 10, color: UI_COLORS.text3, marginTop: 2 },
  
  /* QUICK ACTIONS */
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  qBtn: { width: '23%', backgroundColor: UI_COLORS.card, borderRadius: 16, borderWidth: 0.5, borderColor: UI_COLORS.border, paddingVertical: 12, alignItems: 'center', gap: 6 },
  qBtnIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  qBtnLbl: { fontSize: 10, color: UI_COLORS.text2, textAlign: 'center', lineHeight: 14 },
  
  /* INSIGHTS (WITH CUSTOM PURPLE BORDER) */
  insightWrapper: { paddingHorizontal: 16 },
  insightCard: { backgroundColor: UI_COLORS.card, borderRadius: 18, borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.3)', paddingHorizontal: 16, paddingVertical: 14 },
  insightRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  insightIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(124,111,247,0.15)', justifyContent: 'center', alignItems: 'center' },
  insightTextWrap: { flex: 1 },
  insightTitle: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  insightSub: { fontSize: 11, color: UI_COLORS.text2, marginTop: 2 },
  
  /* LISTS */
  txList: { paddingHorizontal: 16 },
  membersRow: { paddingHorizontal: 16 },
  memberItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.border },
  memberAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  memberAvatarText: { color: '#FFF', fontWeight: '600', fontSize: 12 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 12, color: UI_COLORS.text, fontWeight: '500' },
  memberLast: { fontSize: 10, color: UI_COLORS.text3 },
  memberTx: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text2 },
});