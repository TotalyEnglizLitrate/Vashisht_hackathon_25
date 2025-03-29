import os
import shutil
import uuid
from fastapi import APIRouter, Request
from sqlmodel import Session, select
from .database import User_Data, Order_Data, token_validator, dummy_token_validator
from .database import User_Data, Order_Data, token_validator, engine
from fastapi import Form, File, UploadFile

UPLOAD_FOLDER = 'backend/orders/'

router = APIRouter()

@router.post('/new_order/')
def new_order(user_token: str = Form(), ewaste_type: str = Form(), file: UploadFile = File()):

    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)
    
    order_id = str(uuid.uuid4())

    with open(UPLOAD_FOLDER + order_id, 'wb') as f:
        shutil.copyfileobj(file.file, f)

    with Session(engine) as session:
        order = Order_Data(order_id=str(order_id), ewaste_type=ewaste_type, user_token=user_token)
        session.add(order)
        session.commit()
        

    return {'id': str(order_id)}

@router.get('/orders_info/')
def get_orders(user_token: str):
    with Session(engine) as session:
        orders = session.exec(select(Order_Data).where(Order_Data.user_token == user_token))
        order_details = [
            {
                "order_id": order.order_id,
                "order_status": order.order_status,
                "user_token": order.user_token,
                "estimated_price": order.estimated_price,
                "ewaste_type": order.ewaste_type,
                "company_token": order.company_token
            }
            for order in orders
        ]

    return {"orders": order_details}