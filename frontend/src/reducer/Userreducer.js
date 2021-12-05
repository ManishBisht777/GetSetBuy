import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/UserConstant";

import { CLEAR_ERROR } from "../constants/UserConstant";

export const userreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isauthenticated: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isauthenticated: true,
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isauthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
