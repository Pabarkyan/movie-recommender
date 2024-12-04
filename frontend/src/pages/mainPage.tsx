import Navbar from "../components/Navbar"
import logoImage from "../assets/popcorn.png"

const MainPage = () => {

  return (
    <main className="w-full min-h-screen">
        <Navbar />
        <div className="pt-30 px-16 pb-16">
          <div className="flex flex-col w-full py-2 justify-center items-center gap-8 px-32">
              <img src={logoImage} alt="logoPopcorn" 
                className="w-48 auto"/>
                <input type="text" name="" id="" 
                  placeholder="Browse recommendations"
                  className="rounded-xl font-semibold bg-white p-4 border outline-none w-full text-main_theme_1"
                />
          </div>
          {/* añadir tabla con las recomendaciones */}
          <div>
            
          </div>
       </div>
    </main>
  )
}

export default MainPage