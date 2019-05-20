import client from "../../../utilities/apiClient";

const MODULE_NAME = "InternInfo";
const initialState = {
  loaded: false,
  data: {}
};

// Constants
export const FETCH = `redux/${MODULE_NAME}/FETCH`;
export const FETCH_SUCCESS = `redux/${MODULE_NAME}/FETCH_SUCCESS`;
export const FETCH_FAIL = `redux/${MODULE_NAME}/FETCH_FAIL`;

// Reducer
export default function InternInfo(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
        status: "success"
      };

    case FETCH_FAIL:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: false,
        status: "fail"
      };

    default:
      return state;
  }
}

// Actions

// Actions
export function isLoading() {
  return {
    type: FETCH
  };
}

function fetchSuccess(result) {
  return {
    type: FETCH_SUCCESS,
    payload: result
  };
}

function fetchFail(err) {
  return {
    type: FETCH_FAIL,
    payload: err
  };
}

// GET Data
export function fetchInternInfo(id) {
  return dispatch => {
    dispatch(isLoading());
    return client.get(``).then(
      res => {
        const payload = res.data;
        // APIを叩いたときに返ってくるデータが以下の２パターンある
        // - payload.bodyのなかにデータがあるパターン
        // - payloadのなかにデータがあるパターン
        // どちらでもいけるように分岐
        if (payload.body) {
          dispatch(fetchSuccess(payload.body));
        } else {
          dispatch(fetchSuccess(payload));
        }

        return res;
      },
      err => {
        dispatch(fetchFail(err));
        throw err;
      }
    );
  };
}
