
from fastapi import FastAPI
from index.api import api_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000/",
]


app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Allows all origins
allow_credentials=True,
allow_methods=["*"], # Allows all methods
allow_headers=["*"], # Allows all headers
)


app.include_router(api_router, prefix='')


@app.get("/")
async def read_data():
    return "hello "

# Allows you to start the server with (python3 main.py)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)