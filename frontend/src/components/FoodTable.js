import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'

const FoodTable = (props) => {

    const [food, setFood] = useState({
        foods: [
            {
                id: 1,
                name: 'Kiwis',
                dateAdded: '11/11/20',
                dateExp: '11/22/20'
            },
            {
                id: 2,
                name: 'Chicken breast',
                dateAdded: '11/11/20',
                dateExp: '11/14/20'
            },
            {
                id: 3,
                name: 'Blackberries',
                dateAdded: '11/11/20',
                dateExp: '11/20/20'
            }
        ]
    });

    const selectRowHandler = (event, foodIndex) => {
        console.log(event.target.checked)
        let select = event.target.checked ? 'selected' : 'deselected';
        alert(foodIndex+' row '+select);
    }

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

    const getRecipeHandler = (event, name) => {
        event.preventDefault();
        console.log(name);
        alert("searching API for "+name);
    }

    let printTable = null;

    if(props.crud){
        printTable = (
            <div>
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
                        {
                            food.foods.map((p, index) => {
                                return <TableRow 
                                    name={p.name} 
                                    selected={(event) => selectRowHandler(event, index)} 
                                    dateAdded={p.dateAdded} 
                                    dateExp={p.dateExp}
                                    editFood={editFood}
                                    deleteFood={deleteFood}
                                    icon={true}
                                />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    } else {
        printTable = (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>
                        </th>
                        <th>Food</th>
                        <th>Date expires</th>
                        <th>Date added</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            food.foods.map((p, index) => {
                                return <TableRow 
                                    name={p.name} 
                                    selected={(event) => selectRowHandler(event, index)} 
                                    dateAdded={p.dateAdded} 
                                    dateExp={p.dateExp}
                                    getRecipe={(event, name) => getRecipeHandler(event, name)}
                                    icon={false}
                                />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }

    return(
        <div id="fridgeTable">
            {printTable}
        </div>
    );
};

export default FoodTable;