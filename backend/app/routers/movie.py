from fastapi import APIRouter, Query, status

from dependencies.dependencies import authenticated_dependency
from utils.data_loader import get_recommendations

router = APIRouter(
    prefix="/movies",
    tags=["movies"],
    dependencies=authenticated_dependency,
    responses={404: {"description": "Not found"}}
)


@router.get("", status_code=status.HTTP_202_ACCEPTED)
async def get_movies(
    title: str, # http://127.0.0.1:8000/movies?title=Pinocchio&r_number=2
    r_number: int = Query(default=6) # default 5, minimo 1
 ):
    try:
        movies = get_recommendations(title=title, recommendations_number=r_number)
        return {"message": "Movies retrieved", "movies": movies.to_dict(orient="records")}
    except ValueError as e:
        return {"error": str(e)}