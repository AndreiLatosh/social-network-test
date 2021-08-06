import { getAuthUserData } from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

const setInitializedSuccess = () => ({ type: SET_INITIALIZED_SUCCESS });

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(setInitializedSuccess());
}

export default appReducer;