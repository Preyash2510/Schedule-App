const selectOther = state => state.other;

const setTitle = (title) => {
    return {
        type: 'TITLE',
        payload: {
            title: title
        }
    }
}

const initialState = {
    title: 'Dashboard',
}

const setOthers = (state = initialState, action) => {
    switch (action.type){
        case 'TITLE': return {
            ...state,
            title: action.payload.title,
        };

        default: return state;
    }
}

export { selectOther, setTitle };
export default setOthers;
