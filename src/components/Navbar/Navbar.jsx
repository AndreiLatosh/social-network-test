import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={css.nav}>
            <div className={css.item}>
                <NavLink to='/profile' activeClassName={css.active}>Profile</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/dialogs' activeClassName={css.active}>Messages</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/users' activeClassName={css.active}>Users</NavLink>
            </div>
            <div className={css.item}>
                <a>News</a>
            </div>
            <div className={css.item}>
                <a>Music</a>
            </div>
            <div className={css.item}>
                <a>Settings</a>
            </div>
        </nav>
    );
}

export default Navbar;