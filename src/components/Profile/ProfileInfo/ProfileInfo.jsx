import Preloader from '../../common/preloader/Preloader';
import css from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={css.descriptionWrapper}>
                <img src={props.profile.photos.large} alt='' />
                <ProfileStatusWithHooks {...props} />
            </div>
        </div>
    )
}

export default ProfileInfo;