from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


users = Table(
    'users',meta,Column('id',Integer,primary_key=True),
                    Column('userName'),
                    Column('userEmail'),
                    Column('userPassword'),
) 