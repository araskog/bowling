import { scoreActions } from "../../store/score-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import calcTotalScore from "../calculator/scoreCalculator";

import Button from "./Button";
import classes from "./ScoreboardButtons.module.css";

const ScoreboardButtons = () => {
  const dispatch = useDispatch();

  const availableRolls = useSelector((state) => state.availableRolls);
  const gameEnded = useSelector((state) => state.gameEnded);
  const zeroPins = useSelector((state) => state.zeroPins);

  // Update state with the new roll value
  const addRollHandler = (e) => {
    const rollValue = parseInt(e.target.outerText);
    dispatch(
      scoreActions.addRoll({
        value: rollValue,
      })
    );
    dispatch(scoreActions.calcAvailableRolls(rollValue));
  };

  // Update the available rolls without user input if 0 pins are available
  useEffect(() => {
    if (zeroPins) {
      dispatch(
        scoreActions.addRoll({
          value: 0,
        })
      );
      dispatch(scoreActions.calcAvailableRolls(0));
    }
  }, [dispatch, zeroPins]);

  return (
    <div className={classes.inputContainer}>
      <h2>
        {gameEnded
          ? "Game ended, play again?"
          : "Select number of pins knocked down 💥"}
      </h2>
      <div id="rolls" className={classes.buttonsContainer}>
        {availableRolls.map((roll) => {
          return (
            <Button
              id={roll}
              key={roll}
              onClick={addRollHandler}
              value={roll}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScoreboardButtons;
