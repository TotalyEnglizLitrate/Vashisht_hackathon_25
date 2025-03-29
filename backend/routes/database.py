from sqlmodel import SQLModel, create_engine, Field, Session, select

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)