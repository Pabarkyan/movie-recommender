import { Movies } from "../types";
import api from "./api"


export const browseMovies = async (title: string, r_number: number): Promise<Movies[] | undefined> => {
    try {
        if (r_number > 6) {
            r_number = 6;
        }

        const urlRequest = `/movies?title=${title}&r_number=${r_number}`
        const response = await api.get(urlRequest)
        return response.data
    } catch (e) {
        console.error("Error al recomendar peliculas", e)
    }
}