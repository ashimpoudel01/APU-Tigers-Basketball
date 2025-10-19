# APU Tigers Admin Panel 🛡️

Complete admin control panel for managing the APU Tigers Basketball website.

## 🚀 Quick Start

### 1. Setup Database Schema

The admin panel uses a `role` field for user permissions. The database has been configured to support this:

- **SQLite**: `role TEXT DEFAULT 'user'`
- **PostgreSQL**: `role VARCHAR(50) DEFAULT 'user'`

When you restart the server, the schema will be automatically updated.

### 2. Create Your First Admin

After registering a regular account, run:

```bash
node create-admin.js your-email@example.com
```

This will:
- Find your user account
- Prompt for confirmation
- Promote you to admin role
- Automatically verify your email
- Enable admin panel access

### 3. Access Admin Panel

Once promoted, login and navigate to:
```
http://localhost:3000/admin.html
```

Or click **Admin Panel** from your profile dropdown menu (🛡️ icon).

---

## 📋 Features

### 👥 User Management
- **View all users** with sortable table
- **Search** by name or email
- **Edit user details**: Name, email, role
- **Delete users** with confirmation
- **Manual email verification**
- **Role assignment**: user, admin, moderator

### 📊 Analytics Dashboard
- Total registered users
- Verified email count
- Active users today
- New registrations this month

### 📰 Content Management (Coming Soon)
- Photo gallery manager
- News articles
- Event calendar
- Team achievements

### ⚙️ Settings (Coming Soon)
- Site title & description
- Registration settings
- Email notifications
- Maintenance mode

---

## 🔐 Security

### Access Control
- Admin routes protected by `isAdmin()` middleware
- Session-based authentication required
- Role-based permissions (admin, moderator, user)
- Input validation on all forms

### API Endpoints

All admin endpoints require authentication and admin role:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get single user |
| PUT | `/api/admin/users/:id` | Update user details |
| DELETE | `/api/admin/users/:id` | Delete user |
| POST | `/api/admin/users/:id/verify` | Verify email |
| GET | `/api/admin/analytics` | Dashboard stats |

### Error Codes
- `401 Unauthorized`: Not logged in
- `403 Forbidden`: Logged in but not admin
- `404 Not Found`: User doesn't exist
- `500 Server Error`: Database issue

---

## 🎨 User Interface

### Desktop Layout
- **Header**: Admin badge and logout
- **Tabs**: Users, Content, Settings, Analytics
- **Tables**: Sortable columns, search, pagination
- **Modals**: Smooth edit forms with validation

### Mobile Responsive
- Optimized for tablets and phones
- Stacked layouts on small screens
- Touch-friendly buttons
- Responsive tables

### Color Coding
- 🔴 **Red badges**: Admin users
- 🟡 **Yellow badges**: Moderators
- ⚪ **Gray badges**: Regular users
- 🟢 **Green badges**: Verified status
- 🟠 **Orange badges**: Unverified

---

## 🛠️ Troubleshooting

### "Access Denied" Error
**Problem**: Can't access admin panel after login

**Solutions**:
1. Verify you're logged in: Check profile dropdown appears
2. Check your role in database:
   ```bash
   # SQLite
   sqlite3 users.sqlite "SELECT email, role FROM users WHERE email='your@email.com'"
   ```
3. Re-run promotion script:
   ```bash
   node create-admin.js your@email.com
   ```

### Database Schema Issues
**Problem**: Role column doesn't exist

**Solution**: Restart the server to trigger auto-migration:
```bash
# Stop server (Ctrl+C)
node server.js
```

The migration will:
- Add `role` column if missing
- Set role='admin' where is_admin=1
- Keep backward compatibility

### Admin Link Not Showing
**Problem**: No "Admin Panel" in profile dropdown

**Cause**: Your user object doesn't have role='admin'

**Fix**:
1. Check `/api/me` response in browser DevTools
2. Should see: `"role": "admin"` or `"isAdmin": 1`
3. If not, re-promote your account

### Page Won't Load
**Problem**: Admin page blank or 404

**Checklist**:
- [ ] Server is running on port 3000
- [ ] You're logged in (check profile dropdown)
- [ ] URL is exactly `http://localhost:3000/admin.html`
- [ ] Check browser console for JavaScript errors
- [ ] Clear cache and hard refresh (Ctrl+Shift+R)

---

## 📁 File Structure

```
├── admin.html           # Admin panel UI (4 tabs)
├── admin.js             # Frontend logic (470 lines)
├── styles.css           # Admin styling (600+ lines added)
├── create-admin.js      # CLI tool to promote users
├── server.js            # Admin API routes (200+ lines added)
├── db.js                # Database schema with role column
└── nav-auth.js          # Shows admin link for admins
```

---

## 🔮 Future Enhancements

### Short-term
- [ ] Bulk user operations (select multiple)
- [ ] Export users to CSV
- [ ] User activity logs
- [ ] Email notification controls

### Content Management
- [ ] Image upload for gallery
- [ ] WYSIWYG editor for news
- [ ] Event calendar with dates
- [ ] Achievement badges system

### Advanced Features
- [ ] Two-factor authentication
- [ ] Audit logs for admin actions
- [ ] Role permissions customization
- [ ] API rate limiting dashboard
- [ ] Real-time analytics with charts

---

## 🤝 User Roles

### User (Default)
- Can register and login
- Access their dashboard
- View public content
- Edit own profile

### Moderator (Future)
- All user permissions
- Moderate comments
- Approve content submissions
- Basic content management

### Admin (Full Control)
- All moderator permissions
- **User management**: Create, edit, delete users
- **Role assignment**: Promote/demote users
- **System settings**: Site configuration
- **Analytics**: Full dashboard access
- **Content control**: Complete CRUD operations

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Check server logs in terminal
3. Verify database connection
4. Test with a fresh user account
5. Review `AUTHENTICATION_GUIDE.md`

---

## ✅ Quick Reference

```bash
# Start server
node server.js

# Create admin
node create-admin.js your@email.com

# Check database
sqlite3 users.sqlite "SELECT * FROM users"

# View admin routes
grep -A 5 "isAdmin" server.js
```

**Admin URL**: http://localhost:3000/admin.html

**Status Check**: http://localhost:3000/api/admin/analytics

---

Built with ❤️ for APU Tigers Basketball 🏀
