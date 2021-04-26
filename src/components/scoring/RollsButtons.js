import classes from "./RollsButtons.module.css";

const RollsButtons = () => {
  return (
    <div className={classes.inputContainer}>
      <h2>Insert number of pinns knocked down 🎳</h2>
      <div id="rolls" className={classes.buttonsContainer}>
        <button id="roll-a-0">0</button>
        <button id="roll-a-1">1</button>
        <button id="roll-a-2">2</button>
        <button id="roll-a-3">3</button>
        <button id="roll-a-4">4</button>
        <button id="roll-a-5">5</button>
        <button id="roll-a-6">6</button>
        <button id="roll-a-7">7</button>
        <button id="roll-a-8">8</button>
        <button id="roll-a-9">9</button>
        <button id="roll-a-10">10</button>
        <button id="reset">reset</button>
      </div>
    </div>
  );
};

export default RollsButtons;
