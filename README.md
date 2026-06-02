# Medical Recommendation System

A full-stack web application that allows users to input symptoms and receive rule-based health recommendations, potential condition matching, severity assessments, and specialist referrals.

Built with **FastAPI** (Python backend) and **Next.js** (React frontend), the system uses a curated medical knowledge base to analyze symptom combinations and provide evidence-based guidance. User authentication is handled via JWT tokens, and all symptom checks are persisted to a user-specific history dashboard.

---

##  Quick Start

**Prerequisites:** [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

```bash
git clone <repository-url>
cd medical-recommendation-system
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

To stop: `docker compose down`

That's it — no Python, Node.js, or database setup needed.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker (Recommended)](#quick-start-with-docker-recommended)
- [Manual Setup](#manual-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Docker Configuration Details](#docker-configuration-details)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

### Core Functionality
- **Symptom Checker** — Select from a list of common symptoms or type custom symptoms. The system supports multi-symptom input for accurate analysis.
- **Disease Prediction Engine** — Matches entered symptoms against a curated medical knowledge base of 14+ conditions using keyword scoring.
- **Severity Classification** — Each matched condition is classified as Mild, Moderate, or Severe, with appropriate urgency guidance.
- **Emergency Detection** — Flags critical symptoms (chest pain, difficulty breathing, seizures, etc.) with immediate emergency instructions.

### Recommendations & Referrals
- **OTC & Lifestyle Advice** — Provides over-the-counter medication suggestions, rest recommendations, and dietary guidance.
- **Specialist Referrals** — Recommends the appropriate medical specialist (General Physician, Neurologist, Cardiologist, etc.).
- **Actionable Next Steps** — Clear instructions on when to seek in-person medical care.

### User System
- **JWT Authentication** — Secure registration and login with bcrypt password hashing.
- **Persistent History** — All symptom checks are saved to a user-specific dashboard.
- **Session Management** — Tokens stored client-side with automatic restoration on page reload.

### Technical Highlights
- **RESTful API** — Clean, documented FastAPI backend with automatic OpenAPI/Swagger docs.
- **Static Site Frontend** — Next.js static export served by Nginx for fast load times.
- **Docker Compose** — One-command startup for the entire stack.
- **Responsive Design** — Mobile-friendly interface built with Tailwind CSS.

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11+ | Runtime |
| FastAPI | 0.115.6 | Web framework with automatic OpenAPI docs |
| Uvicorn | 0.34.0 | ASGI server |
| SQLAlchemy | 2.0.36 | ORM for database interactions |
| SQLite | — | Embedded database (no external DB server needed) |
| python-jose | 3.3.0 | JWT token creation and validation |
| passlib + bcrypt | 1.7.4 / 4.0.1 | Password hashing |
| Pydantic | 2.10.3 | Request/response schema validation |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20+ | JavaScript runtime |
| Next.js | 14.2 | React framework with static export |
| React | 18.3 | UI library |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Utility-first CSS framework |

### DevOps
| Tool | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |
| Nginx | Static file serving for frontend |

---

## Folder Structure

```
medical-recommendation-system/
│
├── backend/                          # FastAPI Python backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application entry point
│   │   │
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       ├── auth.py           # POST /auth/register, POST /auth/login, GET /auth/me
│   │   │       ├── history.py        # GET /history
│   │   │       └── prediction.py     # POST /predict
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py             # Environment config loading
│   │   │   ├── database.py           # SQLAlchemy engine & session
│   │   │   └── security.py           # Password hashing, JWT encode/decode
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py               # User SQLAlchemy model
│   │   │   └── symptom.py            # SymptomHistory SQLAlchemy model
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── auth_schema.py        # RegisterRequest, LoginRequest, TokenResponse, UserResponse
│   │   │   ├── prediction_schema.py  # PredictionRequest, PredictionResponse
│   │   │   └── user_schema.py        # HistoryResponse, HistoryItem
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py       # User registration, authentication, token validation
│   │   │   ├── recommendation_engine.py  # Symptom analysis and disease matching
│   │   │   └── symptom_analyzer.py   # Curated disease-symptom knowledge base (14 conditions)
│   │   │
│   │   └── utils/
│   │       └── __init__.py
│   │
│   ├── .dockerignore                 # Files excluded from Docker build
│   ├── .env                          # Local environment variables (gitignored)
│   ├── .env.example                  # Template for environment variables
│   ├── Dockerfile                    # Production container definition
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # Next.js React frontend
│   ├── app/                          # Next.js App Router pages
│   │   ├── globals.css               # Global Tailwind styles
│   │   ├── layout.tsx                # Root layout (Navbar, AuthProvider)
│   │   ├── page.tsx                  # Homepage with hero, features, how-it-works
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx              # Login form with show/hide password toggle
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx              # Registration form with confirm password
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx              # User history dashboard
│   │   │
│   │   ├── symptom-checker/
│   │   │   └── page.tsx              # Symptom selection interface
│   │   │
│   │   └── results/
│   │       └── page.tsx              # Prediction results display
│   │
│   ├── components/
│   │   ├── forms/
│   │   │   └── SymptomForm.tsx        # Reusable symptom input component
│   │   ├── layout/
│   │   │   └── Navbar.tsx            # Navigation bar with auth state
│   │   └── ui/
│   │       └── Card.tsx              # Reusable card wrapper component
│   │
│   ├── services/
│   │   ├── api.ts                    # HTTP client for backend API calls
│   │   └── auth.tsx                  # React context for auth state management
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   │
│   ├── utils/
│   │   └── cn.ts                     # Classname utility helper
│   │
│   ├── .dockerignore                 # Files excluded from Docker build
│   ├── Dockerfile                    # Multi-stage production build
│   ├── nginx.conf                    # Nginx configuration for static serving
│   ├── next.config.js                # Next.js configuration (static export)
│   ├── package.json                  # Node dependencies and scripts
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── postcss.config.js             # PostCSS configuration
│
├── datasets/                         # (reserved for external data files)
├── docker/                           # (reserved for additional Docker resources)
├── docs/                             # (reserved for documentation)
│
├── docker-compose.yml                # Multi-service Docker orchestration
├── .gitignore                        # Git exclusion rules
└── README.md                         # This file
```

---

## Prerequisites

Before running the project, ensure you have the following installed:

### For Docker Setup
- [Docker](https://docs.docker.com/get-docker/) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)

Verify installation:
```bash
docker --version
docker compose version
```

### For Manual Setup
- Python 3.11 or higher
- Node.js 18 or higher
- npm 9 or higher

---

## Quick Start with Docker (Recommended)

The entire application can be started with a single command.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd medical-recommendation-system
```

### Step 2: Start All Services

```bash
docker compose up --build
```

This command will:
1. Build the **backend** container (Python + FastAPI)
2. Build the **frontend** container (Next.js build → Nginx)
3. Start both services with networking configured
4. Expose the backend on `http://localhost:8000`
5. Expose the frontend on `http://localhost:3000`

### Step 3: Access the Application

| Service | URL | Description |
|---|---|---|
| Frontend | [http://localhost:3000](http://localhost:3000) | Web application |
| Backend API | [http://localhost:8000](http://localhost:8000) | REST API |
| API Docs | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive Swagger UI |
| API Docs (alt) | [http://localhost:8000/redoc](http://localhost:8000/redoc) | ReDoc UI |

### Step 4: Stopping the Application

```bash
docker compose down
```

To also remove volumes (deletes the SQLite database):
```bash
docker compose down -v
```

### Step 5: Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
```

---

## Manual Setup

### Backend Setup

#### 1. Navigate to the backend directory
```bash
cd backend
```

#### 2. Create and activate a Python virtual environment

**Linux / macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

#### 4. Configure environment variables
```bash
cp .env.example .env
```

The default `.env` file contains:
```
DATABASE_URL=sqlite:///./medical.db
SECRET_KEY=dev-secret-key-change-in-production
```

For production, generate a strong secret key:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

#### 5. Start the backend server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- `--reload` enables auto-restart on code changes (development only)
- `--host 0.0.0.0` makes the server accessible from other machines/containers
- `--port 8000` sets the port

The backend is now running at `http://localhost:8000`.

#### 6. Verify the backend is working
```bash
curl http://localhost:8000/
```
Expected response:
```json
{"message":"Medical Recommendation System API is running"}
```

### Frontend Setup

#### 1. Navigate to the frontend directory
```bash
cd frontend
```

#### 2. Install Node.js dependencies
```bash
npm install
```

#### 3. Start the development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

Changes to source files will automatically reload in the browser.

#### 4. Build for production
```bash
npm run build
npm run start
```

The production build generates a static site in the `out/` directory.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | `sqlite:///./medical.db` | Database connection string. Supports SQLite (default) and PostgreSQL. |
| `SECRET_KEY` | Yes | `dev-secret-key-change-in-production` | Used for JWT token signing. **Must be changed in production.** |

#### Database Configuration Examples

**SQLite (default, no external server needed):**
```
DATABASE_URL=sqlite:///./medical.db
```

**PostgreSQL:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/medical_db
```

#### Generating a Production Secret Key

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Example output:
```
a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
```

### Frontend

The frontend API base URL is configured in `frontend/services/api.ts`:

```typescript
const API_BASE = 'http://localhost:8000'
```

Change this value to point to your backend deployment. For production, you would set this to your deployed backend URL.

---

## API Reference

### Root Endpoint

```http
GET /
```

Returns a health check message.

**Response:**
```json
{
  "message": "Medical Recommendation System API is running"
}
```

---

### Authentication Endpoints

#### Register a New User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** `200 OK`:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error** `400 Bad Request`:
```json
{
  "detail": "Email already registered"
}
```

---

#### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** `200 OK`:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

**Error** `401 Unauthorized`:
```json
{
  "detail": "Invalid email or password"
}
```

---

#### Get Current User Profile

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response** `200 OK`:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error** `401 Unauthorized`:
```json
{
  "detail": "Invalid or expired token"
}
```

---

### Prediction Endpoint

#### Analyze Symptoms

```http
POST /predict
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "symptoms": ["headache", "fever", "fatigue"]
}
```

**Response** `200 OK`:
```json
{
  "disease": "Flu (Influenza)",
  "severity": "Moderate",
  "recommendation": "Rest, stay hydrated, take acetaminophen for fever. Consult a doctor if symptoms persist beyond 3 days.",
  "specialist": "General Physician"
}
```

**Emergency Detection Example** (input: `"chest pain"`):
```json
{
  "disease": "Emergency Condition Detected",
  "severity": "Severe",
  "recommendation": "EMERGENCY: Seek immediate medical attention. Call emergency services.",
  "specialist": "Emergency Medicine"
}
```

**Response for Unrecognized Symptoms:**
```json
{
  "disease": "Unknown / Not Recognized",
  "severity": "Uncertain",
  "recommendation": "We could not identify a condition based on the symptoms provided. Please consult a healthcare professional for an accurate diagnosis.",
  "specialist": "General Physician"
}
```

---

### History Endpoint

#### Get Symptom Check History

```http
GET /history
Authorization: Bearer <token>
```

**Response** `200 OK`:
```json
{
  "history": [
    {
      "id": 1,
      "symptoms": "headache, fever, fatigue",
      "predicted_disease": "Flu (Influenza)",
      "severity": "Moderate",
      "recommendation": "Rest, stay hydrated...",
      "specialist": "General Physician",
      "created_at": "2026-05-29T12:00:00"
    }
  ]
}
```

---

### Disease Knowledge Base

The system can identify and provide recommendations for the following conditions:

| Condition | Severity | Specialist |
|---|---|---|
| Flu (Influenza) | Moderate | General Physician |
| Common Cold | Mild | General Physician |
| Migraine | Moderate | Neurologist |
| Malaria | Severe | Infectious Disease Specialist |
| Food Poisoning | Moderate | Gastroenterologist |
| Allergic Reaction | Mild | Allergist |
| Pneumonia | Severe | Pulmonologist |
| COVID-19 | Moderate | General Physician |
| Tension Headache | Mild | General Physician |
| Gastritis | Mild | Gastroenterologist |
| Urinary Tract Infection | Moderate | Urologist |
| Dengue Fever | Severe | Infectious Disease Specialist |
| Anxiety Disorder | Moderate | Psychiatrist |
| Hypertension | Moderate | Cardiologist |
| Emergency Conditions | Severe | Emergency Medicine |

---

## Docker Configuration Details

### Backend Dockerfile

Located at `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- Uses `python:3.11-slim` for a minimal footprint
- Installs dependencies before copying source code (leveraging Docker layer caching)
- Runs with uvicorn on port 8000

### Frontend Dockerfile

Located at `frontend/Dockerfile`:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

- **Multi-stage build**: First stage compiles the Next.js static site, second stage serves it with Nginx
- `npm ci` ensures deterministic, reproducible installs
- The final image is only ~25MB (just Nginx + static files, no Node.js runtime)

### Nginx Configuration

Located at `frontend/nginx.conf`:
```nginx
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- Serves static files on port 3000
- `try_files` fallback ensures client-side routing works for all paths

### Docker Compose

Located at `docker-compose.yml`:
```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./medical.db
      - SECRET_KEY=dev-secret-key-change-in-production
    volumes:
      - ./backend:/app
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped
```

Key design decisions:
- The **backend volume mount** (`./backend:/app`) enables live code reloading during development
- `depends_on` ensures the backend starts before the frontend
- `restart: unless-stopped` provides resilience against crashes

---

## Troubleshooting

### Docker Issues

#### Port already in use
```bash
# Check what is using the port
lsof -i :8000
lsof -i :3000

# Stop the conflicting process, or change the host port in docker-compose.yml
```

#### Permission denied when running docker compose
```bash
# Add your user to the docker group
sudo usermod -aG docker $USER
# Log out and back in, or run:
newgrp docker
```

#### Container exits immediately
```bash
# View logs to diagnose
docker compose logs backend
docker compose logs frontend
```

### Backend Issues

#### Module not found errors
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### Database errors
Delete the SQLite database and restart:
```bash
rm backend/medical.db
# The database will be recreated automatically on next startup
```

### Frontend Issues

#### Build errors
```bash
# Clear Next.js cache and rebuild
rm -rf .next out
npm run build
```

#### API connection refused
Ensure the backend is running on `http://localhost:8000`. Check `frontend/services/api.ts` for the correct `API_BASE` URL.

#### Node module issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Common Problems

**Login returns "Invalid email or password" even with correct credentials**
- Check that the backend `SECRET_KEY` in `.env` is consistent
- Delete `medical.db` and re-register

**Predictions not matching expected symptoms**
- The system uses keyword matching against a fixed knowledge base. Try adding more specific symptoms.

---

---

## License

This project is provided for **educational and academic purposes**. It is intended as a learning resource for web development, API design, and full-stack application architecture.

---

## Academic Context

This project was developed as part of a coursework assignment demonstrating:
- **Full-stack web development** with Python and JavaScript
- **RESTful API design** using FastAPI
- **Database integration** with SQLAlchemy ORM
- **Authentication and authorization** with JWT
- **Containerization** with Docker
- **Frontend development** with React and Tailwind CSS
- **Static site generation** with Next.js
