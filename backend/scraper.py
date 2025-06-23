from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


def scrap_jobstreet(keyword: str, location: str):
    query = f"{keyword.strip().replace(' ', '-')}-jobs/{location.strip().lower()}"
    url = f"https://www.jobstreet.co.id/id/job-search/{query}"

    with sync_playwright() as s:
        browser = s.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, timeout=60000)
        page.wait_for_selector("article")

        print("Page content :", page.content())

        soup = BeautifulSoup(page.content(), "html.parser")
        job_cards = soup.find_all("article")[:10]

        print(f"Found {len(job_cards)} job listings")

        results = []
        for card in job_cards:
            title = card.find("h1") or card.find("h3")
            company = card.find("span", {"class": "company"})
            link_tag = card.find("a", href=True)
            link = (
                "http://www.jobstreet.co.id" + link_tag["href"] if link_tag else "N/A"
            )

            results.append(
                {
                    "title": title.text.strip() if title else "N/A",
                    "company": company.text.strip() if company else "N/A",
                    "link": link,
                }
            )

        browser.close()
        return results
