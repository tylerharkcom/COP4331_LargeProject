import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

const FoodTable = () => {
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
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
        setShow(true);
        setSearch(name);
    }

    const closeRecipeHandler = () => {
        setShow(false);
    }

   
    let printTable = (
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
                                getRecipe={(event, name) => getRecipeHandler(event, name)}
                            />
                        })
                    }
                </tbody>
            </Table>
        </div>
    );

    return(
        <div id="fridgeTable">
            {printTable}
            <Modal 
                size='xl'
                show={show}
                onHide={closeRecipeHandler}
                animation={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Results for {search}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <CardDeck>
                            <Card 
                                bg='dark'
                                text='light'
                            >   
                                <Card.Title>Recipe Name</Card.Title>
                                <Card.Body>
                                    <Card.Text>Recipe photo and meal type</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card 
                                bg='dark'
                                text='light'
                            >   
                                <Card.Title>Recipe Name</Card.Title>
                                <Card.Body>
                                    <Card.Text>Recipe photo and meal type</Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={closeRecipeHandler}>
                            Done
                        </button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FoodTable;