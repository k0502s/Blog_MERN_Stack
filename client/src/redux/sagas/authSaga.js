import axios from 'axios';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    USER_LOADING_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    PASSWORD_EDIT_UPLOADING_SUCCESS,
    PASSWORD_EDIT_UPLOADING_REQUEST,
    PASSWORD_EDIT_UPLOADING_FAILURE,
    MEMBER_WARN_REQUEST,
    MEMBER_WARN_SUCCESS,
    MEMBER_WARN_FAILURE,
    MEMBER_WARNLIST_REQUEST,
    MEMBER_WARNLIST_SUCCESS,
    MEMBER_WARNLIST_FAILURE,
    MEMBER_REMOVEWARNMEMBER_REQUEST,
    MEMBER_REMOVEWARNMEMBER_SUCCESS,
    MEMBER_REMOVEWARNMEMBER_FAILURE,
} from '../types';

// Login

const loginUserAPI = (loginData) => {
    console.log(loginData, 'loginData');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload);
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT

function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        });
        console.log(e);
    }
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}

// Register

const registerUserAPI = (req) => {
    console.log(req, 'req');

    return axios.post('api/user', req);
};

function* registerUser(action) {
    try {
        const result = yield call(registerUserAPI, action.payload);
        console.log(result, 'RegisterUser Data');
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response,
        });
    }
}

function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
}

// clear Error

function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
        console.error(e);
    }
}

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// User Loading

const userLoadingAPI = (token) => {
    console.log(token);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.get('api/auth/user', config);
};

function* userLoading(action) {
    try {
        console.log(action, 'userLoading');
        const result = yield call(userLoadingAPI, action.payload);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// Edit Password

const EditPasswordAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = payload.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* EditPassword(action) {
    try {
        console.log(action, 'EditPassword');
        const result = yield call(EditPasswordAPI, action.payload);
        yield put({
            type: PASSWORD_EDIT_UPLOADING_SUCCESS,
            payload: result,
        });
        yield put(push('/'));
    } catch (e) {
        yield put({
            type: PASSWORD_EDIT_UPLOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchEditPassword() {
    yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}

const memberWarnAPI = (payload) => {
    console.log(payload);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = payload.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('api/user/warn', payload, config);
};

function* memberWarn(action) {
    try {
        console.log(action, 'warn');
        const result = yield call(memberWarnAPI, action.payload);
        yield put({
            type: MEMBER_WARN_SUCCESS,
            payload: result.data,
        });
        yield put(push(alert('경고 완료.')));
    } catch (e) {
        yield put({
            type: MEMBER_WARN_FAILURE,
            payload: e.response,
        });
        yield put(push(alert('실패했습니다.')));
    }
}

function* watchmemberWarn() {
    yield takeEvery(MEMBER_WARN_REQUEST, memberWarn);
}

// Member Warn list

const memberWarnListAPI = (data) => {
    console.log(data, 'data');


    const warnListsId = data.warnListsId;
    const list = data.list;
    const page = data.page;
    const size = data.size;
    // const params = data.params

    return axios.get(`/api/user/warnlist_by_id?id=${warnListsId}&type=array&page=${page}&size=${size}`).then((response) => {
        //CartItem 들에 해당하는 정보들을 product Collection에서 가져온 후에
        console.log(response.data);
        //Quantity 정보를 넣어 준다. 즉 product 정보와, cart 정보의 Quantity의 조합이다.
        list.forEach((listItem) => {
            response.data.warndata.forEach((listDetail, index) => {
                if (listItem.id === listDetail._id) {
                    response.data.warndata[index].quantity = listItem.quantity;
                }
            });
        });
        return response.data;
    });
};

function* memberWarnList(action) {
    try {
        const result = yield call(memberWarnListAPI, action.payload);
        console.log(result);
        yield put({
            type: MEMBER_WARNLIST_SUCCESS,
            payload: result,
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

const removeWarnmemberAPI = (payload) => {
    console.log(payload);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = payload.token;
    const id = payload.id;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.get(`/api/user/removeWarnMember?id=${id}`, config).then((response) => {
        //productInfo, cart 정보를 조합해서 CartDetail을 만든다.

        //이미 서버쪽에서 원하는 정보를 삭제하였고 원래 카트에 담을 때도 합쳤으므로 다시 합쳐서 데이터를 보내준다.
        response.data.cart.forEach((item) => {
            response.data.listInfo.forEach((list, index) => {
                if (item.id === list._id) {
                    response.data.listInfo[index].quantity = item.quantity;
                }
            });
        });
        return response.data;
    });
};

function* removeWarnmember(action) {
    try {
        console.log(action, 'remove');
        const result = yield call(removeWarnmemberAPI, action.payload);
        yield put({
            type: MEMBER_REMOVEWARNMEMBER_SUCCESS,
            payload: result,
        });
    } catch (e) {
        yield put({
            type: MEMBER_REMOVEWARNMEMBER_FAILURE,
            payload: e.response,
        });
    }
}

function* watchremoveWarnmember() {
    yield takeEvery(MEMBER_REMOVEWARNMEMBER_REQUEST, removeWarnmember);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchuserLoading),
        fork(watchregisterUser),
        fork(watchclearError),
        fork(watchEditPassword),
        fork(watchmemberWarn),
        fork(watchmemberWarnList),
        fork(watchremoveWarnmember),
    ]);
}
