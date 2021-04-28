import { getAvailableRolls } from "./getAvailableRolls";

test("Number of pins remaining and whether the game ended is calculated correctly.", () => {
  const tests = [
    {
      currentRoll: 0,
      rolls: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
      pinsKnockedDown: 3,
      currentFrame: 0,
      shouldReturn: {
        availableRolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        gameEnded: false,
      },
    },
    {
      currentRoll: 1,
      rolls: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
      pinsKnockedDown: 10,
      currentFrame: 0,
      shouldReturn: {
        availableRolls: [0],
        gameEnded: false,
      },
    },
    {
      currentRoll: 1,
      rolls: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
      pinsKnockedDown: 7,
      currentFrame: 0,
      shouldReturn: {
        availableRolls: [0, 1, 2, 3],
        gameEnded: false,
      },
    },
    {
      currentRoll: 2,
      rolls: [
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 10, 0],
      ],
      pinsKnockedDown: 10,
      currentFrame: 9,
      shouldReturn: {
        availableRolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        gameEnded: false,
      },
    },
    {
      currentRoll: 2,
      rolls: [
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 10, 10],
      ],
      pinsKnockedDown: 10,
      currentFrame: 10,
      shouldReturn: {
        availableRolls: [],
        gameEnded: true,
      },
    },
  ];

  tests.forEach(
    ({ currentRoll, rolls, pinsKnockedDown, currentFrame, shouldReturn }) => {
      expect(
        getAvailableRolls(currentRoll, rolls, pinsKnockedDown, currentFrame)
      ).toEqual(shouldReturn);
    }
  );
});
