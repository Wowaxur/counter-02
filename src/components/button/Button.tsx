import React from 'react';

type ButtonPropsType ={
    name: string
    style?: React.CSSProperties
    onClick?: ()=>void
    disabled?: boolean
}

const Button = (p: ButtonPropsType) => {
    return (
        <>
            <button disabled={p.disabled}  onClick={p.onClick} style={p.style} >{p.name}</button>
        </>
    );
};

export default Button;