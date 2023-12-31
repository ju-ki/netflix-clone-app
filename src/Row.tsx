import Youtube from "react-youtube";
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

type Options = {
    height:string;
    width:string;
    playerVars:{
        autoplay:0 | 1 | undefined;
    };
}


export const Row = ({title, fetchUrl, isLargeRow}:Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts:Options = {
        height:"390",
        width:"640",
        playerVars:{
            autoplay:1
        },
    };

    const handleClick = async(movie:Movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            console.log(process.env.REACT_APP_API_KEY);
            try{
                let trailerurl = await axios.get(
                    `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
                    );
                console.log(trailerurl);
                setTrailerUrl(trailerurl.data.results[0]?.key);
                }
                catch(err){
                    console.log(err);
                }
            }
    }


    return (
        <div className="">
            <p className="text-3xl font-bold my-10">{title}</p>
            <div className="flex overflow-x-scroll overflow-y-hidden">
                {movies.map((movie:Movie) => (
                    <div key={movie.id} className="flex-shrink-0 hover:scale-110 transition py-3">
                    <img
                        className={`w-full px-4 object-fill max-h-64`}
                        src={`https://image.tmdb.org/t/p/${isLargeRow ? 'w300' : 'w154'}${isLargeRow ? movie.backdrop_path : movie.poster_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                </div>
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}