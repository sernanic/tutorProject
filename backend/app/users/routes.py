from config.security import get_password_hash, verify_password, create_access_token, get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .schemas import UserDisplay, UserBase,Exercise,AssigmentBase
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .models import User,Exercises,Assignments
from config.db import get_db

auth_router = APIRouter()
user_router = APIRouter()
excercise_router = APIRouter()
assignment_router = APIRouter()
# User related Endpoints
@user_router.get('/{id}/', response_model=UserDisplay)
async def get_user(id: int, db: Session = Depends(get_db)):
    """gets single user"""
    user = db.query(User).filter(User.id == id).first()
    return UserDisplay(
        id=user.id,
        email=user.email,
        name=user.name,
    )

@user_router.get('/email/{email}/', response_model=UserDisplay)
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    """gets single user"""
    user = db.query(User).filter(User.email == email).first()
    return UserDisplay(
        id=user.id,
        email=user.email,
        name=user.name,
    )

@user_router.get('/', response_model=list[UserDisplay])
async def get_users(db: Session = Depends(get_db)):
    """gets all users"""
    return db.query(User).all()

@excercise_router.get('/excercises/{sessionId}/{userId}', response_model=list[Exercise])
async def get_excercises(sessionId:int,userId:int,db: Session = Depends(get_db)):
    """gets all Exercises"""
    return db.query(Exercises).filter(Exercises.sessionId == sessionId,Exercises.userId==userId).all()

@assignment_router.get('/{userId}', response_model=list[AssigmentBase])
async def get_assignments(userId:int,db: Session = Depends(get_db)):
    """gets all sessions"""
    return db.query(Assignments).filter(Assignments.userId == userId).all()

@excercise_router.get('/excercise/{exerciseId}/{userId}', response_model=Exercise)
async def get_excercise(exerciseId:int,userId:int,db: Session = Depends(get_db)):
    """gets all Exercises"""
    return db.query(Exercises).filter(Exercises.exerciseId == exerciseId,Exercises.userId==userId).first()

@excercise_router.post('/create/', response_model=Exercise)
async def create_user(exercise: Exercise, db: Session = Depends(get_db)):
    """creates an Exercise"""
    db_excercise = Exercise(
        sessionId=exercise.sessionId, \
        name=exercise.name,sets=exercise.sets,videoLink=exercise.videoLink,imageLink=exercise.imageLink, \
        exerciseType=exercise.exerciseType,score=exercise.score,duration=exercise.duration, \
        difficultyLevel=exercise.difficultyLevel,userId=exercise.userId
    )
    db.add(db_excercise)
    db.commit()
    db.refresh(db_excercise)
    return db_excercise

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
    print(request)
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
