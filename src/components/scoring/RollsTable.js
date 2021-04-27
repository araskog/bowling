import { useSelector } from "react-redux";

import classes from "./RollsTable.module.css";

const RollsTable = () => {
  const historicRolls = useSelector((state) => state.rolls);
  const totalScore = useSelector((state) => state.totalScore);
  const maxScore = useSelector((state) => state.currentMaxScore);
  const scoresPerFrame = useSelector((state) => state.scoresPerFrame);

  // Adapt the historicRolls to show strike as X and spar as /
  const transformedHistoricRolls = historicRolls.map((frame) => {
    if (frame.length === 2) {
      if (frame[0] === 10) {
        return ["X", ""];
      } else if (frame[1] === 10) {
        return [frame[0], "X"];
      } else if (frame[0] + frame[1] === 10) {
        return [frame[0], "/"];
      }
    }

    if (frame.length === 3) {
      if (frame[0] === 10 && frame[1] === 10 && frame[2] === 10) {
        return ["X", "X", "X"];
      } else if (frame[0] === 10 && frame[1] === 10) {
        return ["X", "X", frame[2]];
      } else if (frame[0] + frame[1] === 10 && frame[2] === 10) {
        return [frame[0], "/", "X"];
      } else if (frame[0] + frame[1] === 10) {
        return [frame[0], "/", frame[2]];
      }
    }
    return frame;
  });

  return (
    <div className={classes.scoringContainer}>
      <table border="0" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              1
            </th>
            <th scope="col" colSpan="2">
              2
            </th>
            <th scope="col" colSpan="2">
              3
            </th>
            <th scope="col" colSpan="2">
              4
            </th>
            <th scope="col" colSpan="2">
              5
            </th>
            <th scope="col" colSpan="2">
              6
            </th>
            <th scope="col" colSpan="2">
              7
            </th>
            <th scope="col" colSpan="2">
              8
            </th>
            <th scope="col" colSpan="2">
              9
            </th>
            <th scope="col" colSpan="3">
              10
            </th>
            <th scope="col" colSpan="1">
              Max
            </th>
            <th scope="col" colSpan="1">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {transformedHistoricRolls.flat().map((roll, index) => {
              //  console.log("transformed", transformedHistoricRolls);
              return (
                <td
                  id={index}
                  key={index}
                  className={
                    index % 2 === 0
                      ? index === 20
                        ? classes.extraRoll
                        : classes.left
                      : ""
                  }
                >
                  {roll}
                </td>
              );
            })}
            <td rowSpan="2" id="max-score">
              {maxScore}
            </td>
            <td rowSpan="2" id="total-score">
              {totalScore}
            </td>
          </tr>
          <tr>
            {scoresPerFrame.map((score, index) => {
              // console.log(scoresPerFrame);
              return (
                <td
                  colSpan={index === 9 ? 3 : 2}
                  id={index}
                  key={index}
                  className={classes.frameTotal}
                >
                  {score}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RollsTable;
