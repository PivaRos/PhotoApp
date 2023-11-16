import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./reducers/loadingReducer";
import { hitsReducer } from "./reducers/hitsReducer";
import { selectedHitReducer } from "./reducers/selectedHitReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  pageination: hitsReducer,
  selectedHit: selectedHitReducer,
});

export default configureStore({
  reducer: rootReducer,
});
