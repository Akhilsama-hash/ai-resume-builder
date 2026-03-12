import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import { trackUsage, trackVisitor, getAnalytics } from './middleware/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(trackUsage);
app.use(trackVisitor);

// Routes
app.use('/api', aiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Resume Builder API - Hackathon Edition',
    status: 'running',
    endpoints: {
      enhanceContent: 'POST /api/enhance-content',
      atsScore: 'POST /api/calculate-ats-score',
      jobMatch: 'POST /api/job-match',
      generateSummary: 'POST /api/generate-summary',
      improveBullet: 'POST /api/improve-bullet',
      storyToResume: 'POST /api/story-to-resume'
    }
  });
});

// Analytics dashboard
app.get('/analytics', (req, res) => {
  const analytics = getAnalytics();
  res.json(analytics);
});

// Analytics dashboard HTML
app.get('/dashboard', (req, res) => {
  const analytics = getAnalytics();
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Resume Builder - Analytics Dashboard</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: white; text-align: center; margin-bottom: 30px; font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .stat-card h3 { color: #667eea; font-size: 0.9em; text-transform: uppercase; margin-bottom: 10px; }
        .stat-card .number { font-size: 2.5em; font-weight: bold; color: #333; }
        .stat-card .label { color: #666; font-size: 0.9em; margin-top: 5px; }
        .section { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); margin-bottom: 20px; }
        .section h2 { color: #667eea; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f8f9fa; color: #667eea; font-weight: 600; }
        tr:hover { background: #f8f9fa; }
        .endpoint { font-family: monospace; background: #f0f0f0; padding: 4px 8px; border-radius: 4px; }
        .refresh-btn { background: #667eea; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-size: 1em; margin: 20px auto; display: block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); }
        .refresh-btn:hover { background: #5568d3; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6); }
        .visitor-item { padding: 10px; border-left: 3px solid #667eea; margin-bottom: 10px; background: #f8f9fa; border-radius: 4px; }
        .timestamp { color: #666; font-size: 0.85em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📊 AI Resume Builder Analytics</h1>
        
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Requests</h3>
            <div class="number">${analytics.totalRequests}</div>
            <div class="label">All time</div>
          </div>
          <div class="stat-card">
            <h3>Requests (24h)</h3>
            <div class="number">${analytics.last24Hours.requests}</div>
            <div class="label">Last 24 hours</div>
          </div>
          <div class="stat-card">
            <h3>Unique Visitors (24h)</h3>
            <div class="number">${analytics.last24Hours.uniqueVisitors}</div>
            <div class="label">Last 24 hours</div>
          </div>
          <div class="stat-card">
            <h3>Visitors (7d)</h3>
            <div class="number">${analytics.last7Days.uniqueVisitors}</div>
            <div class="label">Last 7 days</div>
          </div>
        </div>

        <div class="section">
          <h2>🎯 Endpoint Usage</h2>
          <table>
            <thead>
              <tr>
                <th>Endpoint</th>
                <th>Total Requests</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(analytics.endpointStats).map(([endpoint, count]) => `
                <tr>
                  <td><span class="endpoint">${endpoint}</span></td>
                  <td>${count}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>👥 Recent Visitors (Last 24h)</h2>
          ${analytics.last24Hours.visitors.slice(-10).reverse().map(v => `
            <div class="visitor-item">
              <strong>IP:</strong> ${v.ip}<br>
              <strong>Path:</strong> ${v.path}<br>
              <strong>Time:</strong> <span class="timestamp">${new Date(v.timestamp).toLocaleString()}</span><br>
              <strong>User Agent:</strong> ${v.userAgent}
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2>⚡ Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Method</th>
                <th>Endpoint</th>
                <th>IP</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${analytics.recentActivity.map(activity => `
                <tr>
                  <td class="timestamp">${new Date(activity.timestamp).toLocaleTimeString()}</td>
                  <td>${activity.method}</td>
                  <td><span class="endpoint">${activity.endpoint}</span></td>
                  <td>${activity.ip}</td>
                  <td>${activity.duration}</td>
                  <td>${activity.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <button class="refresh-btn" onclick="location.reload()">🔄 Refresh Data</button>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 AI Resume Builder Backend - Ready for Hackathon Demo!`);
});
