from fastapi import APIRouter, HTTPException, status

from models.models import User
from models.schemesAuth import UserCreate, RefreshTokenRequest
from dependencies.dependencies import db_dependency, data_form_dependency
from utils.auth import get_user_by_email, hash_password, create_access_token, create_refresh_token, authenticate_user, decode_token

router = APIRouter(
    prefix='/user',
    tags=['user'],
    responses={ 404: { "description": "User not found" } }
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: db_dependency):
    existing_user = get_user_by_email(db=db, email=user.email)

    if user.password != user.confirmed_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Confirmed password and password are different"
        )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user_db = User(email=user.email, 
                   hashed_password=hash_password(user.password),
        )
    db.add(user_db)
    db.commit()
    db.refresh(user_db)

    access_token = create_access_token(data={"sub": user_db.email})
    refresh_token = create_refresh_token(data={"sub": user_db.email})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer"
    }
    
    
@router.post("/token", status_code=status.HTTP_202_ACCEPTED)
async def login_user(db: db_dependency, form_data: data_form_dependency):
    user = authenticate_user(db=db, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer"
    }


@router.post("/token/refresh")
async def refresh_token(request: RefreshTokenRequest, db: db_dependency):
    refresh_token = request.refresh_token

    # Validar y decodificar el refresh token
    email = decode_token(refresh_token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Verificar si el usuario existe en la base de datos
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    # Generar un nuevo access token
    new_access_token = create_access_token(data={"sub": email})

    return {
        "access_token": new_access_token,
        "refresh_token": refresh_token,  # Mantener el mismo refresh token
        "token_type": "Bearer"
    }


@router.get("/connection")
async def testing_backend_connection():
    return {"response": "Hola Mundo"}