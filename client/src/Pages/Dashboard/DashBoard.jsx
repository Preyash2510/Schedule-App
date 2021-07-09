import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../Reducers/auth";
import logo from '../../img/Schedule.png';
import acc from '../../img/profile.png';
import exit from '../../img/exit.png';
import {loginSubmit} from "../../services/submitServices";
import './Dashboard.css';
import Button from "../../Component/Button/Button";
import LinkButton from "../../Component/Button/Link_Button";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "../Profile/Profile";
import {selectOther, setTitle} from "../../Reducers/other";
import Users from "../All Users/Users";

export default function DashBoard(props) {

    const {isAuth, user} = useSelector(selectAuth);
    const {title} = useSelector(selectOther);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await loginSubmit({userName: user.userName}, 'logout').catch(err => console.error(err));
    }

    const page = () => {
        return (
            <BrowserRouter>
                <div id={'nav'}>

                    <LinkButton
                        path={'/dashboard'}
                        id={'home'}
                        onClick={() => dispatch(setTitle('Dashboard'))}
                    >
                        <img id={'logo'} src={logo} alt={'logo'}/>
                    </LinkButton>

                    <h1>{title}</h1>

                    <div id={'account'}>

                        <LinkButton path={'/profile'} id={'acc-btn'} >
                            <img src={acc} alt={'account'}/>
                            <p>{user.userName}</p>
                        </LinkButton>

                        <Button id={'logout-btn'} onClick={handleLogout}>
                            <img id={'logout-icon'} src={exit} alt={'logout'}/>
                        </Button>

                    </div>

                </div>

                <div className={'pageWrapper'}>
                    <Route exact path={'/dashboard'}>
                        <Users />
                    </Route>
                    <Route exact path={'/profile'}>
                        <Profile/>
                    </Route>

                </div>
            </BrowserRouter>
        );
    }

    return (
        <div className={'dash-body'}>
            {(isAuth) ? page() : <h1>UNAUTHORIZED</h1>}
        </div>
    );
}
