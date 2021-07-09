const selectLogin = state => state.loginPage;

const login = () => {
    return { type: 'LOGIN' };
}

const signup = () => {
    return { type: 'SIGNUP' };
}

const loginTypeReducer = (state = {loginType : 'login', slide: 'left'} , action) => {
    switch (action.type){
        case 'LOGIN': return { ...state, loginType : 'login', slide: 'right' };
        case 'SIGNUP': return { ...state, loginType : 'signup', slide: 'left' };
        default: return {...state};
    }
}

export { login, signup, selectLogin };
export default loginTypeReducer;

