import profileReducer, { addPostAC, deletePost } from "./profilleReducer";

const state = {
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
    ]
};

test('posts length should be incremented', () => {
    const action = addPostAC("Hello!")
    
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
    const action = addPostAC("Hello!")

    const newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('Hello!');
});

test('posts length after delete should be decremented', () => {
    const action = deletePost(2)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1);
});

test('posts length after delete should`t be change if ID is incorrect', () => {
    const action = deletePost(3)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2);
});