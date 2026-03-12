# 🔧 Quick Fix Guide - Connection Issues

## Problem: "ERR_CONNECTION_REFUSED" or "Can't reach this page"

This means the servers aren't running yet. Here's how to fix it:

---

## ✅ Solution: Start the Servers

### Option 1: Use the All-in-One Script (EASIEST)
1. Navigate to: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\`
2. **Double-click: `START-ALL.bat`**
3. Two command windows will open (Backend and Frontend)
4. Wait 10-15 seconds for servers to start
5. Open browser: http://localhost:5173

### Option 2: Manual Start (If Option 1 doesn't work)

#### Step 1: Start Backend
1. Open Command Prompt (cmd)
2. Run these commands:
```bash
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend
npm start
```
3. You should see: "🚀 Server running on http://localhost:5000"
4. **KEEP THIS WINDOW OPEN**

#### Step 2: Start Frontend (New Window)
1. Open a NEW Command Prompt window
2. Run these commands:
```bash
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend
npm run dev
```
3. You should see: "Local: http://localhost:5173/"
4. **KEEP THIS WINDOW OPEN TOO**

#### Step 3: Open Browser
- Navigate to: http://localhost:5173
- The application should now load!

---

## 🐛 Still Not Working? Try These:

### Issue: Port Already in Use

**Backend (Port 5000) in use:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number you see)
taskkill /PID <PID> /F
```

**Frontend (Port 5173) in use:**
```bash
# Find what's using port 5173
netstat -ano | findstr :5173

# Kill the process
taskkill /PID <PID> /F
```

### Issue: "npm: command not found"
- Node.js is not installed
- Download from: https://nodejs.org/
- Install and restart your computer

### Issue: Backend starts but frontend doesn't connect
1. Check backend is running: http://localhost:5000
2. You should see JSON response with API info
3. If yes, restart frontend:
```bash
cd frontend
npm run dev
```

### Issue: Blank page or errors in browser
1. Open browser console (F12)
2. Check for errors
3. Clear browser cache (Ctrl + Shift + Delete)
4. Refresh page (Ctrl + F5)

---

## ✅ How to Know It's Working

### Backend is Running When:
- Command window shows: "🚀 Server running on http://localhost:5000"
- Visiting http://localhost:5000 shows JSON response
- No error messages in the terminal

### Frontend is Running When:
- Command window shows: "Local: http://localhost:5173/"
- Shows "ready in XXX ms"
- No error messages in the terminal

### Application is Working When:
- http://localhost:5173 loads the page
- You see "AI Resume Builder" header
- No errors in browser console (F12)

---

## 📝 Quick Checklist

Before opening browser, make sure:
- [ ] Backend terminal is open and shows "Server running"
- [ ] Frontend terminal is open and shows "ready in"
- [ ] No error messages in either terminal
- [ ] Waited at least 10 seconds after starting
- [ ] Using correct URL: http://localhost:5173 (not 5000)

---

## 🚀 Fastest Way to Start

1. **Double-click: `START-ALL.bat`**
2. **Wait 15 seconds**
3. **Open: http://localhost:5173**

That's it! 🎉

---

## 💡 Pro Tips

- Keep both terminal windows open while using the app
- Don't close the terminals or servers will stop
- If you close them, just run START-ALL.bat again
- Bookmark http://localhost:5173 for quick access

---

## 🆘 Still Having Issues?

### Check Node.js Installation
```bash
node --version
npm --version
```
Should show version numbers. If not, install Node.js.

### Reinstall Dependencies
```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

### Check Firewall
- Windows Firewall might be blocking Node.js
- Allow Node.js through firewall when prompted

---

## ✅ Success!

When everything works, you'll see:
- Beautiful gradient background
- "AI Resume Builder" header
- "Create professional, ATS-optimized resumes in minutes"
- Form fields to enter your information

**Now you're ready to build amazing resumes! 🎉**

---

## 📞 Quick Reference

- **Backend URL:** http://localhost:5000
- **Frontend URL:** http://localhost:5173 ← **USE THIS ONE**
- **Start Script:** START-ALL.bat
- **Backend Folder:** `ai-resume-hackathon\backend`
- **Frontend Folder:** `ai-resume-hackathon\frontend`

---

**Remember: You need BOTH servers running at the same time!** 🚀
