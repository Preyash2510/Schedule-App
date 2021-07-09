import React from 'react';
import './Card.css';
import Button from "../Button/Button";
import {otherSubmit} from "../../services/submitServices";
import {useSelector} from "react-redux";
import {selectAuth} from "../../Reducers/auth";
import Input from "../Input/Input";


export default function Card (props) {

    const {
        name,
        userName,
        connected = false,
        schedule
    } = props;

    const {user, token} = useSelector(selectAuth);

    const handleConnect = () => {
        const type = (connected) ? 'unconnect' : 'connect';
        otherSubmit({api_token: token, user1: user.userName, user2: userName}, type)
            .catch(err => console.error(err));
    }

    const handleSchedule = () => {
        let dateTime = document.getElementsByName(userName)[0].value;

        if(dateTime !== ''){
            dateTime = dateTime.split('T');
            const date = dateTime[0];
            const time = `${dateTime[1]}`;

            const schedule = `${date} ${time}`;


            const body = {api_token: token, user1: user.userName, user2: userName, dateTime: schedule};

            otherSubmit(body, 'schedule')
                .catch(err => console.error(err));
        }
    }

    const handleCancel = () => {
        const body = {api_token: token, user1: user.userName, user2: userName};

        otherSubmit(body, 'cancel')
            .catch(err => console.error(err));
    }

    return(
        <div className={'card-body'}>
            <h2 className={'card-name'}>
                {name}
            </h2>
            <h4 className={'card-user'}>
                {userName}
            </h4>
            <Button
                className={'card-btn'}
                label={(connected) ? 'Connected' : 'Connect'}
                onClick={handleConnect}
            />

            {(connected) ? (
                <>
                    <Input
                        className={'card-input'}
                        key={(schedule !== null) ? schedule : ''}
                        name={`${userName}`}
                        type={'datetime-local'}
                        value={(schedule !== null) ? schedule : ''}
                    />
                    <div className={'card-cancel-edit'}>
                        {(schedule !== null) ?
                            <>
                                <Button
                                    className={'card-btn edit'}
                                    label={'Edit'}
                                    onClick={handleSchedule}
                                />
                                <Button
                                    className={'card-btn cancel'}
                                    label={'Cancel'}
                                    onClick={handleCancel}
                                />
                            </>
                            :
                            <Button
                                className={'card-btn'}
                                label={'Schedule'}
                                onClick={handleSchedule}
                            />
                        }
                    </div>
                </>
            ) : ''}
        </div>
    );
}
