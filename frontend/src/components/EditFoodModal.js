import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const EditFoodModal = (props) => 
{
    let check = false;
    let messageStyle = {
        color: "red",
        textAlign: "center"
    };
    let a;
    let u;
    let expDate;
    let date;

    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [dateString, setDateString] = useState('');

    const checkDate = () =>
    {
        check = false;
        let current = new Date();
        
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

    const amountChangeHandler = (event) =>
    {
        setAmount(event.target.value);
    }

    const unitChangeHandler = (event) =>
    {
        setUnit(event.target.value);
    }

    const dateChangeHandler = (event) =>
    {
        setDateString(event.target.value);
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (dateString != '') 
        {
            date = new Date(dateString);
            expDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        } else {
            date = new Date(props.expDate);
            expDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        }

        checkDate();
        if (!check) {
            setMessage('Check your date');
            return;
        }
        
        if (amount === 0) {
            a = props.foodAmount;
        } else {
            a = amount;
        }

        if (unit === '') {
            u = props.foodUnit;
        } else {
            u = unit;
        }

        let d = dateString === '' ? props.expDate : dateString;
        var obj = { item: props.food, foodAmt: a, foodUt: u, expDate: d };
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
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label for="foodAmount">Amount</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="foodAmount" 
                                    value={amount === 0 ? props.foodAmount : amount} 
                                    onChange={amountChangeHandler} 
                                />
                            </div>
                            <div className="form-col">
                                <label for="foodUnit">Unit</label>
                                <select 
                                    name="foodUnit" 
                                    style={{marginLeft: "10px"}}
                                    className="form-control" 
                                    id="foodUnit" 
                                    value={unit === '' ? props.foodUnit : unit}
                                    onChange={unitChangeHandler} 
                                >
                                    <option value =" "> </option>
                                    <option value ="oz">oz</option>
                                    <option value ="dz">dz</option>
                                    <option value = "fl. oz">fl. oz</option>
                                    <option value = "ct">ct</option>
                                    <option value = "gal">gal</option>
                                    <option value = "bx">bx</option>
                                    <option value = "pkg">pkg</option>"
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <label for="foodExpDate">Expiration</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="foodExpDate" 
                                value={dateString === '' ? props.expDate : dateString}
                                onChange={dateChangeHandler} 
                            />
                        </div>
                        <div className="form-group text-right">
                            <button 
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                style={{marginLeft: '10px', marginTop: '10px'}}
                            >
                                Save
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