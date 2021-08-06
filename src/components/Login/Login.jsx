import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import css from './../common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {/* <div>
                <Field placeholder={'Email'} name={'email'} component={Input}
                    validate={[required]} />
            </div> */}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            {/* <div>
                <Field placeholder={'Password'} name={'password'} component={Input}
                    validate={[required]} type={'password'} />
            </div> */}
            {createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}
            {/* <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div> */}
            {error && <div className={css.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, { login })(Login);