import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer";
import { getLoginAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { getLoginType } from "../redux/reducer";

import "../css/index.css";

export default () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const getLoginJwt = useSelector((state: RootState) => state.getLoginReducer);
	useEffect(() => {
		const code: string = new URL(window.location.href).searchParams.get(
			"code",
		)!;
		console.log(code);
		dispatch(getLoginAction(code));
	}, []);

	useEffect(() => {
		console.log(getLoginJwt);
		async function loginCheck() {
			const jinfo: getLoginType = await getLoginJwt;

			if (jinfo) {
				console.log(jinfo);
				if (jinfo.type == "GET_LOGIN_SUCCESS") {
					navigate("/");
				}
			}
		}
		loginCheck();
		// if(getLoginJwt){
		//     navigate("/")
		// }
	}, [getLoginJwt]);
	return <div></div>;
};
