const PINS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MAX_FRAME = 9;

const calcPinsRemaining = (availableRolls, currentPins) => {
  return availableRolls.slice(0, 11 - currentPins);
};

/**
 * Get how many pins should be shown to the player
 *
 * @param {number} currentRoll - first, second or third roll in frame (0-2)
 * @param {Array} rolls - including one array of scores per bowling frame
 * @param {number} pinsKnockedDown - the current roll
 * @param {number} currentFrame - the current frame
 */
export const getAvailableRolls = (
  currentRoll,
  rolls,
  pinsKnockedDown,
  currentFrame
) => {
  let gameEnded = false;
  let availableRolls = [];
  const lastFrameFirstStrike = rolls[9][0] === 10;
  const strikeOrSpareInLastFrame =
    pinsKnockedDown === 10 || rolls[9][0] + rolls[9][1] === 10;

  // First roll in frame, or strike or spare in the last frame
  if (
    currentRoll === 0 ||
    (currentFrame === MAX_FRAME && strikeOrSpareInLastFrame)
  ) {
    availableRolls = PINS;
  }
  // Second roll in frame
  else if (currentRoll === 1) {
    availableRolls = calcPinsRemaining(PINS, pinsKnockedDown);
  }
  // Third roll in the last frame
  if (currentRoll === 2) {
    // Last roll was strike or past two were spare
    if (strikeOrSpareInLastFrame) {
      availableRolls = PINS;
    }
    // First roll was strike, allow for a third roll
    else if (lastFrameFirstStrike) {
      availableRolls = calcPinsRemaining(PINS, pinsKnockedDown);
    }
    // Game ends after two rolls unless there was a strike/spare
    else {
      availableRolls = [];
      gameEnded = true;
    }
  }

  // Game ends after three rolls have been played in the last frame
  if (currentFrame === 10) {
    availableRolls = [];
    gameEnded = true;
  }

  return {
    availableRolls: availableRolls,
    gameEnded: gameEnded,
  };
};
