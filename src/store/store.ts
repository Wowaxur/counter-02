import {combineReducers, createStore} from "redux";
import {CounterReducer} from "../reducer/CounterReducer";

const rootReducer = combineReducers({
    counter: CounterReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store