import css from './FormsControls.module.css'
import { Field } from 'redux-form';

const FormControl = ({ input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

/* export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span> }
        </div>
    )
}

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span> }
        </div>
    )
} */

export const createField = (placeholder, name, validators, component, props = {}, text) => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
)