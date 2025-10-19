// Fix HTML files - add loader properly
const fs = require('fs');
const path = require('path');

const folder = '.';
const files = fs.readdirSync(folder).filter(f => f.endsWith('.html') && !['nav.html', 'debug-session.html', 'test-login.html'].includes(f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix escaped newlines
  content = content.replace(/`n/g, '\n');
  
  // Add loader.css if not present
  if (!content.includes('loader.css')) {
    content = content.replace(
      /<link rel="stylesheet" href="styles\.css">/,
      '<link rel="stylesheet" href="styles.css">\n    <link rel="stylesheet" href="loader.css">'
    );
  }
  
  // Add loader.js if not present  
  if (!content.includes('loader.js')) {
    content = content.replace(
      /(<\/head>)/,
      '    <script src="loader.js"></script>\n  $1'
    );
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Fixed: ${file}`);
});

console.log(`\n🎉 Updated ${files.length} HTML files!`);
