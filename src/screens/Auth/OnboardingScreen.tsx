import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const slides = [
  {
    title: 'Catat keuangan keluarga',
    description: 'Seluruh anggota keluarga dapat melihat dan mencatat dompet bersama dalam satu aplikasi.',
    icon: 'people-outline',
    color: colors.primary,
  },
  {
    title: 'Kelola project & tabungan',
    description: 'Buat target, laporkan progress, dan tarik laba langsung ke dompet global.',
    icon: 'rocket-outline',
    color: colors.project,
  },
  {
    title: 'Aman & mudah',
    description: 'Atur visibilitas dompet, kategori, dan transaksi untuk akses global atau privat.',
    icon: 'shield-checkmark-outline',
    color: colors.income,
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === slides.length - 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.skipText} onPress={() => navigation.replace('Login')}>
            Lewati
          </Text>
        </View>

        <View style={styles.slideCard}>
          <View style={[styles.iconCircle, { backgroundColor: `${slides[activeIndex].color}20` }]}> 
            <Ionicons name={slides[activeIndex].icon as any} size={36} color={slides[activeIndex].color} />
          </View>
          <Text style={styles.slideTitle}>{slides[activeIndex].title}</Text>
          <Text style={styles.slideDescription}>{slides[activeIndex].description}</Text>
        </View>

        <View style={styles.dotsRow}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, index === activeIndex && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, isLast && styles.nextButtonPrimary]}
          onPress={() => {
            if (isLast) {
              navigation.replace('Login');
            } else {
              setActiveIndex((prev) => prev + 1);
            }
          }}
        >
          <Text style={[styles.nextButtonText, isLast && styles.nextButtonTextPrimary]}>
            {isLast ? 'Mulai Sekarang' : 'Selanjutnya'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    ...typography.body2,
    color: colors.textMuted,
  },
  slideCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  slideTitle: {
    ...typography.header2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  slideDescription: {
    ...typography.body2,
    textAlign: 'center',
    color: colors.textMuted,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  nextButton: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  nextButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  nextButtonText: {
    ...typography.button,
    color: colors.text,
  },
  nextButtonTextPrimary: {
    color: '#0A1628',
  },
});