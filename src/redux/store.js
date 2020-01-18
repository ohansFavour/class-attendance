import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import {persistStore} from "redux-persist";

const middlewares= [];


const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export default {store, persistor};