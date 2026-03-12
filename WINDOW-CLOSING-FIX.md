# 🔥 FIXED - Window Closing Issue

## **Your Problem: Window pops up and closes immediately**

### **✅ SOLUTION - Use These NEW Files:**

---

## **STEP 1: Start Backend**

1. Go to folder: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\`

2. **Double-click this file:**
   ```
   START-BACKEND-FIXED.bat
   ```

3. **The window will STAY OPEN now!**

4. You'll see one of these:

   **✅ SUCCESS - You'll see:**
   ```
   🚀 Server running on http://localhost:5000
   📝 AI Resume Builder Backend - Ready for Hackathon Demo!
   ```
   **→ GREAT! Keep this window open and go to Step 2**

   **❌ ERROR - You'll see an error message:**
   - Read what it says
   - See "Common Errors" section below
   - The window will stay open so you can read it

---

## **STEP 2: Start Frontend**

1. Go back to folder: `c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\`

2. **Double-click this file:**
   ```
   START-FRONTEND-FIXED.bat
   ```

3. **This window will also STAY OPEN!**

4. Wait for:
   ```
   Local: http://localhost:5173/
   ```

5. **Keep this window open too!**

---

## **STEP 3: Open Browser**

1. Open Chrome or Edge
2. Type: `http://localhost:5173`
3. Press Enter
4. **🎉 Done!**

---

## **❌ COMMON ERRORS YOU MIGHT SEE:**

### **Error: "Node.js is NOT installed!"**

**What to do:**
1. Go to: https://nodejs.org/
2. Click the big green "LTS" button (left side)
3. Download and install
4. **Restart your computer** (important!)
5. Try again from Step 1

---

### **Error: "Failed to install dependencies!"**

**What to do:**
1. Check your internet connection
2. Open Command Prompt as Administrator:
   - Press Windows Key
   - Type: `cmd`
   - Right-click "Command Prompt"
   - Click "Run as administrator"
3. Type these commands:
   ```
   cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend
   npm install
   ```
4. Wait for it to finish
5. Then:
   ```
   cd c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\frontend
   npm install
   ```
6. Try again from Step 1

---

### **Error: "Port 5000 is already in use"**

**What to do:**
1. Open Command Prompt as Administrator
2. Type:
   ```
   netstat -ano | findstr :5000
   ```
3. You'll see a number at the end (like 12345)
4. Type (replace 12345 with your number):
   ```
   taskkill /PID 12345 /F
   ```
5. Try again from Step 1

---

### **Error: "server.js not found"**

**What to do:**
1. Make sure you're in the right folder
2. Check that this file exists:
   ```
   c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\backend\src\server.js
   ```
3. If it doesn't exist, the files might not have been created properly

---

## **✅ HOW TO KNOW IT'S WORKING:**

### **Backend Working:**
- Window stays open
- Shows: "🚀 Server running on http://localhost:5000"
- No red error text

### **Frontend Working:**
- Window stays open
- Shows: "Local: http://localhost:5173/"
- Shows: "ready in XXX ms"

### **Website Working:**
- Browser loads the page
- You see colorful gradient background
- "AI Resume Builder" header
- Form fields on left, preview on right

---

## **🎯 QUICK SUMMARY:**

1. **Double-click:** `START-BACKEND-FIXED.bat`
   - Wait for "Server running"
   - Keep window open

2. **Double-click:** `START-FRONTEND-FIXED.bat`
   - Wait for "Local: http://localhost:5173"
   - Keep window open

3. **Open browser:** `http://localhost:5173`

4. **🎉 Enjoy!**

---

## **💡 WHY THE OLD FILES CLOSED:**

The old `.bat` files closed immediately when there was an error. The NEW files (`START-BACKEND-FIXED.bat` and `START-FRONTEND-FIXED.bat`) will:
- ✅ Stay open even if there's an error
- ✅ Show you exactly what went wrong
- ✅ Give you helpful error messages
- ✅ Check everything before starting

---

## **🆘 STILL HAVING ISSUES?**

**Tell me:**
1. Which step are you on? (Backend or Frontend?)
2. What error message do you see in the window?
3. Does the window stay open now?

**Take a screenshot of the error and I can help you fix it!**

---

## **📁 FILE LOCATIONS:**

**New Fixed Files (USE THESE):**
- `START-BACKEND-FIXED.bat` ← Use this for backend
- `START-FRONTEND-FIXED.bat` ← Use this for frontend

**Location:**
```
c:\Users\AKHIL\Desktop\resume\ai-resume-hackathon\
```

---

**The window will stay open now so you can see what's happening! 🚀**
