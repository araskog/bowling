import { createSlice } from "@reduxjs/toolkit";

const initialScoreState = {
  rolls: [],
  totalScore: [],
  gameFinished: false,
};

const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {},
});

export const authActions = scoreReducer.actions;

export default scoreReducer.reducer;
