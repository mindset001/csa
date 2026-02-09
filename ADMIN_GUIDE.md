# Admin System Guide

## Overview
Your Cyber Safety Alliance website now includes a complete full-stack admin system with backend API to manage waitlist submissions.

## Architecture

### Frontend (React + TypeScript)
- Admin login page with authentication
- Admin dashboard with full CRUD operations
- Newsletter subscription form
- Protected routes

### Backend (Node.js + Express)
- RESTful API server
- JSON file-based database
- CORS enabled for frontend communication
- Environment-based configuration

## Features

### 1. **Admin Login** (`/admin/login`)
- Secure authentication via backend API
- Beautiful glassmorphic design matching your brand
- Demo credentials included for easy testing

### 2. **Admin Dashboard** (`/admin/dashboard`)
- View all waitlist subscribers from database
- Real-time statistics:
  - Total subscribers
  - New subscribers this week
  - New subscribers today
- Search functionality (by name or email)
- Sort options (newest, oldest, alphabetically)
- Export to CSV for external use
- Delete individual entries (synced with backend)
- Email links for quick contact

### 3. **Backend API**
- `/api/admin/login` - Admin authentication
- `/api/waitlist` - Get all entries
- `/api/waitlist/stats` - Get statistics
- `/api/waitlist` (POST) - Add new entry
- `/api/waitlist/:email` (DELETE) - Delete entry

## Setup Instructions

### 1. Start the Backend Server

```bash
cd backend
npm install
npm start
```

The backend will run on **http://localhost:5000**

### 2. Start the Frontend

```bash
# In the root directory
npm run dev
```

The frontend will run on **http://localhost:3000**

## Access Information

### Demo Credentials
- **Email:** `admin@cybersafetyalliance.com`
- **Password:** `CyberSafe2024!`

### URLs
- **Website:** http://localhost:3000/
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard
- **Backend API:** http://localhost:5000/api/health

## How to Use

### Accessing the Admin Panel
1. Ensure backend server is running on port 5000
2. Ensure frontend is running on port 3000
3. Navigate to http://localhost:3000/admin/login
4. Enter the credentials above
5. Click "Sign In"

### Managing Waitlist
1. View all subscribers in the dashboard table
2. Use the search bar to find specific entries
3. Sort by date or name using the filter dropdown
4. Click the trash icon to delete an entry (deletes from backend)
5. Click "Export CSV" to download all data

### Testing Subscription
1. Go to the homepage
2. Scroll to the Newsletter section
3. Fill in name and email
4. Submit the form
5. Check the admin dashboard to see the new entry

## Data Storage

### Current Implementation (Development)
- **Database:** JSON file (`backend/data/waitlist.json`)
- **Location:** `cyber-safety-alliance/backend/data/`
- **Format:** Human-readable JSON
- **Backup:** Simply copy the `data` folder

### Data Flow
```
User submits form → Frontend → Backend API → JSON Database
Admin views data ← Frontend ← Backend API ← JSON Database
```

## Security Features
- Protected routes (dashboard requires authentication)
- Backend API authentication endpoint
- Auto-redirect to login if not authenticated
- Logout functionality
- Session management via localStorage
- Input validation on both frontend and backend
- Duplicate email prevention

## Project Structure

```
cyber-safety-alliance/
├── components/
│   ├── Admin/
│   │   ├── AdminLogin.tsx         # Login page (API connected)
│   │   ├── AdminDashboard.tsx     # Dashboard (API connected)
│   │   └── ProtectedRoute.tsx     # Route protection
│   ├── Pages/
│   │   └── HomePage.tsx           # Main landing page
│   └── Sections/
│       └── Newsletter.tsx         # Subscription form (API connected)
└── backend/
    ├── server.js                  # Express server
    ├── database.js                # Database operations
    ├── package.json               # Backend dependencies
    ├── .env                       # Environment variables
    └── data/
        └── waitlist.json          # Database file
```

