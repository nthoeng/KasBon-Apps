import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GlassCard } from './GlassCard';
import { AmountText } from './AmountText';

interface TransactionItemProps {
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  date?: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  category,
  amount,
  type,
  date,
}) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.leftContent}>
        <View style={[styles.iconPlaceholder, type === 'income' ? styles.iconIncome : type === 'expense' ? styles.iconExpense : styles.iconTransfer]} />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        <AmountText amount={amount} type={type === 'transfer' ? 'neutral' : type} style={styles.amount} />
        {date && <Text style={styles.date}>{date}</Text>}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
  },
  iconIncome: {
    backgroundColor: colors.tagIncome,
  },
  iconExpense: {
    backgroundColor: colors.tagExpense,
  },
  iconTransfer: {
    backgroundColor: colors.tagGlobal,
  },
  details: {
    flex: 1,
  },
  title: {
    ...typography.body1,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    ...typography.caption,
  },
  rightContent: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  amount: {
    ...typography.body1,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    ...typography.caption,
  },
});
