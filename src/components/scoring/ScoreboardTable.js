import { useSelector } from "react-redux";

import { transformRolls } from "../calculator/transformRolls";
import classes from "./ScoreboardTable.module.css";

const ScoreboardTable = () => {
  const historicRolls = useSelector((state) => state.rolls);
  const totalScore = useSelector((state) => state.totalScore);
  const scoresPerFrame = useSelector((state) => state.scoresPerFrame);
  const transformedHistoricRolls = transformRolls(historicRolls); // Show strike as X, spar as /

  return (
    <div className={classes.scoringContainer}>
      <table border="0" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {scoresPerFrame.map((score, index) => {
              return (
                <th key={index} scope="col" colSpan={index === 9 ? 3 : 2}>
                  {index + 1}
                </th>
              );
            })}
            <th scope="col" colSpan="2">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {transformedHistoricRolls.flat().map((roll, index) => {
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
            <td rowSpan="2" colSpan="2" id="total-score">
              {totalScore}
            </td>
          </tr>
          <tr>
            {scoresPerFrame.map((score, index) => {
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

export default ScoreboardTable;
