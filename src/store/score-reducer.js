import { createSlice } from "@reduxjs/toolkit";
import calcTotalScore from "../components/calculator/ScoreCalculator";

const initialScoreState = {
  rolls: [
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", "", ""],
  ], // Historic rolls
  availableRolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // # pins available
  currentRoll: 0, // # of rolls in a frame (0-2)
  currentFrame: 0, // Current frame (0-9)
  scoresPerFrame: new Array(10).fill(""),
  currentMaxScore: 300,
  totalScore: 0,
  gameStarted: false,
  gameFinished: false,
};

const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    addRoll(state, action) {
      // Note: I'm using Redux Toolkit so any edit of state does not mutate the state, although it might look like it

      const newScore = action.payload.value;
      // Add the new score to the historic rolls array
      state.rolls[state.currentFrame][state.currentRoll] = newScore;

      // Set new total score
      state.totalScore = calcTotalScore(state.rolls);
      // Update the new max score TO-DO: SHOULD CALC MAX SCORE CORRECTLY
      // state.currentMaxScore = 300 - state.totalScore;

      // Update the current roll within the frame
      if (state.currentRoll === 0) {
        state.currentRoll++;
      } else if (state.currentRoll === 1 && state.currentFrame === 9) {
        console.log("current frame is 9, and roll =1");
        // At the last frame there should be 3 available rolls
        state.currentRoll++;
      } else {
        // console.log("total score", state.totalScore);
        // Update the frame totals --- TO-DO: SHOULD UPDATE WITH NEXT FRAME
        state.scoresPerFrame[state.currentFrame] = state.totalScore;
        // Begin with roll 0 at the next frame
        state.currentRoll = 0;
        if (state.currentRoll !== 2) {
          state.currentFrame++;
        }
      }
    },
    // Update the number of pins available for player
    calcAvailableRolls(state, action) {
      // First roll in frame
      if (state.currentRoll === 0) {
        state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
      // Second roll in frame
      else if (state.currentRoll === 1 || state.currentRoll === 2) {
        // Last frame should have 3 available rolls
        if (state.currentFrame === 9 && action.payload === 10) {
          console.log("inne i ska visa 10");
          state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else {
          state.availableRolls = state.availableRolls.slice(
            0,
            11 - action.payload
          );
        }
      }
      if (state.currentFrame === 10) {
        state.availableRolls = [];
      }
    },

    newGame() {},
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
