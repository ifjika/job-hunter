from fastapi import FastAPI, Query
from typing import List
from scraper import scrap_jobstreet

app = FastAPI()


@app.get("/scrap-jobs/")
def search_job(
    keyword: str = Query(..., example="ai engineer"),
    location: str = Query(..., example="singapore"),
):
    jobs = scrap_jobstreet(keyword, location)
    return {"results": jobs}
