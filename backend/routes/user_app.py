import os
import shutil
import uuid
import PIL.Image
from dotenv import load_dotenv
from fastapi import APIRouter, Request, BackgroundTasks
from sqlmodel import Session, select
from .database import User_Data, Order_Data, Companies_Data, Biddings_data, token_validator, dummy_token_validator, engine
from fastapi import Form, File, UploadFile, HTTPException
from google import genai
from google.genai import types
from requests import get

load_dotenv()

UPLOAD_FOLDER = 'backend/orders/'

router = APIRouter()

@router.post('/register_user/')
def register_user(user_token: str):
    try:
        with Session(engine) as session:
            user = User_Data(user_token=user_token)
            session.add(user)
            session.commit()
        return {'message': 'User registered successfully'}
    except:
        return {'message': 'Failed to add user. User already exists !'}
   

def calculate_distance(user_token: str, order_id: str):
    distances = []
    with Session(engine) as session:
        order = session.exec(select(Order_Data).where(Order_Data.order_id == order_id)).first()
        companies = session.exec(select(Companies_Data)).all()
        for company in companies:
            print("hmm")
            route = get(f"https://router.project-osrm.org/route/v1/driving/{order.long},{order.lat};{company.long},{company.lat}").json()
            distance = route['routes'][0]['distance'] if route['code'] == 'Ok' else None
            if not distance:
                raise HTTPException(status_code=500, detail="Internal server error when processing order")
            distances.append((distance, company.company_token))
        distances.sort(key=lambda x: x[0])
        session.add_all((Biddings_data(order_id=order_id, company_token=company_token, distance=distance) for distance, company_token in distances[30:]))
        session.commit()



@router.post('/new_order/')
async def new_order(user_token: str, background_tasks: BackgroundTasks, ewaste_type: str = Form(), age: int = Form(), functional: bool = Form(), description: str = Form(), lat: float = Form(), long: float = Form(), file: UploadFile = File()):
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)
    
    order_id = str(uuid.uuid4())

    with open(UPLOAD_FOLDER + order_id, 'wb') as f:
        shutil.copyfileobj(file.file, f)

    with Session(engine) as session:
        order = Order_Data(order_id=order_id, ewaste_type=ewaste_type, user_token=user_token, product_age=age, functional=functional, description=description, lat=lat, long=long)
        session.add(order)
        session.commit()
        
    background_tasks.add_task(calculate_distance, user_token, order_id)

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
                "product_age": order.product_age,
                "functional": order.functional,
                "description": order.description,
                "lat": order.lat,
                "long": order.long,
                "ewaste_type": order.ewaste_type,
                "company_token": order.company_token
            }
            for order in orders
        ]

    return {"orders": order_details}

@router.delete('/order/{order_id}')
def delete_order(order_id: str):
    with Session(engine) as session:
        order = session.get(Order_Data, order_id)
        img_path = os.path.join(UPLOAD_FOLDER, order_id)
        if order:
            session.delete(order)
            session.commit()
            os.remove(img_path)
            return {"message": "Order deleted successfully"}
        else:
            return {"message": "Order not found"}

@router.post('/generate_description/')
def generate_description(file: UploadFile = File()):
    image = PIL.Image.open(file.file)
    prompt = '''
    You are given an image of a E-Waste clicked by the user. You need to provide a brief description and other information that will be useful to evaluate the product for e-waste companies with this image of the product you see. 
    Only return product details not the views or any other unnecessary information.
    OUTPUT FORMAT:

    DESCRIPTION:
    <description>
    '''
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, image])

    return response.text