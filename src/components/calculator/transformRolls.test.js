import { transformRolls } from "./transformRolls";

test("Scores are transformed correctly to the scoreboard. Strikes = X, spares = / and no 0 after a strike.", () => {
  const tests = [
    {
      scores: [
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
      transformedScores: [
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
    },
    {
      scores: [
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2],
        [8, 2, 8],
      ],
      transformedScores: [
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/"],
        [8, "/", 8],
      ],
    },
    {
      scores: [
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
      transformedScores: [
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", "X", "X"],
      ],
    },
    {
      scores: [
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0, 0],
      ],
      transformedScores: [
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", ""],
        ["X", 0, 0],
      ],
    },
  ];

  tests.forEach(({ scores, transformedScores }) => {
    expect(transformRolls(scores)).toEqual(transformedScores);
  });
});
