import React, { useEffect } from 'react';
import {otherSubmit} from "../../services/submitServices";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../Reducers/auth";
import {selectUsers} from "../../Reducers/users";
import Card from "../../Component/Card/Card";
import './Users.css';
import {selectError} from "../../Reducers/error";
import Error from "../Error/Error";
import {selectOther, setTitle} from "../../Reducers/other";

export default function Users(props) {

    const {user, token} = useSelector(selectAuth);
    const users = useSelector(selectUsers).users;
    const {title} = useSelector(selectOther);
    const {status, message} = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {

        if(users === null){
            otherSubmit({api_token: token, user: user.userName}, 'all').catch(e => console.error(e));
        }

        if(title !== 'Dashboard'){
            dispatch(setTitle('Dashboard'));
        }

    }, [dispatch, title, token, user, users]);

    const usersPage = () => {
        return (
            <div id={'users'}>
                {(users === null) ? '' : Object.keys(users).map((key, index) => {
                    return (users[key].userName !== user.userName) ? (
                        <Card
                            key={key}
                            name={`${users[key].firstName} ${users[key].lastName}`}
                            userName={users[key].userName}
                            connected={users[key].connected}
                            schedule={users[key].schedule}
                        />
                    ) : '';
                })}
            </div>
        );
    }

    const errorPage = () => {
        return (
            <Error status={status} message={message}/>
        )
    }

    return (
        <div id={'users-body'}>
            {(status === null) ? usersPage() : errorPage()}
        </div>
    );

}
