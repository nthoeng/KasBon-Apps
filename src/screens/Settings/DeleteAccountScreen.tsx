// npx expo install @expo/vector-icons react-native-safe-area-context
// Simpan di: src/screens/settings/DeleteAccountScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── TEMA WARNA KASBON ────────────────────────────────────────────────────────
const COLORS = {
  bg: '#0A1628',
  sf: '#111F35',
  sf2: '#152338',
  bd: '#1E3050',
  gold: '#F5C842',
  mint: '#2DD4A4',
  coral: '#FF6B6B',
  violet: '#7C6FF7',
  blue: '#4A90D9',
  t1: '#E8EDF5',
  t2: '#8AA0BE',
  t3: '#3E5878',
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type OptionType = 'full' | 'export';
const NUMPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

export const DeleteAccountScreen = () => {
  const navigation = useNavigation<any>();

  // State navigasi antar langkah (Step 1 sampai 5)
  const [step, setStep] = useState<number>(1);

  // State Step 2: Pilihan & Alasan
  const [selectedOption, setSelectedOption] = useState<OptionType>('full');
  const [selectedReason, setSelectedReason] = useState<string>('Pindah ke aplikasi lain');

  // State Step 3: Konfirmasi Teks
  const [confirmText, setConfirmText] = useState<string>('');
  const isTextValid = confirmText.trim().toUpperCase() === 'HAPUS AKUN SAYA';

  // State Step 4: Input PIN
  const [pinEntered, setPinEntered] = useState<string[]>([]);

  // Handler penekanan numpad PIN
  const handlePinPress = (key: string) => {
    if (pinEntered.length >= 4) return;
    const nextPin = [...pinEntered, key];
    setPinEntered(nextPin);

    if (nextPin.length === 4) {
      setTimeout(() => {
        setStep(5); // Masuk ke layar sukses penjadwalan hapus
      }, 350);
    }
  };

  const handlePinDelete = () => {
    setPinEntered((prev) => prev.slice(0, -1));
  };

  // ─── RENDER STEP INDICATOR (4 TITIK) ────────────────────────────────────────
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((s) => {
          const isDone = step > s;
          const isActive = step === s;
          return (
            <View
              key={s}
              style={[
                styles.stepDot,
                isDone && styles.stepDotDone,
                isActive && styles.stepDotActive,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* TOPBAR (Disembunyikan pada layar akhir Step 5) */}
      {step < 5 && (
        <View style={styles.topbar}>
          <TouchableOpacity
            style={styles.ibtn}
            activeOpacity={0.7}
            onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
          >
            <Ionicons name="arrow-back" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.ptitle}>Hapus Akun</Text>
          <View style={{ width: 32 }} />
        </View>
      )}

      {step < 5 && renderStepIndicator()}

      {/* ─── STEP 1: PERINGATAN DAMPAK DATA ──────────────────────────────────── */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.warnIconBig}>
              <Ionicons name="alert-circle-outline" size={30} color={COLORS.coral} />
            </View>
            <Text style={styles.hTitle}>Yakin mau hapus akun?</Text>
            <Text style={styles.hSub}>
              Tindakan ini permanen dan tidak bisa dibatalkan. Berikut yang akan hilang selamanya:
            </Text>

            <View style={styles.impactCard}>
              <View style={styles.impactRow}>
                <View style={styles.impIcon}>
                  <Ionicons name="receipt-outline" size={16} color={COLORS.coral} />
                </View>
                <View style={styles.impText}>
                  <Text style={styles.impTitle}>Riwayat transaksi</Text>
                  <Text style={styles.impSub}>Semua catatan pemasukan & pengeluaran</Text>
                </View>
                <Text style={styles.impCount}>1.284</Text>
              </View>

              <View style={styles.impactRow}>
                <View style={styles.impIcon}>
                  <Ionicons name="wallet-outline" size={16} color={COLORS.coral} />
                </View>
                <View style={styles.impText}>
                  <Text style={styles.impTitle}>Dompet pribadi</Text>
                  <Text style={styles.impSub}>Saldo & riwayat dompet milikmu</Text>
                </View>
                <Text style={styles.impCount}>4</Text>
              </View>

              <View style={styles.impactRow}>
                <View style={styles.impIcon}>
                  <Ionicons name="briefcase-outline" size={16} color={COLORS.coral} />
                </View>
                <View style={styles.impText}>
                  <Text style={styles.impTitle}>Project & usaha</Text>
                  <Text style={styles.impSub}>Termasuk Usaha Cimol & Tabungan Mobil</Text>
                </View>
                <Text style={styles.impCount}>2</Text>
              </View>

              <View style={[styles.impactRow, { borderBottomWidth: 0 }]}>
                <View style={styles.impIcon}>
                  <Ionicons name="image-outline" size={16} color={COLORS.coral} />
                </View>
                <View style={styles.impText}>
                  <Text style={styles.impTitle}>Foto struk & lampiran</Text>
                  <Text style={styles.impSub}>Semua bukti transaksi tersimpan</Text>
                </View>
                <Text style={styles.impCount}>312</Text>
              </View>
            </View>

            <View style={styles.familyWarn}>
              <Ionicons name="people" size={16} color={COLORS.gold} />
              <Text style={styles.familyWarnTxt}>
                Kamu adalah <Text style={{ color: COLORS.gold, fontWeight: '600' }}>admin keluarga</Text>. Menghapus akun ini akan memutus akses Istri dan 1 anggota lain ke Kas Keluarga dan Dana Darurat, kecuali kamu memindahkan kepemilikan dulu.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footerBtns}>
            <TouchableOpacity
              style={styles.btnDanger}
              activeOpacity={0.8}
              onPress={() => setStep(2)}
            >
              <Text style={styles.btnDangerTxt}>Saya Mengerti, Lanjutkan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnGhost}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnGhostTxt}>Batal, Simpan Akun Saya</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ─── STEP 2: METODE & ALASAN PENGHAPUSAN ─────────────────────────────── */}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.hTitle, { marginTop: 8 }]}>Pilih cara penghapusan</Text>
            <Text style={styles.hSub}>
              Kamu bisa memilih menyimpan data project bisnis untuk laporan pajak nanti.
            </Text>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === 'full' && styles.optionCardSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedOption('full')}
            >
              <View style={[styles.optIcon, styles.optIconCoral]}>
                <Ionicons name="trash-outline" size={18} color={COLORS.coral} />
              </View>
              <View style={styles.optInfo}>
                <Text style={styles.optTitle}>Hapus semua data sekarang</Text>
                <Text style={styles.optSub}>
                  Akun dan seluruh riwayat dihapus permanen setelah masa tunda 14 hari
                </Text>
              </View>
              <View style={[styles.radioC, selectedOption === 'full' && styles.radioCOn]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === 'export' && styles.optionCardSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedOption('export')}
            >
              <View style={[styles.optIcon, styles.optIconBlue]}>
                <Ionicons name="download-outline" size={18} color={COLORS.blue} />
              </View>
              <View style={styles.optInfo}>
                <Text style={styles.optTitle}>Unduh data dulu, lalu hapus</Text>
                <Text style={styles.optSub}>
                  Export laporan keuangan & struk ke email kamu sebelum akun dihapus
                </Text>
              </View>
              <View style={[styles.radioC, selectedOption === 'export' && styles.radioCOn]} />
            </TouchableOpacity>

            <Text style={styles.sectLbl}>Boleh tahu alasannya? (opsional)</Text>

            {[
              'Pindah ke aplikasi lain',
              'Fitur kurang sesuai kebutuhan',
              'Khawatir soal privasi data',
              'Sudah tidak butuh aplikasi ini',
            ].map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonCard,
                    isSelected && styles.reasonCardSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedReason(reason)}
                >
                  <View style={[styles.checkboxC, isSelected && styles.checkboxCOn]}>
                    {isSelected && (
                      <Ionicons name="checkmark" size={13} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.reasonTxt}>{reason}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.footerBtns}>
            <TouchableOpacity
              style={styles.btnDanger}
              activeOpacity={0.8}
              onPress={() => setStep(3)}
            >
              <Text style={styles.btnDangerTxt}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ─── STEP 3: KONFIRMASI KETIK TEKS ───────────────────────────────────── */}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.warnIconBig}>
              <Ionicons name="keypad-outline" size={26} color={COLORS.coral} />
            </View>
            <Text style={styles.hTitle}>Ketik untuk konfirmasi</Text>
            <View style={styles.confirmInputWrap}>
              <Text style={styles.confirmLbl}>
                Ketik <Text style={{ color: COLORS.coral, fontWeight: '700' }}>HAPUS AKUN SAYA</Text> di bawah ini untuk melanjutkan
              </Text>
              <TextInput
                style={[
                  styles.confirmInput,
                  confirmText.length > 0 && (isTextValid ? styles.inputValid : styles.inputInvalid),
                ]}
                placeholder="Ketik di sini..."
                placeholderTextColor={COLORS.t3}
                value={confirmText}
                onChangeText={setConfirmText}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </ScrollView>

          <View style={styles.footerBtns}>
            <TouchableOpacity
              style={[styles.btnDanger, !isTextValid && styles.btnDisabled]}
              activeOpacity={isTextValid ? 0.8 : 1}
              disabled={!isTextValid}
              onPress={() => {
                setPinEntered([]);
                setStep(4);
              }}
            >
              <Text style={[styles.btnDangerTxt, !isTextValid && styles.btnDisabledTxt]}>
                Konfirmasi & Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ─── STEP 4: VERIFIKASI PIN FINAL ────────────────────────────────────── */}
      {step === 4 && (
        <View style={styles.stepContainer}>
          <View style={styles.pinContent}>
            <View style={styles.warnIconBig}>
              <Ionicons name="lock-closed-outline" size={26} color={COLORS.coral} />
            </View>
            <Text style={styles.hTitle}>Masukkan PIN terakhir kali</Text>
            <Text style={styles.hSub}>
              Verifikasi identitas kamu sebelum penghapusan akun diproses
            </Text>

            <View style={styles.pinRow}>
              {[0, 1, 2, 3].map((index) => (
                <View key={index} style={styles.pinBox}>
                  <Text style={styles.pinDot}>
                    {pinEntered[index] !== undefined ? '•' : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* MINI NUMPAD */}
          <View style={styles.numpadMini}>
            {NUMPAD_KEYS.map((key, index) => {
              if (key === '') {
                return <View key={index} style={[styles.keyMini, styles.keyEmpty]} />;
              }
              if (key === 'del') {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.keyMini}
                    activeOpacity={0.7}
                    onPress={handlePinDelete}
                  >
                    <Ionicons name="backspace-outline" size={20} color={COLORS.t2} />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.keyMini}
                  activeOpacity={0.7}
                  onPress={() => handlePinPress(key)}
                >
                  <Text style={styles.keyMiniTxt}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* ─── STEP 5: FINAL SCREEN (JADWAL PENGHAPUSAN) ───────────────────────── */}
      {step === 5 && (
        <View style={styles.finalScreen}>
          <View style={styles.finalIcon}>
            <Ionicons name="time-outline" size={32} color={COLORS.coral} />
          </View>
          <Text style={styles.hTitle}>Akun terjadwal dihapus</Text>
          <Text style={styles.hSub}>
            Permintaan kamu sudah diterima. Akun dan semua data akan dihapus permanen dalam waktu yang ditentukan.
          </Text>

          <View style={styles.cooldownCard}>
            <View style={styles.cooldownRow}>
              <Ionicons name="calendar-outline" size={22} color={COLORS.mint} />
              <Text style={styles.cooldownTxt}>
                Penghapusan permanen pada{' '}
                <Text style={{ color: COLORS.mint, fontWeight: '600' }}>
                  14 Juli 2026
                </Text>
                . Login kembali sebelum tanggal ini untuk membatalkan proses penghapusan.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btnGhost, { width: '100%', marginTop: 24 }]}
            activeOpacity={0.7}
            onPress={() => {
              setStep(1);
              navigation.goBack();
            }}
          >
            <Text style={styles.btnGhostTxt}>Kembali ke Profil</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

// ─── STYLESHEET ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 14,
  },
  ibtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A2D47',
    borderWidth: 1,
    borderColor: '#253E60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ptitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.t1,
    flex: 1,
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#253E60',
  },
  stepDotActive: {
    width: 18,
    backgroundColor: COLORS.coral,
  },
  stepDotDone: {
    backgroundColor: COLORS.mint,
  },
  stepContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bodyScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  warnIconBig: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: hexToRgba(COLORS.coral, 0.15),
    borderWidth: 1.5,
    borderColor: hexToRgba(COLORS.coral, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  hTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.t1,
    textAlign: 'center',
    marginBottom: 6,
  },
  hSub: {
    fontSize: 12.5,
    color: COLORS.t2,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  impactCard: {
    backgroundColor: COLORS.sf2,
    borderWidth: 1,
    borderColor: COLORS.bd,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A2D47',
  },
  impIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: hexToRgba(COLORS.coral, 0.12),
    borderWidth: 1,
    borderColor: hexToRgba(COLORS.coral, 0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  impText: {
    flex: 1,
  },
  impTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.t1,
  },
  impSub: {
    fontSize: 11,
    color: COLORS.t2,
    marginTop: 1,
  },
  impCount: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.coral,
  },
  familyWarn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: hexToRgba(COLORS.gold, 0.08),
    borderWidth: 1,
    borderColor: hexToRgba(COLORS.gold, 0.25),
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  familyWarnTxt: {
    flex: 1,
    fontSize: 11.5,
    color: COLORS.t2,
    lineHeight: 17,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: COLORS.sf2,
    borderWidth: 1.5,
    borderColor: COLORS.bd,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  optionCardSelected: {
    borderColor: hexToRgba(COLORS.gold, 0.5),
    backgroundColor: hexToRgba(COLORS.gold, 0.06),
  },
  optIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optIconCoral: {
    backgroundColor: hexToRgba(COLORS.coral, 0.15),
    borderWidth: 1,
    borderColor: hexToRgba(COLORS.coral, 0.25),
  },
  optIconBlue: {
    backgroundColor: hexToRgba(COLORS.blue, 0.15),
    borderWidth: 1,
    borderColor: hexToRgba(COLORS.blue, 0.25),
  },
  optInfo: {
    flex: 1,
  },
  optTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: COLORS.t1,
    marginBottom: 2,
  },
  optSub: {
    fontSize: 11.5,
    color: COLORS.t2,
    lineHeight: 16,
  },
  radioC: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#253E60',
    marginTop: 2,
  },
  radioCOn: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.gold,
  },
  sectLbl: {
    fontSize: 11,
    color: COLORS.t3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
    marginVertical: 14,
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.sf2,
    borderWidth: 1,
    borderColor: COLORS.bd,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  reasonCardSelected: {
    borderColor: hexToRgba(COLORS.violet, 0.5),
    backgroundColor: hexToRgba(COLORS.violet, 0.08),
  },
  reasonTxt: {
    fontSize: 12.5,
    color: COLORS.t1,
    flex: 1,
  },
  checkboxC: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#253E60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCOn: {
    borderColor: COLORS.violet,
    backgroundColor: COLORS.violet,
  },
  confirmInputWrap: {
    marginTop: 10,
    marginBottom: 16,
  },
  confirmLbl: {
    fontSize: 12,
    color: COLORS.t2,
    marginBottom: 10,
    lineHeight: 18,
    textAlign: 'center',
  },
  confirmInput: {
    width: '100%',
    backgroundColor: COLORS.sf2,
    borderWidth: 1.5,
    borderColor: '#253E60',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: COLORS.t1,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  inputValid: {
    borderColor: hexToRgba(COLORS.mint, 0.6),
  },
  inputInvalid: {
    borderColor: hexToRgba(COLORS.coral, 0.6),
  },
  pinContent: {
    alignItems: 'center',
    marginTop: 12,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 20,
  },
  pinBox: {
    width: 44,
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.sf2,
    borderWidth: 1.5,
    borderColor: '#253E60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDot: {
    fontSize: 22,
    color: COLORS.t1,
    fontWeight: '700',
  },
  numpadMini: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  keyMini: {
    width: '30%',
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.sf2,
    borderWidth: 1,
    borderColor: COLORS.bd,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  keyMiniTxt: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.t1,
  },
  footerBtns: {
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 12,
  },
  btnDanger: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDangerTxt: {
    color: '#2C0808',
    fontSize: 14,
    fontWeight: '600',
  },
  btnDisabled: {
    backgroundColor: hexToRgba(COLORS.coral, 0.15),
  },
  btnDisabledTxt: {
    color: COLORS.t3,
  },
  btnGhost: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#253E60',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnGhostTxt: {
    color: COLORS.t2,
    fontSize: 13.5,
    fontWeight: '500',
  },
  finalScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  finalIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: hexToRgba(COLORS.coral, 0.15),
    borderWidth: 1.5,
    borderColor: hexToRgba(COLORS.coral, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cooldownCard: {
    backgroundColor: COLORS.sf2,
    borderWidth: 1,
    borderColor: COLORS.bd,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: '100%',
  },
  cooldownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cooldownTxt: {
    flex: 1,
    fontSize: 12,
    color: COLORS.t2,
    lineHeight: 18,
  },
});