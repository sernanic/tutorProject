from pydantic import BaseModel

class Parent(BaseModel):
    parentName:str
    parentEmail:str
    parentPassword:str

    class Config:
        orm_mode = True