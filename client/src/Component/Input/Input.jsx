import React, {useState} from 'react';
import './Input.css';

export default function Input(props){

    const {
        className,
        onChange,
        label,
        placeholder,
        name,
        id,
        type,
        style,
        icon,
        iconOnClick,
        value,
        disabled
    } = props;

    const [inValue, setValue] = useState({
        value: (value) ? value : ''
    });

    const handleClick = () => {
        document.getElementsByName(name)[0].focus();
    }

    return (
        <div className={`input-box ${className}`} style={style} onClick={handleClick}>
            {(label) ? <label className={'label'}>{label}</label> : ''}
            <input
                name={name}
                onInput={onChange}
                onChange={(e) => setValue({value: e.target.value})}
                className={'input'}
                type={type}
                placeholder={placeholder}
                id={id}
                value={inValue.value}
                disabled={disabled}
            />
            {(icon) ? <img alt={'icon'} src={icon} onClick={iconOnClick}/> : ''}
        </div>
    )
}
