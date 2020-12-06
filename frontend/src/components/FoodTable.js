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
import EditFoodModal from "./EditFoodModal";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
  const [expiredFilter, setExpiredFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);
  const [checkmark, setCheckmark] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showAddFood, setShowAddFood] = useState(false);
  const [showEditFood, setShowEditFood] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [food, setFood] = useState({
    foods: [
      {
        item: "",
        dateExp: "",
        foodUt: "",
        foodAmt: -1,
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
      let res = JSON.parse(await response.text());

      if (response.status !== 200) {
        alert("There was an issue loading the fridge.");
      } else if (expiredFilter) {
        let expired = [];
        let today = new Date();
        if (res.fridge) {
          res.fridge.map((p) => {
            let exp = new Date(p.expDate);
            if (exp < today) {
              expired = [...expired, p];
            }
          });
          let initializeChecks = [];
          for (let i = 0; i < expired.length; i++) {
            initializeChecks = [...initializeChecks, false];
          }
          setExpiredFilter(true);
          setFood({ foods: expired });
          setCheckmark([...initializeChecks]);
        }
      } else if (searchFilter) {
        let obj = { item: searchVal };
        let js = JSON.stringify(obj);

        try {
          let response = await fetch("/api/searchFood", {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
          });
          let res = JSON.parse(await response.text());

          if (response.status !== 200) {
            alert("There was an issue finding the search results.");
          } else {
            if (res) {
              let initializeChecks = [];
              for (let i = 0; i < res.length; i++) {
                initializeChecks = [...initializeChecks, false];
              }
              setFood({ foods: res });
              setCheckmark([...initializeChecks]);
            }
          }
        } catch (e) {
          alert(e.toString());
          return;
        }
      } else {
        if (res.fridge) {
          let initializeChecks = [];
          for (let i = 0; i < res.fridge.length; i++) {
            initializeChecks = [...initializeChecks, false];
          }
          setFood({ foods: res.fridge });
          setCheckmark([...initializeChecks]);
        }
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  useEffect(() => {
    loadFridgeHandler();
  }, [expiredFilter, searchFilter]);

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

  const deleteFood = async (event, foodName) => {
    event.preventDefault();
    let obj = { item: foodName };
    let js = JSON.stringify(obj);

    try {
      let response = await fetch("/api/deleteFood", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());

      if (response.status !== 200) {
        alert("There was an issue deleting the food");
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const fetchWithTimeout = async (resource, options) => {
    const { timeout = 35000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    return response;
  };

  const getRecipeHandler = async (event, name) => {
    event.preventDefault();
    setLoading(true);
    let resp = await fetchWithTimeout("/api/getRecipes?search=" + name, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
      timeout: 30000,
    });

    let res = JSON.parse(await resp.text());
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

  const getSelectedRecipes = (event) => {
    event.preventDefault();
    let name = "";
    if (selectedCount == 0){
      return;
    }
    checkmark.map((p, index) => {
      if (p) {
        if (name === "") {
          name = food.foods[index].item;
        } else {
          name = name + "," + food.foods[index].item;
        }
      }
    });
    getRecipeHandler(event, name);
  };

  const selectRowHandler = (event, foodIndex) => {
    let checks = [...checkmark];
    checks[foodIndex] = event.target.checked;
    let count = 0;
    checks.map((p) => {
      if(p){
        count = count + 1;
      }
    })
    setSelectedCount(count);
    setCheckmark([...checks]);
  };

  const editFood = (event, index) => {
    event.preventDefault();
    setEditIndex(index);
    setShowEditFood(true);
  };

  const addFood = (event) => {
    event.preventDefault();
    setShowAddFood(true);
  };

  const getExpired = (event) => {
    event.preventDefault();
    setExpiredFilter(true);
  };

  const searchValChange = (event) => {
    event.preventDefault();
    setSearchVal(event.target.value);
  };

  const searchFood = (event) => {
    event.preventDefault();
    setSearchFilter(true);
  };

  const closeRecipeHandler = () => {
    setShow(false);
    clearRecipeStates();
  };

  const showAllHandler = (event) => {
    event.preventDefault();
    setExpiredFilter(false);
    setSearchFilter(false);
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      let initializeChecks = [];
      for (let i = 0; i < food.foods.length; i++) {
        initializeChecks = [...initializeChecks, true];
      }
      setSelectedCount(food.foods.length);
      setCheckmark([...initializeChecks]);
    } else {
      let initializeChecks = [];
      for (let i = 0; i < food.foods.length; i++) {
        initializeChecks = [...initializeChecks, false];
      }
      setSelectedCount(0);
      setCheckmark([...initializeChecks]);
    }
  };

  const deleteMultiple = async () => {
    let items = [];
    checkmark.map((p,index) => {
      if(p){
        items.push(food.foods[index].item);
      }
    })
    console.log(items);

    let obj = { foodArray: items };
    console.log(obj);
    let js = JSON.stringify(obj);

    try {
      let response = await fetch("/api/deleteManyFoods", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" }
      });

      if (response.status !== 200) {
        alert('There was an issue deleting the food');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  }

  const exitConfirmation = () => {
    let initializeChecks = [];
      for (let i = 0; i < food.foods.length; i++) {
        initializeChecks = [...initializeChecks, false];
      }
      setCheckmark([...initializeChecks]);
    return;
  }

  const confirmDelete = (event) => {
    event.preventDefault();
    confirmAlert({
      title: 'Delete selected',
      message: 'Delete ' + selectedCount + ' items from your fridge?',
      buttons: [
        {
          label: 'Confirm',
          onClick: async () => {
            await deleteMultiple();
            await loadFridgeHandler();
          }
        },
        {
          label: 'No',
          onClick: () => exitConfirmation()
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true
    });
  }

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
              Show expired
            </button>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button className="btn btn-secondary" onClick={showAllHandler}>
              Show all
            </button>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button
              className="btn btn-secondary"
              onClick={(event) => {
                try {
                  getSelectedRecipes(event);
                } catch (e) {
                  setLoading(false);
                  alert("There was an error loading the recipes");
                }
              }}
            >
              Selected recipes
            </button>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button 
              className="btn btn-secondary" 
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
          <FormControl
            style={{ marginLeft: "5px" }}
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            onChange={searchValChange}
          />
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
            <th>
              <div>
                <label for="selectAll">Select all</label>
                <input
                  style={{ marginLeft: "10px" }}
                  id="selectAll"
                  type="checkbox"
                  onChange={selectAll}
                />
              </div>
            </th>
            <th>Food</th>
            <th>Expires in</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {food.foods.map((p, index) => {
            return (
              <TableRow
                id={index}
                item={p.item}
                checked={checkmark[index]}
                selected={(event) => selectRowHandler(event, index)}
                expDate={p.expDate}
                foodAmount={p.foodAmt}
                foodUnit={p.foodUt}
                editFood={(event, index) => editFood(event, index)}
                deleteFood={async (event, foodName) => {
                  await deleteFood(event, foodName);
                  await loadFridgeHandler();
                }}
                getRecipe={(event, name) => {
                  try {
                    getRecipeHandler(event, name);
                  } catch (e) {
                    setLoading(false);
                    alert("There was an error loading the recipes");
                  }
                }}
              />
            );
          })}
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
        show={showAddFood}
        close={() => {
          setShowAddFood(false);
          loadFridgeHandler();
        }}
      />
      <EditFoodModal
        show={showEditFood}
        food={food.foods[editIndex] ? food.foods[editIndex].item : ""}
        foodAmount={food.foods[editIndex] ? food.foods[editIndex].foodAmt : -1}
        foodUnit={food.foods[editIndex] ? food.foods[editIndex].foodUt : ""}
        expDate={food.foods[editIndex] ? food.foods[editIndex].expDate : ""}
        close={() => {
          setShowEditFood(false);
          loadFridgeHandler();
        }}
      />
    </div>
  );
};

export default FoodTable;
