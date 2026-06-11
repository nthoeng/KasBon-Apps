const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function fixFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace typography.h1 -> typography.header1
  content = content.replace(/typography\.h1/g, 'typography.header1');
  content = content.replace(/typography\.h2/g, 'typography.header2');
  content = content.replace(/typography\.h3/g, 'typography.header3');

  // Fix: ...typography.body1, color: colors.text
  // Remove the `color: colors.text` or similar lines if they follow a typography spread
  // We'll just rely on a regex to remove duplicated color props after typography spreads
  // To be safe, let's just do a specific replace for the exact errors found in tsc:
  // e.g.,
  // ...typography.header1,
  // color: colors.text, -> remove this line
  // Let's just remove `color: colors.text` if it's in a style object that also has a typography spread.
  // Actually, the easiest way is to use a regex to delete `\s*color:\s*colors\.text,` or `\s*color:\s*colors\.(background|primary|textMuted|textDim),`
  // WAIT, some typography actually doesn't cover all cases. For example, button might need color override.
  // Let's specifically remove the color overrides that cause errors.
  content = content.replace(/\.\.\.typography\.([^,]+),\s*color:\s*colors\.[a-zA-Z]+,?/g, '...typography.$1,');

  if (filePath.endsWith('TransactionItem.tsx')) {
    content = content.replace(/<AmountText amount=\{amount\} type=\{type\} style=\{styles\.amount\} \/>/, `<AmountText amount={amount} type={type === 'transfer' ? 'neutral' : type} style={styles.amount} />`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

walkDir(path.join(__dirname, 'mobile', 'src'), fixFile);
console.log('Done fixing.');
