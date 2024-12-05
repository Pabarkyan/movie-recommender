import { Movies } from "../types"


const RecommendationCard = ({ movie }: { movie: Movies }) => {
  return (
    <div>
      {movie.title}
    </div>
  )
}

export default RecommendationCard