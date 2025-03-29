from sqlmodel import SQLModel, create_engine, Field, Session, select
from firebase_admin import auth
from functools import wraps
from typing import Callable
from fastapi import Request, HTTPException, status

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)

class User_Data(SQLModel, table=True):
    user_token: str = Field(primary_key=True)

class Order_Data(SQLModel, table=True):
    order_id: str = Field(primary_key=True)
    order_status: str = Field(default="estimate pending")
    user_token: str = Field(foreign_key="user_data.user_token")
    files_info: str = Field(default='[]')
    estimated_price: float | None
    ewaste_type: str = Field()
    biddings: str = Field(default='[]')
    company_token: str | None = Field(foreign_key="companies_data.company_token")

class Companies_Data(SQLModel, table=True):
    company_token: str = Field(primary_key=True)
    lat: float = Field(nullable=False)
    long: float = Field(nullable=False)
    processed_types: str = Field(default='[]')

def token_validator(f: Callable) -> Callable:
    @wraps(f)
    def wrapper(request: Request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Bearer token required"
            )
        
        id_token = auth_header.split(" ")[1]

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.state.user = decoded_token
            request.state.user_token = id_token
            return f(request, *args, **kwargs)
            
        except auth.ExpiredIdTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        except auth.RevokedIdTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token revoked"
            )
        except (auth.InvalidIdTokenError, ValueError):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
    
    return wrapper