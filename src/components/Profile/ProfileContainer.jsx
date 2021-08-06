import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus  } from './../../redux/profilleReducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = this.props.authorizedUserID;
            if(!userID) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    render() {
        return (
            <Profile {...this.props} />
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
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    /* withAuthRedirect */)
    (ProfileContainer);