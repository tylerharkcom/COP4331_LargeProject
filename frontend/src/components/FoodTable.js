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

    return(
        <div id="fridgeTable">
            <div id="fridgeCRUD">
                <button 
                    className="btn btn-secondary"
                    onClick={addFood}
                >Add food</button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th></th>
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
                            tooltip = "Edit"
                            size = "small"
                            theme = "dark"
                            onClick = {editFood}
                        />
                    </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default FoodTable;