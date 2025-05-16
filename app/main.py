from fastapi import FastAPI
import json
import requests
from fastapi.middleware.cors import CORSMiddleware
from .utils.split_ddl import split_ddl
from .utils.generate_data import generate_script
from .data.dummy_pdf import pdf

app = FastAPI(root_path="/api")

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
    "http://localhost",
    "http://localhost:8080",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def getImages(page):
    images = []
    url = f"https://picsum.photos/v2/list?page={page}&limit=100"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        for d in data:
            images.append(d['download_url'])
    return images

@app.post("/")
def read_root(ddl: str = None, rows_per_table: int = 30):
    if ddl is None:
        return {"message": "You have to pass the ddl as a query parameter"}
    # """CREATE TABLE media_library (
    #     media_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    #     name VARCHAR(255) NOT NULL,
    #     file_url TEXT,         -- PDF file URL
    #     cover TEXT,            -- Image (cover) URL
    #     uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    # );"""
    t = """
        CREATE TABLE users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL
    );
    CREATE TABLE order_items (
        item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL,
        product_name VARCHAR(100),
        quantity INT CHECK (quantity > 0),
        price DECIMAL(10, 2),
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    );
    CREATE TABLE orders (
        order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        order_date DATE DEFAULT CURRENT_DATE,
        amount DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );"""
    
    # Split the DDL into individual statements
    split_ddl(ddl)
    
    # Load the JSON file
    with open("split_ddl.json", "r") as file:
        res = json.load(file)
    
    sql_scripts = ""
    curr_ddl = ""
    count = 0
    # Loop through each DDL statement and generate the SQL script    
    for statement in res["ddl_statement"]:
        curr_ddl += statement + "\n"
        count += rows_per_table   
        if count >= 30: 
           sql_scripts += generate_script(curr_ddl,rows_per_table)
           count = 0
           curr_ddl = ""
        
    if curr_ddl:
        sql_scripts = generate_script(curr_ddl,rows_per_table)


    # Replace the #pdf markers with actual data
    pdf_index = 0
    cursor = 0
    while True:
        marker = sql_scripts.find("#pdf",cursor)
        if marker == -1:
            break
        end_index = marker + 4
        sql_scripts = sql_scripts[:marker] + pdf[pdf_index] + sql_scripts[end_index:]
        pdf_index += 1
        pdf_index = pdf_index % len(pdf)
      
    images = []
    page = 1
    if(sql_scripts.find("#img") == -1):
        images = getImages(page)
                
    img_index = 0  
    # Replacing the #img marker with the image URL 
    while True:
        marker = sql_scripts.find("#img",cursor)
        if marker == -1:
            break
        end_index = marker + 4
        
        # Getting Images
        if img_index >= len(images):
            page += 1
            images = getImages(page)
            img_index = 0  
            
        #Replacing the marker with the image URL   
        sql_scripts = sql_scripts[:marker] + images[img_index] + sql_scripts[end_index:]
        img_index += 1
        
    # Write the SQL scripts to a file   
    with open("sql_scripts1.sql", "w") as f:
        f.write(sql_scripts)
    return {"message": sql_scripts}
    