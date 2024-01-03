import React from 'react';
import s from "./counter.module.css";
import Button from "../button/Button";

type CounterValueSettingsProps = {
    maxCountValue: number,
    startCountValue: number,
    maxValueOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    startValueOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyPressHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    SetButtonHandler: () => void,
    ResetButtonStartMaxValue: () => void
}

const CounterValueSettings = (p:CounterValueSettingsProps) => {
    return (
        <div className={s.valuesWrapper}>
            <div className={s.value}>
                <span> max value:</span>
                <input
                    id="maxValue"
                    type="number"
                    value={p.maxCountValue}
                    onChange={p.maxValueOnChangeHandler}/>
            </div>
            <div className={s.value}>
                <span> start value:</span>
                <input
                    id={'StartValue'}
                    type={"number"}
                    value={p.startCountValue}
                    onChange={p.startValueOnChangeHandler}
                    onKeyDown={p.onKeyPressHandler}
                />

            </div>
            <div>

                <Button
                    onClick={p.SetButtonHandler}
                    name={'set'}
                    style={{
                        backgroundColor: '#a6a6f3',
                        marginTop: '30px',
                        borderRadius: '5px',
                        width: '55px',
                        height: '30px',
                        fontSize: '18px',
                    }}
                />
                <Button
                    disabled={p.maxCountValue === 10 && p.startCountValue === 0}
                    onClick={p.ResetButtonStartMaxValue}
                    name={'reset'}
                    style={{
                        backgroundColor: '#a6a6f3',
                        marginTop: '30px',
                        marginLeft: '15px',
                        borderRadius: '5px',
                        width: '55px',
                        height: '30px',
                        fontSize: '18px',
                    }}
                />
            </div>
        </div>
    );
};

export default CounterValueSettings;