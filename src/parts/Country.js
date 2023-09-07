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

export default function Country({ type }) {
	const { CountryId } = useParams();
	const findCountry =
		type === "Movie"
			? CountryMap.find((country) => country.title === CountryId)
			: CountryTvMap.find((country) => country.title === CountryId);
	const url = findCountry.url;
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
	}, [CountryId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// console.log(movies);

	return (
		<>
			<div className="country min-h-screen px-20 relative bg-[#222831]">
				<div className="-mx-20 h-[5.2rem] overflow-hidden flex items-center justify-center relative">
					<Header />
				</div>
				<h1 className="text-white font-bold text-5xl tracking-wide text-center mt-10">
					{CountryId} {type === "Movie" ? "Movie" : "Series"}
				</h1>
				<div className="py-16 bg-[#222831] w-full flex flex-row">
					<CountryHome />
					<div className="w-[88%] grid grid-cols-4 gap-12">
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
				<div className="pt-3 pb-16">
					<Footer />
				</div>
			</div>
		</>
	);
}
