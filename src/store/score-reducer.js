import { createSlice } from "@reduxjs/toolkit";
import calcTotalScore from "../components/calculator/scoreCalculator";

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
  totalScore: 0,
  gameEnded: false,
  zeroPins: false,
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
      state.totalScore = calcTotalScore(state.rolls).score;
      const frameScores = calcTotalScore(state.rolls).frameScores;

      // Store only scores until current frame as results. Future (and past) scores will update
      frameScores.splice(state.currentFrame + 1);
      for (let i = 0; i < 9 - state.currentFrame; i++) {
        frameScores.push("");
      }

      // Update what roll the player is on in the frame, first = 0, second = 1, third = 2
      if (state.currentRoll === 0) {
        state.currentRoll++;
      } else if (state.currentRoll === 1 && state.currentFrame === 9) {
        // At the last frame there should be 3 available rolls
        state.currentRoll++;
      } else {
        // Update the total score per frame
        state.scoresPerFrame = frameScores;
        // Begin with roll 0 at the next frame
        state.currentRoll = 0;
        // Move to next frame unless it's the last frame
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
        state.zeroPins = false;
      }
      // Second roll in frame
      else if (state.currentRoll === 1) {
        // The last frame should allow for more rolls after strike or spare
        if (
          state.currentFrame === 9 &&
          (action.payload === 10 ||
            state.rolls[9][0] + state.rolls[9][1] === 10)
        ) {
          state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          state.zeroPins = false;
        } else {
          state.availableRolls = state.availableRolls.slice(
            0,
            11 - action.payload
          );
          if (state.availableRolls.length === 1) {
            state.zeroPins = true;
          }
        }
      }
      // Third roll in frame (last frame)
      else if (state.currentRoll === 2) {
        // Current roll is strike or past two were spare
        if (
          action.payload === 10 ||
          state.rolls[9][0] + state.rolls[9][1] === 10
        ) {
          state.availableRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          state.zeroPins = false;
        }
        // First roll was strike
        else if (state.rolls[9][0] === 10) {
          state.availableRolls = state.availableRolls.slice(
            0,
            11 - action.payload
          );
          if (state.availableRolls.length === 1) {
            state.zeroPins = true;
          }
        } else {
          // No available action when the user has played two rolls in the last frame
          state.availableRolls = [];
          // Update the scores per frame
          state.scoresPerFrame = calcTotalScore(state.rolls).frameScores;
          state.gameEnded = true;
        }
      }
      // No available action when the game ended with three strikes
      if (state.currentFrame === 10) {
        state.availableRolls = [];
        state.gameEnded = true;
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
      state.gameEnded = false;
      state.zeroPins = false;
    },
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
