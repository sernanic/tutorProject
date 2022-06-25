from pydantic import BaseModel

class Parent(BaseModel):
    parentName:str
    parentEmail:str
    parentPassword:str