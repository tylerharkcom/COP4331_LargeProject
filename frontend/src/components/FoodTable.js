import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import MyLoader from "./MyLoadingSymbol";
import AddFood from "./AddFood";

const FoodTable = () => {
  const [results, setResults] = useState({
    results: [
      {
        title: "",
        image: "",
        sourceUrl: "",
        servings: 0,
        readyInMinutes: 0,
      },
      {
        title: "",
        image: "",
        sourceUrl: "",
        servings: 0,
        readyInMinutes: 0,
      },
    ],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [checkmark, setCheckmark] = useState([]);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [food, setFood] = useState({
    foods: [
      {
        item: "",
        dateExp: "",
      },
    ],
  });
  
  const loadFridgeHandler = async () => {
    try {
      const response = await fetch("/api/loadFridge", {
        method: "POST",
        body: null,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (response.status !== 200) {
        alert("There was an issue loading the fridge.");
      } else {
        if (res.fridge) {
          let initializeChecks = [];
          for (let i = 0; i<res.fridge.length; i++) {
            initializeChecks = [...initializeChecks, false];
          }
          setFood({ foods: res.fridge });
          setCheckmark( [...initializeChecks] );
        }
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  useEffect(() => {
    loadFridgeHandler();
  }, []);

  const clearRecipeStates = () => {
    setResults({
      results: [
        {
          title: "",
          image: "",
          sourceUrl: "",
          servings: 0,
          readyInMinutes: 0,
        },
        {
          title: "",
          image: "",
          sourceUrl: "",
          servings: 0,
          readyInMinutes: 0,
        },
      ],
    });
  };

  const selectRowHandler = (event, foodIndex) => {
    let checks = [...checkmark];
    checks[foodIndex] = event.target.checked;
    setCheckmark([...checks]);
    console.log(checkmark);
  };

  const editFood = (event) => {
    event.preventDefault();
    alert("Thought you could edit, did ya?");
  };

  const addFood = (event) => {
    event.preventDefault();
    setShowFoodModal(true);
  }

  const getExpired = (event) => {
    event.preventDefault();
    let expired = [];
    let today = new Date();
    food.foods.map((p) => {
      let exp = new Date(p.expDate);
      if(exp<today){
        expired = [...expired, p]
      }
    });
    let initializeChecks = [];
        for (let i = 0; i<expired.length; i++) {
          initializeChecks = [...initializeChecks, false];
        }
    setFood({foods: expired});
    setCheckmark( [...initializeChecks] );
  }

  const deleteFood = async (event, foodName) => {
    event.preventDefault();
    var obj = { item: foodName };
    var js = JSON.stringify(obj);

    try {
      var response = await fetch("/api/deleteFood", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" }
      });

      var res = JSON.parse(await response.text());

      if (response.status !== 200) {
        alert('There was an issue deleting the food');
      } 
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const searchFood = (event, criteria) => {
    event.preventDefault();
    alert("You're not getting any results, buddy!");
  };

  const getRecipeHandler = async (event, name) => {
    event.preventDefault();
    setLoading(true);
    var resp = await fetch("/api/getRecipes?search=" + name, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    var res = JSON.parse(await resp.text());
    if (resp.status != 200) {
      setLoading(false);
      alert("Ope, something went wrong!");
    } else {
      setResults({ results: [res.results[0], res.results[1]] });
      setSearch(name);
      setShow(true);
      setLoading(false);
    }
  };

  const closeRecipeHandler = () => {
    setShow(false);
    clearRecipeStates();
  };

  let printRows = () => 
  {
    food.foods.map((p, index) => {
      return (
        <TableRow
          id={index}
          item={p.item}
          selected={(event) => selectRowHandler(event, index)}
          expDate={p.expDate}
          editFood={editFood}
          deleteFood={ async (event, foodName) => {
              await deleteFood(event,foodName);
              await loadFridgeHandler();
          }}
          getRecipe={(event, name) => getRecipeHandler(event, name)}
        />
      );
    });
  };

  let printTable = (
    <div>
      <div id="fridgeCRUD">
        <Form inline>
          <div style={{ marginLeft: "5px" }}>
            <button className="btn btn-secondary" onClick={addFood}>
              Add food
            </button>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button className="btn btn-secondary" onClick={getExpired}>
              All expired
            </button>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button className="btn btn-secondary" onClick={loadFridgeHandler}>
              Show all
            </button>
          </div>
          <FormControl style={{ marginLeft: "5px" }} type="text" placeholder="Search" className=" mr-sm-2" />
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={searchFood}
          >
            Search
          </button>
        </Form>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Food</th>
            <th>Expires in</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {food.foods[0].item ? printRows : ""}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div id="fridgeTable">
      {printTable}
      <Modal size="xl" show={show} onHide={closeRecipeHandler} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Results for {search}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardDeck>
            <Card bg="light" text="dark">
              <Card.Title>
                <a href={results.results[0].sourceUrl} target="_blank">
                  {results.results[0].title}
                </a>
              </Card.Title>
              <Card.Body>
                <Card.Text>
                  Serves {results.results[0].servings} | Ready in{" "}
                  {results.results[0].readyInMinutes} minutes
                </Card.Text>
              </Card.Body>
              <Card.Img variant="bottom" src={results.results[0].image} />
            </Card>
            <Card bg="light" text="dark">
              <Card.Title>
                <a href={results.results[1].sourceUrl} target="_blank">
                  {results.results[1].title}
                </a>
              </Card.Title>
              <Card.Body>
                <Card.Text>
                  Serves {results.results[1].servings} | Ready in{" "}
                  {results.results[1].readyInMinutes} minutes
                </Card.Text>
              </Card.Body>
              <Card.Img variant="bottom" src={results.results[1].image} />
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
      <AddFood
        show={showFoodModal}
        close={() => {
          setShowFoodModal(false);
          loadFridgeHandler();
        }}
      />
    </div>
  );
};

export default FoodTable;
