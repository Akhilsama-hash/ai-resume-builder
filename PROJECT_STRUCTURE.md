# 📁 Project Structure - AI Resume Builder

## Complete File Tree

```
ai-resume-hackathon/
│
├── 📄 README.md                      # Main project documentation
├── 📄 QUICKSTART.md                  # Quick setup guide
├── 📄 FEATURES.md                    # Detailed features showcase
├── 📄 AI_FEATURES_EXPLAINED.md       # AI algorithms explanation
├── 📄 PROJECT_SUMMARY.md             # Hackathon project summary
├── 📄 DEMO_CHECKLIST.md              # Pre-demo preparation checklist
│
├── 🔧 install.bat                    # Windows installation script
├── 🚀 start-backend.bat              # Backend startup script
├── 🚀 start-frontend.bat             # Frontend startup script
│
├── 📂 backend/                       # Node.js Backend
│   ├── 📂 src/
│   │   ├── 📂 routes/
│   │   │   └── aiRoutes.js          # API route definitions
│   │   │
│   │   ├── 📂 controllers/
│   │   │   └── aiController.js      # Business logic handlers
│   │   │
│   │   ├── 📂 services/
│   │   │   └── aiService.js         # AI algorithms implementation
│   │   │
│   │   ├── 📂 utils/
│   │   │   ├── aiData.js            # Action verbs, job skills database
│   │   │   └── textAnalysis.js     # Text analysis utilities
│   │   │
│   │   └── server.js                # Express server entry point
│   │
│   ├── .env                          # Environment variables
│   └── package.json                  # Backend dependencies
│
└── 📂 frontend/                      # React Frontend
    ├── 📂 public/
    │   └── vite.svg                  # Favicon
    │
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── Header.jsx            # App header with branding
    │   │   ├── ResumeForm.jsx        # Main form with AI features
    │   │   ├── ResumePreview.jsx     # Live preview component
    │   │   ├── ATSScoreCard.jsx      # ATS score display
    │   │   └── JobMatchModal.jsx     # Job match feature modal
    │   │
    │   ├── 📂 pages/
    │   │   └── ResumeBuilder.jsx     # Main application page
    │   │
    │   ├── 📂 services/
    │   │   └── api.js                # API service layer
    │   │
    │   ├── 📂 templates/
    │   │   ├── ModernTemplate.jsx    # Modern resume template
    │   │   ├── ClassicTemplate.jsx   # Classic resume template
    │   │   └── CreativeTemplate.jsx  # Creative resume template
    │   │
    │   ├── 📂 utils/
    │   │   └── pdfExport.js          # PDF export functionality
    │   │
    │   ├── App.jsx                    # Root component
    │   ├── main.jsx                   # React entry point
    │   └── index.css                  # Global styles + Tailwind
    │
    ├── index.html                     # HTML entry point
    ├── .env                           # Frontend environment variables
    ├── package.json                   # Frontend dependencies
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS configuration
    └── postcss.config.js              # PostCSS configuration
```

---

## 📊 File Descriptions

### Root Level Files

#### Documentation
- **README.md** - Main project overview, features, installation
- **QUICKSTART.md** - Fast setup guide for hackathon demo
- **FEATURES.md** - Detailed feature descriptions and benefits
- **AI_FEATURES_EXPLAINED.md** - Technical explanation of AI algorithms
- **PROJECT_SUMMARY.md** - Complete hackathon project summary
- **DEMO_CHECKLIST.md** - Pre-presentation checklist

#### Scripts
- **install.bat** - Automated installation for Windows
- **start-backend.bat** - Quick backend startup
- **start-frontend.bat** - Quick frontend startup

---

### Backend Structure

#### `/backend/src/routes/`
**Purpose:** Define API endpoints

**aiRoutes.js**
- POST /api/enhance-content
- POST /api/calculate-ats-score
- POST /api/job-match
- POST /api/generate-summary
- POST /api/improve-bullet

#### `/backend/src/controllers/`
**Purpose:** Handle HTTP requests and responses

**aiController.js**
- `enhanceContent()` - Enhance resume text
- `calculateATSScore()` - Calculate ATS compatibility
- `getJobMatchSuggestions()` - Get job-specific skills
- `generateProfessionalSummary()` - Create summary
- `improveBulletPoint()` - Enhance bullet points

#### `/backend/src/services/`
**Purpose:** Core AI business logic

**aiService.js**
- `enhanceTextWithAI()` - Text enhancement algorithm
- `calculateATS()` - ATS scoring algorithm
- `getJobSkills()` - Job matching algorithm
- `generateSummary()` - Summary generation
- `enhanceBullet()` - Bullet point improvement

#### `/backend/src/utils/`
**Purpose:** Helper functions and data

**aiData.js**
- Action verbs library (30+ verbs)
- Weak verbs to replace
- Job skills database (12+ roles)
- Industry keywords

**textAnalysis.js**
- `analyzeKeywords()` - Keyword density analysis
- `calculateReadability()` - Readability scoring
- `extractSkills()` - Skill extraction

#### `/backend/src/`
**server.js** - Express server setup, middleware, routes

---

### Frontend Structure

#### `/frontend/src/components/`
**Purpose:** Reusable UI components

**Header.jsx**
- App branding
- Navigation
- Status indicator

**ResumeForm.jsx** (Largest component)
- Personal information section
- Professional summary with AI generation
- Skills management
- Experience section with AI enhancement
- Education section
- Projects section
- All form inputs and validation

**ResumePreview.jsx**
- Live preview container
- Template rendering
- Real-time updates

**ATSScoreCard.jsx**
- Score display (0-100)
- Grade indicator
- Feedback list
- Suggestions list
- Progress bar

