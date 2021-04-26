const Button = (props) => (
  <button id={props.id} onClick={props.onClick}>
    {props.value}
  </button>
);

export default Button;
