import React from 'react';
import s from "./counter.module.css";
import Button from "../button/Button";

export type CounterValueResultType = {
    countValue : number
    startCountValue : number
    maxCountValue : number
    errorMessage : string
    IncreaseCountValueClickHandler : ()=> void
    ResetCountClickHandler: ()=> void
}


const CounterValueResult = (p: CounterValueResultType) => {
    return (
        <div className={s.resultWrapper}>
            <div>
                <div className={s.result}>
                    <p className={`${s.countValue} ${p.countValue === p.maxCountValue ? s.redCountValue : ''}`}>
                        {p.countValue} </p>
                    {p.errorMessage && <p className={s.errorMessage}>{p.errorMessage}</p>}

                </div>
                <div className={s.resultButtons}>
                    <Button
                        disabled={p.countValue >= p.maxCountValue}
                        name={'inc'}
                        style={{backgroundColor: '#a6a6f3', borderRadius: '5px'}}
                        onClick={p.IncreaseCountValueClickHandler}
                    />
                    <Button
                        disabled={p.countValue === p.startCountValue}
                        name={'reset'}
                        style={{backgroundColor: '#a6a6f3', borderRadius: '5px'}}
                        onClick={p.ResetCountClickHandler}

                    />
                </div>
            </div>
        </div>
    );
};

export default CounterValueResult;