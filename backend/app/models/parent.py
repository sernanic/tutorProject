from sqlalchemy import Integer, String, Column 
from config.db import Base


class Parent(Base):
    __tablename__ = 'parent'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), index=True)
    password = Column(String(50), index=True)
