from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


teacher = Table(
    'teacher',meta,Column('teacherId',Integer,primary_key=True),
                    Column('teacherName'),
                    Column('teacherEmail'),
                    Column('teacherPassword'),
                    Column('studentList'),
                    Column('isAdmin'),
) 