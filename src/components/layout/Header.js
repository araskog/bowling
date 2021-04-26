import classes from "./Header.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Bowling Calculator</div>
    </header>
  );
};
export default MainNavigation;
