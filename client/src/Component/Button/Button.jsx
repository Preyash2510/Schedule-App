import React from 'react';
import './Button.css';

export default function Button(props) {

    const {
        label,
        onClick,
        id,
        style,
        className,
        disabled
    } = props;

    return (
        <button disabled={disabled} className={`button ${className}`} onClick={onClick} id={id} style={style}>
            {label}
            {props.children}
        </button>
    );
}
