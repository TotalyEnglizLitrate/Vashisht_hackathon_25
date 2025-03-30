from fastapi import APIRouter, Request, HTTPException
from sqlmodel import Session, select
from .database import User_Data, Biddings_data, Order_Data, token_validator, dummy_token_validator, engine

from typing import Sequence

router = APIRouter()


@router.get('/get_orders/')
def get_orders(company_token: str):
    with Session(engine) as session:
        orders: Sequence[Order_Data] = session.exec(select(Order_Data).where(Order_Data.company_token == company_token)).all()
        return [
            {
                "order_id": order.order_id,
                "product_age": order.product_age,
                "functional": order.functional,
                "description": order.description,
                "ewaste_type": order.ewaste_type,
            } 
            for order in orders
            ]
    
@router.get('/get_bids/')
def get_bids(company_token: str):
    with Session(engine) as session:
        bids = session.exec(select(Biddings_data).where(Biddings_data.company_token == company_token)).all()
        return [{"order_id": bid.order_id, "bid": bid.estimated_price} for bid in bids]
    
@router.get('/get_order/{order_id}')
def get_order(company_token: str, order_id: str):
    with Session(engine) as session:
        order = session.exec(select(Order_Data).where(Order_Data.order_id == order_id and Order_Data.company_token == request.state.user_token)).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return {
            "order_id": order.order_id,
            "product_age": order.product_age,
            "functional": order.functional,
            "description": order.description,
            "ewaste_type": order.ewaste_type,
            "estimated_price": order.estimated_price
            }

@router.post('/bid/{order_id}')
def bid(company_token: str, order_id: str, estimated_price: float):
    with Session(engine) as session:
        order = session.exec(select(Order_Data).where(Order_Data.order_id == order_id)).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        bid = Biddings_data(order_id=order_id, company_token=company_token, estimated_price=estimated_price)
        session.add(bid)
        session.commit()
        return {"message": "Bid placed successfully"}


@router.post('/update_bid/{order_id}')
def update_bid(company_token: str, order_id: str, estimated_price: float):
    with Session(engine) as session:
        bid = session.exec(select(Biddings_data).where(Biddings_data.order_id == order_id and Biddings_data.company_token == company_token)).first()
        if not bid:
            raise HTTPException(status_code=404, detail="Bid not found")
        
        bid.estimated_price = estimated_price
        session.commit()
        return {"message": "Bid updated successfully"}

@router.delete('/delete_bid/{order_id}')
def delete_bid(company_token: str, order_id: str):
    with Session(engine) as session:
        bid = session.exec(select(Biddings_data).where(Biddings_data.order_id == order_id and Biddings_data.company_token == company_token)).first()
        if not bid:
            raise HTTPException(status_code=404, detail="Bid not found")
        
        session.delete(bid)
        session.commit()
        return {"message": "Bid deleted successfully"}

@router.get('/get_bids/{order_id}')
def get_bids_by_order_id(company_token: str, order_id: str):
    with Session(engine) as session:
        bids = session.exec(select(Biddings_data).where(Biddings_data.order_id == order_id)).all()
        return [{"order_id": bid.order_id, "bid": bid.estimated_price} for bid in bids].sorted(key=lambda x: x['bid'], reverse=True)

@router.get('/finalise_bid/{order_id}')
def finalise_bid(order_id: str):
    with Session(engine) as session:
        bids = list(
            session.exec(select(Biddings_data).where(Biddings_data.order_id == order_id)).all()
            ).sort(key=lambda x: x.bid, reverse=True)
        if not bids:
            raise HTTPException(status_code=404, detail="Bid not found")
        
        order = session.exec(select(Order_Data).where(Order_Data.order_id == order_id)).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        
        order.status = "Finalised"
        order.company_token = bids[0].company_token
        order.estimated_price = bids[0].estimated_price
        for bid in bids:
            session.delete(bid)
        session.commit()
        return {
            "message": "Bid finalised successfully",
            "company token": order.company_token,
            "estimated price": order.estimated_price
            }