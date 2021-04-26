import { createSlice } from "@reduxjs/toolkit";

const initialScoreState = {
  rolls: new Array(21).fill(""),
  currentRoll: 0,
  currentFrame: 1,
  availableRolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  currentScores: new Array(10).fill(""),
  currentMaxScore: 300,
  totalScore: 0,
  gameFinished: false,
};

const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    addRoll(state, action) {
      // Add the new roll to the historic Rolls

      // The first roll of the frame and a strike
      if (state.currentRoll % 2 !== 0 && action.payload === 10) {
        state.rolls[state.currentRoll] = action.payload;
        state.currentScores[state.currentRoll] = action.payload;
        state.currentRoll += 2;
        state.currentFrame++;
      } else if (state.currentRoll % 2 === 0 && action.payload === 10) {
        state.rolls[state.currentRoll] = action.payload;
        state.currentScores[state.currentRoll] = action.payload;
        state.currentRoll += 2;
        state.currentFrame++;
      } else {
        state.rolls[state.currentRoll] = action.payload;
        state.currentScores[state.currentRoll] = action.payload;
        state.currentRoll++;
      }

      // Update total score
      state.totalScore += action.payload;

      // Check if game finished
      if (state.currentFrame === 11) {
        state.gameFinished(true);
        console.log("Game finished");
      }
    },
    calcAvailableRolls(state, action) {
      if (state.currentRoll % 2 === 0) {
        state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      } else {
        state.availableRolls = state.availableRolls.slice(
          0,
          11 - action.payload
        );
      }
    },
    newGame() {},
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
