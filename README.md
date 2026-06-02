# Medical Recommendation System

A full-stack web application that analyzes user-reported symptoms and provides rule-based health recommendations, severity assessments, and specialist referral suggestions.

> Disclaimer: This project is for educational purposes only and is not intended to provide medical diagnoses or replace professional healthcare advice.

## Features

- User registration and login with JWT authentication
- Symptom checker with multi-symptom support
- Rule-based condition matching
- Severity classification (Mild, Moderate, Severe)
- Emergency symptom detection
- Specialist referral recommendations
- User history dashboard
- Responsive UI
- Dockerized deployment

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python
- SQLAlchemy

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose
- Nginx

## Quick Start

### Prerequisites

- Docker Desktop

### Run the Application

bash git clone https://github.com/Adedipe23/Medical-Health-Recommendation.git cd Medical-Health-Recommendation docker compose up --build 

Open:

| Service | URL |
|----------|----------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Documentation | http://localhost:8000/docs |

Stop the application:

bash docker compose down 

## Project Structure

text Medical-Health-Recommendation ├── backend │   ├── app │   ├── requirements.txt │   └── Dockerfile │ ├── frontend │   ├── app │   ├── components │   ├── services │   └── Dockerfile │ ├── docker-compose.yml └── README.md 

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /auth/register | Register a user |
| POST | /auth/login | Login |
| GET | /auth/me | Current user |
| POST | /predict | Analyze symptoms |
| GET | /history | User prediction history |

## Future Improvements

- AI-powered symptom analysis
- More comprehensive medical knowledge base
- Email verification
- Password reset functionality
- Admin dashboard
- Deployment to AWS or Azure

## License

This project was developed for educational and academic purposes.