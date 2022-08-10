from sqlalchemy import Integer, String, Column 
from config.db import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), index=True, nullable=False)
    password = Column(String(50), index=True)
