from pydantic import BaseModel

# Types
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    password: str


class UserSchema(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserWithPassword(UserSchema):
    hashed_password: str

    class Config:
        orm_mode = True


class UserDeleteRequestBody(BaseModel):
    password: str


class UserUpdateResponseBody(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        orm_mode = True


class UserUpdateRequestBody(BaseModel):
    password: str
    newUsername: Optional[str]


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
