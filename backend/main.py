from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()


@app.post("/upload")
async def upload_cv(file: UploadFile = File(...)):
    try:
        with open(f"temp_{file.filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            return JSONResponse(content={"message": "File upload successfuly"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})


@app.get("/recommendations")
async def get_recommendations():
    return JSONResponse(
        content=[
            {"title": "Software Engineer", "company": "ABC Corp"},
            {"title": "Data Scientist", "company": "XYZ Ltd"},
        ]
    )
