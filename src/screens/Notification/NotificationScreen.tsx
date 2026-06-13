import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

const { colors } = theme;

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  text: '#F0F4FF',
  text2: '#8FA8CC',
  text3: '#3E5878',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
  violet: '#7C6FF7',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.14)',
};

// --- HELPER COMPONENT: NOTIF ITEM ---
const NotifItem = ({ 
  isUnread, icon, iconColor, iconBg, title, sub, time, 
  amt, amtColor, ctaIcon, ctaText, ctaColor, ctaBg 
}: any) => (
  <TouchableOpacity style={[styles.notifItem, isUnread && styles.notifItemUnread]} activeOpacity={0.7}>
    {isUnread && <View style={styles.unreadDot} />}
    
    <View style={[styles.niIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    
    <View style={styles.niBody}>
      <Text style={[styles.niTitle, !isUnread && styles.niTitleRead]}>{title}</Text>
      <Text style={styles.niSub}>{sub}</Text>
      
      {ctaText && (
        <TouchableOpacity style={[styles.niCta, { backgroundColor: ctaBg }]} activeOpacity={0.8}>
          <Ionicons name={ctaIcon} size={12} color={ctaColor} />
          <Text style={[styles.niCtaTxt, { color: ctaColor }]}>{ctaText}</Text>
        </TouchableOpacity>
      )}
    </View>
    
    <View style={styles.niRight}>
      <Text style={styles.niTime}>{time}</Text>
      {amt && <Text style={[styles.niAmt, { color: amtColor }]}>{amt}</Text>}
    </View>
  </TouchableOpacity>
);

export const NotificationScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filters = ['Semua', 'Alert', 'Transfer', 'Budget', 'Tabungan', 'Sistem'];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={UI_COLORS.text2} />
        </TouchableOpacity>
        <View style={styles.topbarCenter}>
          <Text style={styles.pageTitle}>Notifikasi</Text>
          <Text style={styles.pageSub}>5 belum dibaca</Text>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="checkmark-done" size={16} color={UI_COLORS.text2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={16} color={UI_COLORS.text2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FILTER SCROLL */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity 
              key={f} 
              style={[styles.fc, activeFilter === f ? styles.fcOn : styles.fcOff]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.fcTxt, activeFilter === f ? { color: '#FFF' } : { color: UI_COLORS.text2 }]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* GROUP: HARI INI */}
        <View style={styles.dayLbl}>
          <Text style={styles.dayTxt}>Hari ini</Text>
          <View style={styles.dayLine} />
          <Text style={styles.dayBadge}>3 baru</Text>
        </View>

        <NotifItem 
          isUnread={true} icon="notifications" iconColor={UI_COLORS.red} iconBg="rgba(255,107,107,0.12)"
          title="Cicilan motor jatuh tempo 3 hari lagi"
          sub="Cicilan Honda Beat FIF · Rp 800.000 · 25 Juni 2026"
          time="09:00"
          ctaIcon="card" ctaText="Bayar sekarang" ctaColor="#FF9090" ctaBg="rgba(255,107,107,0.1)"
        />

        <NotifItem 
          isUnread={true} icon="warning" iconColor={UI_COLORS.red} iconBg="rgba(255,107,107,0.1)"
          title="Budget Belanja hampir habis!"
          sub="Sudah Rp 420rb dari Rp 500rb — tersisa Rp 80.000 untuk 19 hari lagi"
          time="08:30"
          ctaIcon="create" ctaText="Naikkan limit" ctaColor={UI_COLORS.gold} ctaBg="rgba(245,200,66,0.1)"
        />

        <NotifItem 
          isUnread={true} icon="swap-horizontal" iconColor={UI_COLORS.mint} iconBg="rgba(45,212,164,0.1)"
          title="Transfer masuk dari Istri"
          sub="Ke dompet Kas keluarga · via QR scan"
          time="07:15" amt="+Rp 500rb" amtColor={UI_COLORS.mint}
          ctaIcon="eye" ctaText="Lihat transaksi" ctaColor="#6EE7C0" ctaBg="rgba(45,212,164,0.1)"
        />

        {/* GROUP: KEMARIN */}
        <View style={styles.dayLbl}>
          <Text style={styles.dayTxt}>Kemarin</Text>
          <View style={styles.dayLine} />
          <Text style={styles.dayBadge}>2 baru</Text>
        </View>

        <NotifItem 
          isUnread={true} icon="trophy" iconColor={UI_COLORS.gold} iconBg="rgba(245,200,66,0.12)"
          title="Dana darurat mencapai 25%!"
          sub="Tabungan Rp 2.500.000 dari target Rp 10jt. Terus semangat!"
          time="18:00"
          ctaIcon="wallet" ctaText="Lihat progres tabungan" ctaColor={UI_COLORS.gold} ctaBg="rgba(245,200,66,0.1)"
        />

        <NotifItem 
          isUnread={true} icon="briefcase" iconColor={UI_COLORS.mint} iconBg="rgba(45,212,164,0.1)"
          title="Pemasukan project masuk"
          sub="DP Web Company Profile dari PT Maju Jaya · ke project wallet"
          time="14:30" amt="+Rp 3,75jt" amtColor={UI_COLORS.mint}
          ctaIcon="eye" ctaText="Lihat detail project" ctaColor="#6EE7C0" ctaBg="rgba(45,212,164,0.1)"
        />

        {/* GROUP: 10 JUNI */}
        <View style={styles.dayLbl}>
          <Text style={styles.dayTxt}>10 Juni</Text>
          <View style={styles.dayLine} />
        </View>

        <NotifItem 
          isUnread={false} icon="cash" iconColor={UI_COLORS.mint} iconBg="rgba(45,212,164,0.08)"
          title="Gaji Juni sudah masuk"
          sub="Rp 6.500.000 masuk ke BCA Bayu · split otomatis 3 dompet"
          time="08:02" amt="+Rp 6,5jt" amtColor="rgba(45,212,164,0.7)"
        />

        <NotifItem 
          isUnread={false} icon="repeat" iconColor={UI_COLORS.violet} iconBg="rgba(124,111,247,0.1)"
          title="Transaksi berulang tercatat"
          sub="Netflix Rp 54.000 otomatis dicatat dari OVO Bayu · kategori Hiburan"
          time="00:00"
        />

        {/* GROUP: 9 JUNI */}
        <View style={styles.dayLbl}>
          <Text style={styles.dayTxt}>9 Juni</Text>
          <View style={styles.dayLine} />
        </View>

        <NotifItem 
          isUnread={false} icon="person-add" iconColor={UI_COLORS.mint} iconBg="rgba(45,212,164,0.08)"
          title="Istri bergabung ke KasBon"
          sub="Akun Istri berhasil terhubung ke keluargamu · selamat datang!"
          time="20:11"
        />

        <NotifItem 
          isUnread={false} icon="shield-checkmark" iconColor="rgba(255,107,107,0.7)" iconBg="rgba(255,107,107,0.08)"
          title="Login baru terdeteksi"
          sub="Login dari Android baru · Semarang · jika bukan kamu hubungi admin"
          time="09:41"
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContent: { paddingBottom: 40 },
  
  /* TOPBAR */
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  backBtn: { padding: 4, marginRight: 8 },
  topbarCenter: { flex: 1 },
  pageTitle: { fontSize: 18, fontWeight: '600', color: UI_COLORS.text },
  pageSub: { fontSize: 11, color: UI_COLORS.text3, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2, alignItems: 'center', justifyContent: 'center' },
  
  /* FILTER */
  filterRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  fc: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  fcOn: { backgroundColor: UI_COLORS.violet },
  fcOff: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  fcTxt: { fontSize: 12, fontWeight: '500' },

  /* DAY LABEL */
  dayLbl: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  dayTxt: { fontSize: 11, color: UI_COLORS.text3, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '600' },
  dayLine: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.border },
  dayBadge: { fontSize: 10, color: UI_COLORS.violet, fontWeight: '500' },

  /* NOTIF ITEM */
  notifItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 12, paddingHorizontal: 18, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.border, position: 'relative' },
  notifItemUnread: { backgroundColor: 'rgba(255,255,255,0.02)' },
  unreadDot: { position: 'absolute', left: 8, top: '50%', width: 6, height: 6, borderRadius: 3, backgroundColor: UI_COLORS.violet },
  niIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  niBody: { flex: 1 },
  niTitle: { fontSize: 14, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4, lineHeight: 20 },
  niTitleRead: { color: UI_COLORS.text2, fontWeight: '500' },
  niSub: { fontSize: 12, color: UI_COLORS.text3, lineHeight: 18 },
  niRight: { alignItems: 'flex-end', gap: 4 },
  niTime: { fontSize: 10, color: UI_COLORS.text3, marginTop: 2 },
  niAmt: { fontSize: 13, fontWeight: '600' },
  
  /* CTA BUTTON */
  niCta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8 },
  niCtaTxt: { fontSize: 11, fontWeight: '500' },
});