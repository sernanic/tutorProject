from config.security import get_password_hash, verify_password, create_access_token, get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .schemas import UserDisplay, UserBase
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .models import User
from config.db import get_db

auth_router = APIRouter()
user_router = APIRouter()


# User related Endpoints
@user_router.get('/{id}/', response_model=UserDisplay)
async def get_user(id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """gets single user"""
    user = db.query(User).filter(User.id == id).first()
    return UserDisplay(
        id=user.id,
        email=user.email,
        name=user.name,
    )

@user_router.get('/', response_model=list[UserDisplay])
async def get_users(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """gets all users"""
    return db.query(User).all()

@user_router.post('/create/', response_model=UserBase)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    """creates an user"""
    db_user = User(name=user.name, email=user.email, password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Auth related Endpoints
@auth_router.post('/token/')
def get_token(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='user not found')
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Incorrect password')
    access_token = create_access_token(data={'sub': user.email})

    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user_id': user.id,
    }
