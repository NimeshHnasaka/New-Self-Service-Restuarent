

import React, { useState } from 'react';
import Payment from '../PayPal/Payment'; // Assuming Payment component is imported correctly
import './TotalBill.css';
import axios from 'axios'; // Import axios for making HTTP requests

const TotalBill = ({ objectQuantity }) => {
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [detectedObjects, setDetectedObjects] = useState({});

    // Mapping of detected objects to prices
    const objectPrices = {
        donut: 10.00,
        pizza: 20.00,
        "hot dog": 15.00,
        "dining table": 0,
        person:10,
        // Add more objects and their prices as needed
    };

    // Function to calculate total bill
    const calculateTotalBill = (objectQuantity) => {
        let bill = 0;
        for (const object in objectQuantity) {
            const quantity = objectQuantity[object];
            const price = objectPrices[object];
            const totalPrice = quantity * price;
            bill += totalPrice;
        }
        return bill.toFixed(2); // Ensure the bill is rounded to two decimal places
    };

    // Calculate the total bill
    const totalBill = calculateTotalBill(objectQuantity);

    // Function to generate a reference number with date and time
    const generateReferenceNumber = () => {
        const prefix = 'REF-';
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[-:]/g, '').slice(0, -5); // Format date as YYYYMMDDHHMM
        const numericString = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a random 4-digit number
        return prefix + formattedDate + numericString;
    };

    // Function to handle confirm button click
    const handleConfirmClick = async () => {
        try {
            const referenceNum = generateReferenceNumber();
            console.log("Total Bill:", totalBill);
            console.log("Reference Number:", referenceNum);
            console.log("Detected Objects:", objectQuantity);
            console.log("Order Confirmed");
            setReferenceNumber(referenceNum);
            setDetectedObjects(objectQuantity);

            // Send bill details and detected objects to the server
            await axios.post('http://localhost:5000/api/bill', {
                totalAmount: totalBill,
                referenceNumber: referenceNum,
                detectedObjects: objectQuantity
            });

            // Set order confirmed to true
            setOrderConfirmed(true);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    return (
        <div>
            {!orderConfirmed ? (
                <div className="total-bill-container">
                    <h1 className="total-bill-title">Total Bill </h1>
                    <h2 className="total-bill-title">Food Items</h2>
                    <ul className="total-bill-list">
                        {Object.entries(objectQuantity).map(([object, quantity]) => (
                            <li key={object}>
                                {object} -  Price: ${objectPrices[object]} - Quantity: {quantity} - Total: ${(quantity * objectPrices[object]).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h2 className="total-bill-title">Total Bill: ${totalBill}</h2>
                    <button className="confirm-button" onClick={handleConfirmClick}>Confirm Your Order</button>
                </div>
            ) : (
                <Payment totalBill={totalBill} referenceNumber={referenceNumber} detectedObjects={detectedObjects} />
            )}
        </div>
    );
};

export default TotalBill;




