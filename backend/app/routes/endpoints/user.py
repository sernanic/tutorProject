from config.security import get_password_hash
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UserResponse, UserCreate, UserSchema
from models.user import User
from routes.crud.users import get_by_email
from ..deps import get_db

router = APIRouter()


@router.get('/{id}/', response_model=UserResponse)
async def get_user(id: int, db: Session = Depends(get_db)):
    """gets single user"""
    user = db.query(User).filter(User.id == id).first()
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
    )


@router.get('/', response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    """gets all users"""
    users = db.query(User).all()
    return [UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
    ) for user in users]


@router.post('/create', status_code=201)
async def create(*, db: Session = Depends(get_db), user: UserCreate):
    db_user = get_by_email(db=db, email=user.email)

    if db_user:
        raise HTTPException(status_code=400, detail=f'Email is taken {db_user}')
    
    new_user = User(
        email=user.email,
        name=user.name,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


