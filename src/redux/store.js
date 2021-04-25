import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import user from "./reducers/user";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root", // 必须有的
  storage: storageSession, // 缓存机制
  // blacklist: ['order'] // reducer 里不持久化的数据,除此外均为持久化数据
  // whitelist: ['loginStatus'] // reducer 里持久化的数据,除此外均为不持久化数据
};

const allReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, allReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);
