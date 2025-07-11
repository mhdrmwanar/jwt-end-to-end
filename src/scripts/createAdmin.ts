import 'reflect-metadata';
import { AppDataSource } from '../config/db';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';

const createAdmin = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const userRepository = AppDataSource.getRepository(User);

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('❌ Admin already exists with ID:', existingAdmin.id);
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Username:', existingAdmin.username);
      await AppDataSource.destroy();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User();
    adminUser.username = 'admin';
    adminUser.email = 'admin@example.com';
    adminUser.password = hashedPassword;

    const savedAdmin = await userRepository.save(adminUser);

    console.log('✅ Admin user created successfully!');
    console.log('🆔 Admin ID:', savedAdmin.id);
    console.log('📧 Email: admin@example.com');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('🛡️ Role: Admin');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

// Run the script
createAdmin();
