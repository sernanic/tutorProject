from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


notes = Table(
    'notes',meta,Column('id',Integer,primary_key=True),
                    Column('desc'),
                    Column('date'),
) 