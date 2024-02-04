import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import s from './counter.module.css'
import CounterValueResult from "./CounterValueResult";
import Button from "../button/Button";
import {
    IncreaseCountValueClickHandlerAC,
    ResetButtonStartMaxValueAC,
    ResetCountClickHandlerAC, SetButtonHandlerAC, SetErrorMessageAC, SetMaxCountValueAC, SetStartCountValueAC
} from "../../reducer/CounterReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export type StateType = {
    countValue: number,
    startCountValue: number,
    maxCountValue: number,
    errorMessage: string
}





const Counter = () => {
    // let [countValue, dispatch] = useReducer(CounterReducer,initialState)

    const countValue = useSelector<AppRootStateType, StateType>(state => state.counter)
    const dispatch = useDispatch()
    const ResetCountClickHandler = () => {
        dispatch(ResetCountClickHandlerAC())
    }

    const IncreaseCountValueClickHandler = () => {
       dispatch(IncreaseCountValueClickHandlerAC())
    }

    const ResetButtonStartMaxValue = () => {
        dispatch(ResetButtonStartMaxValueAC())

    }

    const SetButtonHandler = () => {
       dispatch(SetButtonHandlerAC())
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            SetButtonHandler()
        }
    }

    const maxValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetMaxCountValueAC(parseInt(event.target.value)))
    }

    const startValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newStartCountValue = parseInt(event.target.value);
        if (newStartCountValue < 0) {
            dispatch(SetErrorMessageAC('start value should be > 0 '))
        } else {
            dispatch(SetErrorMessageAC(''))
            dispatch(SetStartCountValueAC(newStartCountValue))
        }
    }

   /* useEffect(()=>{
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
    }*/


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
                <Route path="/settings" element={<SettingsPage  ResetButtonStartMaxValue={ResetButtonStartMaxValue} startCountValue={countValue.startCountValue} maxCountValue={countValue.maxCountValue} startValueOnChangeHandler={startValueOnChangeHandler} SetButtonHandler={SetButtonHandler} maxValueOnChangeHandler={maxValueOnChangeHandler} onKeyPressHandler={onKeyPressHandler}/>} />
                <Route path="/" element={
                    <>
                        <h3>COUNTER</h3>
                        <hr/>
                        <div className={s.counterWrapper}>
                            <div className={s.firstBlock}>
                                <CounterValueResult
                                    countValue={countValue.countValue}
                                    maxCountValue={countValue.maxCountValue}
                                    startCountValue={countValue.startCountValue}
                                    errorMessage={countValue.errorMessage}
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