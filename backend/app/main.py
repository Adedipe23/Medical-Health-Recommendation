from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.api.routes import auth, prediction, history

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Medical Recommendation System",
    description="A symptom checker and health recommendation API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(prediction.router)
app.include_router(history.router)


@app.get("/")
def root():
    return {"message": "Medical Recommendation System API is running"}
