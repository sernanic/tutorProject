from sqlalchemy import Integer, String, Column, DateTime
from config.db import Base
from datetime import datetime


class Note(Base):
    __tablename__ = 'note'
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(100), index=True)
    date = Column(DateTime, default=datetime.now)
