export const selectUsers = state => state.users;

export const setUsers = (users) => {
    return {
        type: 'USERS',
        payload: {
            users: users,
        }
    }
}

export const deleteUsers = () => {
    return {type: 'DEUSERS'}
}

export default function getUsers(state = {users: null}, action) {
    switch(action.type){
        case 'USERS': return {
            ...state,
            users: action.payload.users,
        };
        case 'DEUSERS': return {
            ...state,
            users: null,
        };
        default: return state;
    }
}
