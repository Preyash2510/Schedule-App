import React from 'react';
import err from '../../img/error.png';
import './Error.css';

export default function Error(props) {

    const {status, message} = props;

    return (
        <div className={'error-body'}>
            <img src={err} alt={'error'}/>
            <h1>{(status !== 0) ? status : ''}</h1>
            <h2>{message}</h2>
        </div>
    )
}