## Next Steps for Production

### 1. Backend Deployment

#### Option A: Deploy to Heroku
```bash
cd backend
heroku create your-app-name
git push heroku main
```

#### Option B: Deploy to Railway/Render
- Connect your GitHub repository
- Set environment variables
- Deploy automatically

### 2. Database Migration
For production scale, consider:
- **PostgreSQL** - Robust relational database
- **MongoDB** - Flexible document database
- **Firebase** - Serverless option with real-time features
- **Supabase** - Open-source Firebase alternative

### 3. Update Frontend API URLs
Replace `http://localhost:5000` with your production API URL:
```typescript
// In Newsletter.tsx, AdminLogin.tsx, AdminDashboard.tsx
const API_URL = process.env.VITE_API_URL || 'https://your-api.com';
```

### 4. Environment Variables
Create `.env.production` in backend:
```env
PORT=5000
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
DATABASE_URL=your-database-url  # If using PostgreSQL/MongoDB
```

### 5. Security Enhancements
- Implement JWT tokens for authentication
- Add bcrypt for password hashing
- Enable HTTPS only
- Add rate limiting
- Implement CSRF protection
- Set up proper CORS for production domain

### 6. Email Integration
Add email capabilities:
```bash
npm install nodemailer
```
- Send confirmation emails to subscribers
- Admin notifications for new signups
- Bulk email functionality

### 7. Analytics
- Track signup conversion rates
- Monitor API performance
- Add logging system
- Set up error monitoring (e.g., Sentry)

## API Documentation

See [backend/README.md](backend/README.md) for complete API documentation.

## Troubleshooting

### Backend Issues

#### Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### Cannot connect to backend
- Check if backend server is running
- Verify port 5000 is not blocked by firewall
- Check console for CORS errors

### Frontend Issues

#### Login not working
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify credentials match .env file

#### No waitlist entries showing
- Check if backend is returning data
- Visit `/api/waitlist` directly in browser
- Check backend console for errors

### Database Issues

#### Data not persisting
- Check `backend/data/waitlist.json` exists
- Verify write permissions on data folder
- Check backend logs for errors

#### Duplicate entries
- Backend prevents duplicate emails automatically
- If issue persists, check database.js logic

## Development Workflow

### Making Changes

1. **Frontend Changes**
   - Edit components in `components/` folder
   - Changes hot-reload automatically
   - Check browser for errors

2. **Backend Changes**
   - Edit files in `backend/` folder
   - Restart server to see changes
   - Or use `npm run dev` for auto-restart

3. **Testing**
   - Test frontend: http://localhost:3000
   - Test API: http://localhost:5000/api/health
   - Check data: `backend/data/waitlist.json`

### Backup Strategy

```bash
# Backup waitlist data
cp backend/data/waitlist.json backend/data/waitlist-backup-$(date +%Y%m%d).json

# Restore from backup
cp backend/data/waitlist-backup-20260209.json backend/data/waitlist.json
```

## Support & Resources

### Documentation
- [Backend API Documentation](backend/README.md)
- [React Router Docs](https://reactrouter.com/)
- [Express.js Guide](https://expressjs.com/)

### Common Tasks

#### Reset Database
```bash
# Stop the server
# Delete backend/data/waitlist.json
# Restart server (file will be recreated)
```

#### Change Admin Credentials
Edit `backend/.env`:
```env
ADMIN_EMAIL=newemail@example.com
ADMIN_PASSWORD=NewSecurePassword123!
```

#### Export All Data
Use the "Export CSV" button in the dashboard, or manually:
```bash
cat backend/data/waitlist.json
```

## Performance Optimization

- JSON database works well for up to ~10,000 entries
- For larger datasets, migrate to PostgreSQL/MongoDB
- Consider adding caching (Redis) for frequent queries
- Implement pagination for large datasets

## License & Credits

Built for Cyber Safety Alliance
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: JSON file storage
- UI: Tailwind CSS + Framer Motion
