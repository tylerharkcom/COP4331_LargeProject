import React from "react";
import Checkbox from "./Checkbox";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";

const TableRow = (props) => {
  let food = props.item;
  let expDate = new Date(props.expDate);
  let current = new Date();
  let timeDiff = (expDate.getTime() - current.getTime())/(1000*60*60*24);
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
      <td>{timeDiff} days</td>
      <td></td>
      <td>{icons}</td>
    </tr>
  );
};

export default TableRow;
