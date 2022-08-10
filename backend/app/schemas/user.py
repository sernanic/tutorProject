from pydantic import BaseModel, EmailStr

class UserSchema(BaseModel):
    name:str
    email:EmailStr
    password:str

    class Config:
        orm_mode = True