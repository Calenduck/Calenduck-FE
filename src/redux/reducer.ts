import { ActionType } from "./types";
import { combineReducers } from "redux";
import { ActionObject } from "./actions";

export type getTotalCheckType = {
	type: string;
	payload: Array;
};
export type getWantListType = {
	type: string;
	payload: Array;
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

const rootReducer = combineReducers({
	getTotalCheckReducer,
	getWantListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
