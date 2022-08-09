from sqlalchemy import Integer, String, Column 
from config.db import Base


class Class(Base):
    __tablename__ = 'class'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    subject = Column(String(50), index=True)
    student_list = Column(String(50), index=True)
