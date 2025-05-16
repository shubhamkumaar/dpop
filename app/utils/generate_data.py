import base64
import os
from google import genai
from google.genai import types

def generate_script(ddl_statement,rows_per_table=30):
    print("Generating script for DDL statement...")
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY"),
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
    res = res.replace("```sql", "").replace("```", "")    
    return res

