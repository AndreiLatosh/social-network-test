import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import css from './Dialogs.module.css'
import Message from './Message/Message';

const Dialogs = (props) => {

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    }

    if (!props.isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)}
            </div>
            <div className={css.messages}>
                <div>{props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />)}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>

    )
}

const maxLength15 = maxLengthCreator(15);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newMessageText' placeholder='Enter your message'
                validate={[required, maxLength15]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;