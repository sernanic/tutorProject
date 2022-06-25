from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


classes = Table(
    'classes',meta,Column('id',Integer,primary_key=True),
                    Column('className'),
                    Column('subject'),
                    Column('studentList'),
) 