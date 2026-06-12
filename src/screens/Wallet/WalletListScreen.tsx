import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// ✅ MENGGUNAKAN THEME GLOBAL
import { theme } from '../../theme';
import { GlassCard } from '../../components/ui/GlassCard';

const { colors, spacing, typography } = theme;

// --- STRUKTUR DATA MOCKUP ---
const walletGroups = [
  {
    title: 'Bersama keluarga',
    items: [
      {
        id: 'w1', name: 'Kas keluarga', icon: 'home', iconColor: '#F5C842', iconBg: 'rgba(245,200,66,0.12)',
        typeText: 'Kas tunai', badge: 'Global — catat', badgeType: 'global',
        members: ['B', 'I'], balance: 6800000, changeText: '+Rp 500rb bulan ini', changeType: 'up'
      },
      {
        id: 'w2', name: 'Dana darurat', icon: 'shield-checkmark', iconColor: '#2DD4A4', iconBg: 'rgba(45,212,164,0.1)',
        typeText: 'Tabungan', badge: 'Global — lihat', badgeType: 'global',
        balance: 2500000, changeText: '+Rp 200rb', changeType: 'up',
        progress: 25, progLeft: 'Progress target', progRight: '25% dari Rp 10jt', progColor: '#2DD4A4'
      },
    ],
  },
  {
    title: 'Dompet pribadi',
    items: [
      {
        id: 'w3', name: 'BCA Bayu', icon: 'business', iconColor: '#2DD4A4', iconBg: 'rgba(45,212,164,0.1)',
        typeText: 'Rekening bank', badge: 'Private', badgeType: 'private',
        balance: 4100000, changeText: 'tidak berubah', changeType: 'neutral'
      },
      {
        id: 'w4', name: 'GoPay Istri', icon: 'phone-portrait', iconColor: '#7C6FF7', iconBg: 'rgba(124,111,247,0.12)',
        typeText: 'E-wallet', badge: 'Private', badgeType: 'private',
        balance: 850000, changeText: '-Rp 120rb', changeType: 'down'
      },
      {
        id: 'w5', name: 'OVO Bayu', icon: 'phone-portrait', iconColor: '#EF9F27', iconBg: 'rgba(186,117,23,0.12)',
        typeText: 'E-wallet', badge: 'Private', badgeType: 'private',
        balance: 3200000, changeText: '+Rp 300rb', changeType: 'up'
      },
    ],
  },
  {
    title: 'Tabungan & target',
    items: [
      {
        id: 'w6', name: 'Beli mobil', icon: 'car', iconColor: '#7C6FF7', iconBg: 'rgba(124,111,247,0.12)',
        typeText: 'Target: Rp 80jt', badge: 'Tabungan', badgeType: 'saving',
        balance: 4800000, changeText: '+Rp 500rb', changeType: 'up',
        progress: 6, progLeft: '6% tercapai', progRight: 'sisa Rp 75,2jt', progColor: '#7C6FF7'
      },
      {
        id: 'w7', name: 'Liburan keluarga', icon: 'airplane', iconColor: '#2DD4A4', iconBg: 'rgba(45,212,164,0.1)',
        typeText: 'Target: Rp 15jt', badge: 'Tabungan', badgeType: 'saving',
        balance: 500000, changeText: 'baru mulai', changeType: 'up',
        progress: 3, progLeft: '3% tercapai', progRight: 'sisa Rp 14,5jt', progColor: '#2DD4A4'
      },
    ],
  },
  {
    title: 'Hutang & piutang',
    items: [
      {
        id: 'w8', name: 'Cicilan motor', icon: 'bicycle', iconColor: '#FF6B6B', iconBg: 'rgba(255,107,107,0.1)',
        typeText: 'Jatuh tempo: 25 Jun', badge: 'Hutang', badgeType: 'debt',
        balance: 8200000, balanceColor: '#FF6B6B', changeText: 'cicilan Rp 800rb/bln', changeType: 'down',
        progress: 63, progLeft: 'Terlunasi 63%', progRight: '14 bulan lagi', progColor: '#FF6B6B'
      },
    ],
  },
];

