import asyncio
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from functools import partial

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

def generate(ddl_statement,rows_per_table):
    """
    Generate dummy data for the given DDL statement using Google Gemini API.
    Args:
        ddl_statement (str): The DDL statement to generate data for.
        rows_per_table (int): The minimum number of rows to generate for each table.
    Returns:
        str: The generated SQL script with dummy data.
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
Generate the dummy data of the given DDL, minimum rows {rows_per_table}.
Rules to generate data:-
- For the reference key query the data from the table
- If the data is image mark file as  #img
- if data is pdf mark as #pdf
- if there is password in the data mark it as #password

Response rules:-
- Don't include greetings
- Don't include any message
- Don't include ```sql or any code block"""),
            ],
        )
    ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
    )
    
    # Generate content
    res = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        res += chunk.text
    return res

async def generate_script(ddl_statement, rows_per_table):
    """
    Asynchronously generates a SQL script based on a given DDL statement and number of rows per table.
    
    This function runs the synchronous `generate` function in a background thread 
    using `asyncio` to avoid blocking the event loop.
    """
    loop = asyncio.get_event_loop()
    
    # Use partial to pass arguments to the sync `generate` function
    func = partial(generate, ddl_statement, rows_per_table)
    
    # Await the result from the background thread
    res = await loop.run_in_executor(None, func)

    # Optional cleanup (only needed if your prompt accidentally triggers SQL code blocks)
    res = res.replace("```sql", "").replace("```", "")
    return res