from sqlalchemy import Integer, String, Column , Boolean
from config.db import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    account_verified = Column(Boolean, nullable=False, default=False)
