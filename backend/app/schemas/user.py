from pydantic import BaseModel

# Types
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    password: str


class UserDisplay(BaseModel):
    email: str
    name: str

    class Config:
        orm_mode = True



