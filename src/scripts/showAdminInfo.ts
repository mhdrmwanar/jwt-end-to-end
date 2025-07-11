import 'reflect-metadata';
import { AppDataSource } from '../config/db';
import { User } from '../models/userModel';

const showAdminInfo = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connected successfully\n');

    const userRepository = AppDataSource.getRepository(User);

    // Find admin user
    const adminUser = await userRepository.findOne({
      where: { email: 'admin@example.com' }
    });

    if (!adminUser) {
      console.log('❌ No admin user found!');
      console.log('💡 Run "npm run create-admin" to create an admin user.');
      await AppDataSource.destroy();
      return;
    }

    console.log('🔐 ADMIN USER INFORMATION');
    console.log('========================');
    console.log('🆔 ID:', adminUser.id);
    console.log('👤 Username:', adminUser.username);
    console.log('📧 Email:', adminUser.email);
    console.log('📅 Created:', adminUser.createdAt.toISOString());
    console.log('🔄 Updated:', adminUser.updatedAt.toISOString());
    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\n🌐 ACCESS URLS:');
    console.log('Admin Login: http://localhost:3000/admin-login.html');
    console.log('Admin Panel: http://localhost:3000/admin.html');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error fetching admin info:', error);
    process.exit(1);
  }
};

// Run the script
showAdminInfo();
