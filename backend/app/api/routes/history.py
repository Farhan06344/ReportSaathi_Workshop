from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any

from app.services.supabase_client import get_report_history

router = APIRouter(prefix="/history", tags=["history"])

@router.get("", response_model=List[Dict[str, Any]])
async def list_history(user_id: Optional[str] = Query(None)):
    """Retrieve previously explained reports for this session or user."""
    return get_report_history(user_id=user_id)
