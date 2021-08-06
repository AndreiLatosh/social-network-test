import MyPostsContainer from './MyPosts/MyPostsContainer';
import css from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div className={css.content}>
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;