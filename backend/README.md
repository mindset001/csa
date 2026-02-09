# Cyber Safety Alliance - Backend API

Backend API server for managing waitlist subscriptions and admin authentication.

## Features

- RESTful API endpoints for waitlist management
- Admin authentication
- JSON file-based database (no external dependencies)
- CORS enabled for frontend integration
- Statistics and analytics

## Installation

```bash
cd backend
npm install
```

## Configuration

The backend uses environment variables defined in `.env`:

```env
PORT=5000
ADMIN_EMAIL=admin@cybersafetyalliance.com
ADMIN_PASSWORD=CyberSafe2024!
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Admin Authentication
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@cybersafetyalliance.com",
  "password": "CyberSafe2024!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "authenticated",
  "email": "admin@cybersafetyalliance.com"
}
```

### Get All Waitlist Entries
```
GET /api/waitlist
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1707491234567,
      "name": "John Doe",
      "email": "john@example.com",
      "timestamp": "2026-02-09T10:00:00.000Z",
      "created_at": "2026-02-09T10:00:00.000Z"
    }
  ]
}
```

### Get Waitlist Statistics
```
GET /api/waitlist/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "thisWeek": 25,
    "today": 5
  }
}
```

### Add Waitlist Entry
```
POST /api/waitlist
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "id": 1707491234568,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "timestamp": "2026-02-09T10:30:00.000Z"
  }
}
```

### Delete Waitlist Entry
```
DELETE /api/waitlist/:email
```

**Response:**
```json
{
  "success": true,
  "message": "Entry deleted successfully"
}
```

## Data Storage

The backend uses a JSON file-based database stored in `backend/data/waitlist.json`. This provides:

- ✅ No external database dependencies
- ✅ Easy to backup and restore
- ✅ Human-readable format
- ✅ Perfect for small to medium datasets

### Data Structure
```json
{
  "waitlist": [
    {
      "id": 1707491234567,
      "name": "John Doe",
      "email": "john@example.com",
      "timestamp": "2026-02-09T10:00:00.000Z",
      "created_at": "2026-02-09T10:00:00.000Z"
    }
  ]
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## Security Considerations

### For Production Deployment:

1. **Environment Variables**
   - Move credentials to secure environment variables
   - Never commit `.env` file to version control

2. **Authentication**
   - Implement JWT tokens instead of simple string
   - Add token expiration
   - Use bcrypt for password hashing

3. **Rate Limiting**
   - Add rate limiting middleware
   - Prevent brute force attacks

4. **HTTPS**
   - Always use HTTPS in production
   - Update CORS settings for specific domains

5. **Database**
   - For larger scale, migrate to PostgreSQL or MongoDB
   - Implement database backups
   - Add indexing for better performance

6. **Validation**
   - Add more robust input validation
   - Sanitize all user inputs
   - Implement request size limits

## Development

### File Structure
```
backend/
├── server.js         # Main Express server
├── database.js       # Database operations
├── package.json      # Dependencies
├── .env             # Environment variables
├── .gitignore       # Git ignore rules
└── data/            # Database files
    └── waitlist.json
```

### Adding New Endpoints

1. Define route in `server.js`
2. Add database operations in `database.js`
3. Test with tools like Postman or cURL
4. Update frontend to use new endpoint

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Issues
Ensure the frontend URL is allowed in CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### Database File Missing
The database file is auto-created on first run. If deleted, it will be recreated automatically.

## Testing

### Using cURL

Test health endpoint:
```bash
curl http://localhost:5000/api/health
```

Test waitlist submission:
```bash
curl -X POST http://localhost:5000/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\"}"
```

Test admin login:
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@cybersafetyalliance.com\",\"password\":\"CyberSafe2024!\"}"
```

## License

ISC
