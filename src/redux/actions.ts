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

const setDetailInfo = (payload: InfoObj) => {
	return {
		type: ActionType.SET_SELECTED_STATE,
		payload:payload,
	};
};

type ActionObject =
	| ReturnType<typeof getWant>
	| ReturnType<typeof getTotalCheck>
	
type ActionInfoObj=	
| ReturnType<typeof setDetailInfo>;
export { getTotalCheck, getWant,setDetailInfo };
export type { ActionObject ,ActionInfoObj};
