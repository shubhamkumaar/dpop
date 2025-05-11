# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

def generate():
    client = genai.Client(
        api_key=api_key,
    )

    model = "gemini-2.0-flash-lite"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""CREATE TABLE users (
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
);

I have shared the DDL of a database, and split all the tables into an array format
- an array of strings
- JSON array
- Verify whether the DDL is correct or not
- The array name must be ddl_statement
- Arrange the DDL so that I would not create any conflict

Rules to generate 
- Don't include any message
- Don't include greetings
- No need for the verification code.

Follow this format of the response:-
{
  \"ddl_statement\": [
    \"CREATE TABLE users ( user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  name VARCHAR(100) NOT NULL,   email VARCHAR(150) UNIQUE NOT NULL);\",
    \"CREATE TABLE orders ( order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  user_id UUID NOT NULL,  order_date DATE DEFAULT CURRENT_DATE,   amount DECIMAL(10, 2) NOT NULL,  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);\",
    \"CREATE TABLE order_items ( item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  order_id UUID NOT NULL,   product_name VARCHAR(100), quantity INT CHECK (quantity > 0),    price DECIMAL(10, 2), FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE);\"
  ]
}"""),
            ],
        ),
        
    ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
    )
    response = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")
        if chunk.text:
            response += chunk.text
    with open("test.json", "w") as f:
        f.write(response)

if __name__ == "__main__":
    generate()
