from tokenize import String
from sqlalchemy import Integer, Table,Column 
from config.db import meta


parents = Table(
    'parents',meta,Column('id',Integer,primary_key=True),
                    Column('parentName'),
                    Column('parentEmail'),
                    Column('parentPassword'),
) 