import Header from "./Header";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
