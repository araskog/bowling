import { createSlice } from "@reduxjs/toolkit";

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
  availableRolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // What # of pins can player knock down
  currentRoll: 0, // # of rolls (0-20)
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
      state.totalScore = action.payload.totalScore;
      // Update the new max score
      state.currentMaxScore = 300 - state.totalScore;

      // Update the current roll within the frame
      if (state.currentRoll === 0) {
        // Update the frame totals --- TO-DO: SHOULD UPDATE WITH NEXT FRAME
        state.scoresPerFrame[state.currentFrame - 1] =
          action.payload.totalScore;
        state.currentRoll++;
      } else if (state.currentRoll === 1 && state.currentFrame === 9) {
        // At the last frame there should be 3 available rolls
        state.currentRoll = 2;
      } else {
        // Begin with roll 0 at the next frame
        state.currentRoll = 0;
        state.currentFrame++;
      }

      if (state.currentFrame === 10) {
        alert("Game finished, you scored: ", state.totalScore);
      }
    },
    // Update the number of pins available for player
    calcAvailableRolls(state, action) {
      if (state.currentRoll === 0) {
        state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      } else if (state.currentRoll === 1) {
        state.availableRolls = state.availableRolls.slice(
          0,
          11 - action.payload
        );
      } else if (state.currentRoll === 2) {
        state.availableRolls = [];
      }
    },

    newGame() {},
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
