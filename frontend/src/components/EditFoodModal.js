import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const EditFoodModal = (props) => 
{
    const [message, setMessage] = useState('');
    let food = props.food;
    let foodAmount = props.foodAmount;
    let foodUnit = props.foodUnit;
    let expDateString = props.expDate;
    let expDate = null;
    let check = false;

    let messageStyle = {
        color: "red",
        textAlign: "center"
    };

    const checkDate = () =>
    {
        check = false;
        let current = new Date();
        console.log(current);
        if (current >= expDate) {
            return;
        }

        check = true;
    }

    const handleClose = (event) =>
    {
        event.preventDefault();
        props.close();
        return;
    }
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        let date = new Date(expDateString.value);
        expDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

        if(!(expDate instanceof Date)){
            setMessage('Check your date');
            return;
        }
        checkDate();
        if (!check) {
            setMessage('Check your date');
            return;
        }
        else if (expDateString === ""){
            setMessage('Check your date');
            return;
        }
        else if (food.value === ""){
            setMessage('Please enter a food');
            return;
        }
        else if (foodAmount.value === "" || foodAmount.value <= 0){
            setMessage('Please enter the amount of food');
            return;
        }
        else {
            var obj = { item: food.value, foodAmt: foodAmount.value, foodUt: foodUnit.value, expDate: expDateString.value };
            var js = JSON.stringify(obj);
            try 
            {
                const response = await fetch("/api/editFood", {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" }
                });
        
                if (response.status !== 200) {
                    setMessage("Ope! An error occurred");
                    return;
                } else {
                    messageStyle = {
                        color: "#DADADA",
                        textAlign: "center"
                    }
                    setMessage("Success");
                    document.getElementById("editFoodForm").reset();
                    return;
                }
            } catch (e) {
                alert(e.toString());
                return;
            };
        }

    }

    return(
        <Modal 
            animation={true}
            show={props.show}
            onHide={props.close}
        >
            <div id="editFoodWrapper">
                <Modal.Header closeButton>
                    <h1>Edit Food</h1>
                </Modal.Header>
                <Modal.Body>
                    <form id="editFoodForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label for="foodName">Food</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="foodName" 
                                value={props.food}
                                ref={(c) => food = c} 
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label for="foodAmount">Amount</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="foodAmount" 
                                    value={props.foodAmount} 
                                    ref={(c) => foodAmount = c} 
                                />
                            </div>
                            <div className="form-col">
                                <label for="foodUnit">Unit</label>
                                <select 
                                    name="foodUnit" 
                                    style={{marginLeft: "10px"}}
                                    className="form-control" 
                                    id="foodUnit" 
                                    value={props.foodUnit}
                                    ref={(c) => foodUnit = c} 
                                >
                                    <option value =" "> </option>
                                    <option value ="oz">oz</option>
                                    <option value ="dz">dz</option>
                                    <option value = "fl. oz">fl. oz</option>
                                    <option value = "ct">ct</option>
                                    <option value = "gal">gal</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <label for="foodExpDate">Expiration</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="foodExpDate" 
                                value={props.expDate}
                                ref={(c) => expDateString = c} 
                            />
                        </div>
                        <div className="form-group text-right">
                            <button 
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                style={{marginLeft: '10px', marginTop: '10px'}}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                                style={{marginLeft: '10px', marginTop: '10px'}}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                    <div>
                        <span id="editFoodMessage" style={messageStyle}>
                            {message}
                        </span>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
            
    );
};

export default EditFoodModal;