import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  bg: '#0A1628', card: '#152238', card2: '#1A2A42', input: '#111E30',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  b1: 'rgba(255,255,255,0.07)',
};

interface TransactionCardProps {
  title: string;
  category: string;
  amount: number;
  type: 'expense' | 'income' | 'transfer';
  date: string;
  icon: string;
  wallet?: string;
  saldo?: string;
  avatarText?: string;
  avatarBg?: string;
  fromWallet?: string;
  toWallet?: string;
  onPress?: () => View;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title, category, amount, type, date, icon, wallet, saldo,
  avatarText = 'B', avatarBg = UI_COLORS.violet, fromWallet, toWallet, onPress
}) => {
  const isExpense = type === 'expense';
  const isIncome = type === 'income';
  const isTransfer = type === 'transfer';

  // Penentuan warna nominal angka
  const amtColor = isExpense ? UI_COLORS.red : isIncome ? UI_COLORS.mint : UI_COLORS.violet;
  // Penentuan tanda + atau -
  const amtPrefix = isExpense ? '-Rp ' : isIncome ? '+Rp ' : 'Rp ';
  // Penentuan warna background icon
  const iconBg = isExpense || isTransfer ? 'rgba(255,107,107,0.12)' : 'rgba(45,212,164,0.1)';
  const iconColor = isExpense || isTransfer ? UI_COLORS.red : UI_COLORS.mint;

  return (
    <TouchableOpacity style={styles.txItem} activeOpacity={0.7} onPress={onPress}>
      {/* KIRI: Icon & Avatar Ring */}
      <View style={styles.txLeft}>
        <View style={[styles.txIcon, { backgroundColor: isTransfer ? 'rgba(124,111,247,0.1)' : iconBg }]}>
          <Ionicons name={isTransfer ? "swap-horizontal" : (icon as any)} size={18} color={isTransfer ? UI_COLORS.violet : iconColor} />
        </View>
        <View style={[styles.txAvatar, { backgroundColor: avatarBg }]}>
          <Text style={styles.txAvatarTxt}>{avatarText}</Text>
        </View>
      </View>

      {/* TENGAH: Info Transaksi */}
      <View style={styles.txInfo}>
        <Text style={styles.txName} numberOfLines={1}>{title}</Text>
        
        {isTransfer ? (
          /* Tampilan Alur Khusus Transfer (BCA Bayu -> Kas Keluarga) */
          <View style={styles.transferFlowMini}>
            <View style={styles.tfPill}>
              <Text style={styles.tfPillTxt}>{fromWallet}</Text>
            </View>
            <Text style={styles.tfArrowTxt}>→</Text>
            <View style={styles.tfPill}>
              <Text style={styles.tfPillTxt}>{toWallet}</Text>
            </View>
            <View style={styles.txDot} />
            <Text style={styles.txTime}>{date}</Text>
          </View>
        ) : (
          /* Tampilan Metadata Biasa (Kategori & Nama Dompet) */
          <View style={styles.txMeta}>
            <Text style={styles.txCat}>{category}</Text>
            <View style={styles.txDot} />
            <Text style={styles.txWallet} numberOfLines={1}>{wallet}</Text>
            <View style={styles.txDot} />
            <Text style={styles.txTime}>{date}</Text>
          </View>
        )}
      </View>

      {/* KANAN: Nominal & Sisa Saldo */}
      <View style={styles.txRight}>
        <Text style={[styles.txAmt, { color: amtColor }]}>
          {amtPrefix}{Math.abs(amount).toLocaleString('id-ID')}
        </Text>
        <Text style={styles.txSaldo}>{saldo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  transferFlowMini: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  tfPill: { backgroundColor: 'rgba(124,111,247,0.1)', borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6 },
  tfPillTxt: { fontSize: 10, color: '#A89FF9', fontWeight: '500' },
  tfArrowTxt: { fontSize: 10, color: UI_COLORS.t3 },
});