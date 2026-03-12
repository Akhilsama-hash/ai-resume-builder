import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const usageLogFile = path.join(logsDir, 'usage.json');
const visitorsLogFile = path.join(logsDir, 'visitors.json');

if (!fs.existsSync(usageLogFile)) {
  fs.writeFileSync(usageLogFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(visitorsLogFile)) {
  fs.writeFileSync(visitorsLogFile, JSON.stringify([], null, 2));
}

export const trackUsage = (req, res, next) => {
  const startTime = Date.now();
  
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - startTime;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      endpoint: req.path,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      duration: `${duration}ms`,
      status: res.statusCode
    };
    
    const logs = JSON.parse(fs.readFileSync(usageLogFile, 'utf8'));
    logs.push(logEntry);
    
    if (logs.length > 1000) {
      logs.shift();
    }
    
    fs.writeFileSync(usageLogFile, JSON.stringify(logs, null, 2));
    
    originalSend.call(this, data);
  };
  
  next();
};

export const trackVisitor = (req, res, next) => {
  const visitorInfo = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    referer: req.get('referer') || 'Direct',
    path: req.path
  };
  
  const visitors = JSON.parse(fs.readFileSync(visitorsLogFile, 'utf8'));
  
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const existingVisitor = visitors.find(v => 
    v.ip === visitorInfo.ip && 
    new Date(v.timestamp) > thirtyMinutesAgo
  );
  
  if (!existingVisitor) {
    visitors.push(visitorInfo);
    
    if (visitors.length > 500) {
      visitors.shift();
    }
    
    fs.writeFileSync(visitorsLogFile, JSON.stringify(visitors, null, 2));
  }
  
  next();
};

export const getAnalytics = () => {
  const usage = JSON.parse(fs.readFileSync(usageLogFile, 'utf8'));
  const visitors = JSON.parse(fs.readFileSync(visitorsLogFile, 'utf8'));
  
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const usage24h = usage.filter(u => new Date(u.timestamp) > last24Hours);
  const usage7d = usage.filter(u => new Date(u.timestamp) > last7Days);
  
  const visitors24h = visitors.filter(v => new Date(v.timestamp) > last24Hours);
  const visitors7d = visitors.filter(v => new Date(v.timestamp) > last7Days);
  
  const endpointStats = {};
  usage.forEach(u => {
    if (!endpointStats[u.endpoint]) {
      endpointStats[u.endpoint] = 0;
    }
    endpointStats[u.endpoint]++;
  });
  
  const uniqueIPs24h = [...new Set(visitors24h.map(v => v.ip))];
  const uniqueIPs7d = [...new Set(visitors7d.map(v => v.ip))];
  
  return {
    totalRequests: usage.length,
    totalVisitors: visitors.length,
    last24Hours: {
      requests: usage24h.length,
      uniqueVisitors: uniqueIPs24h.length,
      visitors: visitors24h
    },
    last7Days: {
      requests: usage7d.length,
      uniqueVisitors: uniqueIPs7d.length,
      visitors: visitors7d
    },
    endpointStats,
    recentActivity: usage.slice(-20).reverse()
  };
};
