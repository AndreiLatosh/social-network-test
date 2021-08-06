const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: 4,
                message: action.newMessageText,
            }

            return {
                ...state,
                messages: [...state.messages, newMessage]
            }

        default:
            return state;
    }
}

export const sendMessageAC = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });

export default dialogsReducer;