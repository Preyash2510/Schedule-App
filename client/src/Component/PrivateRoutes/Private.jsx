import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import { selectAuth } from "../../Reducers/auth";

export default function Private({component: Component, ...rest}) {

    const auth = useSelector(selectAuth).isAuth;

    return (<Route {...rest} render={props => (
        (auth) ? <Component {...props} /> :
            <Redirect to={{pathname: '/login', state: {from: props.location}}}  />
    )}/>);
}
