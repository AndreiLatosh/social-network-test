import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import css from './MyPosts.module.css'
import Post from './Post/Post';

const maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo((props) => { //Dont work. 3 renders

    const addNewPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={css.postsWrapper}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={addNewPost} />
            <div className={css.posts}>
                {props.profilePage.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} />)}
            </div>
        </div>
    );
});

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostText' placeholder='Enter your post'
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({ form: 'addNewPostForm' })(AddNewPostForm)

export default MyPosts;