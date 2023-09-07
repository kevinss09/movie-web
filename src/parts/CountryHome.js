import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function CountryHome() {
	const location = useLocation();
	const allPathName =
		location.pathname === "/" ||
		location.pathname === "/Canada" ||
		location.pathname === "/China" ||
		location.pathname === "/India" ||
		location.pathname === "/Norway" ||
		location.pathname === "/Spain";
	return (
		<>
			<div
				className={[
					"w-[12%] text-white",
					location.pathname === "/" || location.pathname === "/TvShow"
						? "px-10 py-20"
						: "px-10",
				].join(" ")}
			>
				<h4 className="text-white font-bold text-xl tracking-wider">Country</h4>
				<ul>
					<Link to={allPathName ? "/Canada" : "/TvShow/Canada"}>
						<li className="opacity-30 hover:opacity-100 font-semibold text-lg mt-5 tracking-wide duration-300 cursor-pointer">
							Canada
						</li>
					</Link>
					<Link to={allPathName ? "/China" : "/TvShow/China"}>
						<li className="opacity-30 hover:opacity-100 font-semibold text-lg mt-5 tracking-wide duration-300 cursor-pointer">
							China
						</li>
					</Link>
					<Link to={allPathName ? "/India" : "/TvShow/India"}>
						<li className="opacity-30 hover:opacity-100 font-semibold text-lg mt-5 tracking-wide duration-300 cursor-pointer">
							India
						</li>
					</Link>
					<Link to={allPathName ? "/Norway" : "/TvShow/Norway"}>
						<li className="opacity-30 hover:opacity-100 font-semibold text-lg mt-5 tracking-wide duration-300 cursor-pointer">
							Norway
						</li>
					</Link>
					<Link to={allPathName ? "/Spain" : "/TvShow/Spain"}>
						<li className="opacity-30 hover:opacity-100 font-semibold text-lg mt-5 tracking-wide duration-300 cursor-pointer">
							Spain
						</li>
					</Link>
				</ul>
			</div>
		</>
	);
}
