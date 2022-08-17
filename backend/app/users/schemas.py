from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    password: str

    class Config:
        orm_mode = True


class UserDisplay(BaseModel):
    email: str
    name: str

    class Config:
        orm_mode = True
