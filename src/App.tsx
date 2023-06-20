import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./component/mainPage";
import WantListPage from "./component/wantListPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/wantList" element={<WantListPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
