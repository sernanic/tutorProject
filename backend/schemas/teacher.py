from pydantic import BaseModel
from models import student
class Teacher(BaseModel):
    teacherName:str
    teacherEmail:str
    teacherPassword:str
    isAdmin:bool
    studentList:str