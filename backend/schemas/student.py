from pydantic import BaseModel
from models import student
class Student(BaseModel):
    studentName:str
    studentEmail:str
    studentPassword:str
    parentId:str
    age:str
    isAdult:str