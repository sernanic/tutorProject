
from urllib.parse import quote
from sqlalchemy import create_engine, MetaData

from sqlalchemy_utils import create_database, database_exists
user = 'root'
password = 'Maitre3!'

# url = 'mysql://{0}:{1}@{2}:{3}'.format(user, password, host, port)
# if not database_exists(url):
#     create_database(url)

engine = create_engine('mysql+pymysql://root:%s@localhost:3306/tutorProject' % quote('Maitre3!'))
meta = MetaData() 
connection = engine.connect()