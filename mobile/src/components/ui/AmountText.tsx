import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../../theme';

interface AmountTextProps extends TextProps {
  amount: number;
  type?: 'income' | 'expense' | 'neutral';
  showSign?: boolean;
}

export const AmountText: React.FC<AmountTextProps> = ({ 
  amount, 
  type = 'neutral', 
  showSign = false,
  style,
  ...props 
}) => {
  const formattedAmount = Math.abs(amount).toLocaleString('id-ID');
  
  const getPrefix = () => {
    if (!showSign) return '';
    return amount > 0 || type === 'income' ? '+Rp ' : '-Rp ';
  };

  const getPrefixWithoutSign = () => {
    return 'Rp ';
  };

  const getColor = () => {
    switch (type) {
      case 'income': return theme.colors.income;
      case 'expense': return theme.colors.expense;
      default: return theme.colors.text;
    }
  };

  return (
    <Text style={[styles.amount, { color: getColor() }, style]} {...props}>
      <Text style={styles.currency}>
        {showSign ? getPrefix() : getPrefixWithoutSign()}
      </Text>
      {formattedAmount}
    </Text>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  currency: {
    fontWeight: '400',
  }
});
