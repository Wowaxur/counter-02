import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import Button from "../button/Button";
import s from './counter.module.css'
import CounterValueSettings from "./CounterValueSettings";
import CounterValueResult from "./CounterValueResult";


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
        if (startCountValue < 0) {
            setErrorMessage('start value should be > 0 ');}
        else {
            setErrorMessage('')
            setStartCountValue(parseInt(event.target.value))
        }
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
                    <CounterValueSettings
                        maxCountValue={maxCountValue}
                        ResetButtonStartMaxValue={ResetButtonStartMaxValue}
                        maxValueOnChangeHandler={maxValueOnChangeHandler}
                        onKeyPressHandler={onKeyPressHandler}
                        SetButtonHandler={SetButtonHandler}
                        startCountValue={startCountValue}
                        startValueOnChangeHandler={startValueOnChangeHandler}
                    />
                    <CounterValueResult
                        countValue={countValue}
                                        maxCountValue={maxCountValue}
                                        startCountValue={startCountValue}
                                        errorMessage={errorMessage}
                                        ResetCountClickHandler={ResetCountClickHandler}
                                        IncreaseCountValueClickHandler={IncreaseCountValueClickHandler}

                    />
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