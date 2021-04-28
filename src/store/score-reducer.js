import { createSlice } from "@reduxjs/toolkit";
import {
  calcTotalScore,
  getFrameScores,
} from "../components/calculator/scoreCalculator";
import { getAvailableRolls } from "../components/calculator/getAvailableRolls";

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
  currentRoll: 0, // Current attempt in a frame (0-3)
  currentFrame: 0, // Current frame (0-9)
  scoresPerFrame: FRAMES, // Accumulated score per frame (0-9)
  totalScore: 0, // Accumulated total score
  gameEnded: false, // True if game ended
  zeroPins: false, // True if all pins were knocked down
};

// USING REDUX TOOLKIT: updates of state in this reducer do not mutate the state
const scoreReducer = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    // Update scores with the action.payload.value
    addRoll(state, action) {
      if (state.gameEnded) return;
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
      // Second roll in a frame, or third roll in last frame
      else {
        // Update the total score per frame
        state.scoresPerFrame = getFrameScores(state.rolls, state.currentFrame);
        state.currentRoll = 0;
        // Move to the next frame
        if (state.currentRoll !== 2) {
          state.currentFrame++;
        }
      }
    },
    // Check the number of pins available with the current pins knocked down (action.payload)
    calcAvailableRolls(state, action) {
      const { availableRolls, gameEnded } = getAvailableRolls(
        state.currentRoll,
        state.rolls,
        action.payload,
        state.currentFrame
      );

      state.availableRolls = availableRolls;
      state.zeroPins = availableRolls.length === 1;
      state.gameEnded = gameEnded;

      if (state.gameEnded) {
        // Update the frame scores
        state.scoresPerFrame = calcTotalScore(state.rolls).frameScores;
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
