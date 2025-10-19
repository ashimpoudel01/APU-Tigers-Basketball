// Add touch gestures to all HTML files
const fs = require('fs');
const path = require('path');

const folder = '.';
const files = fs.readdirSync(folder).filter(f => 
  f.endsWith('.html') && 
  !['nav.html', 'debug-session.html', 'test-login.html', 'fix-loader.js'].includes(f)
);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Update viewport meta tag
  if (content.includes('viewport') && !content.includes('maximum-scale')) {
    content = content.replace(
      /<meta name="viewport" content="[^"]*">/,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
    );
    modified = true;
  }
  
  // Add touch-gestures.css after loader.css
  if (!content.includes('touch-gestures.css')) {
    if (content.includes('loader.css')) {
      content = content.replace(
        /<link rel="stylesheet" href="loader\.css">/,
        '<link rel="stylesheet" href="loader.css">\n    <link rel="stylesheet" href="touch-gestures.css">'
      );
    } else if (content.includes('styles.css')) {
      content = content.replace(
        /<link rel="stylesheet" href="styles\.css">/,
        '<link rel="stylesheet" href="styles.css">\n    <link rel="stylesheet" href="touch-gestures.css">'
      );
    }
    modified = true;
  }
  
  // Add touch-gestures.js after loader.js
  if (!content.includes('touch-gestures.js')) {
    if (content.includes('loader.js')) {
      content = content.replace(
        /<script src="loader\.js"><\/script>/,
        '<script src="loader.js"></script>\n    <script src="touch-gestures.js"></script>'
      );
    } else {
      // Add before closing </head>
      content = content.replace(
        /(<\/head>)/,
        '    <script src="touch-gestures.js"></script>\n  $1'
      );
    }
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
  } else {
    console.log(`⏭️  Skipped: ${file} (already has touch gestures)`);
  }
});

console.log(`\n🎉 Processed ${files.length} HTML files!`);
