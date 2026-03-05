# Career API Setup Instructions

This project uses a separate backend API server for the Career page. Follow these steps to run both servers:

## Step 1: Install Dependencies

```bash
npm install
npm install express cors
```

## Step 2: Start the Backend API Server

Open a new terminal and run:

```bash
node server.js
```

You should see:
```
🚀 Career API running on http://localhost:5000
   GET  /api/jobs           — list jobs
   GET  /api/jobs/:id       — single job
   GET  /api/categories     — categories
   POST /api/apply          — submit application
   POST /api/subscribe      — subscribe to alerts
   GET  /api/stats          — dashboard stats
```

## Step 3: Start the Frontend Development Server

Open another terminal and run:

```bash
npm run dev
```

The frontend will start on `http://localhost:8080/` (or the next available port).

## API Endpoints

The backend provides the following REST API endpoints:

### GET `/api/jobs`
Fetch jobs with optional filters (category, search, type, location)

**Query Parameters:**
- `category` - Filter by job category (default: "All")
- `search` - Search by title, company, or location
- `type` - Filter by job type (Full-time, Contract, etc.)
- `location` - Filter by location

**Response:**
```json
{
  "success": true,
  "count": 6,
  "jobs": [...]
}
```

### GET `/api/jobs/:id`
Fetch a single job by ID

### GET `/api/categories`
Fetch all job categories with counts

### POST `/api/apply`
Submit a job application

**Request Body:**
```json
{
  "jobId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "coverLetter": "I'm interested in this role..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "applicationId": "APP-1234567890"
}
```

### POST `/api/subscribe`
Subscribe to job alerts

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### GET `/api/stats`
Get dashboard statistics

### GET `/api/applications`
Get all applications (admin)

### GET `/api/subscribers`
Get all subscribers (admin)

## Environment Variables

The `.env.local` file contains:
```
VITE_API_URL=http://localhost:5000/api
```

Change this if your backend is running on a different port.

## Production Deployment

For production:
1. Build the frontend: `npm run build`
2. Deploy the built files from `dist/` to your hosting
3. Deploy `server.js` to your backend server
4. Update the `VITE_API_URL` environment variable to point to your production API URL
