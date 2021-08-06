import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
//import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/appReducer'
import store from './redux/reduxStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile/:userID?'
            render={withSuspense(ProfileContainer)} />

          <Route path='/dialogs'
            render={withSuspense(DialogsContainer)} />

          <Route path='/users'
            render={() => <UsersContainer />} />

          <Route path='/login'
            render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp