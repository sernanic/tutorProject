from fastapi import APIRouter
from config.db import connection
from models.index import users
from schemas.index import User


user = APIRouter()


@user.get('/users/list')
async def read_data():
    return connection.execute(users.select()).fetchall()

@user.get('/users/{id}/view')
async def read_data(id):
    return connection.execute(users.select().where(users.c.id == id)).fetchall()

@user.post('/')
async def write_data(user:User):
    connection.execute(users.insert().values(
        userName = user.userName,
        userEmail = user.userEmail,
        userPassword = user.userPassword,
    ))
    return connection.execute(users.select()).fetchall()

@user.put('/updateUser/{id}')
async def update_data(id:int,user:User):
    connection.execute(users.update().values(
        userName = user.userName,
        userEmail = user.userEmail,
        userPassword = user.userPassword,
    ).where(users.c.id == id))
    return connection.execute(users.select()).fetchall()

@user.delete('/delete/{id}')
async def delete_data(id:int,user:User):
    connection.execute(users.delete().where(users.c.id == id))
    return connection.execute(users.select()).fetchall()

