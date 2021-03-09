import axios from 'axios';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
    MEMBER_UPLOADING_REQUEST,
    MEMBER_UPLOADING_SUCCESS,
    MEMBER_UPLOADING_FAILURE
} from "../types";


// uploading

const memberuploadAPI = (memberData) => {
  console.log(memberData, "memberData");
 
  return axios.post("/api/member", memberData);
};

function* memberUpload(action) {
  try {
    const result = yield call(memberuploadAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield all([
      put(push('/list')),
  ]);
    
  } catch (e) {
    yield put({
      type: MEMBER_UPLOADING_FAILURE,
      payload: e.response,
    });
    yield put(alert('업로드 실패.'));
  }
}

function* watchMenberUpload() {
  yield takeEvery(MEMBER_UPLOADING_REQUEST, memberUpload);
}



export default function* memberSaga() {
  yield all([
    fork(watchMenberUpload),
  ]);
}
