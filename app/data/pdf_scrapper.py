from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

# Set up headless Chrome
options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)

# Open the page
url = "https://freetestdata.com/document-files/pdf/"
driver.get(url)
print("Page title is:", driver.title)

print("Waiting for the page to load...")
# Let the page load
time.sleep(3)

# Get the full page HTML after JS execution
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# Find PDF links
pdf_links = []
print("Searching for PDF links...")
for link in soup.find_all("a", href=True):
    href = link["href"]
    if ".pdf" in href:
        pdf_links.append(href)

# Close the browser
driver.quit()

# Print results
for pdf in pdf_links:
    print(pdf)
