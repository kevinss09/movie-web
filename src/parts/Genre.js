import React, { useState, useEffect } from "react";
import axios from "axios";

const options = {
	method: "GET",
	url: "https://api.themoviedb.org/3/genre/movie/list?api_key=70cd967cf88bdb0bb0fa324fd2489a9e",
};

export default function Genre({ movie }) {
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.request(options);
				const items = await response.data;
				setGenres(items);
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
	const movieGenres = movie.genre_ids.map((genreId) => {
		const genre = genres.genres.find((genre) => genre.id === genreId);
		return genre ? genre.name : "Unknown Genre";
	});
	return <>Genres: {movieGenres.join(", ")}</>;
}
