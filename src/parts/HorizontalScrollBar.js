import React from "react";
import TopRated from "./HomePart/TopRated";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { HomeMap } from "./HomePart/HomeMap";
import { TvMap } from "./HomePart/TvMap";

export default function HorizontalScrollBar({ url }) {
	const slideLeft = (sliderId) => {
		var slider = document.getElementById(sliderId);
		slider.scrollLeft = slider.scrollLeft - 500;
	};

	const slideRight = (sliderId) => {
		var slider = document.getElementById(sliderId);
		slider.scrollLeft = slider.scrollLeft + 500;
	};
	const isTvTrending =
		url ===
		"https://api.themoviedb.org/3/trending/tv/day?api_key=70cd967cf88bdb0bb0fa324fd2489a9e";
	console.log(isTvTrending);
	return (
		<>
			{isTvTrending
				? TvMap.map((home, index) => {
						const sliderId = `slider-${home.id}`; // Generate unique ID
						return (
							<div className="mb-16">
								<h2 className="mb-10 text-white text-4xl px-14 font-semibold tracking-wider">
									{home.title}
								</h2>
								<div className="relative flex items-center">
									<MdChevronLeft
										className="opacity-50 cursor-pointer hover:opacity-100 text-white"
										size={40}
										onClick={() => slideLeft(sliderId)}
									/>
									<div
										id={sliderId}
										className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide flex flex-row"
									>
										<TopRated url={home.url} Genres="Genre2" />
									</div>
									<MdChevronRight
										className="opacity-50 cursor-pointer hover:opacity-100 text-white"
										size={40}
										onClick={() => slideRight(sliderId)}
									/>
								</div>
							</div>
						);
				  })
				: HomeMap.map((home, index) => {
						const sliderId = `slider-${home.id}`; // Generate unique ID
						return (
							<div className="mb-16">
								<h2 className="mb-10 text-white text-4xl px-14 font-semibold tracking-wider">
									{home.title}
								</h2>
								<div className="relative flex items-center">
									<MdChevronLeft
										className="opacity-50 cursor-pointer hover:opacity-100 text-white"
										size={40}
										onClick={() => slideLeft(sliderId)}
									/>
									<div
										id={sliderId}
										className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide flex flex-row"
									>
										<TopRated url={home.url} Genres="Genre" />
									</div>
									<MdChevronRight
										className="opacity-50 cursor-pointer hover:opacity-100 text-white"
										size={40}
										onClick={() => slideRight(sliderId)}
									/>
								</div>
							</div>
						);
				  })}
		</>
	);
}
