import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState = {
    posts: [
        {
            id: 1,
            message: 'Hello, how are you?',
            likeCount: '15',
        },
        {
            id: 2,
            message: 'Good',
            likeCount: '14',
        },
    ],
    newPostText: 'Hello!',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                message: action.newPostText,
                likeCount: 0,
            }

            return {
                ...state,
                posts: [...state.posts, newPost],
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            }

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }

        default:
            return state;
    }
}

export const addPostAC = (newPostText) => ({ type: ADD_POST, newPostText });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: DELETE_POST, postID })
export const savePhotoSucess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userID) => async (dispatch) => {
    let response = await userAPI.getProfile(userID)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status));
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userID = getState().auth.userID;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID));
    } else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
        /* dispatch(stopSubmit('edit-profile', { 'contacts': { 'facebook': response.data.messages[0] } })); */
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer; 