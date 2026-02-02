const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// User model (simplified)
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: String
}, { strict: false });

const User = mongoose.model('User', userSchema);

async function checkAndFixTeacherRoles() {
    try {
        console.log('\n🔍 Checking for users with incorrect teacher role...\n');

        // Find all users
        const allUsers = await User.find({});
        console.log(`📊 Total users in database: ${allUsers.length}\n`);

        // Display all users with their roles
        console.log('Current users:');
        console.log('─'.repeat(80));
        allUsers.forEach(user => {
            console.log(`${user.email.padEnd(35)} | Role: ${user.role}`);
        });
        console.log('─'.repeat(80));
        console.log();

        // Find users with 'teacher' or 'faculty' role
        const teacherUsers = await User.find({
            role: { $in: ['teacher', 'faculty'] }
        });

        if (teacherUsers.length > 0) {
            console.log(`\n⚠️  Found ${teacherUsers.length} user(s) with 'teacher' or 'faculty' role:`);
            teacherUsers.forEach(user => {
                console.log(`   - ${user.email} (${user.firstName} ${user.lastName}) - Role: ${user.role}`);
            });

            console.log('\n🔧 Updating to "teacher" role...');

            const result = await User.updateMany(
                { role: { $in: ['teacher', 'faculty'] } },
                { $set: { role: 'teacher' } }
            );

            console.log(`✅ Updated ${result.modifiedCount} user(s)`);
        } else {
            console.log('✅ No users found with "teacher" or "faculty" role');
        }

        // Check for valid teacher users
        const teacherUsers = await User.find({ role: 'teacher' });
        if (teacherUsers.length > 0) {
            console.log(`\n👨‍🏫 Current teacher accounts (${teacherUsers.length}):`);
            teacherUsers.forEach(user => {
                console.log(`   - ${user.email} (${user.firstName} ${user.lastName})`);
            });
        } else {
            console.log('\n⚠️  No teacher accounts found in database!');
            console.log('   You may need to create a teacher account or update an existing user\'s role.');
        }

        console.log('\n✅ Database check complete!\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}

checkAndFixTeacherRoles();
