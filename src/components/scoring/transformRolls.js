// Adapt the historicRolls to show strike as X and spar as /
export const transformRolls = (historicRolls) => {
  return historicRolls.map((frame) => {
    const firstRoll = frame[0];
    const secondRoll = frame[1];
    const thirdRoll = frame[2];

    if (frame.length === 2) {
      if (firstRoll === 10) {
        return ["X", ""];
      } else if (secondRoll === 10) {
        return [firstRoll, "X"];
      } else if (firstRoll + secondRoll === 10) {
        return [firstRoll, "/"];
      }
    }

    if (frame.length === 3) {
      if (firstRoll === 10 && secondRoll === 10 && thirdRoll === 10) {
        return ["X", "X", "X"];
      } else if (firstRoll === 10 && secondRoll === 10) {
        return ["X", "X", thirdRoll];
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
