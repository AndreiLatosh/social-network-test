import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from './../../redux/profilleReducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = this.props.authorizedUserID;
            if (!userID) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile();
        }      
    }

    render() {
        return (
            <Profile isOwner={!this.props.match.params.userID} {...this.props } />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserID: state.auth.userID,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    /* withAuthRedirect */)
    (ProfileContainer);