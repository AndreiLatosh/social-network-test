import MyPostsContainer from './MyPosts/MyPostsContainer';
import css from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div className={css.content}>
            <ProfileInfo isOwner={props.isOwner} {...props} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;