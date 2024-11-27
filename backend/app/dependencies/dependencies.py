from typing import Annotated

from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError

from database.database import get_db
from utils.auth import decode_token, get_user_by_email
from models.models import User


# database dependency
db_dependency = Annotated[Session, Depends(get_db)]


# form data dependency for token login
data_form_dependency = Annotated[OAuth2PasswordRequestForm, Depends()]


# configuracion para el Oauth2 para el uso de tokens
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
oauth2_dependency = Annotated[str, Depends(oauth2_scheme)]

# dependencia que usaremos para toda funcion que necesite estar autenticada,
# esto basicamente es lo que comprobara que el usuario esta autenticado en cada
# funcionalidad de la aplicacion
def get_current_user(token: oauth2_dependency, db: db_dependency) -> User:
    credentials_exception = HTTPException( 
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        email = decode_token(token=token)

        if email is None:
            raise credentials_exception
        
        user = get_user_by_email(db=db, email=email)
        if user is None:
            raise credentials_exception
        
        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="token expired",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
authenticated_dependency = [Depends(get_current_user)]