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
  currentRoll: 0, // # of rolls in a frame (0-3)
  currentFrame: 0, // Current frame (0-9)
  scoresPerFrame: new Array(10).fill(""), // Score per frame
  currentMaxScore: 300,
  totalScore: 0,
};

const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    addRoll(state, action) {
      // Note: I'm uing Redux Toolkit so any edit of state does not mutate the state, although it might look like it

      const newScore = action.payload.value;

      // Add the new score to the historic rolls array
      state.rolls[state.currentFrame][state.currentRoll] = newScore;

      // Update total score
      state.totalScore = calcTotalScore(state.rolls);

      /**
       *
       * @todo Add calculation of "live" max score.
       *
       */
      // state.currentMaxScore = 300;

      /**
       *
       * @todo Correct the scoring calculation per frame (scoresPerFrame). Only aggregated and not retroactively updated.
       *
       */
      // Update the current roll within the frame
      if (state.currentRoll === 0) {
        state.currentRoll++;
      } else if (state.currentRoll === 1 && state.currentFrame === 9) {
        // At the last frame there should be 3 available rolls
        state.currentRoll++;
      } else {
        // Update the total score per frame
        state.scoresPerFrame[state.currentFrame] = state.totalScore;
        // Begin with roll 0 at the next frame
        state.currentRoll = 0;
        // Update frame unless it's the last frame
        if (state.currentRoll !== 2) {
          state.currentFrame++;
        }
      }
    },
    /**
     *
     * @todo Correct the calc for whether to show rolls on the third roll of last frame or not. Now it gives the user opportunity to enter extra data (although it's not included in total score)
     *
     */
    // Update the number of pins available for player
    calcAvailableRolls(state, action) {
      // First roll in frame
      if (state.currentRoll === 0) {
        state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
      // Second roll in frame
      else if (state.currentRoll === 1 || state.currentRoll === 2) {
        // The last frame should allow for two more rolls after strike
        // One more roll after spare
        if (
          state.currentFrame === 9 &&
          (action.payload === 10 ||
            state.rolls[9][0] + state.rolls[9][1] === 10)
        ) {
          console.log("spärr eller strike på sista");
          state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else {
          state.availableRolls = state.availableRolls.slice(
            0,
            11 - action.payload
          );
        }
      }
      // Third roll in frame (last frame)
      else if (state.currentRoll === 2) {
        state.availableRolls = [];
      }
      // No available action when the game ended
      if (state.currentFrame === 10) {
        state.availableRolls = [];
      }
    },

    newGame(state) {
      // Resetting all state values
      state.rolls = [
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
      ];
      state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      state.currentRoll = 0;
      state.currentFrame = 0;
      state.scoresPerFrame = new Array(10).fill("");
      state.currentMaxScore = 300;
      state.totalScore = 0;
    },
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
