# Standard Library
from datetime import datetime, timedelta

# Types
from typing import Any, Union, Optional

# SQLAlchemy
from sqlalchemy.orm import Session

# JWT
from jose import jwt

# Hashing
from passlib.context import CryptContext

# Custom Modules
import os
from dotenv import load_dotenv
from schemas.user import UserSchema
from routes.crud.users import get_by_email

load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT (access token) based on the provided data
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check that hashed(plain_password) matches hashed_password.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Return the hashed version of password
    """
    return pwd_context.hash(password)


def decode_token(token: str):
    """Return a dictionary that represents the decoded JWT.
    """
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


def authenticate_user(db: Session, email: str, password: str) -> Union[bool, UserSchema]:
    """Based on the provided email & password, verify that the credentials match
    the records contained in the database.
    """
    user = get_by_email(db, email)
    if not user:
        # No user with that email exists in the database
        return False
    if not verify_password(password, user.hashed_password):
        # The user exists but the password was incorrect
        return False
    return user