from sqlmodel import SQLModel, create_engine, UniqueConstraint, Field, Session, select
from firebase_admin import auth
from functools import wraps
from typing import Callable
from fastapi import Request, HTTPException, status
import asyncio

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)

class User_Data(SQLModel, table=True):
    user_token: str = Field(primary_key=True)

class Order_Data(SQLModel, table=True):
    order_id: str = Field(primary_key=True)
    order_status: str = Field(default="estimate pending")
    product_age: int = Field()
    functional: bool = Field(default=False)
    description: str = Field()
    lat: float = Field()
    long: float = Field()
    user_token: str = Field(foreign_key="user_data.user_token")
    estimated_price: float | None
    ewaste_type: str = Field()
    company_token: str | None = Field(foreign_key="companies_data.company_token")

class Biddings_data(SQLModel, table=True):
    order_id: str = Field(foreign_key="order_data.order_id", primary_key=True)
    company_token: str = Field(foreign_key="companies_data.company_token", primary_key=True)
    distance: float = Field() # distance in meters
    estimated_price: float | None

    __table__args__ = (UniqueConstraint("order_id", "company_token", name="order_company"))

class Companies_Data(SQLModel, table=True):
    company_token: str = Field(primary_key=True)
    lat: float = Field(nullable=False)
    long: float = Field(nullable=False)
    processed_types: str = Field(default='[]')

def token_validator(f: Callable) -> Callable:
    @wraps(f)
    async def wrapper(request: Request, *args, **kwargs):
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
            if asyncio.iscoroutinefunction(f):
                return await f(request, *args, **kwargs)
            else:
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



def dummy_token_validator(f: Callable) -> Callable:
    @wraps(f)
    async def wrapper(request: Request, *args, **kwargs):
        try:
            request.state.user = "dummy user info"
            request.state.user_token = "dummy token"
            if asyncio.iscoroutinefunction(f):
                return await f(request, *args, **kwargs)
            else:
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


