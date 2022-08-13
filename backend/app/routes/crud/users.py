from fastapi import Depends
from sqlalchemy.orm import Session
from models.user import User
from ..deps import get_db

def get_by_email(*, db: Session = Depends(get_db), email: str):
    query = db.query(User).filter(User.email == email)
    return query.one_or_none()