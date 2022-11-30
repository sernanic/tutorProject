from sqlalchemy import Integer, String, Column
from config.db import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)


class Assignments(Base):
    __tablename__ = 'assignments'

    assigmentId = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    numberOfActivites= Column(Integer, index=True)
    userId = Column(Integer, index=True)


class Exercises(Base):
    __tablename__ = 'exercises'

    exerciseId = Column(Integer, primary_key=True, index=True)
    sessionId = Column(Integer, index=True)
    name = Column(String(50), index=True)
    sets= Column(Integer, index=True)
    videoLink = Column(String(200), index=True)
    imageLink = Column(String(200), index=True)
    exerciseType = Column(String(200), index=True)
    score= Column(Integer, index=True)
    duration= Column(Integer, index=True)
    difficultyLevel= Column(Integer, index=True)
    userId = Column(Integer, index=True)









