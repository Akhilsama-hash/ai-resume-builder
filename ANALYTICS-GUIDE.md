# 📊 User Analytics & Tracking Guide

## 🎯 How to See Who's Using Your Website

Your backend now tracks all users and API usage automatically!

---

## 🚀 Quick Access:

### View Analytics Dashboard:
Open in browser: **http://localhost:5000/dashboard**

This shows:
- 📈 Total requests (all time)
- 👥 Unique visitors (24h and 7 days)
- 🎯 Endpoint usage statistics
- 🕐 Recent visitors with IP addresses
- ⚡ Real-time activity log

### Get Raw JSON Data:
Open in browser: **http://localhost:5000/analytics**

Returns JSON with all analytics data for custom processing.

---

## 📊 What Gets Tracked:

### 1. API Usage Tracking
Every API request logs:
- ✅ Timestamp
- ✅ HTTP Method (GET, POST, etc.)
- ✅ Endpoint called
- ✅ User's IP address
- ✅ User Agent (browser/device info)
- ✅ Response time (duration)
- ✅ HTTP status code

### 2. Visitor Tracking
Every unique visitor logs:
- ✅ IP address
- ✅ First visit timestamp
- ✅ User Agent (browser/device)
- ✅ Referrer (where they came from)
- ✅ Pages visited

---

## 📁 Where Data is Stored:

All tracking data is saved in:
- **Location**: `backend/logs/`
- **Usage Log**: `backend/logs/usage.json` (last 1000 requests)
- **Visitors Log**: `backend/logs/visitors.json` (last 500 visitors)

These files are automatically created when backend starts.

---

## 🎨 Dashboard Features:

### Statistics Cards:
- **Total Requests**: All API calls ever made
- **Requests (24h)**: API calls in last 24 hours
- **Unique Visitors (24h)**: Different IPs in last 24 hours
- **Visitors (7d)**: Different IPs in last 7 days

### Endpoint Usage Table:
Shows which AI features are most popular:
- `/api/calculate-ats-score` - ATS scoring usage
- `/api/story-to-resume` - Story converter usage
- `/api/generate-summary` - AI summary generation
- `/api/job-match` - Job match feature usage
- `/api/enhance-content` - Content enhancement
- `/api/improve-bullet` - Bullet point improvement

### Recent Visitors:
Last 10 visitors with:
- IP address
- Path they visited
- Exact timestamp
- Browser/device info

### Recent Activity:
Last 20 API requests with:
- Time of request
- HTTP method
- Endpoint called
- User's IP
- Response time
- Status code

---

## 🔄 How to Use:

### Step 1: Restart Backend
Run: `RESTART-NOW.bat`

This loads the new analytics tracking code.

### Step 2: Open Dashboard
Go to: **http://localhost:5000/dashboard**

### Step 3: Use Your App
Go to: **http://localhost:5173**
- Fill in resume data
- Use AI features
- Generate summaries
- Convert stories

### Step 4: Refresh Dashboard
Click "🔄 Refresh Data" button or reload page

You'll see all the activity!

---

## 📈 Analytics Metrics:

### Unique Visitor Detection:
- Tracks by IP address
- Considers same IP within 30 minutes as one visitor
- After 30 minutes, counts as new visit

### Data Retention:
- **Usage logs**: Last 1000 requests
- **Visitor logs**: Last 500 visitors
- Older data automatically removed

---

## 💡 Use Cases:

### 1. Monitor Usage
See how many people are using your app in real-time.

### 2. Popular Features
Identify which AI features are most used.

### 3. Peak Times
See when users are most active.

### 4. User Demographics
View IP addresses and locations (approximate).

### 5. Performance Monitoring
Check response times for each endpoint.

### 6. Debugging
See recent errors and failed requests.

---

## 🎯 Example Dashboard View:

```
📊 AI Resume Builder Analytics

┌─────────────────────┐  ┌─────────────────────┐
│ Total Requests      │  │ Requests (24h)      │
│      156            │  │       42            │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│ Unique Visitors(24h)│  │ Visitors (7d)       │
│       15            │  │       28            │
└─────────────────────┘  └─────────────────────┘

🎯 Endpoint Usage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/api/calculate-ats-score    45 requests
/api/story-to-resume        23 requests
/api/generate-summary       18 requests
/api/job-match             12 requests

👥 Recent Visitors
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IP: 192.168.1.100
Path: /api/story-to-resume
Time: 2:45 PM
Browser: Chrome 120.0
```

---

## 🔒 Privacy Notes:

- Only IP addresses are tracked (no personal data)
- No passwords or sensitive data logged
- User agents show browser/device type only
- Data stored locally on your server
- Not shared with any third parties

---

## 🚀 Next Steps:

1. **Restart backend**: Run `RESTART-NOW.bat`
2. **Open dashboard**: http://localhost:5000/dashboard
3. **Test your app**: Use features at http://localhost:5173
4. **Watch analytics**: Refresh dashboard to see live data

---

## 📱 Access URLs:

- **Main App**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Analytics Dashboard**: http://localhost:5000/dashboard
- **Raw Analytics JSON**: http://localhost:5000/analytics

---

**Your analytics tracking is ready!** 🎉

Just restart the backend and open the dashboard to see who's using your website!
