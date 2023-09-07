import "./assets/css/app.css";
import React from "react";
import Home from "./pages/Home";
import TvShow from "./pages/TvShow";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Country from "./parts/Country";
import Detail from "./parts/Detail";
import SearchQuery from "./parts/SearchQuery";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/TvShow" element={<TvShow />} />
					<Route
						path="/TvShow/:CountryId"
						element={<Country type="TvShow" />}
					/>
					<Route path="/:CountryId" element={<Country type="Movie" />} />
					<Route path="/Movie/Id/:id" element={<Detail type="Movie" />} />
					<Route path="/TvShow/Id/:id" element={<Detail />} />
					<Route
						path="/search/Movie/:query"
						element={<SearchQuery type="Movie" />}
					/>
					<Route
						path="/search/TvShow/:query"
						element={<SearchQuery type="TvShow" />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
