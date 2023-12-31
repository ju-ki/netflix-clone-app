import axios from "./axios";
import { useEffect, useState } from "react";
import { requests } from "./request";

type movieProps = {
    title?:string;
    name?:string;
    original_name:string;
    backdrop_path?:string;
    overview?:string;
}


export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>();
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )

            return request;
        }

        fetchData();
    }, []);

    // descriptionの切り捨てよう関数
    function truncate(str: any, n: number) {
        // undefinedを弾く
        if (str !== undefined) {
        return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        }
    }

    return (
        <header
            className="h-[448px]"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="h-[190px] pt-[140px]">
                <h1 className="text-4xl font-bold text-white pb-1">
                    {movie?.title|| movie?.name||movie?.original_name}
                </h1>
                <div>
                    <button className="bg-zinc-400 text-zinc-100 mx-4 px-8 mr-4 border-none">Play</button>
                    <button className="bg-zinc-400 text-zinc-100 mx-4 px-8 mr-4 border-none">MyList</button>
                </div>
                <h1 className="text-white pt-4">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
        </header>
    )
}