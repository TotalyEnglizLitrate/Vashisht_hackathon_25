import routes
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, initialize_app
from routes.database import SQLModel, engine

def create_db():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()
    yield

cred = credentials.Certificate("firebase_credentials.json")
initialize_app(cred) 
app = FastAPI(lifespan=lifespan)
app.include_router(routes.dash.router, prefix="/dash")
app.include_router(routes.user_app.router, prefix="/app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
