import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export const CreateProjectScreen = () => {
  const navigation = useNavigation<any>();

  const PROJECT_TYPES = [
    { id: 'freelance', name: 'Freelance', desc: 'Jasa / project sekali', icon: 'code-slash', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.12)' },
    { id: 'business', name: 'Usaha/bisnis', desc: 'Berjalan terus', icon: 'storefront', color: UI_COLORS.gold, bg: 'rgba(245,200,66,0.12)' },
    { id: 'investment', name: 'Investasi', desc: 'Modal & return', icon: 'trending-up', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.12)' }
  ];

  const ICONS = ['code-slash', 'color-palette', 'storefront', 'camera', 'car', 'hammer', 'leaf', 'restaurant', 'musical-notes', 'star'];
  const COLORS = ['#2DD4A4', '#F5C842', '#7C6FF7', '#FF6B6B', '#60A5FA', '#F59E0B', '#F472B6', '#A78BFA', '#34D399', '#8FA8CC'];

  // States
  const [projectName, setProjectName] = useState('Website toko online');
  const [projectDesc, setProjectDesc] = useState('Buat website toko online untuk Bu Sari — jualan batik. Include halaman produk, keranjang, & WhatsApp order.');
  const [projectType, setProjectType] = useState('freelance');
  const [selIcon, setSelIcon] = useState('code-slash');
  const [selColor, setSelColor] = useState('#2DD4A4');
  const [budget, setBudget] = useState('5.000.000');
  
  // Toggle States
  const [separateWallet, setSeparateWallet] = useState(true);
  const [visibleToAll, setVisibleToAll] = useState(true);
  const [notifyDeadline, setNotifyDeadline] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Buat project baru</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* HERO PREVIEW */}
        <View style={styles.previewHero}>
          <View style={[
            styles.prevIcon, 
            { 
                backgroundColor: hexToRgba(selColor, 0.12), 
                borderColor: hexToRgba(selColor, 0.25) 
            }
          ]}>
            <Ionicons name={selIcon as any} size={30} color={selColor} />
          </View>
          <Text style={styles.prevName}>{projectName || 'Nama Project'}</Text>
          <Text style={styles.prevSub}>Preview project · akan tampil seperti ini di list</Text>
          <View style={styles.prevBadges}>
            <View style={[styles.pbadge, { backgroundColor: hexToRgba(PROJECT_TYPES.find(t => t.id === projectType)?.color || UI_COLORS.mint, 0.12) }]}>
              <Text style={{ color: PROJECT_TYPES.find(t => t.id === projectType)?.color, fontSize: 10, fontWeight: '500' }}>
                {PROJECT_TYPES.find(t => t.id === projectType)?.name}
              </Text>
            </View>
            <View style={[styles.pbadge, { backgroundColor: 'rgba(245,200,66,0.1)' }]}>
              <Text style={{ color: '#F5C842', fontSize: 10, fontWeight: '500' }}>Aktif</Text>
            </View>
          </View>
        </View>

        {/* FIELD: NAMA PROJECT */}
        <Text style={styles.secLbl}>Nama project</Text>
        <View style={[styles.fieldWrap, styles.fieldFocused]}>
          <Ionicons name="pencil" size={16} color={UI_COLORS.t3} style={styles.fwIcon} />
          <TextInput 
            style={styles.fwInput}
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Ketik nama project..."
            placeholderTextColor={UI_COLORS.t3}
          />
          {projectName.length > 0 && (
            <TouchableOpacity onPress={() => setProjectName('')}>
              <Ionicons name="close" size={16} color={UI_COLORS.t3} />
            </TouchableOpacity>
          )}
        </View>

        {/* FIELD: DESKRIPSI */}
        <Text style={styles.secLbl}>Deskripsi singkat (opsional)</Text>
        <View style={styles.textareaWrap}>
          <Ionicons name="document-text" size={16} color={UI_COLORS.t3} style={{ marginTop: 2 }} />
          <TextInput 
            style={styles.taInput}
            value={projectDesc}
            onChangeText={setProjectDesc}
            placeholder="Tulis rincian atau tujuan project..."
            placeholderTextColor={UI_COLORS.t3}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* FIELD: TIPE PROJECT */}
        <Text style={styles.secLbl}>Tipe project</Text>
        <View style={styles.typeGrid}>
          {PROJECT_TYPES.map(type => (
            <TouchableOpacity 
              key={type.id} 
              style={[styles.typeCard, projectType === type.id && styles.typeCardSel]}
              onPress={() => setProjectType(type.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.tcIcon, { backgroundColor: type.bg }]}>
                <Ionicons name={type.icon as any} size={18} color={type.color} />
              </View>
              <Text style={[styles.tcName, { color: projectType === type.id ? type.color : UI_COLORS.text }]}>{type.name}</Text>
              <Text style={styles.tcDesc}>{type.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FIELD: IKON */}
        <Text style={styles.secLbl}>Ikon project</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iconScroll}>
          {ICONS.map(ic => {
            const isSelected = selIcon === ic;
            return (
              <TouchableOpacity 
                key={ic}
                onPress={() => setSelIcon(ic)}
                style={[
                  styles.icBox,
                  isSelected && { 
                      backgroundColor: hexToRgba(selColor, 0.12), 
                      borderColor: hexToRgba(selColor, 0.25) 
                  }
                ]}
              >
                <Ionicons 
                  name={ic as any} 
                  size={20} 
                  color={isSelected ? selColor : UI_COLORS.t2} 
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* FIELD: WARNA */}
        <Text style={styles.secLbl}>Pilih Warna</Text>
        <View style={styles.colorRow}>
          {COLORS.map(col => (
              <TouchableOpacity 
                key={col} 
                onPress={() => setSelColor(col)}
                style={[
                    styles.cd, 
                    { backgroundColor: col }, 
                    selColor === col && styles.cdSel
                ]}
              />
          ))}
        </View>

        {/* FIELD: BUDGET */}
        <Text style={styles.secLbl}>Budget / nilai project</Text>
        <View style={styles.budgetCard}>
          <Text style={styles.bcLbl}>Nilai kontrak atau budget awal project ini</Text>
          <View style={styles.bcInputRow}>
            <Text style={styles.bcPrefix}>Rp</Text>
            <TextInput 
              style={styles.bcInput}
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.bcSub}>Bisa diubah kapan saja jika ada revisi kontrak</Text>
        </View>

        {/* FIELD: DEADLINE */}
        <Text style={styles.secLbl}>Deadline & timeline</Text>
        <View style={styles.deadlineRow}>
          <TouchableOpacity style={styles.dlCard}>
            <Text style={styles.dlLbl}>Tanggal mulai</Text>
            <View style={styles.dlValRow}>
              <Ionicons name="calendar" size={14} color={UI_COLORS.violet} />
              <Text style={styles.dlVal}>11 Jun 2026</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dlCard}>
            <Text style={styles.dlLbl}>Deadline</Text>
            <View style={styles.dlValRow}>
              <Ionicons name="calendar-outline" size={14} color={UI_COLORS.violet} />
              <Text style={styles.dlVal}>30 Jul 2026</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* PENGATURAN TAMBAHAN */}
        <Text style={[styles.secLbl, { paddingTop: 2 }]}>Pengaturan tambahan</Text>
        <View style={styles.optCard}>
          <View style={styles.optRow}>
            <View style={[styles.orIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="wallet" size={16} color={UI_COLORS.gold} /></View>
            <View style={styles.orInfo}>
              <Text style={styles.orLbl}>Dompet project terpisah</Text>
              <Text style={styles.orSub}>Uang project masuk ke dompet khusus</Text>
            </View>
            <TouchableOpacity style={[styles.toggle, separateWallet ? styles.togOn : styles.togOff]} onPress={() => setSeparateWallet(!separateWallet)}>
              <View style={[styles.togThumb, separateWallet ? styles.thumbOn : styles.thumbOff]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.optRow}>
            <View style={[styles.orIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="people" size={16} color={UI_COLORS.mint} /></View>
            <View style={styles.orInfo}>
              <Text style={styles.orLbl}>Tampilkan ke semua anggota</Text>
              <Text style={styles.orSub}>Anggota keluarga bisa melihat project ini</Text>
            </View>
            <TouchableOpacity style={[styles.toggle, visibleToAll ? styles.togOn : styles.togOff]} onPress={() => setVisibleToAll(!visibleToAll)}>
              <View style={[styles.togThumb, visibleToAll ? styles.thumbOn : styles.thumbOff]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.optRow}>
            <View style={[styles.orIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="notifications" size={16} color={UI_COLORS.violet} /></View>
            <View style={styles.orInfo}>
              <Text style={styles.orLbl}>Notif pengingat deadline</Text>
              <Text style={styles.orSub}>Ingatkan H-7 dan H-1 sebelum deadline</Text>
            </View>
            <TouchableOpacity style={[styles.toggle, notifyDeadline ? styles.togOn : styles.togOff]} onPress={() => setNotifyDeadline(!notifyDeadline)}>
              <View style={[styles.togThumb, notifyDeadline ? styles.thumbOn : styles.thumbOff]} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={[styles.optRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.orIcon, { backgroundColor: 'rgba(255,255,255,0.06)' }]}><Ionicons name="document-text" size={16} color={UI_COLORS.t2} /></View>
            <View style={styles.orInfo}>
              <Text style={styles.orLbl}>Tambah info client</Text>
              <Text style={styles.orSub}>Nama, kontak, dan catatan client</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={UI_COLORS.t3} />
          </TouchableOpacity>
        </View>

        {/* INFO BANNER */}
        <View style={styles.infoBanner}>
          <Ionicons name="bulb" size={16} color={UI_COLORS.mint} style={{ marginTop: 2 }} />
          <Text style={styles.infoBannerTxt}>Setelah project dibuat, kamu bisa tambah sumber pemasukan, milestone, dan catatan operasional dari halaman detail project.</Text>
        </View>

        {/* ACTION BUTTONS */}
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('ProjectDetail')}>
          <Ionicons name="briefcase" size={18} color="#0A1628" />
          <Text style={styles.btnPrimaryTxt}>Buat project</Text>
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
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },

  // PREVIEW HERO
  previewHero: { alignItems: 'center', paddingVertical: 14, paddingHorizontal: 18 },
  prevIcon: { width: 64, height: 64, borderRadius: 20, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  prevName: { fontSize: 17, fontWeight: '500', color: UI_COLORS.text, marginBottom: 3 },
  prevSub: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8 },
  prevBadges: { flexDirection: 'row', gap: 6 },
  pbadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },

  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },
  
  // TEXT FIELDS
  fieldWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, paddingHorizontal: 13, height: 46, marginHorizontal: 16, marginBottom: 10 },
  fieldFocused: { borderColor: UI_COLORS.gold },
  fwIcon: { flexShrink: 0 },
  fwInput: { flex: 1, fontSize: 14, color: UI_COLORS.text },
  
  textareaWrap: { flexDirection: 'row', gap: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, padding: 12, marginHorizontal: 16, marginBottom: 10, minHeight: 72 },
  taInput: { flex: 1, fontSize: 13, color: UI_COLORS.text, textAlignVertical: 'top', padding: 0 },

  // TYPE GRID
  typeGrid: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  typeCard: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, paddingVertical: 11, paddingHorizontal: 8, alignItems: 'center' },
  typeCardSel: { borderColor: 'rgba(45,212,164,0.5)', backgroundColor: 'rgba(45,212,164,0.07)' },
  tcIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  tcName: { fontSize: 11, fontWeight: '500', marginBottom: 2 },
  tcDesc: { fontSize: 10, color: UI_COLORS.t3, textAlign: 'center' },

  // ICON & COLOR SCROLL
  iconScroll: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  icBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, alignItems: 'center', justifyContent: 'center' },
  
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 18, paddingBottom: 10 },
  cd: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'transparent' },
  cdSel: { borderColor: UI_COLORS.text, transform: [{ scale: 1.1 }] },

  // BUDGET CARD
  budgetCard: { marginHorizontal: 16, marginBottom: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 13 },
  bcLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8 },
  bcInputRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 8 },
  bcPrefix: { fontSize: 16, color: UI_COLORS.t2 },
  bcInput: { fontSize: 26, fontWeight: '600', color: UI_COLORS.text, padding: 0, margin: 0 },
  bcSub: { fontSize: 11, color: UI_COLORS.t3 },

  // DEADLINE
  deadlineRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  dlCard: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12 },
  dlLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 4 },
  dlValRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dlVal: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },

  // OPTIONS
  optCard: { marginHorizontal: 16, marginBottom: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, overflow: 'hidden' },
  optRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 13, paddingVertical: 11, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  orIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  orInfo: { flex: 1 },
  orLbl: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, marginBottom: 1 },
  orSub: { fontSize: 11, color: UI_COLORS.t3 },
  
  toggle: { width: 36, height: 20, borderRadius: 10, justifyContent: 'center', paddingHorizontal: 3 },
  togOn: { backgroundColor: UI_COLORS.mint },
  togOff: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  togThumb: { width: 14, height: 14, borderRadius: 7 },
  thumbOn: { backgroundColor: UI_COLORS.bg, alignSelf: 'flex-end' },
  thumbOff: { backgroundColor: UI_COLORS.t3, alignSelf: 'flex-start' },

  // INFO BANNER
  infoBanner: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(45,212,164,0.06)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.18)', borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  infoBannerTxt: { flex: 1, fontSize: 11, color: 'rgba(45,212,164,0.8)', lineHeight: 16 },

  // BUTTONS
  btnPrimary: { marginHorizontal: 16, marginBottom: 8, height: 50, borderRadius: 15, backgroundColor: UI_COLORS.mint, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnPrimaryTxt: { fontSize: 15, fontWeight: '600', color: '#0A1628' },
  btnGhost: { marginHorizontal: 16, marginBottom: 18, height: 40, borderRadius: 12, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  btnGhostTxt: { fontSize: 13, color: UI_COLORS.t2 }
});