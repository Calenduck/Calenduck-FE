import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "../src/css/index.css"
import MainPage from "./component/mainPage";
import WantListPage from "./component/wantListPage";
import LoginPage from "./component/loginPage";
import Search from "./component/search";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/auth" element={<LoginPage />} />
				<Route path="/wantList" element={<WantListPage />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
