/**
 * Quick test to verify database schema has role column
 */

const { db } = require('./db');

console.log('\n🔍 Testing Database Schema...\n');

// Wait for database to initialize
setTimeout(() => {
  // Test 1: Check if role column exists
  db.query('SELECT id, email, full_name, role, is_admin, email_verified FROM users', [], (err, allUsers) => {
    if (err) {
      console.error('❌ Error querying users:', err.message);
      console.log('\n💡 The role column might not exist yet.');
      console.log('   Solution: Restart the server to trigger migration.');
      process.exit(1);
    }
    
    console.log('✅ Database schema test passed!');
    console.log('   Role column exists and is queryable.\n');
    
    if (allUsers && allUsers.length > 0) {
      console.log(`📋 Found ${allUsers.length} user(s):\n`);
      allUsers.forEach(user => {
        const role = user.role || 'user';
        const isAdmin = user.is_admin || (user.role === 'admin');
        const verified = user.email_verified ? '✓' : '✗';
        const adminBadge = isAdmin ? '🛡️' : '👤';
        
        console.log(`   ${adminBadge} ${user.email}`);
        console.log(`      Name: ${user.full_name || 'Not set'}`);
        console.log(`      Role: ${role} ${isAdmin ? '(ADMIN)' : ''}`);
        console.log(`      Verified: ${verified}\n`);
      });
      
      const adminCount = allUsers.filter(u => u.role === 'admin' || u.is_admin).length;
      
      if (adminCount === 0) {
        console.log('⚠️  No admin users found!');
        console.log('\n📝 To create an admin, run:');
        console.log(`   node create-admin.js ${allUsers[0].email}\n`);
      } else {
        console.log(`✅ ${adminCount} admin user(s) ready!\n`);
        console.log('🚀 Admin panel available at:');
        console.log('   http://localhost:3000/admin.html\n');
      }
    } else {
      console.log('ℹ️  No users registered yet.\n');
      console.log('📝 Register first at:');
      console.log('   http://localhost:3000/register.html');
      console.log('\nThen run:');
      console.log('   node create-admin.js your@email.com\n');
    }
    
    process.exit(0);
  });
}, 500); // Give database time to initialize
