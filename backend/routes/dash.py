from fastapi import APIRouter
from sqlmodel import Session, select
from .database import User_Data, Order_Data, token_validator

router = APIRouter()
