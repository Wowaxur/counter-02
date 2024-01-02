import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import Button from "../button/Button";
import s from './counter.module.css'


const Counter = () => {
    let [countValue, setCountValue] = useState(0)

    let [maxCountValue, setMaxCountValue] = useState(10)

    let [startCountValue, setStartCountValue] = useState(0)

    const [errorMessage, setErrorMessage] = useState('');

    const ResetCountClickHandler = () => {
        if (startCountValue < maxCountValue) {
            setCountValue(startCountValue)
        } else setErrorMessage('start value should be lower than max value');

    }

    const IncreaseCountValueClickHandler = () => {
        if (countValue < maxCountValue) {
            setCountValue(countValue + 1)
        }
    }

    const ResetButtonStartMaxValue = () => {
        setStartCountValue(0)
        setMaxCountValue(10)
        setCountValue(0)
        setErrorMessage('');

    }

    const SetButtonHandler = () => {
        if (startCountValue > maxCountValue) {
            setErrorMessage('start value should be lower than max value');
            setCountValue(maxCountValue)
        } else {
            setErrorMessage(''); // clear the error message if there's no error
            setCountValue(startCountValue);
        }
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            SetButtonHandler()
        }
    }

    const maxValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('')
        setMaxCountValue(parseInt(event.target.value))
    }

    const startValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('')
        setStartCountValue(parseInt(event.target.value))
    }

    useEffect(()=>{
        getFromLocalStorageHandler()
    }, [])

    useEffect(()=>{
        setToLocalStorageHandler()
    }, [countValue])


    // sessionStorage - до закрытия вкладки
    const setToLocalStorageHandler = () => {
        localStorage.setItem('counterValue', JSON.stringify(countValue))
        localStorage.setItem('maxValue', JSON.stringify(maxCountValue))
        localStorage.setItem('startValue', JSON.stringify(startCountValue))
    }

    const getFromLocalStorageHandler = () => {
        let countValueFromStorage = localStorage.getItem('counterValue',)
        let maxCountValueFromStorage = localStorage.getItem('maxValue',)
        let startCountValueFromStorage = localStorage.getItem('startValue',)
        if (countValueFromStorage) {
            let newValueFromStorage = countValueFromStorage ? parseInt(countValueFromStorage) : 0;
            let newMaxCountValueFromStorage = maxCountValueFromStorage ? parseInt(maxCountValueFromStorage) : 0;
            let newStartCountValueFromStorage = startCountValueFromStorage ? parseInt(startCountValueFromStorage) : 0;
            setMaxCountValue(newMaxCountValueFromStorage)
            setStartCountValue(newStartCountValueFromStorage)
            setCountValue(newValueFromStorage)
        }
    }


    // const clearLocalStorage = () => {
    //   localStorage.clear()
    //     setStartCountValue(0)
    //     setMaxCountValue(10)
    //     setCountValue(0)
    //     setErrorMessage('');
    // }
    return (
        <>
            <h3>COUNTER</h3>
            <hr/>
            <div className={s.counterWrapper}>
                <div className={s.firstBlock}>
                    <div className={s.valuesWrapper}>
                        <div className={s.value}>
                            <span> max value:</span>
                            <input
                                id="maxValue"
                                type="number"
                                value={maxCountValue}
                                onChange={maxValueOnChangeHandler}/>
                        </div>
                        <div className={s.value}>
                            <span> start value:</span>
                            <input
                                id={'StartValue'}
                                type={"number"}
                                value={startCountValue}
                                onChange={startValueOnChangeHandler}
                                onKeyDown={onKeyPressHandler}
                            />

                        </div>
                        <div>

                            <Button
                                onClick={SetButtonHandler}
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
                                disabled={maxCountValue === 10 && startCountValue === 0}
                                onClick={ResetButtonStartMaxValue}
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
                    <div className={s.resultWrapper}>
                        <div>
                            <div className={s.result}>
                                <p className={`${s.countValue} ${countValue === maxCountValue ? 'redText' : ''}`}>
                                    {countValue} </p>
                                {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}

                            </div>
                            <div className={s.resultButtons}>
                                <Button
                                    disabled={countValue >= maxCountValue}
                                    name={'inc'}
                                    style={{backgroundColor: '#a6a6f3', borderRadius: '5px'}}
                                    onClick={IncreaseCountValueClickHandler}
                                />
                                <Button
                                    disabled={countValue === startCountValue}
                                    name={'reset'}
                                    style={{backgroundColor: '#a6a6f3', borderRadius: '5px'}}
                                    onClick={ResetCountClickHandler}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            {/*    <div className={s.storageButton}>
                    <Button
                        name={'Set to LocalStorage'}
                        style={{backgroundColor: '#e9a6f3', borderRadius: '5px'}}
                        onClick={setToLocalStorageHandler}
                    />
                    <Button
                        style={{backgroundColor: '#e9a6f3', borderRadius: '5px', marginLeft: '10px'}}
                        name={'Get from LocalStorage'}
                        onClick={getFromLocalStorageHandler}
                    />
                    <br/>
                    <Button
                        style={{backgroundColor: '#e9a6f3', borderRadius: '5px', marginLeft: '10px', marginTop: '10px'}}
                        name={'Clear LocalStorage'}
                        onClick={clearLocalStorage}
                    />

                </div>*/}
            </div>

            <hr/>
        </>
    );
};

export default Counter;