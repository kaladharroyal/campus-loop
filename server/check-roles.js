// Quick Database Role Checker and Fixer
// This script will show all users and their roles, and fix any 'teacher'/'faculty' roles to 'teacher'

const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-loop';

console.log('\n🔌 Connecting to MongoDB...');
console.log(`📍 URI: ${MONGO_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://***:***@')}\n`);

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        try {
            // Get the User collection directly
            const db = mongoose.connection.db;
            const usersCollection = db.collection('users');

            // Get all users
            const users = await usersCollection.find({}).toArray();

            console.log(`📊 Total users: ${users.length}\n`);
            console.log('═'.repeat(90));
            console.log(' EMAIL'.padEnd(40) + '| ROLE'.padEnd(20) + '| NAME');
            console.log('═'.repeat(90));

            users.forEach(user => {
                const email = (user.email || 'N/A').padEnd(38);
                const role = (user.role || 'N/A').padEnd(18);
                const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A';
                console.log(` ${email} | ${role} | ${name}`);
            });

            console.log('═'.repeat(90));
            console.log();

            // Check for teacher/faculty roles
            const problematicUsers = users.filter(u =>
                u.role === 'teacher' || u.role === 'faculty'
            );

            if (problematicUsers.length > 0) {
                console.log(`\n⚠️  Found ${problematicUsers.length} user(s) role=${problematicUsers[0].role}  with incorrect role!\n`);

                for (const user of problematicUsers) {
                    console.log(`   🔧 Updating: ${user.email} (${user.role} → teacher)`);
                    await usersCollection.updateOne(
                        { _id: user._id },
                        { $set: { role: 'teacher' } }
                    );
                }

                console.log(`\n✅ Successfully updated ${problematicUsers.length} user(s) to role='teacher'\n`);
            } else {
                console.log('✅ All users have correct roles!\n');
            }

            // Show teacher count
            const teacherCount = users.filter(u => u.role === 'teacher').length;
            console.log(`👨‍🏫 Teacher accounts: ${teacherCount}`);

            if (teacherCount === 0) {
                console.log('\n⚠️  WARNING: No teacher accounts found!');
                console.log('   You need to either:');
                console.log('   1. Create a new teacher account via registration');
                console.log('   2. Or update an existing user\'s role to "teacher" in the database\n');
            }

        } catch (error) {
            console.error('\n❌ Error:', error.message);
        } finally {
            await mongoose.connection.close();
            console.log('\n🔌 Database connection closed\n');
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
