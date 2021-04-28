import { createSlice } from "@reduxjs/toolkit";
import {
  calcTotalScore,
  getFrameScores,
} from "../components/calculator/scoreCalculator";

const PINS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const EMPTY_SCOREBOARD = [
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
const FRAMES = new Array(10).fill("");

const initialScoreState = {
  rolls: EMPTY_SCOREBOARD, // Historic rolls
  availableRolls: PINS, // #Pins available
  currentRoll: 0, // Current roll in a frame (0-3)
  currentFrame: 0, // Current frame (0-9)
  scoresPerFrame: FRAMES, // Score per frame (0-9)
  totalScore: 0, // Current total score
  gameEnded: false,
  zeroPins: false, // True if all pins have been knocked down in a frame
};

// I'm uing Redux Toolkit so the updates of state in this reducer do not mutate the state
const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    addRoll(state, action) {
      // Add the new score to the historic rolls array
      state.rolls[state.currentFrame][state.currentRoll] = action.payload.value;
      // Update total score with the new roll value
      state.totalScore = calcTotalScore(state.rolls).score;

      // First roll in a frame, or second roll in last frame
      if (
        state.currentRoll === 0 ||
        (state.currentRoll === 1 && state.currentFrame === 9)
      ) {
        state.currentRoll++; // Move to the next roll in current frame
      }
      // Second roll in a frame
      else {
        // Update the total score per frame
        state.scoresPerFrame = getFrameScores(state.rolls, state.currentFrame);
        state.currentRoll = 0;
        // Move to next frame, unless it's the last frame
        if (state.currentRoll !== 2) {
          state.currentFrame++;
        }
      }
    },

    // Update the number of pins available for player
    calcAvailableRolls(state, action) {
      // First roll in frame
      if (state.currentRoll === 0) {
        state.availableRolls = PINS;
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
          state.availableRolls = PINS;
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
          state.availableRolls = PINS;
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
    // Reset all state values for a new game
    newGame(state) {
      state.rolls = EMPTY_SCOREBOARD;
      state.availableRolls = PINS;
      state.currentRoll = 0;
      state.currentFrame = 0;
      state.scoresPerFrame = FRAMES;
      state.totalScore = 0;
      state.gameEnded = false;
      state.zeroPins = false;
    },
  },
});

export const scoreActions = scoreReducer.actions;

export default scoreReducer.reducer;
