import { NavLink } from 'react-router-dom'
import css from './Header.module.css'

const Header = (props) => {
    return (
        <header className={css.header}>
            <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/insurance-company-your-logo-design-template-de2398bb234024633dcd5a368a37201a_screen.jpg?ts=1611064322' alt='logo' />
            <div className={css.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;