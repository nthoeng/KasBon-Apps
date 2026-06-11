import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { AmountText } from '../../components/ui/AmountText';

const ProjectCard = ({ title, target, current, daysLeft }: any) => {
  const progress = current / target;
  
  return (
    <GlassCard style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectIcon}>
          <Ionicons name="flag" size={24} color={colors.project} />
        </View>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{title}</Text>
          <Text style={styles.projectDays}>{daysLeft} Hari Lagi</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(progress * 100, 100)}%` }]} />
      </View>

      <View style={styles.amountRow}>
        <View>
          <Text style={styles.amountLabel}>Terkumpul</Text>
          <AmountText amount={current} type="income" style={styles.amountValue} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.amountLabel}>Target</Text>
          <AmountText amount={target} type="expense" style={styles.amountValue} />
        </View>
      </View>

      <TouchableOpacity style={styles.topupBtn}>
        <Ionicons name="add-circle-outline" size={20} color={colors.background} />
        <Text style={styles.topupText}>Tambah Dana</Text>
      </TouchableOpacity>
    </GlassCard>
  );
};

export const ProjectListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Goals & Tabungan</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        <ProjectCard 
          title="Renovasi Dapur"
          target={25000000}
          current={12500000}
          daysLeft={45}
        />

        <ProjectCard 
          title="Liburan ke Bali"
          target={15000000}
          current={3000000}
          daysLeft={120}
        />

        <ProjectCard 
          title="Dana Darurat"
          target={50000000}
          current={45000000}
          daysLeft={365}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.header2,
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: spacing.lg,
    paddingBottom: 100, // Tab bar margin
  },
  projectCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.tagProject,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    ...typography.header3,
    marginBottom: 2,
  },
  projectDays: {
    ...typography.caption,
    fontWeight: '600',
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.glassDarker,
    borderRadius: 4,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.project,
    borderRadius: 4,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  amountLabel: {
    ...typography.caption,
    marginBottom: 4,
  },
  amountValue: {
    ...typography.body1,
    fontWeight: '700',
  },
  topupBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 12,
  },
  topupText: {
    ...typography.button,
    marginLeft: 8,
  },
});
