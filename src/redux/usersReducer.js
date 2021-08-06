import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/helpers";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_MESSAGE = 'UPDATE_NEW_POST_MESSAGE';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
                /* users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }
                    return u;
                }) */
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }

        default:
            return state;
    }
}

export const addPostAC = () => ({ type: ADD_POST });

export const updateNewPostMessageAC = (newPostText) => ({
    type: UPDATE_NEW_POST_MESSAGE,
    newPostText: newPostText,
});

export const followSuccess = (userID) => ({ type: FOLLOW, userID });
export const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCount = (totalCount) => ({ type: SET_USERS_TOTAL_COUNT, totalCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingInProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID });

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, userID));
    let response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(toggleIsFollowingInProgress(false, userID));
}

export const follow = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, userAPI.follow.bind(userAPI), followSuccess);
}

export const unfollow = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, userAPI.unfollow.bind(userAPI), unfollowSuccess);
}

export default usersReducer;
