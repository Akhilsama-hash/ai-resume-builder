# 🚀 SUPER SIMPLE START GUIDE

## **Problem: Backend file is not opening?**

### **Try This - EASIEST METHOD:**

---

## **Method 1: Use Test Scripts (RECOMMENDED)**

### **Step 1: Start Backend**
1. Go to folder: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\`
2. **Double-click:** `START-BACKEND-TEST.bat`
3. A black window will open
4. Wait until you see: **"🚀 Server running on http://localhost:5000"**
5. ✅ **LEAVE THIS WINDOW OPEN!**

### **Step 2: Start Frontend**
1. In the same folder
2. **Double-click:** `START-FRONTEND-TEST.bat`
3. Another black window will open
4. Wait until you see: **"Local: http://localhost:5173/"**
5. ✅ **LEAVE THIS WINDOW OPEN TOO!**

### **Step 3: Open Browser**
1. Open Chrome or Edge
2. Type: `http://localhost:5173`
3. Press Enter
4. 🎉 **Done!**

---

## **Method 2: Manual Command Line**

### **Step 1: Open Command Prompt**
1. Press **Windows Key + R**
2. Type: `cmd`
3. Press Enter

### **Step 2: Navigate to Backend**
Copy and paste this (press Enter after):
```
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend
```

### **Step 3: Start Backend**
Copy and paste this (press Enter):
```
node src/server.js
```

Wait for: **"🚀 Server running on http://localhost:5000"**

✅ **KEEP THIS WINDOW OPEN!**

### **Step 4: Open NEW Command Prompt**
1. Press **Windows Key + R** again
2. Type: `cmd`
3. Press Enter

### **Step 5: Navigate to Frontend**
Copy and paste this (press Enter):
```
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend
```

### **Step 6: Start Frontend**
Copy and paste this (press Enter):
```
npm run dev
```

Wait for: **"Local: http://localhost:5173/"**

✅ **KEEP THIS WINDOW OPEN TOO!**

### **Step 7: Open Browser**
Type: `http://localhost:5173`

---

## **❌ If You Get Errors:**

### **Error: "node is not recognized"**
**Solution:** Install Node.js
1. Go to: https://nodejs.org/
2. Download the LTS version (left button)
3. Install it
4. **Restart your computer**
5. Try again

### **Error: "Cannot find module"**
**Solution:** Install dependencies
```
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend
npm install

cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend
npm install
```

### **Error: "Port 5000 already in use"**
**Solution:** Kill the process
```
netstat -ano | findstr :5000
```
Look for the number in the last column (PID)
```
taskkill /PID [that_number] /F
```

### **Error: "ENOENT: no such file or directory"**
**Solution:** You're in the wrong folder
Make sure you're in: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend`

---

## **✅ How to Know It's Working:**

### **Backend Working:**
- Command window shows: "🚀 Server running on http://localhost:5000"
- No red error messages
- Window stays open (doesn't close immediately)

### **Frontend Working:**
- Command window shows: "Local: http://localhost:5173/"
- Shows "ready in XXX ms"
- No red error messages

### **Website Working:**
- Browser loads the page
- You see purple/blue gradient
- "AI Resume Builder" header visible
- Form fields on the left

---

## **🎯 Quick Troubleshooting:**

**Q: The window opens and closes immediately**
A: There's an error. Use the TEST scripts - they keep the window open so you can see the error.

**Q: I see red error text**
A: Take a screenshot and read what it says. Common issues:
- Node.js not installed
- Wrong folder
- Port already in use
- Missing dependencies

**Q: Backend works but frontend doesn't**
A: Make sure backend is still running (don't close that window!)

**Q: Both work but browser shows error**
A: 
- Wait 30 seconds and refresh
- Clear browser cache (Ctrl + Shift + Delete)
- Try a different browser
- Check if you're using http://localhost:5173 (not 5000)

---

## **📞 Copy-Paste Commands:**

**Backend:**
```
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend
node src/server.js
```

**Frontend (in NEW window):**
```
cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend
npm run dev
```

**Browser:**
```
http://localhost:5173
```

---

## **🎉 Success Looks Like:**

You'll see:
- ✅ Two command windows open (backend and frontend)
- ✅ Backend says "Server running on http://localhost:5000"
- ✅ Frontend says "Local: http://localhost:5173/"
- ✅ Browser shows beautiful AI Resume Builder interface
- ✅ You can type in the form fields
- ✅ Preview updates on the right side

---

**That's it! If you're still stuck, use the TEST scripts - they show better error messages!** 🚀
