const FRAMES = 10;

/**
 * Calculates total scores and scores per frame of a bowling game
 *
 * @param {array} scorecard of format [
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
  ]
 */
const calcTotalScore = (scorecard) => {
  const rolls = [];
  // Add results into a flat array of all rolls
  scorecard.forEach((frame) =>
    frame.forEach((element) => {
      if (element === "") {
        rolls.push(0);
      } else {
        rolls.push(element);
      }
    })
  );

  // Calculate scores
  let score = 0;
  let frameScores = [];
  for (
    let rollNo = 0, frame = 0;
    rollNo < rolls.length, frame < FRAMES;
    frame++
  ) {
    // Check if it's a strike
    const isStrike = rolls[rollNo] === 10;
    // Check if it's a spare
    const isSpare = rolls[rollNo] + rolls[rollNo + 1] === 10;
    if (isStrike) {
      score += 10;
      // Strike in the last frame
      if (rollNo === 18) {
        score += rolls[rollNo + 1] + rolls[rollNo + 2];
      } else {
        // Two strikes in a row, must jump the next roll which will be 0
        if (rolls[rollNo + 2] === 10) {
          score += rolls[rollNo + 2] + rolls[rollNo + 4];
        } // One strike, add the two following rolls
        else {
          score += rolls[rollNo + 2] + rolls[rollNo + 3];
        }
        rollNo += 2;
      }
    } else if (isSpare) {
      score += 10;
      // Add the first score in the next frame
      score += rolls[rollNo + 2]; // Add 0 if no value yet
      rollNo += 2; // Move two steps forward with spare
    } else {
      // No strike nor spare
      score += rolls[rollNo];
      score += rolls[rollNo + 1];
      rollNo += 2; //
    }
    frameScores[frame] = score;
  }
  // console.log(frameScores);
  return { score: score, frameScores: frameScores };
};

export default calcTotalScore;
