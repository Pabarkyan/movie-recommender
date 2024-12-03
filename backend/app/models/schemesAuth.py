from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_super_user: bool = False

class UserCreate(UserBase):
    password: str
    confirmed_password: str

class UserSchema(UserBase):
    id: Optional[int] = None
    hashed_password: Optional[str] = None

    class Config:
        from_attributes=True


class RefreshTokenRequest(BaseModel):
    refresh_token: str


        