import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import s from './counter.module.css'
import CounterValueResult from "./CounterValueResult";
import Button from "../button/Button";


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
        <Router>
            <Routes>
                <Route path="/settings" element={<SettingsPage  ResetButtonStartMaxValue={ResetButtonStartMaxValue} startCountValue={startCountValue} maxCountValue={maxCountValue} startValueOnChangeHandler={startValueOnChangeHandler} SetButtonHandler={SetButtonHandler} maxValueOnChangeHandler={maxValueOnChangeHandler} onKeyPressHandler={onKeyPressHandler}/>} />
                <Route path="/" element={
                    <>
                        <h3>COUNTER</h3>
                        <hr/>
                        <div className={s.counterWrapper}>
                            <div className={s.firstBlock}>
                                <CounterValueResult
                                    countValue={countValue}
                                    maxCountValue={maxCountValue}
                                    startCountValue={startCountValue}
                                    errorMessage={errorMessage}
                                    ResetCountClickHandler={ResetCountClickHandler}
                                    IncreaseCountValueClickHandler={IncreaseCountValueClickHandler}
                                />
                                <Link className={s.settingButton} to="/settings"><Button name={"settings"}  style={{
                                    backgroundColor: '#a6a6f3',
                                    borderRadius: '5px',
                                    height: '30px',
                                    fontSize: '18px',
                                }} />
                                </Link>
                            </div>
                        </div>
                        <hr/>
                    </>
                }/>
            </Routes>
        </Router>
    );
};

export default Counter;