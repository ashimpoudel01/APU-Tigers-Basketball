// Quick script to verify email in database
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  
  // First, check current users
  db.all('SELECT id, email, email_verified FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error querying users:', err);
      db.close();
      process.exit(1);
    }
    
    console.log('\n📊 Current Users:');
    rows.forEach(row => {
      console.log(`  ID: ${row.id}, Email: ${row.email}, Verified: ${row.email_verified}`);
    });
    
    // Update all users to verified
    db.run('UPDATE users SET email_verified = 1', [], function(err) {
      if (err) {
        console.error('Error updating users:', err);
      } else {
        console.log(`\n✅ Updated ${this.changes} user(s) - all emails now verified`);
      }
      
      // Show updated users
      db.all('SELECT id, email, email_verified FROM users', [], (err, rows) => {
        if (err) {
          console.error('Error querying users:', err);
        } else {
          console.log('\n📊 Updated Users:');
          rows.forEach(row => {
            console.log(`  ID: ${row.id}, Email: ${row.email}, Verified: ${row.email_verified}`);
          });
        }
        
        db.close();
        console.log('\n✨ Done! You can now login with any account.\n');
      });
    });
  });
});
