export enum ActionType {
	//전체조회
	GET_TOTAL_CHECK = "GET_TOTAL_CHECK",
	GET_TOTAL_CHECK_SUCCESS = "GET_TOTAL_CHECK_SUCCESS",
	GET_TOTAL_CHECK_FAIL = "GET_TOTAL_CHECK_FAIL",

	//찜목록조회
	GET_WANT_LIST = "GET_WANT_LIST",
	GET_WANT_LIST_SUCCESS = "GET_WANT_LIST_SUCCESS",
	GET_WANT_LIST_FAIL = "GET_WANT_LIST_FAIL",
	//찜목록 추가/취소
	POST_WANT_LIST_ADD = "POST_WANT_LIST_ADD",
	POST_WANT_LIST_ADD_SUCCESS = "POST_WANT_LIST_ADD_SUCCESS",
	POST_WANT_LIST_ADD_FAIL = "POST_WANT_LIST_ADD_FAIL",

	//선택목록 상태저장
	SET_SELECTED_STATE = "SET_SELECTED_STATE",
}

export interface InfoObj {
	poster?: string;
	prfnm?: string;
	prfcast?: string;
	genrenm?: string;
	fcltynm?: string;
	dtguidance?: string;
	prfpdfrom?: string;
	prfpdto?: string;
	pcseguidance?: string;
	mt20id?: string;
	day?: string;
}
