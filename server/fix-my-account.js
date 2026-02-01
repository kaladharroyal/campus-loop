// Fix specific teacher account role
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const TEACHER_EMAIL = 'riyazshaik2113@gmail.com';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-loop';

console.log(`\n🔍 Checking account: ${TEACHER_EMAIL}\n`);

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        try {
            const db = mongoose.connection.db;
            const usersCollection = db.collection('users');

            // Find the specific user
            const user = await usersCollection.findOne({ email: TEACHER_EMAIL });

            if (!user) {
                console.log(`❌ User not found: ${TEACHER_EMAIL}`);
                console.log('   Please check if the email is correct.\n');
            } else {
                console.log('📋 Current User Data:');
                console.log('─'.repeat(60));
                console.log(`   Email:      ${user.email}`);
                console.log(`   Name:       ${user.firstName} ${user.lastName}`);
                console.log(`   Role:       ${user.role} ${user.role !== 'teacher' ? '⚠️  WRONG!' : '✅'}`);
                console.log(`   Created:    ${user.createdAt || 'N/A'}`);
                console.log('─'.repeat(60));
                console.log();

                if (user.role !== 'teacher') {
                    console.log(`🔧 FIXING: Updating role from "${user.role}" to "teacher"...\n`);

                    const result = await usersCollection.updateOne(
                        { email: TEACHER_EMAIL },
                        { $set: { role: 'teacher' } }
                    );

                    if (result.modifiedCount > 0) {
                        console.log('✅ SUCCESS! Role updated to "teacher"\n');
                        console.log('📝 Next steps:');
                        console.log('   1. Clear browser cache (localStorage)');
                        console.log('   2. Login again with:');
                        console.log(`      Email: ${TEACHER_EMAIL}`);
                        console.log('   3. You should be redirected to /teacher/dashboard\n');
                    } else {
                        console.log('⚠️  Update command executed but no changes made.\n');
                    }
                } else {
                    console.log('✅ Role is already correct ("teacher")!\n');
                    console.log('🤔 If you\'re still having redirect issues:');
                    console.log('   1. Clear browser localStorage:');
                    console.log('      - Press F12 → Console tab');
                    console.log('      - Type: localStorage.clear()');
                    console.log('      - Or visit: http://localhost:5173/clear-cache.html');
                    console.log('   2. Logout and login again');
                    console.log('   3. Make sure you\'re selecting "Teacher" role on login page\n');
                }
            }

        } catch (error) {
            console.error('\n❌ Error:', error.message);
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
