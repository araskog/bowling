import { scoreActions } from "../../store/score-reducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import classes from "./RollsButtons.module.css";
import calcTotalScore from "../calculator/ScoreCalculator";

const RollsButtons = () => {
  const dispatch = useDispatch();

  const availableRolls = useSelector((state) => state.availableRolls);
  const rolls = useSelector((state) => state.rolls);

  const addRollHandler = (e) => {
    const rollValue = parseInt(e.target.outerText);
    dispatch(
      scoreActions.addRoll({
        value: rollValue,
        totalScore: calcTotalScore(rolls),
      })
    );
    dispatch(scoreActions.calcAvailableRolls(rollValue));
  };

  return (
    <div className={classes.inputContainer}>
      <h2>Insert number of pinns knocked down 💥</h2>
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

export default RollsButtons;
