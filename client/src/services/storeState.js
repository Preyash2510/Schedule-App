export function loadState() {
    try {
        const state = window.localStorage.getItem('previousState');
        if(state === null){
            return undefined;
        }

        return JSON.parse(state);
    }catch (err){
        return undefined;
    }
}

export function saveState(state){
    try {
        const currentState = JSON.stringify(state);
        window.localStorage.setItem('previousState', currentState);
    } catch (err){
        console.log(err);
    }
}
