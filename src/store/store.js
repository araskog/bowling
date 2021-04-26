import { createStore } from "redux";

import scoreReducer from "./score-reducer";

const store = createStore(scoreReducer);

export default store;
