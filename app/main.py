from fastapi import FastAPI
import json
from .utils.split_ddl import split_ddl
from .utils.generate_data import generate_script
from .data.dummy_pdf import pdf
app = FastAPI()

@app.get("/")
def read_root():
    ddl = """CREATE TABLE media_library (
        media_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        file_url TEXT,         -- PDF file URL
        cover TEXT,            -- Image (cover) URL
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );"""
    t = """
        CREATE TABLE users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL
    );
    """
    t += """
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
    
    
    split_ddl(ddl)
    print((len(pdf)))
    
    # Load the JSON file
    with open("split_ddl.json", "r") as file:
        res = json.load(file)
    
    sql_scripts = ""
        
    for i, statement in enumerate(res["ddl_statement"]):
        script = generate_script(statement)
        sql_scripts += script
    # print(sql_scripts)
    
    # Replace the #img and #pdf markers with actual data
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
      
    # if(sql_scripts.find("#img") != -1):
          
    with open("sql_scripts1.sql", "w") as f:
        f.write(sql_scripts)
    return {"sql_scripts": sql_scripts}
    