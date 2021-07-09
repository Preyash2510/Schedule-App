import React, {useEffect} from 'react';
import './Profile.css';
import acc from '../../img/profile.png';
import Input from "../../Component/Input/Input";
import Button from "../../Component/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../Reducers/auth";
import {setTitle} from "../../Reducers/other";
import {otherSubmit} from "../../services/submitServices";
import {raise, selectError, withdraw} from "../../Reducers/error";

export default function Profile(props) {

    const {user, token} = useSelector(selectAuth);
    const { message } = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Profile'));
    }, [dispatch]);

    const handleSave = () => {
        const first = document.getElementsByName('firstName')[0].value;
        const last = document.getElementsByName('lastName')[0].value;

        if(first === '' || last === ''){
            dispatch(raise(0, 'Please fill all the Fields!'));
        } else {
            dispatch(withdraw());
            otherSubmit({
                api_token: token,
                userName: user.userName,
                firstName: first,
                lastName: last
            }, 'update')
                .catch(err=>console.error(err));
        }
    }

    return (
        <div id={'container'}>
            <div id={'profile'}>
                <img alt={'acc'} src={acc}/>
                <Input label={'Username'} name={'username'} value={user.userName} disabled/>
                <Input label={'First Name'} name={'firstName'} onChange={e => e.target.value} value={user.firstName}/>
                <Input label={'Last Name'} name={'lastName'} onChange={e => e.target.value} value={user.lastName}/>
                {(message === "") ? '' : <div className={'login-error'}>{message}</div>}
                <Button label={'Save'} style={{width: '80%', height: '60px'}} onClick={handleSave}/>
            </div>
        </div>
    );
}
