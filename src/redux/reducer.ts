import { ActionType } from "./types";
import { combineReducers } from "redux";
import { ActionObject } from "./actions";

export type getApiType = {
	type: string;
	payload: any;
};

const getApiState: getApiType = {
	type: "",
	payload: "",
};

const getApiReducer = async (state: getApiType, action: ActionObject) => {
	switch (action.type) {
		case ActionType.GET_API:
			return {
				type: ActionType.GET_API,
				payload: "",
			};
		case ActionType.GET_API_SUCCESS:
			console.log(state);
			console.log(action);
			return {
				type: ActionType.GET_API_SUCCESS,
				payload: action,
			};
		case ActionType.GET_API_FAIL:
			return {
				type: ActionType.GET_API_FAIL,
				payload: "fail",
			};
	}
};

const rootReducer = combineReducers({
	getApiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
