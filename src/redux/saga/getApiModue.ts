// sagas/userTicket.js
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "../types";
import axios from "axios";
import { getTotalCheck, getWant } from "../actions";
import { getTotalCheckType,getWantListType } from "../reducer";

//전체조회
// const getTotalCheckList = (action: getTotalCheckType) => {
// 	return axios.get("https://api/performances", {
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
// 			"Access-Control-Allow-Origin": "*",
// 			"Access-Control-Allow-Credentials": true,
// 			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
// 		},
// 	});
// };
const getTotalCheckList = async(action: getTotalCheckType) => {
		return await axios.get("http://localhost:3000/data/total.json", {
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
				"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
			},
		});
	};
//찜목록 조회
const getWantList = (action: getWantListType) => {
	return axios.get("https://api/users/mypage/calendar", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
		},
	});
};

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
function* watchGetApi() {
	yield takeLatest(ActionType.GET_TOTAL_CHECK, getResponseTotalCheck);
  yield takeLatest(ActionType.GET_WANT_LIST, getResponseWantList);
}

export default function* getSaga() {
	yield all([fork(watchGetApi)]);
}
