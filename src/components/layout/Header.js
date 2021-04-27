import { scoreActions } from "../../store/score-reducer";
import { useDispatch } from "react-redux";

import classes from "./Header.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const newGameHandler = () => {
    dispatch(scoreActions.newGame());
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>🎳 Bowling Calculator</div>
      <button className={classes.button} onClick={newGameHandler}>
        New Game
      </button>
    </header>
  );
};
export default MainNavigation;
