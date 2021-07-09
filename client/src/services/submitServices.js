import {authenticate, unAuthentication, update_user} from "../Reducers/auth";
import store from "../index";
import {raise, withdraw} from "../Reducers/error";
import {deleteUsers, setUsers} from "../Reducers/users";

export const loginSubmit = async (body, type) => {
    let rtn;
    await fetch(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/${type}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(!res.ok){
                store.dispatch(raise(res.status, res.statusText));
                throw Error(res.status + ': ' + res.statusText)
            }
            return res.json();
        })
        .then(res => {

            if(['login', 'register'].includes(type))
            {
                store.dispatch(authenticate(res.user, res.token));
                rtn = {status: res.message, response: res}
            }
            else if(type === 'logout')
            {
                store.dispatch(unAuthentication());
                store.dispatch(deleteUsers());
                rtn = {status: res.message, response: res}
            }
            store.dispatch(withdraw());

        })
        .catch(err => {
            if(err.message === 'Failed to fetch'){
                store.dispatch(raise(0, 'Could not connect to Server!'));
            }
            rtn = {status: 'FAILURE', error: err}
    });

    return rtn;
}

export const otherSubmit = async (body, type) => {
    await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/${type}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(res => {
            if(!res.ok){
                console.log()
                store.dispatch(raise(res.status, res.statusText));
                throw Error(res.status + ': ' + res.statusText)
            }
            return res.json();
        })
        .then(res => {
            if(['all', 'connect', 'unconnect', 'schedule', 'cancel'].includes(type)){

                for(let key of Object.keys(res.users)){
                    if(res.users[key].schedule !== null){
                        const dateTime = res.users[key].schedule.split(' ');
                        res.users[key].schedule = `${dateTime[0]}T${dateTime[1]}`;
                    }
                }

                store.dispatch(setUsers(res.users));
            } else if (type === 'update'){
                store.dispatch(update_user(res.user));
            }
            store.dispatch(withdraw());
        }).catch(err => {
            if(err.message === 'Failed to fetch'){
                store.dispatch(raise(0, 'Could not connect to Server!'));
            }
        });
}
