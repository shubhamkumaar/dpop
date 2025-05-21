from fastapi import FastAPI
import json
import requests
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from .utils.split_ddl import split_ddl
from .utils.generate_data import generate_script
from .data.dummy_pdf import pdf
import os
from functools import partial
import bcrypt

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
    """
    Fetches images from the Lorem Picsum API.
    """
    images = []
    url = f"https://picsum.photos/v2/list?page={page}&limit=100"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        for d in data:
            images.append(d['download_url'])
    return images

def load_ddl_statements():
    """
    Loads the DDL statements from the JSON file.
    """
    with open("tmp/split_ddl.json", "r") as file:
        ddl_statements = json.load(file).get("ddl_statement", [])
    return ddl_statements

def hash_password(sql,password):
    """
    Hashes the password in the SQL statement using bcrypt.
    """
    if '#password' in sql:
        # Split the SQL statement by the #password marker
        parts = sql.split('#password')
        # Hash the password part
        sql = parts[0]
        for i in range(1, len(parts)):
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            hashed = hashed.decode('utf-8')
            sql += hashed+parts[i]
    return sql
    
@app.post("/")
async def read_root(ddl: str = None, rows_per_table: int = 50, password: str = None):
    """
    Main endpoint to process the DDL and generate SQL scripts.
    
    Parameters: ddl (str): DDL statement to be processed.
                rows_per_table (int): Number of rows per table to generate.
                password (str): Password to be hashed in the SQL statement.
                
    Returns: JSON response with the generated SQL scripts.
    """
    if ddl is None:
        return {"message": "You have to pass the ddl as a query parameter"}
    loop = asyncio.get_running_loop()
    
    func = partial(split_ddl, ddl)    
    ddl_statements = await loop.run_in_executor(None, func)
    # Read and parse split DDL statements
    ddl_statements = await loop.run_in_executor(None, load_ddl_statements)
    # return {"message": ddl_statements}
    sql_tasks = []
    curr_ddl = []
    count = 0
    # Split the DDL statements into chunks of 50
    for statement in ddl_statements:
        curr_ddl.append(statement)
        count += rows_per_table

        if count >= 50:
            ddl_chunk = "\n".join(curr_ddl)
            sql_tasks.append(generate_script(ddl_chunk, rows_per_table))
            curr_ddl = []
            count = 0

    if curr_ddl:
        ddl_chunk = "\n".join(curr_ddl)
        sql_tasks.append(generate_script(ddl_chunk, rows_per_table))

    # Run all generate_script tasks concurrently
    sql_script_parts = await asyncio.gather(*sql_tasks)
    sql_scripts = ''.join(sql_script_parts)

    # Replace #pdf markers
    if '#pdf' in sql_scripts:
        parts = sql_scripts.split('#pdf')
        sql_scripts = parts[0]
        for i in range(1, len(parts)):
            sql_scripts += pdf[i % len(pdf)] + parts[i]

    # Replace #img markers
    if '#img' in sql_scripts:
        parts = sql_scripts.split('#img')
        sql_scripts = parts[0]
        page = 1
        images = getImages(page)
        img_index = 0

        for i in range(1, len(parts)):
            if img_index >= len(images):
                page += 1
                images = getImages(page)
                img_index = 0
            sql_scripts += images[img_index] + parts[i]
            img_index += 1
            
    # Replace #password markers
    sql_scripts = hash_password(sql_scripts, password) if password else sql_scripts
    
    os.unlink("tmp/split_ddl.json")
    return {"message": sql_scripts}
