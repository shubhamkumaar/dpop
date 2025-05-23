import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

def split_ddl(ddl_statement):
    """
    Splits the DDL statement into an array format and verifies its correctness using Google Gemini API.
    Args:
        ddl_statement (str): The DDL statement to split and verify.
    Returns:
        str: The JSON array containing the split DDL statements.
    """
    client = genai.Client(
        api_key=api_key,
    )

    model = "gemini-2.0-flash-lite"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""{ddl_statement}

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
- Don't create any extra ddl_statement
- If you any dependency in the DDL, it means the table is already created, so don't create it again
Follow this format of the response:-
{{
  \"ddl_statement": \"[
    \"CREATE TABLE order_items (item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),order_id UUID NOT NULL,product_name VARCHAR(100),quantity INT CHECK (quantity > 0),price DECIMAL(10, 2),FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE);"
    \"CREATE TABLE orders (order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),customer_id UUID NOT NULL,order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE);"
    ]
}}"""),
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
        # print(chunk.text, end="")
        if chunk.text:
            response += chunk.text
    
    # Save the response to a json file 
    os.makedirs("tmp", exist_ok=True)
    with open("tmp/split_ddl.json", "w") as f:
        f.write(response)