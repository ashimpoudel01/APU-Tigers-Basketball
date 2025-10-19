/**
 * Force update session for existing logged-in users
 * Run this if admin panel access is denied after promotion
 */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.sqlite');

console.log('\n🔧 Session Repair Tool\n');
console.log('This will show you what the database has vs what you might need.\n');

// Check database
db.get('SELECT id, email, full_name, role, is_admin, email_verified FROM users WHERE role = ? OR is_admin = 1', ['admin'], (err, admin) => {
    if (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
    
    if (!admin) {
        console.log('❌ No admin user found in database!');
        console.log('Run: node make-admin.js your@email.com');
        process.exit(1);
    }
    
    console.log('✅ Admin user in database:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.full_name}`);
    console.log(`   Role: ${admin.role || 'NULL'}`);
    console.log(`   is_admin: ${admin.is_admin}`);
    console.log(`   Verified: ${admin.email_verified ? 'Yes' : 'No'}`);
    
    console.log('\n📋 To fix access denied error, try these solutions:\n');
    
    console.log('SOLUTION 1: Clear Browser and Logout (Recommended)');
    console.log('   1. Press Ctrl+Shift+Delete in browser');
    console.log('   2. Clear cookies and cached data');
    console.log('   3. Go to http://localhost:3000/login.html');
    console.log('   4. Login with: ' + admin.email);
    console.log('   5. Try admin panel again\n');
    
    console.log('SOLUTION 2: Direct Database Update');
    console.log('   Make sure both fields are set:');
    console.log('   role = "admin" ✓');
    console.log('   is_admin = 1 ✓');
    
    // Double-check both fields are set
    if (admin.role !== 'admin' || admin.is_admin !== 1) {
        console.log('\n⚠️  Inconsistent admin flags detected! Fixing...');
        
        db.run('UPDATE users SET role = ?, is_admin = 1, email_verified = 1 WHERE id = ?', 
            ['admin', admin.id], 
            (err) => {
                if (err) {
                    console.error('❌ Update failed:', err);
                } else {
                    console.log('✅ Database updated! Now logout and login again.');
                }
                db.close();
            }
        );
    } else {
        console.log('\n✅ Database is correct. The issue is the SESSION.');
        console.log('   Your browser has an old session without admin role.\n');
        console.log('SOLUTION 3: Force Logout via API');
        console.log('   Run this command:\n');
        console.log('   curl -X POST http://localhost:3000/api/logout\n');
        console.log('   Then login again at: http://localhost:3000/login.html\n');
        
        console.log('SOLUTION 4: Delete Session Store');
        console.log('   If using file sessions, delete session files:');
        console.log('   - Look for "sessions" folder or session files');
        console.log('   - Delete them');
        console.log('   - Restart server\n');
        
        console.log('SOLUTION 5: Open in Incognito/Private Window');
        console.log('   - Open browser in incognito mode');
        console.log('   - Go to http://localhost:3000');
        console.log('   - Login again');
        console.log('   - Try admin panel\n');
        
        db.close();
    }
});
