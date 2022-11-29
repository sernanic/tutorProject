# Index file for all api routers
from fastapi import APIRouter
from users.routes import user_router, auth_router,excercise_router

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["users"])
api_router.include_router(auth_router, prefix="", tags=["token"])
api_router.include_router(excercise_router, prefix="/exercise", tags=["exercises"])


