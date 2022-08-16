from config.security import get_password_hash
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UserResponse, UserCreate, UserSchema
from models.user import User
from routes.deps import get_db
from config.security import oauth2_schema

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
    return db.query(User).all()

# @router.get('/users/{UsersName}/{UsersPassword}/login')
# async def read_data(UsersName,UsersPassword):
#     print('hello')
#     return connection.execute(Users.select().where(Users.c.UsersName == UsersName and Users.c.UsersPassword == UsersName )).fetchall()

@router.post('/create/', response_model=UserSchema)
async def create_user(user: UserSchema, db: Session = Depends(get_db), token: str = Depends(oauth2_schema)):
    """creates an user"""
    db_user = User(name=user.name, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


