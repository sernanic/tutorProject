from sqlalchemy import Integer, String, Column , Boolean
from config.db import Base


class Teacher(Base):
    __tablename__ = 'teacher'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), index=True)
    password = Column(String(100), index=True)
    student_list = Column(String(100), index=True)
    is_admin = Column(Boolean, default=False)
