// sagas/userTicket.js
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "../types";
import axios from "axios";
import { getApi } from "../actions";
import { getApiType } from "../reducer";

const getList=(action:getApiType)=>{
  // return axios.get('https://api.kakaobrain.com/v1/pathfinder/music/mylist',{
  //    options : 'https://api.kakaobrain.com/v1/pathfinder/music/mylist',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
  //       'Access-Control-Allow-Origin' : '*',
  //       "Access-Control-Allow-Credentials": true,
  //       'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT"
  //       },
  // });

}


function* getResponse(action:any):Generator<any> {
  try {
    const result:any = yield call(getList, action);
    console.log(result)
    yield put({ type: ActionType.GET_API_SUCCESS, data: result.data });
  } catch (err:any) {
    console.log(err)
    yield put({ type: ActionType.GET_API_FAIL, data: err.response.data });
  }
}

function* watchGetApi() {
  yield takeLatest(ActionType.GET_API, getResponse);
}

export default function* getSaga() {
  yield all([fork(watchGetApi)]);
}