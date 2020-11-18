import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import MyLoader from './MyLoadingSymbol';
require("dotenv").config();

const FoodTable = () => {
    const [resultName, setResultName] = useState('');
    const [resultName2, setResultName2] = useState('');
    const [resultImageSrc, setResultImageSrc] = useState('');
    const [resultImageSrc2, setResultImageSrc2] = useState('');
    const [resultTime, setResultTime] = useState(-1);
    const [resultTime2, setResultTime2] = useState(-1);
    const [resultServes, setResultServes] = useState(-1);
    const [resultServes2, setResultServes2] = useState(-1);
    const [resultLink, setResultLink] = useState('');
    const [resultLink2, setResultLink2] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
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

    const API_KEY = process.env.API_KEY;

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

    const getRecipeHandler = async (event,name) => {
        event.preventDefault();
        setLoading(true);
        var resp1 = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey='+API_KEY+'&query='+name+'&number=2', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        var res1 = JSON.parse(await resp1.text());
        if (resp1.status!=200){
            console.log('Mayday');
        } else {
            var resp2 = await fetch('https://api.spoonacular.com/recipes/'+res1.results[0].id+'/information?apiKey='+API_KEY+'&includeNutrition=false', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            var res2 = JSON.parse(await resp2.text());
            var resp3 = await fetch('https://api.spoonacular.com/recipes/'+res1.results[1].id+'/information?apiKey='+API_KEY+'&includeNutrition=false', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            var res3 = JSON.parse(await resp3.text());
        
            if (resp2.status==200&&resp3.status==200) {
                setResultName(res1.results[0].title);
                setResultName2(res1.results[1].title);
                setResultImageSrc(res1.results[0].image);
                setResultImageSrc2(res1.results[1].image);
                setResultLink(res2.sourceUrl);
                setResultLink2(res3.sourceUrl);
                setResultServes(res2.servings);
                setResultServes2(res3.servings);
                setResultTime(res2.readyInMinutes);
                setResultTime2(res3.readyInMinutes);
                setSearch(name);
                setShow(true);
                setLoading(false);
            }
        }
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
                                bg='light'
                                text='dark'
                            >   
                                <Card.Title>
                                    <a 
                                        href={resultLink} 
                                        target="_blank"
                                    >
                                            {resultName}
                                    </a>
                                </Card.Title>
                                <Card.Body>
                                    <Card.Text>Serves {resultServes} | Ready in {resultTime} minutes</Card.Text>
                                </Card.Body>
                                <Card.Img variant="bottom" src={resultImageSrc} />
                            </Card>
                            <Card 
                                bg='light'
                                text='dark'
                            >   
                                <Card.Title>
                                    <a 
                                        href={resultLink2} 
                                        target="_blank"
                                    >
                                            {resultName2}
                                    </a>
                                </Card.Title>
                                <Card.Body>
                                    <Card.Text>Serves {resultServes2} | Ready in {resultTime2} minutes</Card.Text>
                                </Card.Body>
                                <Card.Img variant="bottom" src={resultImageSrc2} />
                            </Card>
                        </CardDeck>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={closeRecipeHandler}>
                            Done
                        </button>
                    </Modal.Footer>
            </Modal>
            <MyLoader loading={loading} />
        </div>
    );
};

export default FoodTable;