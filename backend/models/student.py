from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


users = Table(
    'students',meta,Column('id',Integer,primary_key=True),
                    Column('studetnName'),
                    Column('studentEmail'),
                    Column('studentPassword'),
                    Column('parentId'),
                    Column('age'),
                    Column('isAdult'),

) 