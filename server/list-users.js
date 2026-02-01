// List all users and find teacher accounts
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-loop';

console.log('\n📋 Listing all users in database...\n');

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        try {
            const db = mongoose.connection.db;
            const usersCollection = db.collection('users');

            const users = await usersCollection.find({}).toArray();

            console.log(`Total users: ${users.length}\n`);
            console.log('═'.repeat(100));
            console.log(' #  | EMAIL'.padEnd(45) + '| ROLE'.padEnd(15) + '| NAME');
            console.log('═'.repeat(100));

            users.forEach((user, index) => {
                const num = ` ${(index + 1).toString().padStart(2)} `;
                const email = (user.email || 'N/A').padEnd(42);
                const role = (user.role || 'N/A').padEnd(12);
                const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A';
                console.log(`${num}| ${email} | ${role} | ${name}`);
            });

            console.log('═'.repeat(100));
            console.log();

            // Look for the specific email with variations
            const targetEmail = 'riyazshaik2113@gmail.com';
            const exactMatch = users.find(u => u.email === targetEmail);
            const caseInsensitiveMatch = users.find(u =>
                u.email && u.email.toLowerCase() === targetEmail.toLowerCase()
            );
            const partialMatch = users.find(u =>
                u.email && u.email.toLowerCase().includes('riyaz')
            );

            if (exactMatch) {
                console.log(`✅ Found exact match: ${exactMatch.email} (Role: ${exactMatch.role})`);
            } else if (caseInsensitiveMatch) {
                console.log(`⚠️  Found case-insensitive match: ${caseInsensitiveMatch.email} (Role: ${caseInsensitiveMatch.role})`);
            } else if (partialMatch) {
                console.log(`⚠️  Found partial match: ${partialMatch.email} (Role: ${partialMatch.role})`);
            } else {
                console.log(`❌ No match found for: ${targetEmail}`);
                console.log('   Please check the email address.\n');
            }

            // Count by role
            const roleCount = {};
            users.forEach(u => {
                const role = u.role || 'undefined';
                roleCount[role] = (roleCount[role] || 0) + 1;
            });

            console.log('\n📊 Role Distribution:');
            Object.keys(roleCount).forEach(role => {
                console.log(`   ${role.padEnd(15)}: ${roleCount[role]}`);
            });
            console.log();

        } catch (error) {
            console.error('\n❌ Error:', error.message);
            console.error(error.stack);
        } finally {
            await mongoose.connection.close();
            console.log('🔌 Database connection closed\n');
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        console.error(err.stack);
        process.exit(1);
    });
