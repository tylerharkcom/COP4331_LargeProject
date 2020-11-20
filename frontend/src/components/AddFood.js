import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const AddFoodModal = (props) => 
{
    const [message, setMessage] = useState('');
    let food = "";
    let brand = "";
    let expDateString = "";
    let expDate = null;
    let check = false;
    let didDate = false;

    let messageStyle = {
        color: "red",
        textAlign: "center"
    };

    const dated = () =>
    {
        didDate = true;
    }

    const checkDate = () =>
    {
        let current = new Date();
        if(current.getFullYear()>expDate.getFullYear()){
            return;
        }
        if(current.getMonth()>expDate.getMonth()){
            return;
        }
        if(current.getDay()>expDate.getDay()){
            return;
        }

        check = true;
        return;

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
        if (!didDate){
            setMessage('Check your date');
            return;
        }
        expDate = new Date(expDateString.value);
        console.log(expDate);
        if(!(expDate instanceof Date)){
            setMessage('Check your date');
            return;
        }
        checkDate();
        if (!check) {
            setMessage('Check your date');
            return;
        }
        if (expDateString === ""){
            setMessage('Check your date');
            return;
        }
        if(food.value===""){
            setMessage('Please enter a food');
            return;
        }
        else {
            var obj = { item: food.value, brand: brand.value, expDate: expDateString.value };
            var js = JSON.stringify(obj);
            try 
            {
                const response = await fetch("/api/addFood", {
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
                    document.getElementById("addFoodForm").reset();
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
            <Modal.Header closeButton>
                Add Food
            </Modal.Header>
            <Modal.Body>
                <form id="addFoodForm" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label for="foodName">Food</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="foodName" 
                            placeholder="Food type" 
                            ref={(c) => food = c} 
                        />
                    </div>
                    <div className="form-row">
                        <label for="foodBrand">Brand</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="foodBrand" 
                            placeholder="Brand (optional)" 
                            ref={(c) => brand = c} 
                        />
                    </div>
                    <div className="form-row">
                        <label for="foodExpDate">Expiration</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="foodExpDate" 
                            ref={(c) => expDateString = c} 
                            onChange={dated}
                        />
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Add
                        </button>
                        <button
                            type="reset"
                            className="btn btn-secondary"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <span id="addFoodMessage" style={messageStyle}>
                        {message}
                    </span>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFoodModal;