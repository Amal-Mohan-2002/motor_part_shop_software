import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Assuming you've set up Firebase
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Allorders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "ordered");
        const snapshot = await getDocs(ordersCollection);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched orders:", ordersData); // Log fetched orders
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Order History
      </Typography>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <Typography variant="body1">
              Part ID: {order.partId}, Part Name: {order.name}, Quantity:{" "}
              {order.quantity}, Total Price: {order.totalPrice}
            </Typography>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" component={Link} to="/SP">
          Back
        </Button>
      </div>
    </Container>
  );
};

export default Allorders;
