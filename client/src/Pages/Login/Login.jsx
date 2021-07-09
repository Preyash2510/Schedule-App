import React, { useState, useEffect } from 'react';
import './Login.css';
import Input from "../../Component/Input/Input";
import logo from '../../img/Schedule.png';
import passIcon from '../../img/eye.png';
import hideIcon from '../../img/private.png';
import Button from "../../Component/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {login, selectLogin, signup} from "../../Reducers/login";
import LinkButton from "../../Component/Button/Link_Button";
import { loginSubmit } from "../../services/submitServices";
import Crypt from 'crypto';
import {Redirect} from "react-router-dom";
import {selectAuth} from "../../Reducers/auth";
import {raise, selectError, withdraw} from "../../Reducers/error";

export default function Login(){

    const [icon, setIcon] = useState({
        type: 'password',
        icon: passIcon
    });

    const {loginType, slide} = useSelector(selectLogin);
    const {message} = useSelector(selectError);
    const dispatch = useDispatch();

    const {isAuth} = useSelector(selectAuth);

    useEffect(() => {
        if(loginType === undefined){
            dispatch(login());
        }
        setIcon({
            type: 'password',
            icon: passIcon
        });
        dispatch(withdraw());
    }, [loginType, dispatch]);

    const signupSide = () => {
        return (
            <>
                <Input label={'First Name'} name={'firstName'} type={'text'}/>
                <Input label={'Last Name'} name={'lastName'} type={'text'}/>
                <Input label={'Username'} name={'userName'} type={'text'}/>
                <Input label={'Password'} name={'password'} type={icon.type}
                       icon={icon.icon}
                       iconOnClick={() => setIcon({
                           type: (icon.type === 'password') ? 'text': 'password',
                           icon: (icon.type === 'password') ? hideIcon : passIcon
                       })}
                />
                {(message === "") ? '' : <div className={'login-error'}>{message}</div>}
                <Button label={'Sign Up'} style={{width: '80%'}} onClick={handleSignupButton}/>
            </>
        );
    }

    const loginSide = () => {
        return (
            <>
                <Input label={'Username'} name={'userName'} type={'text'}/>
                <Input label={'Password'} name={'password'} type={icon.type}
                       icon={icon.icon}
                       iconOnClick={() => setIcon({
                           type: (icon.type === 'password') ? 'text': 'password',
                           icon: (icon.type === 'password') ? hideIcon : passIcon
                       })}
                />
                {(message === "") ? '' : <div className={'login-error'}>{message}</div>}
                <Button label={'Login'} style={{width: '80%'}} onClick={handleLoginButton}/>
            </>
        )
    }

    const handleSliderButton = (state) => {
        if(state === 'login'){
            dispatch(signup());
        } else {
            dispatch(login());
        }
    }

    const handleSignupButton = () => {
        let first = document.getElementsByName('firstName')[0].value;
        let last = document.getElementsByName('lastName')[0].value;
        let username = document.getElementsByName('userName')[0].value;
        let password = document.getElementsByName('password')[0].value;

        if(first === '' || last === '' || username === '' || password === ''){
            dispatch(raise(0, 'Please fill all the Fields!'));
        } else {
            let hash = Crypt.createHash(process.env.REACT_APP_HASHING_ALGO);
            hash.update(password);

            const body = {
                firstName: first,
                lastName: last,
                userName: username,
                password: hash.digest('hex')
            };

            loginSubmit(body, 'register').catch(err => console.log(err));
        }
    }

    const handleLoginButton = () => {
        let username = document.getElementsByName('userName')[0].value;
        let password = document.getElementsByName('password')[0].value;

        if(username === '' || password === ''){
            dispatch(raise(0, 'Please fill all the Fields!'));
        } else {
            let hash = Crypt.createHash(process.env.REACT_APP_HASHING_ALGO);
            hash.update(password);

            const body = {
                userName: username,
                password: hash.digest('hex')
            }

            loginSubmit(body, 'login').catch(err => raise(0, 'Something Went Wrong!'));
        }
    }

    return(
        <div id={'login-body'}>
            {(isAuth) ? <Redirect to={'/dashboard'}/> : ''}
            <div id={'login-section'}>
                <div className={slide} id={'slider'}>
                    <img alt={'logo'} src={logo}/>
                    <h2>Schedule App</h2>
                    <p>Connect with People</p>
                    <LinkButton
                        label={(loginType === 'login') ? 'Sign Up' : 'Login'}
                        path={(loginType === 'login') ? '/register' : '/login'}
                        id={'slider-button'}
                        onClick={() => handleSliderButton(loginType)}
                        style={{width: '80%'}}
                    />
                </div>
                <div className={'sides'}>
                    <div id={'sign-side'}>
                        {(loginType !== 'signup') ? '' : signupSide()}
                    </div>
                    <div id={'login-side'}>
                        {(loginType !== 'login') ? '' : (loginSide())}
                    </div>
                </div>
            </div>
        </div>
    )
}
