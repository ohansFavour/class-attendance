import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import {persistStore} from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middlewares= [thunk];

if(process.env.NODE_ENV=== "development"){
    middlewares.push(logger);
}


const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export default {store, persistor};