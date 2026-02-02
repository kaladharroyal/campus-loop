// Create Teacher Account Script
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-loop';

// Teacher account details
const TEACHER_EMAIL = 'riyazshaik2113@gmail.com';
const TEACHER_PASSWORD = 'riyazshaik2113@gmail.com'; // You can change this later
const TEACHER_FIRST_NAME = 'Riyaz';
const TEACHER_LAST_NAME = 'Shaik';

console.log('\n🔧 Creating Teacher Account...\n');

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        try {
            const db = mongoose.connection.db;
            const usersCollection = db.collection('users');

            // Check if user already exists
            const existingUser = await usersCollection.findOne({ email: TEACHER_EMAIL });

            if (existingUser) {
                console.log(`⚠️  User already exists: ${TEACHER_EMAIL}`);
                console.log(`   Current role: ${existingUser.role}\n`);

                if (existingUser.role !== 'teacher') {
                    console.log(`🔧 Updating role to "teacher"...\n`);
                    await usersCollection.updateOne(
                        { email: TEACHER_EMAIL },
                        { $set: { role: 'teacher' } }
                    );
                    console.log('✅ Role updated to "teacher"!\n');
                } else {
                    console.log('✅ Role is already "teacher"!\n');
                }
            } else {
                console.log(`📝 Creating new teacher account: ${TEACHER_EMAIL}\n`);

                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(TEACHER_PASSWORD, salt);

                // Create new teacher user
                const newTeacher = {
                    firstName: TEACHER_FIRST_NAME,
                    lastName: TEACHER_LAST_NAME,
                    email: TEACHER_EMAIL,
                    password: hashedPassword,
                    role: 'teacher',
                    branch: '',
                    year: '',
                    phone: '',
                    status: 'active',
                    profilePicture: '',
                    bio: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                await usersCollection.insertOne(newTeacher);

                console.log('✅ TEACHER ACCOUNT CREATED SUCCESSFULLY!\n');
            }

            // Verify the account
            const teacher = await usersCollection.findOne({ email: TEACHER_EMAIL });

            console.log('═'.repeat(70));
            console.log('📋 TEACHER ACCOUNT DETAILS:');
            console.log('═'.repeat(70));
            console.log(`   Email:        ${teacher.email}`);
            console.log(`   Name:         ${teacher.firstName} ${teacher.lastName}`);
            console.log(`   Role:         ${teacher.role} ${teacher.role === 'teacher' ? '✅' : '❌'}`);
            console.log(`   Password:     ${TEACHER_PASSWORD}`);
            console.log(`   Status:       ${teacher.status || 'active'}`);
            console.log('═'.repeat(70));
            console.log();

            console.log('📝 NEXT STEPS TO LOGIN:');
            console.log('─'.repeat(70));
            console.log('   1. Clear browser cache:');
            console.log('      Option A: Visit http://localhost:5173/clear-cache.html');
            console.log('      Option B: Press F12 → Console → Type: localStorage.clear()');
            console.log();
            console.log('   2. Go to: http://localhost:5173/login');
            console.log();
            console.log('   3. Select "Teacher" role (⚠️ VERY IMPORTANT!)');
            console.log();
            console.log(`   4. Enter credentials:`);
            console.log(`      Email:    ${TEACHER_EMAIL}`);
            console.log(`      Password: ${TEACHER_PASSWORD}`);
            console.log();
            console.log('   5. Click "Sign In"');
            console.log();
            console.log('   ✅ You should be redirected to: /teacher/dashboard');
            console.log('─'.repeat(70));
            console.log();

        } catch (error) {
            console.error('\n❌ ERROR:', error.message);
            console.error(error.stack);
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
