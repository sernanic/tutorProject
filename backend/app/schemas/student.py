from pydantic import BaseModel

class Student(BaseModel):
    studentName:str
    studentEmail:str
    studentPassword:str
    parentId:str
    age:str
    isAdult:str
    
    class Config:
        orm_mode = True