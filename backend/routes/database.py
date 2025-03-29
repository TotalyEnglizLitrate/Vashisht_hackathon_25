from sqlmodel import SQLModel, create_engine, Field, Session, select

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