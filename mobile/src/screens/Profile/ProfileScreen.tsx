import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Profil & Pengaturan</Text>
        </View>

        <GlassCard style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>BS</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Budi Santoso</Text>
            <Text style={styles.role}>Kepala Keluarga (Admin)</Text>
            <Text style={styles.email}>budi@keluarga.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        </GlassCard>

        <Text style={styles.sectionTitle}>Keluarga Saya</Text>
        <GlassCard style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: colors.tagGlobal }]}>
              <Ionicons name="people" size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Anggota Keluarga</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: colors.tagIncome }]}>
              <Ionicons name="mail" size={20} color={colors.income} />
            </View>
            <Text style={styles.menuText}>Undang Anggota</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>
        </GlassCard>

        <Text style={styles.sectionTitle}>Pengaturan Aplikasi</Text>
        <GlassCard style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: colors.tagPrivate }]}>
              <Ionicons name="notifications" size={20} color={colors.text} />
            </View>
            <Text style={styles.menuText}>Notifikasi</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: colors.tagPrivate }]}>
              <Ionicons name="lock-closed" size={20} color={colors.text} />
            </View>
            <Text style={styles.menuText}>Keamanan & PIN</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: colors.tagPrivate }]}>
              <Ionicons name="color-palette" size={20} color={colors.text} />
            </View>
            <Text style={styles.menuText}>Tampilan</Text>
            <Text style={styles.menuValue}>Dark Mode</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>
        </GlassCard>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color={colors.expense} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>KasBon v1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 100, // For Tab Bar
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.header2,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.header2,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...typography.header3,
    marginBottom: 2,
  },
  role: {
    ...typography.caption,
    marginBottom: 2,
    fontWeight: '600',
  },
  email: {
    ...typography.body2,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.tagGlobal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.header3,
    marginBottom: spacing.md,
  },
  menuCard: {
    padding: 0,
    marginBottom: spacing.xxl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuText: {
    flex: 1,
    ...typography.body1,
  },
  menuValue: {
    ...typography.body2,
    marginRight: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 60,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.tagExpense,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.expense,
    marginBottom: spacing.xl,
  },
  logoutText: {
    ...typography.button,
    marginLeft: 8,
  },
  versionText: {
    ...typography.caption,
    textAlign: 'center',
  },
});
