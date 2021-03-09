import {
    MEMBER_UPLOADING_REQUEST,
    MEMBER_UPLOADING_SUCCESS,
    MEMBER_UPLOADING_FAILURE
  } from "../types";


  const initialState = {
    errorMsg: "",
    success: ""

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
                  errorMsg:"" ,
                  success: action.payload.success
                  
                }

              default:
                  return state;             
    }
};

export default memberReducer;
