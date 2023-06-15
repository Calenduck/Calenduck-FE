import {  all, fork, put, call, takeLatest  } from "redux-saga/effects";


import getSaga from "./getApiModue";

export default function* rootSaga() {
  yield all([fork(getSaga)]);

}