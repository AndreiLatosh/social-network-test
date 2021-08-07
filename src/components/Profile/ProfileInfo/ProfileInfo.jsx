import Preloader from '../../common/preloader/Preloader';
import css from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/anonim.png';
import React, { useState } from "react";
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false);
            });
    }

    return (
        <div>
            <div className={css.descriptionWrapper}>
                <img src={props.profile.photos.large || userPhoto} alt='' />
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                    : <ProfileData
                        goToEditMode={() => { setEditMode(true) }}
                        profile={props.profile}
                        isOwner={props.isOwner} />}

                <ProfileStatusWithHooks {...props} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner &&
                <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>}
            <div>
                <b>Fullname:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={css.contact}>
            <b>{contactTitle}:</b> {contactValue}
        </div>
    )
}

export default ProfileInfo;