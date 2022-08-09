# from fastapi import APIRouter
# from config.db import connection
# from models.index import Teacher
# from schemas.teacher import Teacher


# Teachers = APIRouter()


# @Teachers.get('/Teachers/list')
# async def read_data():
#     return connection.execute(Teacher.select()).fetchall()

# @Teachers.get('/Teachers/{id}/view')
# async def read_data(id):
#     return connection.execute(Teacher.select().where(users.c.id == id)).fetchall()

# @Teachers.post('/Teachers')
# async def write_data(TeacherSchema:Teacher):
#     connection.execute(Teacher.insert().values(
#         TeacherName = TeacherSchema.TeacherName,
#         TeacherEmail = TeacherSchema.TeacherEmail,
#         TeacherPassword = TeacherSchema.TeacherPassword,
#         isAdmin = TeacherSchema.isAdmin,
#     ))
#     return connection.execute(Teacher.select()).fetchall()

# @Teachers.put('/update/Teacher/{id}')
# async def update_data(id:int,Teachers:Teacher):
#     connection.execute(Teacher.update().values(
#         TeacherName = Teacher.userName,
#         TeacherEmail = Teacher.userEmail,
#         TeacherPassword = Teacher.userPassword,
#     ).where(Teacher.c.id == id))
#     return connection.execute(Teacher.select()).fetchall()

# @Teachers.delete('/Teacher/delete/{id}')
# async def delete_data(id:int,Teacher:Teacher):
#     connection.execute(Teacher.delete().where(Teacher.c.id == id))
#     return connection.execute(Teacher.select()).fetchall()

