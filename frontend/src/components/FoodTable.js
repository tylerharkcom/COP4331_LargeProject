import React from 'react';
import Table from 'react-bootstrap/Table';
import Icon from 'react-crud-icons';
import '../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'

function FoodTable() {

    const editFood = event => {
        event.preventDefault();
        alert('Thought you could edit, did ya?');
    }

    const addFood = event => {
        event.preventDefault();
        alert('Thought you could add food, did ya?');
    }

    const deleteFood = event => {
        event.preventDefault();
        alert('Thought you could delete food, did ya?');
    }

    return(
        <div id="fridgeTable">
            <div id="fridgeCRUD">
                <button 
                    className="btn btn-secondary"
                    onClick={addFood}
                >Add food</button>
                <button
                    className="btn btn-secondary"
                    onClick={deleteFood}
                    style={{paddingLeft: "5px"}}
                >Delete</button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>
                        <div id="selectAll" class="checkbox">
                            <label>
                            <input type="checkbox" /> Select All
                            </label>
                        </div>
                    </th>
                    <th>Food</th>
                    <th>Date expires</th>
                    <th>Date added</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>Kiwis</td>
                    <td>11/20</td>
                    <td>11/6</td>
                    <td>
                        <Icon
                            name = "edit"
                            size = "small"
                            theme = "dark"
                            onClick = {editFood}
                        />
                        <Icon
                            name = "delete"
                            size = "small"
                            theme = "dark"
                            onClick = {deleteFood}
                        />
                    </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default FoodTable;