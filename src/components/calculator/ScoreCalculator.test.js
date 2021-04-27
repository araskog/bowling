import calcTotalScore from "./ScoreCalculator";

test("Calculate total scores correctly", () => {
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
      value: 0,
    },
    {
      scores: [
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
      ],
      value: 10,
    },
    {
      scores: [
        [7, 3],
        [0, 0],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
      ],
      value: 10,
    },
    {
      scores: [
        [7, 3],
        [7, ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
      ],
      value: 24,
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
      value: 180,
    },
    {
      scores: [
        [10, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      value: 10,
    },
    {
      scores: [
        [0, 10],
        [2, 4],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      value: 18,
    },
    {
      scores: [
        [10, 0],
        [2, 4],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      value: 22,
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
      value: 300,
    },
  ];

  tests.forEach(({ scores, value }) => {
    const totalScore = calcTotalScore(scores);
    // Print out scores if errouneus
    console.assert(totalScore === value, scores);
    expect(totalScore).toBe(value);
  });
});
