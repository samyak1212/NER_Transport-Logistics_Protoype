"""
API Router for Ground Incident Reports, Photo Uploads, and Road Reopening.
"""
import os
import uuid
import aiofiles
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from backend.models.schemas import FieldReportCreate, FieldReportResponse
from backend.services.field_report_service import FieldReportService

router = APIRouter(prefix="/field-reports", tags=["Field Operations & Incident Reports"])


def get_field_service():
    from backend.main import app
    return app.state.field_report_service


@router.get("", response_model=List[FieldReportResponse])
def get_reports(active_only: bool = False, service: FieldReportService = Depends(get_field_service)):
    """Fetches list of all field reports."""
    return service.get_all_reports(active_only=active_only)


@router.post("", response_model=FieldReportResponse)
def submit_report(report_in: FieldReportCreate, service: FieldReportService = Depends(get_field_service)):
    """Submits a new geo-tagged incident report. Snaps to nearest highway edge."""
    return service.submit_report(report_in)


@router.post("/{report_id}/resolve", response_model=FieldReportResponse)
def resolve_report(report_id: str, service: FieldReportService = Depends(get_field_service)):
    """Marks an incident cleared and reopens road segment in routing graph."""
    res = service.resolve_report(report_id)
    if not res:
        raise HTTPException(status_code=404, detail=f"Report '{report_id}' not found.")
    return res


@router.post("/upload-photo")
async def upload_incident_photo(file: UploadFile = File(...)):
    """Uploads a field photo of an incident (landslide, road washout, fallen tree)."""
    upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
    os.makedirs(upload_dir, exist_ok=True)

    file_ext = os.path.splitext(file.filename)[1] or ".jpg"
    unique_filename = f"field_{uuid.uuid4().hex[:10]}{file_ext}"
    dest_path = os.path.join(upload_dir, unique_filename)

    async with aiofiles.open(dest_path, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    return {"photo_url": f"/uploads/{unique_filename}", "filename": unique_filename}
