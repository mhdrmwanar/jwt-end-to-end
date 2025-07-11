# Admin Configuration Guide

## Admin User Created Successfully! 🎉

### Admin Credentials

- **ID**: 2
- **Username**: admin
- **Email**: admin@example.com
- **Password**: admin123

### Access URLs

- **Admin Login**: http://localhost:3000/admin-login.html
- **Admin Panel**: http://localhost:3000/admin.html

### Available Scripts

```bash
# Create new admin user
npm run create-admin

# Show admin information
npm run admin-info

# Start development server
npm run dev

# Setup (create admin + start server)
npm run setup
```

### Security Notes

⚠️ **Important**: Change the default admin password in production!

### Database Information

- **Type**: SQLite
- **Location**: `database.sqlite` (auto-created)
- **Admin ID**: Auto-generated (currently: 2)

### Admin Functions

The admin user can:

- Access admin panel
- Manage users
- View payment transactions
- Monitor system health
- Perform administrative tasks

### Environment Variables

Admin configuration is stored in `.env`:

```
ADMIN_ID=2
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```