// --- HELPER COMPONENT UNTUK KARTU DOMPET ---
const WalletCard = ({ item }: any) => {
  // Styling untuk badge berdasarkan mockup
  const getBadgeStyle = () => {
    switch (item.badgeType) {
      case 'global': return { bg: 'rgba(45,212,164,0.12)', text: '#2DD4A4' };
      case 'saving': return { bg: 'rgba(124,111,247,0.15)', text: '#A89FF9' };
      case 'debt': return { bg: 'rgba(255,107,107,0.12)', text: '#FF9090' };
      default: return { bg: 'rgba(255,255,255,0.06)', text: colors.textSecondary || '#8FA8CC' }; // private
    }
  };

  const getChangeColor = () => {
    switch (item.changeType) {
      case 'up': return colors.income || '#2DD4A4';
      case 'down': return colors.expense || '#FF6B6B';
      default: return '#3E5878';
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.walletCard}>
        <View style={styles.wcRow}>
          {/* Kiri: Icon */}
          <View style={[styles.wcIcon, { backgroundColor: item.iconBg }]}>
            <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
          </View>
          
          {/* Tengah: Info */}
          <View style={styles.wcMain}>
            <Text style={styles.wcName} numberOfLines={1}>{item.name}</Text>
            <View style={styles.wcMeta}>
              <Text style={styles.wcType}>{item.typeText}</Text>
              <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
                <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{item.badge}</Text>
              </View>
              {item.members && (
                <View style={styles.membersRow}>
                  {item.members.map((m: string, idx: number) => (
                    <View key={idx} style={[styles.avatarXs, { backgroundColor: idx === 0 ? '#7C6FF7' : '#F5C842', zIndex: 10 - idx }]}>
                      <Text style={styles.avatarText}>{m}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Kanan: Saldo */}
          <View style={styles.wcRight}>
            <Text style={[styles.wcSaldo, item.balanceColor ? { color: item.balanceColor } : {}]}>
              Rp {item.balance.toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.wcChange, { color: getChangeColor() }]}>{item.changeText}</Text>
          </View>
        </View>

        {/* Bawah: Progress Bar (Jika ada) */}
        {item.progress !== undefined && (
          <View style={styles.progressRow}>
            <View style={styles.progLabels}>
              <Text style={styles.progTextLeft}>{item.progLeft}</Text>
              <Text style={[styles.progTextRight, { color: item.progColor }]}>{item.progRight}</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: `${item.progress}%`, backgroundColor: item.progColor }]} />
            </View>
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
};

// --- MAIN SCREEN ---
export const WalletListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.pageTitle}>Dompet</Text>
          <Text style={styles.pageSub}>Total 7 dompet aktif</Text>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={18} color={colors.textSecondary || '#8FA8CC'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add" size={18} color="#F5C842" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* TOTAL CARD */}
        <GlassCard style={styles.totalCard}>
          <Text style={styles.totalLbl}>Total saldo semua dompet</Text>
          <Text style={styles.totalAmt}>
            <Text style={styles.totalAmtCurrency}>Rp </Text>
            22.750.000
          </Text>
          <View style={styles.miniStats}>
            <View style={styles.mStat}>
              <Text style={styles.mStatLbl}>
                <View style={[styles.mStatDot, { backgroundColor: '#2DD4A4' }]} /> Dompet global
              </Text>
              <Text style={styles.mStatVal}>Rp 9.300.000</Text>
            </View>
            <View style={styles.mStat}>
              <Text style={styles.mStatLbl}>
                <View style={[styles.mStatDot, { backgroundColor: '#8FA8CC' }]} /> Dompet pribadi
              </Text>
              <Text style={styles.mStatVal}>Rp 8.150.000</Text>
            </View>
            <View style={styles.mStat}>
              <Text style={styles.mStatLbl}>
                <View style={[styles.mStatDot, { backgroundColor: '#7C6FF7' }]} /> Tabungan
              </Text>
              <Text style={styles.mStatVal}>Rp 5.300.000</Text>
            </View>
            <View style={styles.mStat}>
              <Text style={styles.mStatLbl}>
                <View style={[styles.mStatDot, { backgroundColor: '#FF6B6B' }]} /> Sisa hutang
              </Text>
              <Text style={[styles.mStatVal, { color: '#FF6B6B' }]}>Rp 8.200.000</Text>
            </View>
          </View>
        </GlassCard>

        {/* WALLET LISTS MAP */}
        {walletGroups.map((group, gIdx) => (
          <View key={gIdx}>
            <View style={styles.secHeader}>
              <Text style={styles.secTitle}>{group.title}</Text>
              <TouchableOpacity style={styles.secAdd}>
                <Ionicons name="add" size={16} color="#F5C842" />
              </TouchableOpacity>
            </View>
            {group.items.map((wallet) => (
              <WalletCard key={wallet.id} item={wallet} />
            ))}
            <View style={styles.spacerSec} />
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || '#0A1628',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  pageSub: {
    fontSize: 12,
    color: '#3E5878',
    marginTop: 2,
  },
  topbarRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface || '#152238',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  totalCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1A2A42', // Sesuai warna mockup (--kb-card2)
  },
  totalLbl: {
    fontSize: 12,
    color: colors.textSecondary || '#8FA8CC',
    marginBottom: 4,
  },
  totalAmt: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  totalAmtCurrency: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textSecondary || '#8FA8CC',
  },
  miniStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  mStat: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.09)',
  },
  mStatLbl: {
    fontSize: 11,
    color: colors.textSecondary || '#8FA8CC',
    marginBottom: 4,
  },
  mStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mStatVal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  secTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary || '#8FA8CC',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  secAdd: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(245,200,66,0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(245,200,66,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
  },
  wcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wcIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wcMain: {
    flex: 1,
  },
  wcName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
    marginBottom: 4,
  },
  wcMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  wcType: {
    fontSize: 11,
    color: '#3E5878',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  membersRow: {
    flexDirection: 'row',
    marginLeft: 2,
  },
  avatarXs: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.background || '#0A1628',
    marginLeft: -6, // Efek tumpuk
  },
  avatarText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
  },
  wcRight: {
    alignItems: 'flex-end',
  },
  wcSaldo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary || '#F0F4FF',
  },
  wcChange: {
    fontSize: 11,
    marginTop: 4,
  },
  progressRow: {
    marginTop: 14,
  },
  progLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progTextLeft: {
    fontSize: 11,
    color: '#3E5878',
  },
  progTextRight: {
    fontSize: 11,
    fontWeight: '500',
  },
  progTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progFill: {
    height: '100%',
    borderRadius: 2,
  },
  spacerSec: {
    height: 8,
  },
});