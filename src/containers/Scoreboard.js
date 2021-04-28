import ScoreboardButtons from "../components/scoring/ScoreboardButtons";
import ScoreboardTable from "../components/scoring/ScoreboardTable";
import { Fragment } from "react";

const Scoreboard = () => {
  return (
    <Fragment>
      <ScoreboardTable />
      <ScoreboardButtons />
    </Fragment>
  );
};

export default Scoreboard;
