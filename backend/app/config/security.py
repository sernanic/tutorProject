from datetime import datetime, timedelta
from typing import Optional
# JWT
from jose import jwt
# Hashing
from passlib.context import CryptContext
# Dotenv
import os
from dotenv import load_dotenv
# Oauth2
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

# JWT token related
SECRET_KEY=os.environ.get('SECRET_KEY')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
 
# Encryption
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Oauth2
oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check that hashed(plain_password) matches hashed_password.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Return the hashed version of password
    """
    return pwd_context.hash(password)

