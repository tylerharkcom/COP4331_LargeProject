import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
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

    const searchFood = event => {
        event.preventDefault();
        alert("You're not getting any results, buddy!");
    }

    return(
        <div id="fridgeTable">
            <div id="fridgeCRUD">
                <Form inline>
                    <div style={{marginLeft: "5px"}}>
                        <button 
                            className="btn btn-secondary"
                            onClick={addFood}
                        >
                            Add food
                        </button>
                    </div>
                    <div style={{marginLeft: "5px"}}>
                        <button
                            className="btn btn-secondary"
                            onClick={deleteFood}
                        >
                            Delete
                        </button>
                    </div>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                    <button className="btn btn-secondary" type="submit" onClick={searchFood}>Search</button>
                </Form>
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