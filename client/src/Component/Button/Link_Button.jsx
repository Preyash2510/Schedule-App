import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function LinkButton(props) {

    const {
        className,
        label,
        path,
        onClick,
        id,
        style
    } = props;

    return (
        <Link className={`button ${className}`} to={path} onClick={onClick} id={id} style={style}>
            {label}
            {(props.children) ? props.children : ''}
        </Link>
    );
}
