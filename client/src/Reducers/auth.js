const selectAuth = state => state.auth;

const authenticate = (user, token) => {
    return {
        type: 'AUTH',
        payload: {
            user: user,
            token: token
        }
    }
}

const unAuthentication = () => {
    return {type: 'UNAUTH'}
}

const update_user = (user) => {
    return {
        type: 'UPDATE-USER',
        payload: {
            user: user
        }
    }
}

const initialState = {
    isAuth: false,
    user: {},
    token: ''
}

const authentication = (state = initialState, action) => {
    switch (action.type){
        case 'AUTH': return {
            ...state,
            isAuth: true,
            user: action.payload.user,
            token: action.payload.token
        };
        case 'UPDATE-USER': return {
            ...state,
            user: action.payload.user
        }
        case 'UNAUTH': return {
            ...state,
            isAuth: false,
            user: {},
            token: ''
        };
        default: return state;
    }
}

export {selectAuth, authenticate, unAuthentication, update_user};
export default authentication;
