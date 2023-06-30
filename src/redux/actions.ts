import { ActionType, InfoObj } from "./types";

const getTotalCheck = () => {
	return {
		type: ActionType.GET_TOTAL_CHECK,
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
	| ReturnType<typeof postWantAdd>;

type ActionInfoObj = ReturnType<typeof setDetailInfo>;
export { getTotalCheck, getWant, setDetailInfo, postWantAdd };
export type { ActionObject, ActionInfoObj };
