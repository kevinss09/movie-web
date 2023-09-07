import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Genre from "./Genre";
import Genre2 from "./Genre2";
import { Link } from "react-router-dom";

export default function ImageHomeCarousel({ movies, url }) {
	const isTvTrending =
		url ===
		"https://api.themoviedb.org/3/trending/tv/day?api_key=70cd967cf88bdb0bb0fa324fd2489a9e";
	return (
		<Carousel
			autoPlay={true}
			showArrows={true} // Display navigation arrows
			infiniteLoop={true} // Allow infinite loop navigation
			showStatus={false} // Hide status indicator
			showThumbs={false} // Hide thumbnail images
			interval={5000}
			className=""
		>
			{movies.results.slice(0, 5).map((movie, index) => {
				return (
					<div className="h-full w-full relative" key={index}>
						<div className="absolute inset-0 bg-black opacity-60"></div>
						<img
							src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt="Image 1"
							className="object-contain"
						/>
						<div className="absolute text-white left-52 top-60 font-semibold z-30 w-1/3 text-left">
							<h1 className="font-semibold text-6xl tracking-wide leading-tight">
								{isTvTrending ? movie.name : movie.title}
							</h1>
							<div className="mt-28">
								<h4 className="text-2xl tracking-wide">
									Rating: {movie.vote_average}/10
								</h4>
								<h4 className="text-2xl mt-3 tracking-wide">
									Release Date: {movie.release_date}
								</h4>
								<h4 className="mt-3 text-2xl tracking-wide">
									{isTvTrending ? (
										<Genre2 movie={movie} />
									) : (
										<Genre movie={movie} />
									)}
								</h4>
								<p className="font-normal mt-5 mb-7 tracking-wide">
									{movie.overview}
								</p>
								<Link
									to={
										isTvTrending
											? `/TvShow/Id/${movie.id}`
											: `/Movie/Id/${movie.id}`
									}
									className="px-5 py-2 border border-white rounded-md text-white font-normal text-xl tracking-wider hover:bg-white hover:text-black duration-300"
								>
									Overview
								</Link>
							</div>
						</div>
					</div>
				);
			})}
		</Carousel>
		// <div>Hallo</div>
	);
}
