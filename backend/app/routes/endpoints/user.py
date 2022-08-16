from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import UserSchema
from models.user import User
from routes.deps import get_db
from config.security import oauth2_schema

router = APIRouter()


@router.get('/list/{id}/', response_model=UserSchema)
async def get_user(id: int, db: Session = Depends(get_db)):
    """gets single user"""
    return db.query(User).filter(User.id == id).first()


@router.get('/list/', response_model=list[UserSchema])
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

# @router.put('/updateUsers/{id}')
# async def update_data(id:int,Users:Users):
#     connection.execute(Users.update().values(
#         UsersName = Users.UsersName,
#         UsersEmail = Users.UsersEmail,
#         UsersPassword = Users.UsersPassword,
#     ).where(Users.c.id == id))
#     return connection.execute(Users.select()).fetchall()

# @router.delete('/delete/{id}')
# async def delete_data(id:int,Users:Users):
#     connection.execute(Users.delete().where(Users.c.id == id))
#     return connection.execute(Users.select()).fetchall()

