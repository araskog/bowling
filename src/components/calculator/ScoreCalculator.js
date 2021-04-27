const FRAMES = 10;

const calcTotalScore = (results) => {
  console.log("sent data", results);
  const rolls = [];
  // Add results (which come in format frame: [roll1, roll2] into a flat array of rolls
  results.forEach((frame) =>
    frame.forEach((element) => {
      rolls.push(element);
    })
  );

  console.log("results", results);

  // Calculate scores
  let score = 0;
  for (let i = 0, frame = 0; i < rolls.length, frame < FRAMES; frame++) {
    // Check if it's the last frame (and three strikes in it)
    const isLastStrikes =
      rolls[i] === 10 && rolls[i + 1] === 10 && rolls[i + 2] === 10;
    // Check if it's a strike
    const isStrike = rolls[i] === 10 && rolls[i + 1] === 0;
    // Check if it's a spare
    const isSpare = rolls[i] + rolls[i + 1] === 10;
    if (isLastStrikes) {
      score += 30;
    } else if (isStrike) {
      score += 10;
      // If last frame
      if (rolls[i + 2] === 10) {
        score += rolls[i + 2] + rolls[i + 4];
      } else {
        score += rolls[i + 2] + rolls[i + 3];
      }
      i += 2;
    } else if (isSpare) {
      score += 10;
      // Add the first score in the next frame
      score += parseInt(rolls[i + 2]) || 0; // Add 0 if no value yet
      i += 2; // Move two steps forward with spare
    } else {
      // No strike nor spare
      score += parseInt(rolls[i]) || 0;
      score += parseInt(rolls[i + 1] || 0);
      i += 2; //
    }
  }
  return score;
};

export default calcTotalScore;
