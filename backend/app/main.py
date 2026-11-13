import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import reports, history

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Backend API for ReportSaathi - Simplifying medical lab reports for educational understanding."
)

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(reports.router, prefix="/api")
app.include_router(history.router, prefix="/api")

@app.get("/api/health")
async def health_check():
    import pytesseract
    try:
        tesseract_ver = str(pytesseract.get_tesseract_version())
        tesseract_ok = True
    except Exception:
        tesseract_ver = "unavailable"
        tesseract_ok = False

    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "tesseract_ocr": {
            "available": tesseract_ok,
            "version": tesseract_ver
        },
        "gemini_configured": bool(settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY.strip()) > 0),
        "supabase_configured": bool(settings.SUPABASE_URL and len(settings.SUPABASE_URL.strip()) > 0)
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
