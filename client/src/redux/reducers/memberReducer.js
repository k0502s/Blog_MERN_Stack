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
} from '../types';

const initialState = {
    errorMsg: '',
    success: '',
    totalItems: '',
    memberlist: '',
    singlememberlist: '',
    updatelist: '',
    totalPages: '',
    currentPage: '',
    deletesuccess: '',
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER_UPLOADING_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case MEMBER_UPLOADING_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                singlememberlist: '',
            };
        case MEMBER_UPLOADING_FAILURE:
            return {
                ...state,
                errorMsg: 'error',
                success: action.payload.success,
            };

        case MEMBER_LIST_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case MEMBER_LIST_SUCCESS:
            return {
                ...state,
                totalItems: action.payload.totalItems,
                memberlist: action.payload.memberdata,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        case MEMBER_LIST_FAILURE:
            return {
                ...state,
                errorMsg: 'error',
                totalItems: '',
                memberlist: '',
                totalPages: '',
                currentPage: '',
            };

        case MEMBER_DELETE_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case MEMBER_DELETE_SUCCESS:
            return {
                ...state,
                deletesuccess: action.payload.success,
            };
        case MEMBER_DELETE_FAILURE:
            return {
                ...state,
                errorMsg: 'error',
                deletesuccess: action.payload.success,
            };

        case MEMBER_SINGLELIST_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case MEMBER_SINGLELIST_SUCCESS:
            return {
                ...state,
                singlememberlist: action.payload,
            };
        case MEMBER_SINGLELIST_FAILURE:
            return {
                ...state,
                errorMsg: 'error',
                singlememberlist: action.payload.message,
            };

        case MEMBER_UPDATELIST_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case MEMBER_UPDATELIST_SUCCESS:
            return {
                ...state,
                singlememberlist: '',
                updatelist: action.payload.message,
            };
        case MEMBER_UPDATELIST_FAILURE:
            return {
                ...state,
                errorMsg: 'error',
                updatelist: action.payload.message,
            };

        default:
            return state;
    }
};

export default memberReducer;
