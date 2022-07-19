from pydantic import BaseModel
from models import teacher
class Teacher(BaseModel):
    teacherName:str
    teacherEmail:str
    teacherPassword:str
    studentList:str
    isAdmin:bool