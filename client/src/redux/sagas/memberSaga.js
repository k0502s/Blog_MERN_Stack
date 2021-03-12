import axios from 'axios';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
    MEMBER_UPLOADING_REQUEST,
    MEMBER_UPLOADING_SUCCESS,
    MEMBER_UPLOADING_FAILURE,
    MEMBER_LIST_REQUEST,
    MEMBER_LIST_SUCCESS,
    MEMBER_LIST_FAILURE,
    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAILURE,
    MEMBER_SINGLELIST_REQUEST,
    MEMBER_SINGLELIST_SUCCESS,
    MEMBER_SINGLELIST_FAILURE,
    MEMBER_UPDATELIST_REQUEST,
    MEMBER_UPDATELIST_SUCCESS,
    MEMBER_UPDATELIST_FAILURE,
    MEMBER_WARNLIST_REQUEST,
    MEMBER_WARNLIST_SUCCESS,
    MEMBER_WARNLIST_FAILURE
} from "../types";


// uploading

const memberuploadAPI = (memberData) => {
  console.log(memberData, "memberData");
 
  return axios.post("api/member", memberData);
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




// Member list get

const memberlistAPI = (memberData) => {
  console.log(memberData, "memberData");
 
  return axios.get("api/member", memberData);
};

function* memberList(action) {
  try {
    const result = yield call(memberlistAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMBER_LIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchMemberList() {
  yield takeEvery(MEMBER_LIST_REQUEST, memberList);
}



// Member list single get

const membersinglelistAPI = (memberData) => {
  console.log(memberData, "memberData");
 
  return axios.get(`api/member/${memberData}`);
};

function* memberSingleList(action) {
  try {
    const result = yield call(membersinglelistAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_SINGLELIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMBER_SINGLELIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchMemberSingleList() {
  yield takeEvery(MEMBER_SINGLELIST_REQUEST, memberSingleList);
}


// Member list update

const memberupdateAPI = (memberData) => {
  console.log(memberData, "memberData");
 
  return axios.put(`api/member/${memberData.id}`, memberData);
};

function* memberUpdate(action) {
  try {
    const result = yield call(memberupdateAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_UPDATELIST_SUCCESS,
      payload: result.data,
    });
    yield all([
      put(push('/list'))
  ]);
  } catch (e) {
    yield put({
      type: MEMBER_UPDATELIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchMemberUpdate() {
  yield takeEvery(MEMBER_UPDATELIST_REQUEST, memberUpdate);
}




// Member Warn list

const memberWarnListAPI = (data) => {
  console.log(data, "data");

  const warnListsId = data.warnListsId
  const list = data.list

  return axios.get(`/api/user/warnlist_by_id?id=${warnListsId}&type=array`)
  .then(response =>{
    //CartItem 들에 해당하는 정보들을 product Collection에서 가져온 후에
    console.log(response.data)
    //Quantity 정보를 넣어 준다. 즉 product 정보와, cart 정보의 Quantity의 조합이다.
    list.forEach(listItem => {
        response.data.forEach((listDetail, index) => {
            if(listItem.id === listDetail._id) {
                response.data[index].quantity = listItem.quantity
            }
        })
    })
    return response.data;
  });
};

function* memberWarnList(action) {
  try {
    const result = yield call(memberWarnListAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_WARNLIST_SUCCESS,
      payload: result
    });
  } catch (e) {
    yield put({
      type: MEMBER_WARNLIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchmemberWarnList() {
  yield takeEvery(MEMBER_WARNLIST_REQUEST, memberWarnList);
}





// Member delete

const memberdeleteAPI = (memberData) => {
  
 
  return axios.delete(`api/member/${memberData}`);
};

function* memberDelete(action) {
  try {
    const result = yield call(memberdeleteAPI, action.payload);
    console.log(result);
    yield put({
      type: MEMBER_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: MEMBER_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchMemberDelete() {
  yield takeEvery(MEMBER_DELETE_REQUEST, memberDelete);
}



export default function* memberSaga() {
  yield all([
    fork(watchMenberUpload),
    fork(watchMemberList),
    fork(watchMemberDelete),
    fork(watchMemberSingleList),
    fork(watchMemberUpdate),
    fork(watchmemberWarnList)
  ]);
}
