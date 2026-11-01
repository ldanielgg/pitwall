from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# creates the backend application
app = FastAPI(
    title = "Pitwall API",
    description = "Backend API for the Pitwall F1 strategy application",
    version = "1.0.0"
)

# lets the front end request the backend
app.add_middleware(
    CORSMiddleware, #allows frontend and backend communication between ports
    allow_origins = ["http://localhost:5173"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# registers an HTTP get endpoint
@app.get("/api/health")
# returns a JSON response
def health_check():
    return {
        "status": "healthy",
        "application": "Pitwall API"
    }