import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CountryMap } from "./CountryMap";
import axios from "axios";
import Header from "./Header";
import Genre from "./Genre";
import Footer from "./Footer";
import CountryHome from "./CountryHome";
import { CountryTvMap } from "./CountryTvMap";
import Genre2 from "./Genre2";

export default function SearchQuery({ type }) {
	const { query } = useParams();
	const options = {
		method: "GET",
		url:
			type === "Movie"
				? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=70cd967cf88bdb0bb0fa324fd2489a9e`
				: `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=70cd967cf88bdb0bb0fa324fd2489a9e`,
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
	}, [query]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(movies);
	return (
		<div className="query min-h-screen relative bg-[#222831]">
			<div className="h-[5.2rem] overflow-hidden flex items-center justify-center relative">
				<Header />
			</div>
			<div className="mx-20 py-16 bg-[#222831]">
				<div className="grid grid-cols-4 gap-12 px-20">
					{movies.results.map((movie, index) => {
						return (
							<Link
								to={
									type === "Movie"
										? `/Movie/Id/${movie.id}`
										: `/TvShow/Id/${movie.id}`
								}
								className="flex items-center justify-center h-full w-full"
							>
								<div className="w-[300px] p-3 cursor-pointer hover:scale-105 ease-in-out duration-300 shadow-lg bg-[#393E46] h-full">
									<div className="flex justify-between flex-col h-full">
										<div className="h-full">
											<img
												className="w-full"
												src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
												alt="Sunset in the mountains"
											/>
											<div className="font-bold text-xl mb-2 text-[#EEEEEE] tracking-wide whitespace-normal pt-4">
												{type === "Movie" ? movie.title : movie.name}
											</div>
										</div>

										<div className="text-white">
											<h4 className="text-base tracking-wide opacity-50">
												Rating: {movie.vote_average}/10
											</h4>
											<h4 className="text-base mt-1 tracking-wide opacity-50">
												Release Date:{" "}
												{type === "Movie"
													? movie.release_date
													: movie.first_air_date}
											</h4>
											<h4 className="mt-1 text-base tracking-wide opacity-50 whitespace-normal">
												{type === "Movie" ? (
													<Genre movie={movie} />
												) : (
													<Genre2 movie={movie} />
												)}
											</h4>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}
