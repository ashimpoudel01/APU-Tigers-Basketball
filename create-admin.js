/**
 * Script to create or promote a user to admin
 * Usage: node create-admin.js <email>
 */

const { db, queries } = require('./db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    const email = process.argv[2];
    
    if (!email) {
      console.log('Usage: node create-admin.js <email>');
      console.log('Example: node create-admin.js admin@aputigers.com');
      process.exit(1);
    }

    console.log(`\n🔍 Looking for user: ${email}\n`);

    // Check if user exists
    db.get(queries.findUserByEmail, [email], (err, user) => {
      if (err) {
        console.error('❌ Database error:', err);
        rl.close();
        process.exit(1);
      }

      if (user) {
        // User exists, promote to admin
        console.log(`✅ User found: ${user.full_name || 'No name'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Current role: ${user.role || 'user'}`);
        console.log(`   Email verified: ${user.email_verified ? 'Yes' : 'No'}`);
        
        if (user.role === 'admin') {
          console.log('\n⚠️  This user is already an admin!');
          rl.close();
          process.exit(0);
        }

        question('\n❓ Promote this user to admin? (yes/no): ').then(answer => {
          if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            const sql = `UPDATE users SET role = ?, is_admin = ?, email_verified = ? WHERE id = ?`;
            db.run(sql, ['admin', 1, 1, user.id], function(err) {
              if (err) {
                console.error('❌ Error promoting user:', err);
              } else {
                console.log('\n✅ User promoted to admin successfully!');
                console.log(`   ${user.email} is now an administrator`);
                console.log('\n🚀 You can now login and access the admin panel at:');
                console.log('   http://localhost:3000/admin.html');
              }
              rl.close();
              process.exit(0);
            });
          } else {
            console.log('\n❌ Operation cancelled');
            rl.close();
            process.exit(0);
          }
        });
      } else {
        console.log('❌ User not found!');
        console.log('\n💡 Please register an account first at:');
        console.log('   http://localhost:3000/register.html');
        console.log('\nThen run this script again:');
        console.log(`   node create-admin.js ${email}`);
        rl.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    rl.close();
    process.exit(1);
  }
}

createAdmin();
