from fastapi import APIRouter
from . import database

router = APIRouter()
database.engine