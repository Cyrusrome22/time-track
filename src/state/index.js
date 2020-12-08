import { combineReducers, createStore } from "redux"
import toastReducer from "./reducer/toastReducer"
import progressReducer from "./reducer/progressReducer"
import dataReducer from "./reducer/dataReducer"
import filterReducer from "./reducer/filterReducer"

const reducers = combineReducers({
  toastReducer,
  progressReducer,
  dataReducer,
  filterReducer,
})

const store = createStore(reducers)
export default store
