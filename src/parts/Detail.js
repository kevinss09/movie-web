import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Detail({ type }) {
	const { id } = useParams();
	const options = {
		method: "GET",
		url:
			type === "Movie"
				? `https://api.themoviedb.org/3/movie/${id}?api_key=70cd967cf88bdb0bb0fa324fd2489a9e`
				: `https://api.themoviedb.org/3/tv/${id}?api_key=70cd967cf88bdb0bb0fa324fd2489a9e`,
	};
	const [movie, setMovie] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.request(options);
				const items = await response.data;
				setMovie(items);
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

	console.log(movie);

	return (
		<div className="Detail min-h-screen relative bg-[#222831]">
			<div className=" h-[5.2rem] overflow-hidden flex items-center justify-center relative">
				<Header />
			</div>
			<div className="px-20 py-16 bg-[#222831]">
				<div className="px-20 w-full flex flex-row">
					<div className="left-side w-1/3 py-14 flex justify-end pr-16">
						<img
							src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
							alt=""
							className="h-[38.5rem]"
						/>
					</div>
					<div className="right-side w-2/3 py-14 text-white font-normal text-lg tracking-wide flex flex-col">
						<h1 className="text-5xl font-bold">
							{type === "Movie" ? movie.original_title : movie.original_name}
						</h1>
						<div className="mt-12">
							<h2 className="opacity-50 mb-6">
								Genres: {movie.genres.map((genre) => genre.name).join(", ")}
							</h2>
							<h2 className="opacity-50 my-6">
								Production Companies:{" "}
								{movie.production_companies
									.map((company) => company.name)
									.join(", ")}
							</h2>
							<h2 className="opacity-50 my-6">
								Spoken Language:{" "}
								{movie.spoken_languages
									.map((language) => language.name)
									.join(", ")}
							</h2>
							<h5 className="opacity-50 my-6">
								Overview: <br /> {movie.overview}
							</h5>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