**JobMatchModal.jsx**
- Job title input
- AI suggestions display
- Skill selection
- Keyword recommendations
- Apply to resume functionality

#### `/frontend/src/pages/`
**Purpose:** Main application views

**ResumeBuilder.jsx**
- Main application page
- State management
- Layout orchestration
- Feature integration

#### `/frontend/src/services/`
**Purpose:** API communication

**api.js**
- Axios configuration
- API endpoint functions
- Error handling
- Request/response formatting

#### `/frontend/src/templates/`
**Purpose:** Resume design templates

**ModernTemplate.jsx**
- Clean, contemporary design
- Blue accent colors
- Professional layout

**ClassicTemplate.jsx**
- Traditional design
- Serif fonts
- Corporate style

**CreativeTemplate.jsx**
- Colorful, modern design
- Purple-pink gradient
- Unique layout

#### `/frontend/src/utils/`
**Purpose:** Helper utilities

**pdfExport.js**
- `exportToPDF()` - PDF generation
- `printResume()` - Print functionality
- html2canvas integration
- jsPDF configuration

#### `/frontend/src/`
**App.jsx** - Root component, routing
**main.jsx** - React DOM rendering
**index.css** - Global styles, Tailwind directives

---

## 🔄 Data Flow

### Resume Creation Flow
```
User Input (ResumeForm)
    ↓
State Update (React State)
    ↓
Live Preview (ResumePreview)
    ↓
Template Rendering (ModernTemplate/Classic/Creative)
```

### AI Enhancement Flow
```
User Text Input
    ↓
API Call (api.js)
    ↓
Backend Route (aiRoutes.js)
    ↓
Controller (aiController.js)
    ↓
AI Service (aiService.js)
    ↓
Enhanced Text Response
    ↓
Update UI (ResumeForm)
```

### ATS Scoring Flow
```
Resume Data Change
    ↓
Debounced API Call (1 second)
    ↓
Backend Calculation (aiService.js)
    ↓
Score + Feedback Response
    ↓
Update Score Card (ATSScoreCard)
```

### Job Match Flow
```
User Enters Job Title
    ↓
API Call (api.js)
    ↓
Job Skills Lookup (aiData.js)
    ↓
Filter Existing Skills
    ↓
Return Suggestions
    ↓
Display in Modal (JobMatchModal)
    ↓
User Selects Skills
    ↓
Add to Resume State
```

---

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // CORS middleware
  "dotenv": "^16.3.1"        // Environment variables
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",           // UI library
  "react-dom": "^18.2.0",       // React DOM
  "axios": "^1.6.0",            // HTTP client
  "framer-motion": "^10.16.4",  // Animations
  "react-icons": "^4.12.0",     // Icon library
  "jspdf": "^2.5.1",            // PDF generation
  "html2canvas": "^1.4.1",      // HTML to canvas
  "tailwindcss": "^3.3.5",      // CSS framework
  "vite": "^5.0.0"              // Build tool
}
```

---

## 🎨 Styling Architecture

### Tailwind Configuration
```javascript
// tailwind.config.js
- Custom colors (primary, secondary)
- Custom animations (fade-in, slide-up)
- Extended theme
```

### CSS Structure
```css
/* index.css */
@tailwind base;      // Reset styles
@tailwind components; // Component classes
@tailwind utilities;  // Utility classes

Custom components:
- .btn-primary
- .btn-secondary
- .card
- .input-field
- .section-title
- .gradient-text
```

---

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Build & Deploy

### Development
```bash
# Backend
cd backend
npm install
npm start        # Runs on port 5000

# Frontend
cd frontend
npm install
npm run dev      # Runs on port 5173
```

### Production Build
```bash
# Frontend
cd frontend
npm run build    # Creates dist/ folder

# Backend
cd backend
npm start        # Production mode
```

---

## 📏 Code Statistics

### Lines of Code (Approximate)
- Backend: ~800 lines
- Frontend: ~1500 lines
- Documentation: ~3000 lines
- **Total: ~5300 lines**

### File Count
- Backend: 7 files
- Frontend: 15 files
- Documentation: 6 files
- Config: 8 files
- **Total: 36 files**

### Component Breakdown
- React Components: 6
- Templates: 3
- Services: 2
- Utils: 2
- Controllers: 1
- Routes: 1

---

## 🎯 Key Files for Demo

### Must Show
1. **ResumeBuilder.jsx** - Main application
2. **aiService.js** - AI algorithms
3. **ATSScoreCard.jsx** - Real-time scoring
4. **JobMatchModal.jsx** - Bonus feature

### Nice to Show
1. **ModernTemplate.jsx** - Template design
2. **aiData.js** - Skills database
3. **pdfExport.js** - PDF generation

---

## 🔍 Code Quality

### Best Practices
✅ Modular architecture
✅ Separation of concerns
✅ Reusable components
✅ Clean code principles
✅ Comprehensive comments
✅ Error handling
✅ Responsive design
✅ Performance optimization

### Scalability
✅ Easy to add new templates
✅ Easy to add new job roles
✅ Easy to extend AI features
✅ Easy to add new API endpoints
✅ Easy to integrate with databases

---

## 📚 Learning Resources

### For Understanding the Code
1. Start with README.md
2. Read QUICKSTART.md for setup
3. Review AI_FEATURES_EXPLAINED.md
4. Explore backend/src/services/aiService.js
5. Check frontend/src/pages/ResumeBuilder.jsx

### For Presenting
1. Read FEATURES.md
2. Review PROJECT_SUMMARY.md
3. Follow DEMO_CHECKLIST.md

---

**This structure is designed for:**
- Easy navigation
- Quick understanding
- Simple maintenance
- Scalable growth
- Professional presentation

**Perfect for a hackathon demo! 🚀**
