import sqlite3

import dash
import user_app
from sqlmodel import SQLModel, create_engine

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)
