import React from 'react';
import logo from '../../img/Schedule.png';
import './Home.css';
import LinkButton from "../../Component/Button/Link_Button";
import {useDispatch} from "react-redux";
import {login, signup} from '../../Reducers/login';

export default function Home(){

    const dispatch = useDispatch();

    return (
        <div className={'home-body'}>
            <div className={'logo-container'}>
                <img className={'logo'} src={logo} alt={'Schedule'}/>
                <h1>Schedule App</h1>
                <h3>Schedule phone calls with different People!</h3>
            </div>
            <div className={'login-container'}>
                <div className={'button-container'}>
                    <p>
                        Login to connect with people and schedule a call!
                    </p>
                    <LinkButton label={'Login'} path={'/login'} onClick={() => dispatch(login())}/>
                </div>
                <div className={'button-container'}>
                    <p>
                        Register to connect with people and schedule a call!
                    </p>
                    <LinkButton label={'Sign Up'} path={'/register'} onClick={() => dispatch(signup())}/>
                </div>
            </div>
        </div>
    );
}
