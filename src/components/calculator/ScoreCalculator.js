const FRAMES = 10;
const FIRST_IN_LAST_FRAME = 18;

const isStrike = (rollIndex, rolls) => rolls[rollIndex] === 10;
const isSpare = (rollIndex, rolls) =>
  rolls[rollIndex] + rolls[rollIndex + 1] === 10;
const isTwoStrikesInARow = (rollIndex, rolls) => rolls[rollIndex + 2] === 10;
const jumpTwoIndexes = (rollNo) => (rollNo += 2);

/**
 * Calculates total scores and scores per frame of a bowling game
 *
 * @param {array} scorecard - including one array of scores per bowling frame
 */
const calcTotalScore = (scorecard) => {
  // Create a flattened array of all rolls
  const rolls = scorecard
    .map((frame) =>
      frame.map((element) => {
        if (element === "") return 0;
        else return element;
      })
    )
    .flat();

  let score = 0; // current total score
  let frameScores = []; // current score per frame
  let rollNo = 0; // current index in the array of all rolls

  // Calculate scores for all frames
  for (let frame = 0; frame < FRAMES; frame++) {
    // Strike in frame
    if (isStrike(rollNo, rolls)) {
      score += 10;
      // Last frame
      if (rollNo === FIRST_IN_LAST_FRAME) {
        score += rolls[rollNo + 1] + rolls[rollNo + 2];
      }
      // Frame 1-9
      else {
        if (isTwoStrikesInARow(rollNo, rolls)) {
          score += rolls[rollNo + 2] + rolls[rollNo + 4];
        } else {
          score += rolls[rollNo + 2] + rolls[rollNo + 3];
        }
        rollNo = jumpTwoIndexes(rollNo);
      }
    }
    // Spare in frame
    else if (isSpare(rollNo, rolls)) {
      score += 10;
      score += rolls[rollNo + 2];
      rollNo = jumpTwoIndexes(rollNo);
    }
    // Neither strike nor spare in frame
    else {
      score += rolls[rollNo];
      score += rolls[rollNo + 1];
      rollNo = jumpTwoIndexes(rollNo);
    }
    // Add the score to the current frame
    frameScores[frame] = score;
  }
  return { score: score, frameScores: frameScores };
};

export default calcTotalScore;
