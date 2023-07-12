// sagas/userTicket.js
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "../types";
import axios from "axios";
//import { getLoginAction, getTotalCheck, getWant } from "../actions";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
	getTotalCheckType,
	getWantListType,
	postWantListAddType,
	getLoginType,
	getSearchType,
} from "../reducer";
const apiAddress = process.env.REACT_APP_ADDRESS;
const getLogin = async (action: getLoginType) => {
	console.log(action);
	return await axios.get(
		`https://${apiAddress}:8080/users/kakao/login?code=${action.payload}`,
		{
			headers: {
				// "Content-Type": "application/json",
				// "Access-Control-Allow-Origin": "*",
				// "Access-Control-Allow-Credentials": true,
				// "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
			},
		},
	);
};
//전체조회
const getTotalCheckList = (action: getTotalCheckType) => {
	return axios.get(`https://${apiAddress}:8080/performances`, {
		headers: {
			// "Content-Type": "application/json",
			// Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
			// "Access-Control-Allow-Origin": "*",
			// "Access-Control-Allow-Credentials": true,
			// "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
		},
	});
};
const getSearchList = (action: getSearchType) => {
	console.log(action.payload)
	return axios.get(
		`https://${apiAddress}:8080/performances`,
		{
			params:{
				prfnm:String(action.payload)
			}
		},
	);
};
// const getTotalCheckList = async (action: getTotalCheckType) => {
// 	return await axios.get("http://localhost:3000/data/total.json", {
// 		headers: {
// 			"Content-Type": "application/json",
// 			//Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
// 			"Access-Control-Allow-Origin": "*",
// 			"Access-Control-Allow-Credentials": true,
// 			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
// 		},
// 	});
// };
//찜목록 조회
const getWantList = (action: getWantListType) => {
	const jwt = localStorage.getItem("jwt");
	return axios.get(`https://${apiAddress}:8080/performances/bookmark`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `${jwt}`,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
		},
	});
};

// const getWantList = (action: getWantListType) => {
// 	return axios.get("http://localhost:3000/data/wantList.json", {
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
// 			"Access-Control-Allow-Origin": "*",
// 			"Access-Control-Allow-Credentials": true,
// 			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
// 		},
// 	});
// };
//`http://${apiAddress}:8080/performances/${String(action.payload.mt20id)}/bookmark/${String(action.payload.year)}/${String(action.payload.month)}/${String(action.payload.day)}`,
const postWantListAdd = async (action: postWantListAddType) => {
	const jwt = await localStorage.getItem("jwt");
	console.log(jwt);
	// return axios.post(
	// 	`http://${apiAddress}:8080/performances/${String(
	// 		action.payload.mt20id,
	// 	)}/bookmark/${String(action.payload.year)}/${String(
	// 		action.payload.month,
	// 	)}/${String(action.payload.day)}`,
	// 	{
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `${jwt}`,
	// 			"Access-Control-Allow-Origin": "*",
	// 			"Access-Control-Allow-Credentials": true,
	// 			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
	// 		},
	// 	},
	// );
	const myHeaders: HeadersInit = new Headers();
	myHeaders.set("Authorization", `${jwt}`);

	return fetch(
		`https://${apiAddress}:8080/performances/${String(
			action.payload.mt20id,
		)}/bookmark/${String(action.payload.year)}/${String(
			action.payload.month,
		)}/${String(action.payload.day)}`,
		{
			method: "POST",
			headers: myHeaders,
		},
	);
};

function* getResponseLogin(action: any): Generator<any> {
	try {
		const result: any = yield call(getLogin, action);
		localStorage.setItem("jwt", String(result.headers.authorization));
		yield put({
			type: ActionType.GET_LOGIN_SUCCESS,
			data: result.headers.authorization,
		});
	} catch (err: any) {
		console.log(err);
		yield put({
			type: ActionType.GET_LOGIN_FAIL,
			data: err.response.data,
		});
	}
}

function* getResponseTotalCheck(action: any): Generator<any> {
	try {
		const result: any = yield call(getTotalCheckList, action);
		console.log(result);
		yield put({ type: ActionType.GET_TOTAL_CHECK_SUCCESS, data: result.data });
	} catch (err: any) {
		console.log(err);
		yield put({
			type: ActionType.GET_TOTAL_CHECK_FAIL,
			data: err.response.data,
		});
	}
}

function* getResponseSearch(action: any): Generator<any> {
	try {
		const result: any = yield call(getSearchList, action);
		console.log(result);
		yield put({ type: ActionType.GET_SEARCH_SUCCESS, data: result.data });
	} catch (err: any) {
		console.log(err);
		yield put({
			type: ActionType.GET_SEARCH_FAIL,
			data: err.response.data,
		});
	}
}

function* getResponseWantList(action: any): Generator<any> {
	try {
		const result: any = yield call(getWantList, action);
		console.log(result);
		yield put({ type: ActionType.GET_WANT_LIST_SUCCESS, data: result.data });
	} catch (err: any) {
		console.log(err);
		yield put({
			type: ActionType.GET_WANT_LIST_FAIL,
			data: err.response.data,
		});
	}
}
function* postResponseWantListAdd(action: any): Generator<any> {
	try {
		console.log(action);
		const result: any = yield call(postWantListAdd, action);
		console.log(result);
		yield put({
			type: ActionType.POST_WANT_LIST_ADD_SUCCESS,
			data: result,
		});
	} catch (err: any) {
		console.log(err);
		yield put({
			type: ActionType.POST_WANT_LIST_ADD_FAIL,
			data: err.response.data,
		});
	}
}
function* watchGetApi() {
	yield takeLatest(ActionType.GET_LOGIN, getResponseLogin);
	yield takeLatest(ActionType.GET_TOTAL_CHECK, getResponseTotalCheck);
	yield takeLatest(ActionType.GET_SEARCH, getResponseSearch);
	yield takeLatest(ActionType.GET_WANT_LIST, getResponseWantList);
	yield takeLatest(ActionType.POST_WANT_LIST_ADD, postResponseWantListAdd);
}

export default function* getSaga() {
	yield all([fork(watchGetApi)]);
}
