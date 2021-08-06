import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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

        default:
            return state;
    }
}

export const addPostAC = (newPostText) => ({ type: ADD_POST, newPostText });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: DELETE_POST, postID })

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

export default profileReducer;