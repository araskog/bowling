import { useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./RollsTable.module.css";

const RollsTable = () => {
  const historicRolls = useSelector((state) => state.rolls);
  const totalScore = useSelector((state) => state.totalScore);
  const maxScore = useSelector((state) => state.currentMaxScore);
  const currentScores = useSelector((state) => state.currentScores);

  useEffect(() => {}, [historicRolls, totalScore, maxScore]);

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
              Max score
            </th>
            <th scope="col" colSpan="1">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {historicRolls.map((roll, index) => {
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
            {currentScores.map((score, index) => {
              return (
                <td
                  colSpan={index === 9 ? 3 : 2}
                  id={index}
                  key={index}
                  className={classes.frameTotal}
                >
                  {score ? score : ""}
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
