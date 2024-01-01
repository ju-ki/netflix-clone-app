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
            <div className="h-[190px] pt-[140px] ml-8">
                <h1 className="text-4xl font-bold text-white pb-3">
                    {movie?.title|| movie?.name||movie?.original_name}
                </h1>
                <div>
                    <button
                        className="bg-zinc-400 text-zinc-100 mx-4 px-8 py-2 mr-4 border-none bg-opacity-50 rounded-md
                        hover:bg-[#e6e6e6] hover:text-[#000] transition-all duration-200"
                    >
                        Play
                    </button>
                    <button
                        className="bg-zinc-400 text-zinc-100 mx-4 px-8 py-2 mr-4 border-none bg-opacity-50 rounded-md
                        hover:bg-[#e6e6e6] hover:text-[#000] transition-all duration-200"
                    >
                        My List
                    </button>
                </div>
                <h1 className="text-white pt-4 max-w-96 h-20 w-[45rem]">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            {/* <div className="bg-gradient-to-t h-[7.4rem]"
            >

            </div> */}
            <div className="h-28 bg-gradient-to-t from-transparent via-[rgba(37,37,37,0.61)] to-#111">
            </div>
        </header>
    )
}