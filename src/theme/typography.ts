export const typography = {
  // Font Families
  // Note: We'll use system fonts for now, but these can be updated if custom fonts are loaded
  family: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  
  // Font Sizes
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 26,
    xxxl: 30,
    hero: 36,
  },
  
  // Pre-defined Text Styles
  header1: {
    fontSize: 26,
    fontWeight: '600' as const,
    color: '#F0F4FF',
  },
  header2: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#F0F4FF',
  },
  header3: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#F0F4FF',
  },
  body1: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: '#F0F4FF',
  },
  body2: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: '#8FA8CC', // Muted text
  },
  caption: {
    fontSize: 10,
    fontWeight: '400' as const,
    color: '#3A5070', // Dim text
  },
  button: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: '#0A1628', // Dark background for contrast on gold button
  },
};
