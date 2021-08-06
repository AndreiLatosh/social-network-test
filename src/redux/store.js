import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profilleReducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: 'Hello, how are you?',
                    likeCount: '15',
                },
                {
                    id: 2,
                    message: 'Good',
                    likeCount: '14',
                },
            ],
            newPostText: 'Hello!'
        },

        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Andrei',
                },
                {
                    id: 2,
                    name: 'Tanya',
                },
                {
                    id: 3,
                    name: 'Dima',
                },
            ],

            messages: [
                {
                    id: 1,
                    message: 'Hello!',
                },
                {
                    id: 2,
                    message: 'How are you?!',
                },
                {
                    id: 3,
                    message: "I'm fine.",
                },
            ],
            newMessageText: '',
        }
    },
    _callSubscriber() {
        console.log('There\'s no subscribers.')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);  
    }
}

export default store;