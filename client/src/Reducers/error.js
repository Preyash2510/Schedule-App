const selectError = state => state.error;

const raise = (status, message) => {
    return {
        type: 'RAISE',
        payload: {
            status: status,
            message: message
        }
    };
}

const withdraw = () => {
    return {type: 'WITHDRAW'};
}

const throwError = (state = {status: null, message: ''} , action ) => {
    switch (action.type) {
        case 'RAISE':
            return statusError(state, action.payload.status, action.payload.message);

        case 'WITHDRAW': return {
            status: null,
            message: ''
        }

        default: return state;
    }
}

const statusError = (state, status, message = '') => {
    switch (status) {
        case 401:
            return { ...state,
                status: status,
                message: "Incorrect username or password!"
            }

        case 422:
            return { ...state,
                status: status,
                message: "User already Exist!"
            }

        case 500:
            return { ...state,
                status: status,
                message: "Something wrong on Server-Side!"
            }

        case 'FAILURE':
            return { ...state,
                status: status,
                message: "Something went wrong! Can't connect to server!"
            }

        default:
            return { ...state,
                status: status,
                message: message
            }
    }
}

export { selectError, raise, withdraw };
export default throwError;
