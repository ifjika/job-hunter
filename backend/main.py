from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from parser import cv_parser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    contents = ""

    if file.filename.endswith(".pdf"):
        contents = cv_parser.read_pdf(file.file)
    elif file.filename.endswith(".docx"):
        contents = cv_parser.read_docx(file.file)

    if not contents:
        return {"error": "Tidak bisa membaca isi CV"}

    data = cv_parser.extract_info(contents)
    return {"filename": file.filename, "data": data}
