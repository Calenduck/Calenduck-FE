import { ActionType, InfoObj } from "./types";

const getLoginAction = (code: string) => {
	return {
		type: ActionType.GET_LOGIN,
		payload: code,
	};
};
const getTotalCheck = () => {
	return {
		type: ActionType.GET_TOTAL_CHECK,
	};
};
const getSeacrch = (prfnm: string, prfcast: string) => {
	return {
		type: ActionType.GET_SEARCH,
	};
};
const getWant = () => {
	return {
		type: ActionType.GET_WANT_LIST,
	};
};
const postWantAdd = (
	mt20id: string,
	year: string,
	month: string,
	day: string,
) => {
	return {
		type: ActionType.POST_WANT_LIST_ADD,
		payload: {
			mt20id: mt20id,
			year: year,
			month: month,
			day: day,
		},
	};
};

const setDetailInfo = (payload: InfoObj) => {
	return {
		type: ActionType.SET_SELECTED_STATE,
		payload: payload,
	};
};

type ActionObject =
	| ReturnType<typeof getWant>
	| ReturnType<typeof getTotalCheck>
	| ReturnType<typeof postWantAdd>
	| ReturnType<typeof getLoginAction>
	| ReturnType<typeof getSeacrch>;

type ActionInfoObj = ReturnType<typeof setDetailInfo>;
export {
	getTotalCheck,
	getWant,
	setDetailInfo,
	postWantAdd,
	getLoginAction,
	getSeacrch,
};
export type { ActionObject, ActionInfoObj };
