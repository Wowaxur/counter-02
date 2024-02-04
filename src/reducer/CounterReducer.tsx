import {StateType} from "../components/counter/Counter";


export const CounterReducer = (state: StateType, action: CounterTasksType): StateType => {
    switch (action.type) {
        case "Reset-Count": {
            if (state.startCountValue < state.maxCountValue) {
                return {...state, countValue: state.startCountValue}
            } else return {...state, errorMessage: ('start value should be lower than max value')};
        }
        case "Increase-Count": {
            if (state.countValue < state.maxCountValue) {
                return {...state, countValue: state.countValue + 1}
            } else return state
        }
        case "Reset-Start-Max-Value": {
            return {
                ...state,
                startCountValue: 0,
                maxCountValue:  10,
                countValue:  0,
                errorMessage:  ''
            }
        }
        case "Set-Button": {
            if (state.startCountValue > state.maxCountValue) {
                return {...state,
                    errorMessage: 'start value should be lower than max value',
                    countValue: state.maxCountValue
                }
            } else {
                return {...state,
                    errorMessage: "",
                    countValue: state.startCountValue
                }
            }
        }
        case "Set-Max-Count-Value": {
            return {...state, maxCountValue: action.maxCountValue}
        }
        case "Set-Start-Count-Value": {
            return {...state, startCountValue: action.startCountValue}
        }
        case "Set-Error-Message": {
            return {...state, errorMessage: action.errorMessage}
        }
        default: return state
    }

}


type CounterTasksType = ResetCountClickHandlerACType
    | IncreaseCountValueClickHandlerACType
    | ResetButtonStartMaxValueACType
    | SetButtonHandlerACType
    | SetMaxCountValueACType
    | SetStartCountValueACType
    | SetErrorMessageACType


type ResetCountClickHandlerACType = ReturnType<typeof ResetCountClickHandlerAC>
type IncreaseCountValueClickHandlerACType = ReturnType<typeof IncreaseCountValueClickHandlerAC>
type ResetButtonStartMaxValueACType = ReturnType<typeof ResetButtonStartMaxValueAC>
type SetButtonHandlerACType = ReturnType<typeof SetButtonHandlerAC>
type SetMaxCountValueACType = ReturnType<typeof SetMaxCountValueAC>
type SetStartCountValueACType = ReturnType<typeof SetStartCountValueAC>


export const ResetCountClickHandlerAC = () => {
    return {
        type: 'Reset-Count',
    } as const
}
export const IncreaseCountValueClickHandlerAC = () => {
    return {
        type: 'Increase-Count',
    } as const
}
export const ResetButtonStartMaxValueAC = () => {
    return {
        type: 'Reset-Start-Max-Value',
    } as const
}
export const SetButtonHandlerAC = () => {
    return {
        type: "Set-Button"
    } as const
}
export const SetMaxCountValueAC = (maxCountValue: number) => {
    return {
        type: 'Set-Max-Count-Value',
        maxCountValue
    } as const
}

export const SetStartCountValueAC = (startCountValue: number) => {
    return {
        type: 'Set-Start-Count-Value',
        startCountValue
    } as const
}
type SetErrorMessageACType = ReturnType<typeof SetErrorMessageAC>

export const SetErrorMessageAC = (errorMessage: string) => {
    return {
        type: 'Set-Error-Message',
        errorMessage
    } as const
}