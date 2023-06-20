import { ActionType } from "./types";

const getTotalCheck = () => {
	return {
		type: ActionType.GET_TOTAL_CHECK,
	};
};
const getWantList = () => {
	return {
		type: ActionType.GET_WANT_LIST,
	};
};

type ActionObject =
	| ReturnType<typeof getWantList>
	| ReturnType<typeof getTotalCheck>;

export { getTotalCheck, getWantList };
export type { ActionObject };
