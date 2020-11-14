import React from 'react';
import Checkbox from './Checkbox';
import Icon from 'react-crud-icons';
import '../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'

const TableRow = (props) =>
{
    let food = props.name;
    let icons = null;

    if (props.icon){
        icons = (
            <div>
                <Icon
                    name = "edit"
                    size = "small"
                    theme = "dark"
                    onClick = {props.editFood}
                />
                <Icon
                    name = "delete"
                    size = "small"
                    theme = "dark"
                    onClick = {props.deleteFood}
                />
            </div>
        )
    } else {
        icons = (
            <button 
                className = "btn btn-secondary"
                onClick = {(event) => props.getRecipe(event, food)}
            >
                Get Recipe
            </button>
        )
    }

    return (
        <tr>
            <td>
                <Checkbox 
                    checked={(event) => {
                        props.selected(event)}
                    }
                    id={props.id}
                />
            </td>
            <td>{props.name}</td>
            <td>{props.dateAdded}</td>
            <td>{props.dateExp}</td>
            <td>{icons}</td>
        </tr>
    );
};

export default TableRow;