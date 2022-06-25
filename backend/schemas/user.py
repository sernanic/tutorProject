from pydantic import BaseModel

class User(BaseModel):
    userName:str
    userEmail:str
    userPassword:str