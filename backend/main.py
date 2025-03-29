import routes
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes.database import SQLModel, engine

def create_db():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()
    yield
    
app = FastAPI(lifespan=lifespan)
app.include_router(routes.dash.router, prefix="/app")
app.include_router(routes.user_app.router, prefix="/dash")

@app.get("/")
def read_root():
    return {"Hello": "World"}

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
