import {
    MEMBER_UPLOADING_REQUEST,
    MEMBER_UPLOADING_SUCCESS,
    MEMBER_UPLOADING_FAILURE,
    MEMBER_LIST_REQUEST,
    MEMBER_LIST_SUCCESS,
    MEMBER_LIST_FAILURE,
    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAILURE
  } from "../types";


  const initialState = {
    errorMsg: "",
    success: "",
    totalItems: "",
    memberlist: "",
    totalPages: "",
    currentPage: "",
    deletesuccess: "",
  };

        const memberReducer = (state = initialState, action) => {
            switch(action.type){
              case MEMBER_UPLOADING_REQUEST: 
              return {
                ...state,
                errorMsg: "",
                isLoading: true
              }
              case MEMBER_UPLOADING_SUCCESS:
                return {
                  ...state,
                  success: action.payload.success

                }
              case MEMBER_UPLOADING_FAILURE:
                return {
                  ...state,
                  errorMsg:"error" ,
                  success: action.payload.success
                  
                }

                case MEMBER_LIST_REQUEST: 
              return {
                ...state,
                errorMsg: "",
                isLoading: true
              }
              case MEMBER_LIST_SUCCESS:
                return {
                  ...state,
                  totalItems: action.payload.totalItems,
                  memberlist: action.payload.tutorials,
                  totalPages: action.payload.totalPages,
                  currentPage: action.payload.currentPage
                }
              case MEMBER_LIST_FAILURE:
                return {
                  ...state,
                  errorMsg:"error" ,
                  totalItems: "",
                  memberlist: "",
                  totalPages: "",
                  currentPage: "",
                }

                case MEMBER_DELETE_REQUEST: 
                return {
                  ...state,
                  errorMsg: "",
                  isLoading: true
                }
                case MEMBER_DELETE_SUCCESS:
                  return {
                    ...state,
                    deletesuccess: action.payload.success
                  }
                case MEMBER_DELETE_FAILURE:
                  return {
                    ...state,
                    errorMsg:"error" ,
                    deletesuccess: action.payload.success
                  }

              default:
                  return state;             
    }
};

export default memberReducer;
