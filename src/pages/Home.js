import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import axios from "axios";
import ImageHomeCarousel from "../parts/ImageHomeCarousel";
import HorizontalScrollBar from "../parts/HorizontalScrollBar";
import CountryHome from "../parts/CountryHome";

const options = {
	method: "GET",
	url: "https://api.themoviedb.org/3/trending/movie/day?api_key=70cd967cf88bdb0bb0fa324fd2489a9e",
};

export default function Home() {
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

	console.log(movies);

	return (
		<>
			<div className="home min-h-screen mx-20 relative">
				<div className="-mx-20 h-[50rem] overflow-hidden flex items-center justify-center relative">
					<Header />
					<ImageHomeCarousel movies={movies} url={options.url} />
				</div>
				<div className="-mx-20 py-16 bg-[#222831]">
					<div className="w-full flex flex-row">
						<CountryHome />
						<div className="w-[88%]">
							<HorizontalScrollBar url={options.url} />
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
