import React from "react";
import Checkbox from "./Checkbox";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";

const TableRow = (props) => {
  let food = props.item;
  let expDate = props.expDate === "" ? "" : new Date(props.expDate);
  let current = new Date();
  let timeDiff = Math.round((expDate.getTime() - current.getTime())/(1000*60*60*24));
  let timeDiffString = "";
  let icons = (
    <div>
      <Icon name="edit" size="small" theme="dark" onClick={props.editFood} />
      <Icon
        name="delete"
        size="small"
        theme="dark"
        onClick={(event) => props.deleteFood(event, food)}
      />
      <button
        style={{marginLeft: '20px'}}
        className="btn btn-secondary"
        onClick={(event) => props.getRecipe(event, food)}
      >
        Get Recipe
      </button>
    </div>
  );

  if (timeDiff == 0) {
    timeDiffString = "today";
  } else if (timeDiff == 1) {
    timeDiffString = timeDiff + " day";
  } else if (timeDiff > 1) {
    timeDiffString = timeDiff + " days";
  } else {
    timeDiffString = "expired";
  }

  return (
    <tr>
      <td>
        <Checkbox
          checked={(event) => {
            props.selected(event);
          }}
          id={props.id}
        />
      </td>
      <td>{props.item}</td>
      <td>{timeDiffString}</td>
      <td></td>
      <td>{icons}</td>
    </tr>
  );
};

export default TableRow;
