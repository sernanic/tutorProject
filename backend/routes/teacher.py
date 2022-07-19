from fastapi import APIRouter
from config.db import connection
from models.index import teacher
from schemas.teacher import Teacher


teachers = APIRouter()


@teachers.get('/teachers/list')
async def read_data():
    return connection.execute(teacher.select()).fetchall()

@teachers.get('/teachers/{id}/view')
async def read_data(id):
    return connection.execute(teacher.select().where(users.c.id == id)).fetchall()

@teachers.post('/teachers')
async def write_data(teacherSchema:Teacher):
    connection.execute(teacher.insert().values(
        teacherName = teacherSchema.teacherName,
        teacherEmail = teacherSchema.teacherEmail,
        teacherPassword = teacherSchema.teacherPassword,
        isAdmin = teacherSchema.isAdmin,
    ))
    return connection.execute(teacher.select()).fetchall()

@teachers.put('/update/teacher/{id}')
async def update_data(id:int,teachers:Teacher):
    connection.execute(teacher.update().values(
        teacherName = teacher.userName,
        teacherEmail = teacher.userEmail,
        teacherPassword = teacher.userPassword,
    ).where(teacher.c.id == id))
    return connection.execute(teacher.select()).fetchall()

@teachers.delete('/teacher/delete/{id}')
async def delete_data(id:int,teacher:Teacher):
    connection.execute(teacher.delete().where(teacher.c.id == id))
    return connection.execute(teacher.select()).fetchall()

