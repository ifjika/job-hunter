import re
import pdfplumber
import docx2txt


def read_pdf(file) -> str:
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
        return text


def read_docx(file) -> str:
    return docx2txt.process(file)


def extract_info(text: str) -> dict:
    info = {
        "name": "",
        "email": "",
        "phone": "",
        "education": "",
        "experience": "",
    }

    email_match = re.search(r"[\w\.-]+@[\w\.-]+", text)
    phone_match = re.search(r"(\+62|08)[0-9\s\-]{8,}", text)

    if email_match:
        info["email"] = email_match.group(0)

    if phone_match:
        info["phone"] = phone_match.group(0)

    lines = text.strip().split("\n")

    for line in lines:
        if line.strip():
            info["name"] = " ".join(line.strip().split())[:3]
            break

    if "Universitas" in text or "SMA" in text:
        info["education"] = "Terdeksi pendidikan"

    if "PT" in text or "freelance" in text.lower():
        info["experience"] = "Terdeksi pengalaman kerja"

    return info
