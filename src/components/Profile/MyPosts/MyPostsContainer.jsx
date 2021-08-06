import { connect } from 'react-redux';
import { addPostAC } from '../../../redux/profilleReducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostAC(newPostText));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;