import Navbar from "../components/Navbar"
import logoImage from "../assets/popcorn.png"
import { useState } from "react"
import { browseMovies } from "../service/recommender"
import { Movies, SearchState } from "../types"
import RecommendationCard from "../components/RecommendationCard"

const MainPage = () => {
  const [search, setSearch] = useState<SearchState>({
    title: '',
    number: 1
  })
  const [movies, setMovies] = useState<Movies[] | undefined>([])
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setSearch((prevState) => ({
      ...prevState,
      [name]: name === 'number' ? Number(value) : value
    }))
  }

  const handleRefresh = () => {
    setSearch({
      title: '',
      number: 1
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (search.title === '') {
      setError("Introduzca un titulo")
      return
    } 

    if (search.number > 6 || search.number === 0) {
      setError("El numero de recomendaciones debe estar entre 1 y 6")
      return
    } 
    
    const moviesBrowsed = await browseMovies(search.title, search.number)
    setError(null)
    setMovies(moviesBrowsed)

    handleRefresh()
  }

  console.log(movies)

  return (
    <main className="w-full min-h-screen">
        <Navbar />
        <div className="pt-30 px-16min-h-screen">
          <form className="flex flex-col w-full py-2 justify-center items-center gap-8 px-32"
            onSubmit={handleSubmit}
          >
              <img src={logoImage} alt="logoPopcorn" 
                className="w-48 auto"/>
                <div className="flex w-full gap-8">
                  <input type="text" name="title" id="title" value={search.title} 
                    onChange={handleChange}
                    placeholder="Browse recommendations"
                    className="w-3/4 rounded-xl font-semibold bg-white p-4 border outline-none text-main_theme_1"
                  />
                  <input type="number" name="number" id="number" value={search.number}
                    placeholder="Recommendation number"
                    onChange={handleChange}
                    min={1}
                    className="w-1/4 rounded-xl font-semibold bg-white p-4 border outline-none text-main_theme_1"
                  />
                </div>
                <button
                  className="text-bg_white font-bold text-2xl rounded-xl bg-main_theme_1 px-10 py-8 hover:bg-main_theme_3 transition-all cursor-pointer"
                  type="submit"
                >
                  Browse
                </button>
          </form>
          {/* añadir tabla con las recomendaciones */}
          {movies && movies.length > 0 && (
            <div className="pt-20 items-center px-4">
              <div className="grid grid-cols-3 gap-4">
                hola
                {movies.map((movie, index) => (
                  <RecommendationCard movie={movie} key={index} />
                ))}
              </div>
            </div>
          )}
       </div>
    </main>
  )
}

export default MainPage