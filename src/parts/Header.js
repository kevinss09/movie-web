import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
	const location = useLocation();
	const allPathName =
		location.pathname === "/" ||
		location.pathname === "/Canada" ||
		location.pathname === "/China" ||
		location.pathname === "/India" ||
		location.pathname === "/Norway" ||
		location.pathname === "/Spain";
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const handleSearchQuery = (event) => {
		const query = event.target.value;
		setQuery(query);
	};

	const handleSearch = () => {
		if (query) {
			const modifiedQuery = query.replace(/\s+/g, "+");
			if (allPathName || location.pathname.startsWith("/Movie/")) {
				navigate(`/search/Movie/${modifiedQuery}`);
			} else {
				navigate(`/search/TvShow/${modifiedQuery}`);
			}
		}
	};

	return (
		<header
			className={[
				"w-full bg-[#393E46] absolute top-0 z-50",
				location.pathname === "/" || location.pathname === "/TvShow"
					? "bg-opacity-20"
					: "bg-opacity-100",
			].join(" ")}
		>
			<div className="w-full p-5 px-20 flex justify-between">
				<Link to="/" className="text-white font-bold text-4xl tracking-wide">
					Film Fusion
				</Link>
				<div className="right-side flex flex-row items-center text-white tracking-wide">
					<Link
						className="mr-5 font-semibold text-xl opacity-50 hover:opacity-100 cursor-pointer"
						to="/"
					>
						Movie
					</Link>
					<Link
						className="mr-5 font-semibold text-xl opacity-50 hover:opacity-100 cursor-pointer"
						to="/TvShow"
					>
						Tv Shows
					</Link>
					<input
						className="search-box bg-transparent border-2 border-white rounded-md w-80 p-2 placeholder:text-lg"
						type="search"
						name="search"
						placeholder="Search any movies or tv shows"
						value={query}
						onChange={handleSearchQuery}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch();
							}
						}}
					></input>
				</div>
			</div>
		</header>
	);
}
