# 🔧 FIX: Port 5000 Already in Use

## **Your Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

This means **something else is already using port 5000**.

---

## ✅ **SOLUTION - 3 Options:**

---

### **Option 1: Use Auto-Fix Script (EASIEST)**

1. Go to: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\`

2. **Right-click** on: `FIX-PORT-AND-START.bat`

3. Select: **"Run as administrator"**

4. It will automatically:
   - Kill whatever is using port 5000
   - Start the backend server

5. Done! ✅

---

### **Option 2: Manual Fix**

1. **Open Command Prompt as Administrator:**
   - Press Windows Key
   - Type: `cmd`
   - Right-click "Command Prompt"
   - Click "Run as administrator"

2. **Find what's using port 5000:**
   ```
   netstat -ano | findstr :5000
   ```

3. **You'll see something like:**
   ```
   TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345
   ```
   The last number (12345) is the Process ID (PID)

4. **Kill that process:**
   ```
   taskkill /PID 12345 /F
   ```
   (Replace 12345 with YOUR number)

5. **Now start backend:**
   - Double-click: `START-BACKEND-FIXED.bat`

---

### **Option 3: Change the Port**

If you want to use a different port instead:

1. Open this file in Notepad:
   ```
   c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend\.env
   ```

2. Change this line:
   ```
   PORT=5000
   ```
   To:
   ```
   PORT=5001
   ```

3. Save the file

4. Also update frontend `.env`:
   ```
   c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend\.env
   ```

5. Change:
   ```
   VITE_API_URL=http://localhost:5000
   ```
   To:
   ```
   VITE_API_URL=http://localhost:5001
   ```

6. Save and try again

---

## 🎯 **RECOMMENDED: Use Option 1**

**Just do this:**

1. Find: `FIX-PORT-AND-START.bat`
2. Right-click → "Run as administrator"
3. Done!

---

## ✅ **After Fixing:**

Once port 5000 is free, you should see:
```
🚀 Server running on http://localhost:5000
📝 AI Resume Builder Backend - Ready for Hackathon Demo!
```

Then:
1. Keep that window open
2. Double-click: `START-FRONTEND-FIXED.bat`
3. Open browser: `http://localhost:5173`

---

## 💡 **What's Using Port 5000?**

Common programs that use port 5000:
- Another Node.js server you started earlier
- AirPlay Receiver (on Mac/Windows)
- Some development tools
- Previous instance of this backend

The fix will close whatever it is and free up the port.

---

**Try Option 1 now (Run FIX-PORT-AND-START.bat as administrator)! 🚀**
