# 🚀 AI-Powered Resume Builder - Hackathon Edition

## 🎯 Project Overview

An intelligent, modern web application that helps students and job seekers create professional, ATS-optimized resumes in minutes using AI technology.

## ✨ Key Features

### 1. **Smart Resume Generator**
- Converts basic user inputs into professional resume content
- Uses AI to generate compelling descriptions with action verbs
- Industry-standard formatting

### 2. **AI Content Enhancement**
- Grammar and readability improvements
- Impactful bullet point suggestions
- Job-role based skill recommendations

### 3. **ATS Optimization Engine**
- Real-time ATS compatibility analysis
- Score out of 100 with detailed feedback
- Actionable improvement suggestions

### 4. **Professional Templates**
- 3 modern, customizable templates
- Instant template switching
- Print-ready designs

### 5. **Live Preview**
- Real-time resume updates
- Interactive editing experience

### 6. **PDF Export**
- High-quality PDF generation
- Professional formatting preserved

### 7. **🎁 BONUS: AI Job Match**
- Enter target job title
- Get AI-suggested skills and keywords
- Optimize resume for specific roles

## 🛠️ Technology Stack

**Frontend:**
- React.js 18
- Tailwind CSS
- Vite
- React-PDF/Renderer
- Framer Motion (animations)

**Backend:**
- Node.js + Express
- AI/NLP Processing
- CORS enabled

**AI Features:**
- Natural Language Processing
- Content optimization algorithms
- ATS scoring engine
- Job matching intelligence

## 📁 Project Structure

```
ai-resume-hackathon/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Main pages
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   └── templates/      # Resume templates
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Business logic
│   │   ├── services/       # AI services
│   │   └── utils/          # Helper functions
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-resume-hackathon
```

2. **Setup Backend**
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:5000`

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

4. **Open in browser**
Navigate to `http://localhost:5173`

## 🧠 How AI Features Work

### 1. **Content Enhancement Engine**
- Analyzes input text for weak verbs and passive voice
- Replaces with strong action verbs (achieved, developed, implemented)
- Adds quantifiable metrics suggestions
- Improves sentence structure and clarity

### 2. **ATS Scoring Algorithm**
Evaluates resumes based on:
- Keyword density and relevance
- Formatting compatibility
- Section completeness
- Contact information presence
- Skills alignment
- Experience descriptions quality

Score = (Σ weighted_factors / total_possible) × 100

### 3. **Job Match Intelligence**
- Maintains database of job roles and required skills
- Uses keyword extraction and matching
- Suggests industry-specific terminology
- Recommends trending skills for target role

### 4. **Smart Bullet Point Generator**
- Uses templates: [Action Verb] + [Task] + [Result/Impact]
- Contextual suggestions based on role and industry
- Incorporates power words and metrics

## 🎨 Design Highlights

- **Modern UI**: Clean, card-based design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Intuitive UX**: Step-by-step resume building process
- **Professional**: Startup-level polish and attention to detail

## 🏆 Hackathon Innovation Points

1. **Real-time ATS Scoring** - Instant feedback as users type
2. **AI Job Match** - Personalized skill recommendations
3. **Smart Content Generation** - AI-powered professional descriptions
4. **Live Preview** - See changes instantly
5. **One-Click Export** - Professional PDF in seconds

## 📊 Demo Flow

1. User enters basic information (name, email, education)
2. AI suggests professional summary
3. User adds experience - AI enhances descriptions
4. Real-time ATS score updates
5. User tries "Job Match" feature for target role
6. AI suggests relevant skills and keywords
7. User selects template and customizes
8. Downloads professional PDF resume

## 🔧 Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 📝 API Endpoints

- `POST /api/enhance-content` - Enhance resume text with AI
- `POST /api/calculate-ats-score` - Get ATS compatibility score
- `POST /api/job-match` - Get skills for target job
- `POST /api/generate-summary` - Create professional summary
- `POST /api/improve-bullet` - Enhance bullet points

## 🎯 Future Enhancements

- LinkedIn profile import
- Cover letter generator
- Interview preparation tips
- Job board integration
- Multi-language support

## 👥 Team

Built for hackathon demonstration by passionate developers

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ for helping job seekers land their dream jobs**
