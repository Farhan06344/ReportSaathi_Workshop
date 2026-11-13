import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.core.config import settings

logger = logging.getLogger(__name__)

# In-memory history cache for Guest Mode
_guest_history: List[Dict[str, Any]] = []

def get_supabase_client():
    """Returns Supabase client instance if configured, else None."""
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        try:
            from supabase import create_client
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        except Exception as e:
            logger.warning(f"Failed to initialize Supabase client: {e}")
            return None
    return None

def save_report_history(data: Dict[str, Any], user_id: Optional[str] = None) -> Dict[str, Any]:
    """Saves report explanation to Supabase if configured, otherwise into local session cache."""
    report_entry = {
        "id": f"rep_{int(datetime.utcnow().timestamp())}",
        "user_id": user_id or "guest",
        "title": data.get("report_title", "Lab Report Summary"),
        "summary": data.get("patient_summary", ""),
        "metrics_count": len(data.get("metrics", [])),
        "created_at": datetime.utcnow().isoformat(),
        "data": data
    }
    
    supabase = get_supabase_client()
    if supabase and user_id and user_id != "guest":
        try:
            res = supabase.table("reports").insert(report_entry).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logger.error(f"Error saving to Supabase: {e}. Falling back to memory.")
            
    # Save to guest session
    _guest_history.insert(0, report_entry)
    return report_entry

def get_report_history(user_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Retrieves report history from Supabase if configured, otherwise returns guest memory history."""
    supabase = get_supabase_client()
    if supabase and user_id and user_id != "guest":
        try:
            res = supabase.table("reports").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
            return res.data or []
        except Exception as e:
            logger.error(f"Error reading from Supabase: {e}")
            
    return _guest_history
