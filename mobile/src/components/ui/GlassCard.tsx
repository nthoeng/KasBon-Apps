import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'light' | 'dark';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  variant = 'light',
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        variant === 'dark' ? styles.darkVariant : styles.lightVariant,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.spacing.radius.lg,
    padding: theme.spacing.cardPadding,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  lightVariant: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderLight,
  },
  darkVariant: {
    backgroundColor: theme.colors.glassDarker,
    borderColor: theme.colors.border,
  }
});
