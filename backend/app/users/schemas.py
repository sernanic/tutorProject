from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    password: str

    class Config:
        orm_mode = True


class UserDisplay(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        orm_mode = True


class AssigmentBase(BaseModel):
    assigmentId:int
    name:str
    numberOfActivites:int
    userId:int
    class Config:
        orm_mode = True

class Exercise(BaseModel):
    exerciseId:int
    sessionId:int
    name:str
    sets:int
    videoLink:str
    imageLink:str
    exerciseType:str
    score:int
    duration:int
    difficultyLevel:int
    userId:int
    class Config:
        orm_mode = True

