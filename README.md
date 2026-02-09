# Cyber Safety Alliance - Complete Admin System

A full-stack web application with admin dashboard for managing newsletter waitlist subscriptions.

## 🚀 Quick Start

### Option 1: Use the Startup Script (Windows)
Double-click `start.bat` to launch both frontend and backend servers automatically.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

## 🌐 Access Points

- **Website:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard
- **Backend API:** http://localhost:5000/api/health

### Admin Credentials
- **Email:** admin@cybersafetyalliance.com
- **Password:** CyberSafe2024!

## 📋 Features

### Frontend
- ✅ Modern React + TypeScript with Vite
- ✅ Beautiful UI with Tailwind CSS & Framer Motion
- ✅ Responsive design
- ✅ Newsletter subscription form
- ✅ Admin login & dashboard
- ✅ Protected routes
- ✅ Real-time search & filtering
- ✅ Export to CSV functionality

### Backend
- ✅ Express.js REST API
- ✅ JSON file-based database
- ✅ CORS enabled
- ✅ Input validation
- ✅ Duplicate prevention
- ✅ Statistics & analytics
- ✅ Environment-based configuration

## 📁 Project Structure

```
cyber-safety-alliance/
├── components/           # React components
│   ├── Admin/           # Admin login & dashboard
│   ├── Layout/          # Navbar & footer
│   ├── Pages/           # Page components
│   ├── Sections/        # Homepage sections
│   └── UI/              # Reusable UI components
├── backend/             # Express.js API server
│   ├── server.js       # Main server file
│   ├── database.js     # Database operations
│   ├── data/           # JSON database files
│   └── README.md       # Backend documentation
├── images/             # Image assets
├── App.tsx             # Main app with routing
├── index.tsx           # Entry point
├── start.bat           # Windows startup script
├── ADMIN_GUIDE.md      # Complete admin guide
└── package.json        # Frontend dependencies
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via inline classes)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** JSON file storage
- **Middleware:** CORS, dotenv

## 📚 Documentation

- **Admin Guide:** See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for complete admin system documentation
- **Backend API:** See [backend/README.md](backend/README.md) for API documentation

## 🔐 Security

**Current Implementation (Development):**
- Simple authentication for demo purposes
- LocalStorage for session management
- JSON file database

**For Production:**
- Implement JWT tokens
- Use bcrypt for password hashing
- Migrate to PostgreSQL/MongoDB
- Enable HTTPS
- Add rate limiting
- Implement CSRF protection

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
cd backend
# Follow platform-specific deployment guide
```

### Environment Variables
Update API URLs in production:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-api.com';
```

## 🧪 Testing

### Test Newsletter Subscription
1. Go to homepage
2. Scroll to Newsletter section
3. Enter name and email
4. Submit form
5. Check admin dashboard

### Test Admin Features
1. Login at `/admin/login`
2. View waitlist entries
3. Search and filter
4. Delete entries
5. Export CSV

## 📈 Scalability

- **Current:** JSON database suitable for up to ~10,000 entries
- **Scale Up:** Migrate to PostgreSQL/MongoDB for larger datasets
- **Caching:** Add Redis for frequently accessed data
- **Pagination:** Implement for large datasets

## 🐛 Troubleshooting

### Backend not starting
- Check if port 5000 is available
- Run `netstat -ano | findstr :5000`
- Kill process if needed: `taskkill /PID <PID> /F`

### Frontend not connecting
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URLs are correct

### Login issues
- Verify backend server is running
- Check credentials match `.env` file
- Clear browser cache and cookies

## 📝 License

ISC

## 👥 Contributors

Built for Cyber Safety Alliance

---

**Need Help?** Check [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for detailed instructions.
