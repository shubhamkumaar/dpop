import json

# Load the JSON file
with open("ddl.json", "r") as file:
    res = json.load(file)

for i, statement in enumerate(res["ddl_statement"]):
    print("Statement", i, statement)
    