import React, {ChangeEvent, KeyboardEvent, FC} from 'react';
import { useNavigate } from 'react-router-dom';
import CounterValueSettings from "./CounterValueSettings";
import Button from "../button/Button";
import s from './counter.module.css'
type SettingsPagePropsType = {
    maxCountValue: number;
    ResetButtonStartMaxValue: () => void;
    maxValueOnChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
    SetButtonHandler: () => void;
    startCountValue: number;
    startValueOnChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SettingsPage: FC<SettingsPagePropsType> = ({maxCountValue, ResetButtonStartMaxValue, maxValueOnChangeHandler, onKeyPressHandler, SetButtonHandler, startCountValue, startValueOnChangeHandler}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        SetButtonHandler();
        navigate('/');
    };

    return (
        <div className={s.SettinPage}>
            <h3>Settings</h3>
            <CounterValueSettings
                maxCountValue={maxCountValue}
                ResetButtonStartMaxValue={ResetButtonStartMaxValue}
                maxValueOnChangeHandler={maxValueOnChangeHandler}
                onKeyPressHandler={onKeyPressHandler}
                SetButtonHandler={SetButtonHandler}
                startCountValue={startCountValue}
                startValueOnChangeHandler={startValueOnChangeHandler}
            />
            <Button onClick={handleClick} name={'Confirm'}
                    style={{
                        backgroundColor: '#a6a6f3',
                        borderRadius: '5px',
                        height: '30px',
                        fontSize: '18px',
                    }}
            />
        </div>
    );
};

export default SettingsPage;