import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  title, 
  loading = false, 
  variant = 'primary',
  style,
  disabled,
  ...props 
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.surface;
      case 'danger': return theme.colors.tagExpense;
      default: return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': return theme.typography.button.color;
      case 'secondary': return theme.colors.text;
      case 'danger': return theme.colors.expense;
      default: return theme.typography.button.color;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor() },
        (disabled || loading) && styles.disabled,
        variant === 'secondary' && styles.secondaryBorder,
        style
      ]} 
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: theme.spacing.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    ...theme.typography.button,
  },
  disabled: {
    opacity: 0.6,
  },
  secondaryBorder: {
    borderWidth: 0.5,
    borderColor: theme.colors.borderLight,
  }
});
