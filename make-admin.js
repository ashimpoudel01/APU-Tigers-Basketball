/**
 * Simple script to promote a user to admin
 * Usage: node make-admin.js <email>
 */

const { db, queries } = require('./db');

const email = process.argv[2];

if (!email) {
  console.log('Usage: node make-admin.js <email>');
  console.log('Example: node make-admin.js admin@aputigers.com');
  process.exit(1);
}

console.log(`\n🔍 Looking for user: ${email}\n`);

// Wait for database to initialize
setTimeout(() => {
  db.get(queries.findUserByEmail, [email], (err, user) => {
    if (err) {
      console.error('❌ Database error:', err);
      process.exit(1);
    }

    if (!user) {
      console.log('❌ User not found!');
      console.log('\n💡 Register first at: http://localhost:3000/register.html');
      console.log(`Then run: node make-admin.js ${email}`);
      process.exit(1);
    }

    console.log(`✅ User found: ${user.full_name || 'No name'}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current role: ${user.role || 'user'}`);
    
    if (user.role === 'admin') {
      console.log('\n⚠️  Already an admin!');
      console.log('🚀 Access admin panel at: http://localhost:3000/admin.html');
      process.exit(0);
    }

    // Promote to admin
    const sql = `UPDATE users SET role = ?, is_admin = ?, email_verified = ? WHERE id = ?`;
    db.run(sql, ['admin', 1, 1, user.id], function(err) {
      if (err) {
        console.error('❌ Error promoting user:', err);
        process.exit(1);
      }
      
      console.log('\n✅ SUCCESS! User promoted to admin!');
      console.log(`   ${user.email} is now an administrator`);
      console.log('   Email automatically verified');
      console.log('\n🚀 You can now login and access:');
      console.log('   http://localhost:3000/admin.html\n');
      process.exit(0);
    });
  });
}, 500);
