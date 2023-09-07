import React, { useState, useEffect } from "react";
import axios from "axios";
import Genre from "../Genre";
import Genre2 from "../Genre2";
import { Link } from "react-router-dom";

export default function TopRated({ url, Genres }) {
	const options = {
		method: "GET",
		url: url,
	};
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.request(options);
				const items = await response.data;
				setMovies(items);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching movie genres:", error);
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{movies.results.slice(0, 15).map((movie, index) => {
				return (
					<Link
						to={
							Genres === "Genre"
								? `/Movie/Id/${movie.id}`
								: `/TvShow/Id/${movie.id}`
						}
						className="w-[300px] inline-block p-3 cursor-pointer hover:scale-105 ease-in-out duration-300 shadow-lg bg-[#393E46] mx-5"
					>
						<div className="flex justify-between flex-col h-full">
							<div className="w-[200px] h-full">
								<img
									className="w-full"
									src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
									alt="Sunset in the mountains"
								/>
								<div className="font-bold text-xl mb-2 text-[#EEEEEE] tracking-wide whitespace-normal pt-4">
									{Genres === "Genre" ? movie.title : movie.name}
								</div>
							</div>
							<div className="text-white">
								<h4 className="text-base tracking-wide opacity-50">
									Rating: {movie.vote_average}/10
								</h4>
								<h4 className="text-base mt-1 tracking-wide opacity-50">
									Release Date:{" "}
									{Genres === "Genre"
										? movie.release_date
										: movie.first_air_date}
								</h4>
								<h4 className="mt-1 text-base tracking-wide opacity-50 whitespace-normal">
									{Genres === "Genre" ? (
										<Genre movie={movie} />
									) : (
										<Genre2 movie={movie} />
									)}
								</h4>
							</div>
						</div>
					</Link>
				);
			})}
		</>
	);
}
