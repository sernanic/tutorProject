from pydantic import BaseModel

class Teacher(BaseModel):
    teacherName:str
    teacherEmail:str
    teacherPassword:str
    studentList:str
    isAdmin:bool

    class Config:
        orm_mode = True