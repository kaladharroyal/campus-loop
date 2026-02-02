// Comprehensive Teacher Login Debugger
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-loop';

console.log('\n🔍 TEACHER LOGIN DEBUGGER\n');
console.log('═'.repeat(80));

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        try {
            const db = mongoose.connection.db;
            const usersCollection = db.collection('users');

            // Get all users
            const allUsers = await usersCollection.find({}).toArray();

            console.log(`📊 Total Users in Database: ${allUsers.length}\n`);
            console.log('ALL USERS:');
            console.log('─'.repeat(80));

            allUsers.forEach((user, index) => {
                const num = `${index + 1}`.padStart(3);
                const email = (user.email || 'N/A').padEnd(35);
                const role = (user.role || 'undefined').padEnd(12);
                const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A';

                // Highlight teacher accounts
                if (user.role === 'teacher') {
                    console.log(`${num}. ${email} | ${role} | ${name} ✅ TEACHER`);
                } else if (user.role === 'instructor' || user.role === 'faculty') {
                    console.log(`${num}. ${email} | ${role} | ${name} ⚠️  WRONG ROLE!`);
                } else {
                    console.log(`${num}. ${email} | ${role} | ${name}`);
                }
            });

            console.log('─'.repeat(80));
            console.log();

            // Count by role
            const roleCounts = {};
            allUsers.forEach(u => {
                const role = u.role || 'undefined';
                roleCounts[role] = (roleCounts[role] || 0) + 1;
            });

            console.log('📈 ROLE DISTRIBUTION:');
            console.log('─'.repeat(80));
            Object.keys(roleCounts).forEach(role => {
                const count = roleCounts[role];
                const status = role === 'teacher' ? '✅' : (role === 'instructor' || role === 'faculty' ? '⚠️' : '  ');
                console.log(`   ${status} ${role.padEnd(15)}: ${count}`);
            });
            console.log('─'.repeat(80));
            console.log();

            // Look for email containing 'riyaz'
            const riyazUsers = allUsers.filter(u =>
                u.email && u.email.toLowerCase().includes('riyaz')
            );

            if (riyazUsers.length > 0) {
                console.log('🔍 USERS WITH "RIYAZ" IN EMAIL:');
                console.log('─'.repeat(80));
                riyazUsers.forEach(user => {
                    console.log(`   Email:    ${user.email}`);
                    console.log(`   Name:     ${user.firstName} ${user.lastName}`);
                    console.log(`   Role:     ${user.role} ${user.role === 'teacher' ? '✅' : '⚠️  NEED TO FIX!'}`);
                    console.log(`   Password: ${user.password ? '[HASHED]' : '[NONE]'}`);
                    console.log('   ─'.repeat(38));
                });
                console.log();

                // Auto-fix if needed
                const needsFix = riyazUsers.filter(u => u.role !== 'teacher');
                if (needsFix.length > 0) {
                    console.log('🔧 FIXING INCORRECT ROLES...\n');
                    for (const user of needsFix) {
                        console.log(`   Updating ${user.email}: "${user.role}" → "teacher"`);
                        await usersCollection.updateOne(
                            { _id: user._id },
                            { $set: { role: 'teacher' } }
                        );
                    }
                    console.log(`\n✅ Fixed ${needsFix.length} account(s)!\n`);
                }
            } else {
                console.log('❌ NO USERS FOUND WITH "RIYAZ" IN EMAIL\n');
                console.log('💡 SOLUTION: Create a teacher account');
                console.log('   1. Go to http://localhost:5173/register');
                console.log('   2. Use email: riyazshaik2113@gmail.com');
                console.log('   3. SELECT "TEACHER" ROLE (very important!)');
                console.log('   4. Complete registration\n');
            }

            // Check for problematic roles
            const problematic = allUsers.filter(u =>
                u.role === 'instructor' || u.role === 'faculty'
            );

            if (problematic.length > 0) {
                console.log('⚠️  FOUND USERS WITH INCORRECT TEACHER ROLE:');
                console.log('─'.repeat(80));
                for (const user of problematic) {
                    console.log(`   ${user.email} - Role: "${user.role}"`);
                    console.log(`   🔧 Fixing to "teacher"...`);
                    await usersCollection.updateOne(
                        { _id: user._id },
                        { $set: { role: 'teacher' } }
                    );
                }
                console.log(`✅ Fixed ${problematic.length} account(s)\n`);
            }

            console.log('═'.repeat(80));
            console.log('\n✅ DIAGNOSIS COMPLETE!\n');

            const teacherCount = allUsers.filter(u => u.role === 'teacher').length;
            if (teacherCount > 0) {
                console.log(`👨‍🏫 You have ${teacherCount} teacher account(s) ready to use.`);
                console.log('\n📋 NEXT STEPS:');
                console.log('   1. Clear browser cache:');
                console.log('      - Visit: http://localhost:5173/clear-cache.html');
                console.log('      - Or press F12 → Console → Type: localStorage.clear()');
                console.log('   2. Go to login page');
                console.log('   3. Select "Teacher" role');
                console.log('   4. Enter your email and password');
                console.log('   5. You should be redirected to /teacher/dashboard ✅\n');
            } else {
                console.log('⚠️  NO TEACHER ACCOUNTS FOUND!');
                console.log('   Please create one via registration.\n');
            }

        } catch (error) {
            console.error('\n❌ ERROR:', error.message);
            console.error(error.stack);
        } finally {
            await mongoose.connection.close();
            console.log('🔌 Database connection closed\n');
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
