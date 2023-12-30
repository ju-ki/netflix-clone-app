import axios from "./axios";
import { useEffect, useState } from "react";

type Props = {
    title:string;
    fetchUrl:string;
    isLargeRow?:boolean;
}

type Movie = {
    id:string;
    name:string;
    title:string;
    original_name:string;
    poster_path:string;
    backdrop_path:string;
}


export const Row = ({title, fetchUrl}:Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    return (
        <div className="">
            <p className="text-3xl font-bold">{title}</p>
            <div className="flex overflow-x-scroll overflow-y-hidden">
                {movies.map((movie:Movie) => (
                    <div key={movie.id} className="flex-shrink-0">
                        <img className="w-full max-h-max px-4 object-fill" src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.name}/>
                    </div>
                ))}
            </div>
        </div>
    )
}