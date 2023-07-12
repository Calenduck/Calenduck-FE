import { ActionType } from "./types";
import { combineReducers } from "redux";
import { ActionObject, ActionInfoObj } from "./actions";
import { InfoObj } from "./types";

export type getLoginType = {
	type: string;
	payload: any;
};
export type getSearchType = {
	type: string;
	payload: any;
};
export type getTotalCheckType = {
	type: string;
	payload: Array<any>;
};
export type getWantListType = {
	type: string;
	payload: Array<any>;
};

export type setDetailInfoType = {
	type: string;
	payload: InfoObj;
};

export type postWantListAddType = {
	type: string;
	payload:any
};


const getLoginReducer = async (
	state: getLoginType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.GET_LOGIN:
			return {
				type: ActionType.GET_LOGIN,
			};
		case ActionType.GET_LOGIN_SUCCESS:

			return {
				type: ActionType.GET_LOGIN_SUCCESS,
				payload:await action,
			};
		case ActionType.GET_LOGIN_FAIL:
			return {
				type: ActionType.GET_LOGIN_FAIL,
				payload: "fail",
			};
	}
};
const getSearchReducer = async (
	state: getSearchType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.GET_SEARCH:
			return {
				type: ActionType.GET_SEARCH,
			};
		case ActionType.GET_SEARCH_SUCCESS:
			console.log(action)
			return {
				type: ActionType.GET_SEARCH_SUCCESS,
				payload:action,
			};
		case ActionType.GET_SEARCH_FAIL:
			return {
				type: ActionType.GET_SEARCH_FAIL,
				payload: "fail",
			};
	}
};

const getTotalCheckReducer = async (
	state: getTotalCheckType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.GET_TOTAL_CHECK:
			return {
				type: ActionType.GET_TOTAL_CHECK,
				payload: "",
			};
		case ActionType.GET_TOTAL_CHECK_SUCCESS:
			console.log(state);
			console.log(action);
			return {
				type: ActionType.GET_TOTAL_CHECK_SUCCESS,
				payload: action,
			};
		case ActionType.GET_TOTAL_CHECK_FAIL:
			return {
				type: ActionType.GET_TOTAL_CHECK_FAIL,
				payload: "fail",
			};
	}
};

const getWantListReducer = async (
	state: getWantListType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.GET_WANT_LIST:
			return {
				type: ActionType.GET_WANT_LIST,
				payload: "",
			};
		case ActionType.GET_WANT_LIST_SUCCESS:
			console.log(state);
			console.log(action);
			return {
				type: ActionType.GET_WANT_LIST_SUCCESS,
				payload: action,
			};
		case ActionType.GET_TOTAL_CHECK_FAIL:
			return {
				type: ActionType.GET_WANT_LIST_FAIL,
				payload: "fail",
			};
	}
};
const postWantListAddReducer = async (
	state: postWantListAddType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.POST_WANT_LIST_ADD:
			return {
				type: ActionType.POST_WANT_LIST_ADD,
				action: action,
			};
		case ActionType.POST_WANT_LIST_ADD_SUCCESS:
			console.log(state);
			console.log(action);
			return {
				type: ActionType.POST_WANT_LIST_ADD_SUCCESS,
			};
		case ActionType.POST_WANT_LIST_ADD_FAIL:
			return {
				type: ActionType.POST_WANT_LIST_ADD_FAIL,
			};
	}
};

const setDetailInfoReducer = (
	state: setDetailInfoType,
	action: ActionInfoObj,
) => {
	switch (action.type) {
		case ActionType.SET_SELECTED_STATE:
			console.log(action.payload);
			return {
				type: ActionType.SET_SELECTED_STATE,
				payload: { ...action.payload },
			};
		default:
			return null;
	}
};

const rootReducer = combineReducers({
	getLoginReducer,
	getSearchReducer,
	getTotalCheckReducer,
	getWantListReducer,
	setDetailInfoReducer,
	postWantListAddReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
