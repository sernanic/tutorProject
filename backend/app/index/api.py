# Index file for all api routers
from fastapi import APIRouter
from users.routes import user_router, auth_router

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["users"])
api_router.include_router(auth_router, prefix="", tags=["token"])

