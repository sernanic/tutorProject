from config.security import get_password_hash
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UserDisplay, UserBase
from models.user import User
from routes.deps import get_db
from config.security import get_current_user

router = APIRouter()


@router.get('/{id}/', response_model=UserDisplay)
async def get_user(id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """gets single user"""
    user = db.query(User).filter(User.id == id).first()
    return UserDisplay(
        id=user.id,
        email=user.email,
        name=user.name,
    )

@router.get('/', response_model=list[UserDisplay])
async def get_users(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """gets all users"""
    return db.query(User).all()

@router.post('/create/', response_model=UserBase)
async def create_user(user: UserBase, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """creates an user"""
    db_user = User(name=user.name, email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


