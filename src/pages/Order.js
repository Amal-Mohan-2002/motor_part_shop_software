import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Assuming you've set up Firebase

const OrderPage = () => {
  const [parts, setParts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch available parts from Firestore
  const fetchParts = async () => {
    try {
      const partsCollection = collection(db, "parts");
      const snapshot = await getDocs(partsCollection);
      const partsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched parts:", partsData); // Log fetched parts
      setParts(partsData);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  useEffect(() => {
    console.log(parts);
  }, [parts]);

  // Function to handle adding a part to the selected items list
  const handleAddToCart = (part) => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      {
        id: part.partId,
        name: part.partName,
        price: part.Price,
        quantity: 1,
      },
    ]);
  };

  // Function to handle removing a part from the selected items list
  const handleRemoveFromCart = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  // Function to handle updating quantity of a selected item
  const handleQuantityChange = (itemId, newQuantity) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price for a selected item
  const calculateTotalPrice = (price, quantity) => price * quantity;

  // Calculate total price of all selected items
  const totalOrderPrice = selectedItems.reduce(
    (acc, item) => acc + calculateTotalPrice(item.price, item.quantity),
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const orderedCollection = collection(db, "ordered");
      const currentDate = new Date().toISOString(); // Get current date in ISO format
      await Promise.all(
        selectedItems.map(async (item) => {
          await addDoc(orderedCollection, {
            partId: item.id,
            name: item.name,
            quantity: item.quantity,
            totalPrice: calculateTotalPrice(item.price, item.quantity),
            date: currentDate, // Add date field
          });
        })
      );
      // Clear the selected items list after placing the order
      setSelectedItems([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Order Page
      </Typography>
      <div>
        {parts.map((part, index) => (
          <div key={index}>
            <Typography variant="subtitle1">{part.partName}</Typography>
            <Typography variant="body2">Price: {part.Price} INR</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(part)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
      <Typography variant="h6" align="center" mt={4}>
        Selected Items
      </Typography>
      <div>
        {selectedItems.map((item) => (
          <div key={item.id}>
            <Typography variant="subtitle1">{item.name}</Typography>
            <Typography variant="body2">
              Quantity: {item.quantity} | Total Price:{" "}
              {calculateTotalPrice(item.price, item.quantity)} INR
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Typography variant="h6" align="center" mt={4}>
        Total Order Price: {totalOrderPrice} INR
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/customer"
          sx={{ mr: 2 }}
        >
          Go Back to Home
        </Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </Container>
  );
};

export default OrderPage;
