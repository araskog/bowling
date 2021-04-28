/**
 * Scores are transformed to the scoreboard. Strikes = X, spares = / and no 0 after a strike
 *
 * @param {array} historicRolls - including one array of scores per bowling frame
 */

export const transformRolls = (historicRolls) => {
  return historicRolls.map((frame) => {
    const firstRoll = frame[0];
    const secondRoll = frame[1];
    const thirdRoll = frame[2];

    if (frame.length === 2) {
      if (firstRoll === 10) {
        return ["X", ""];
      } else if (secondRoll === 10) {
        return [firstRoll, "/"];
      } else if (firstRoll + secondRoll === 10) {
        return [firstRoll, "/"];
      }
    }

    if (frame.length === 3) {
      if (firstRoll === 10 && secondRoll === 10 && thirdRoll === 10) {
        return ["X", "X", "X"];
      } else if (firstRoll === 10 && secondRoll === 10) {
        return ["X", "X", thirdRoll];
      } else if (firstRoll === 10 && secondRoll + thirdRoll === 10) {
        return ["X", secondRoll, "/"];
      } else if (firstRoll === 10) {
        return ["X", secondRoll, thirdRoll];
      } else if (firstRoll + secondRoll === 10 && thirdRoll === 10) {
        return [firstRoll, "/", "X"];
      } else if (firstRoll + secondRoll === 10) {
        return [firstRoll, "/", thirdRoll];
      }
    }
    return frame;
  });
};
