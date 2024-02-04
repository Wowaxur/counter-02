import { store } from './store/store'
import { Provider } from 'react-redux'
import App from "./App";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
)