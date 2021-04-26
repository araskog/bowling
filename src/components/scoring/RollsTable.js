import classes from "./RollsTable.module.css";

const RollsTable = () => {
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
            <td id="r1" className={classes.left}></td>
            <td id="r2"></td>
            <td id="r3" className={classes.left}></td>
            <td id="r4"></td>
            <td id="r5" className={classes.left}></td>
            <td id="r6"></td>
            <td id="r7" className={classes.left}></td>
            <td id="r8"></td>
            <td id="r9" className={classes.left}></td>
            <td id="r10"></td>
            <td id="r11" className={classes.left}></td>
            <td id="r12"></td>
            <td id="r13" className={classes.left}></td>
            <td id="r14"></td>
            <td id="r15" className={classes.left}></td>
            <td id="r16"></td>
            <td id="r17" className={classes.left}></td>
            <td id="r18"></td>
            <td id="r19" className={classes.left}></td>
            <td id="r20"></td>
            <td id="r21" className={classes.extraRoll}></td>
            <td rowSpan="2" id="max-score"></td>
            <td rowSpan="2" id="total-score"></td>
          </tr>
          <tr>
            <td colSpan="2" id="f1" className={classes.frameTotal}></td>
            <td colSpan="2" id="f2" className={classes.frameTotal}></td>
            <td colSpan="2" id="f3" className={classes.frameTotal}></td>
            <td colSpan="2" id="f4" className={classes.frameTotal}></td>
            <td colSpan="2" id="f5" className={classes.frameTotal}></td>
            <td colSpan="2" id="f6" className={classes.frameTotal}></td>
            <td colSpan="2" id="f7" className={classes.frameTotal}></td>
            <td colSpan="2" id="f8" className={classes.frameTotal}></td>
            <td colSpan="2" id="f9" className={classes.frameTotal}></td>
            <td colSpan="3" id="f10" className={classes.frameTotal}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RollsTable;
