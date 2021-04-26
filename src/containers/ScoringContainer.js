import RollsButtons from "../components/scoring/RollsButtons";
import RollsTable from "../components/scoring/RollsTable";

import { Fragment } from "react";

const Scoring = () => {
  return (
    <Fragment>
      <RollsTable />
      <RollsButtons />
    </Fragment>
  );
};

export default Scoring;
