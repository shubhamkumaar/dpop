import json
import bcrypt
# Load the JSON file
# with open("ddl.json", "r") as file:
#     res = json.load(file)

# for i, statement in enumerate(res["ddl_statement"]):
#     print("Statement", i, statement)

def hash_password(sql,password):
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

print(hash_password("SELECT * FROM users WHERE password = '#password'", "password"))

